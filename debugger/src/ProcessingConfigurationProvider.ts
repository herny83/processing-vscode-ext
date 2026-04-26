// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as fs from "fs";
import * as _ from "lodash";
import * as path from "path";
import * as vscode from "vscode";
import * as dotenv from 'dotenv';
import * as anchor from "./anchor";
import * as commands from "./commands";
import * as lsPlugin from "./languageServerPlugin";
import * as utility from "./utility";
import * as sketch from "./sketch";
import * as out from "./outputChannel";
import { populateStepFilters } from "./classFilter";
import { ClasspathVariable } from "./constants";
import { addMoreHelpfulVMArgs, getJavaVersion, getShortenApproachForCLI } from "./launchCommand";
import { resolveJavaProcess } from "./processPicker";
import { progressProvider } from "./progressImpl";
import { WorkspaceFolder, CancellationToken, DebugConfiguration, ProviderResult } from "vscode";

const platformNameMappings: { [key: string]: string } = {
	win32: "windows",
	linux: "linux",
	darwin: "osx",
};
const platformName = platformNameMappings[process.platform];

export let lastUsedLaunchConfig: DebugConfiguration | undefined;

export class ProcessingDebugConfigurationProvider implements vscode.DebugConfigurationProvider 
{
	// Returns an initial debug configurations based on contextual information.
	public provideDebugConfigurations(folder?: WorkspaceFolder, _token?: CancellationToken): ProviderResult<DebugConfiguration[]> 
	{
		if(folder==undefined)
			return [];

		const defaultConfig = {
			type: "processing",
			request: "launch",
			name: "Debug Sketch",
			processingArgs: []
		};
		console.log("[ProcessingDebug] provideDebugConfigurations returned:", defaultConfig);
		return [defaultConfig];
	}

	// Try to add all missing attributes to the debug configuration being launched.
	public resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, _token?: CancellationToken): ProviderResult<DebugConfiguration> 
	{

		// Fill in missing fields for minimal config
		if (!config.type) config.type = "processing";
		if (!config.request) config.request = "launch";
		if (!config.name) config.name = "Debug Sketch";
		
		const activeEditor = vscode.window.activeTextEditor;
		const activeEditorFilePath = activeEditor ? activeEditor.document.fileName : undefined;
		const focusedFile = config.mainClass ? config.mainClass : activeEditorFilePath;
		const isProcessingFile : boolean = focusedFile && focusedFile.endsWith(".pde");

		// Try to use the active .pde file
		if (isProcessingFile) {
			if(!config.relativePath)
				config.relativePath = utility.resolveRelativeFolderFromWorspacePath(focusedFile, folder);
			if(!config.mainClass)
				config.mainClass = utility.resolveProcessingNameFromFileUri(vscode.Uri.file(focusedFile));
		} else {
			vscode.window.showErrorMessage("No active Processing file to debug.");
			return undefined;
		}
		
		console.log("[ProcessingDebug] resolveDebugConfiguration");
		return config;
	}

	// Try to add all missing attributes to the debug configuration being launched.
	public resolveDebugConfigurationWithSubstitutedVariables(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> 
	{
		console.log("[ProcessingDebug] resolveDebugConfigurationWithSubstitutedVariables");

		try {
			// See https://github.com/microsoft/vscode-java-debug/issues/778
			// Merge the platform specific properties to the global config to simplify the subsequent resolving logic.
			console.log("[ProcessingDebug] debugging received:", config);
			this.mergePlatformProperties(config, folder);
			return this.resolveAndValidateDebugConfiguration(folder, config, token);
		} catch (ex) {
			vscode.window.showErrorMessage(String(ex instanceof Error ? ex.message : ex));
			return undefined;
		}
	}

	private mergePlatformProperties(config: DebugConfiguration, _folder?: WorkspaceFolder) 
	{
		if (config && platformName && config[platformName]) {
			try {
				for (const key of Object.keys(config[platformName])) {
					config[key] = config[platformName][key];
				}
				config[platformName] = undefined;
			} catch {
				// do nothing
			}
		}
	}

	private mergeEnvFile(config: DebugConfiguration) 
	{
		const baseEnv = config.env || {};
		let result = baseEnv;
		if (config.envFile) {
			try {
				result = { ...baseEnv, ...this.readEnvFile(config.envFile),	};
			} catch (e) {
				throw new utility.UserError({
					message: "Cannot load environment file.",
					type: utility.LogMsgType.USAGEERROR,
				});
			}
		}
		config.env = result;
	}

	private async resolveAndValidateDebugConfiguration(folder: vscode.WorkspaceFolder | undefined, config: vscode.DebugConfiguration,
													   token?: vscode.CancellationToken) {
		let configCopy: vscode.DebugConfiguration | undefined;
		const isConfigFromInternal = config.__origin === "internal" /** in-memory configuration from debugger */
			|| config.__configurationTarget /** configuration from launch.json */;
		if (config.request === "launch" && isConfigFromInternal) {
			configCopy = _.cloneDeep(config);
			delete configCopy.__progressId;
			delete configCopy.noDebug;
		}

		let sketchName : string = "Java Debug";
		if(folder)
		{
			out.logToOutput("initializing sketch...");
			sketch.initializeSketch(folder.uri.fsPath+config.relativePath);
			sketchName = sketch.getSketchName();
			out.logToOutput("Project name: "+sketchName);
		}
		config.name = sketchName;
		config.className = sketchName;

		let progressReporter = progressProvider.createProgressReporter(utility.launchJobName(config.name, config.noDebug));
		progressReporter.observe(token);
		if (progressReporter.isCancelled())
			return undefined;

		// Clears the terminal so the ressult has better readability...
		vscode.commands.executeCommand("workbench.action.terminal.clear");

		out.logToOutput("Starting Project build...");
		await sketch.prepareSketchInfo();

		// First we need to build the java file using the processing compiler
		let buildSuccess : boolean = await sketch.buildProcessing(undefined, progressReporter);
		if( !buildSuccess )
		{
			progressReporter.done();
			vscode.window.showErrorMessage(`Processing Build Failed`);
			return undefined;
		}

		out.logToOutput("Preprocess Java File Info...");
		await sketch.prepareJavaWorkspaceInfo();
		
		// Once we have the java file we make sure the java extension is being activated so the java ls can run on that
		progressReporter.report("Init Java...");
		out.logToOutput("Ensuring Java Extension activation");
		await commands.ensureJavaExtensionActivation(progressReporter);

		let projectImportSuccess : boolean = await utility.waitForJavaProjectImport();
		if (!projectImportSuccess || progressReporter.isCancelled()) {
			progressReporter.done();
			vscode.window.showErrorMessage("Java Language Server may not be ready. Please try again in a few seconds.");
			return undefined;
		}

		const jhome : string = await utility.getJavaHome();
		out.logToOutput("JavaHome: "+jhome);

		const mainJavaFile = sketch.getMainJavaFile();
		out.logToOutput("Main Java file: " + mainJavaFile);

		let javaUri: vscode.Uri = utility.stringToUri(mainJavaFile);
		if (!javaUri) {
			vscode.window.showErrorMessage("Invalid main Java file URI.");
			progressReporter.done();
			return undefined;
		}
		try {
			progressReporter.report("Resolving Standard mode status...");
			out.logToOutput("Resolving Standard mode status...");
			const isOnStandardMode = await utility.waitForStandardMode(progressReporter);
			if (!isOnStandardMode || progressReporter.isCancelled()) {
				progressReporter.done();
				return undefined;
			}

			const mainClasses = await lsPlugin.resolveMainClass(javaUri);
			let pick : lsPlugin.IMainClassOption | undefined;
			if(mainClasses)
				pick = mainClasses.find(mc => mc.mainClass === sketchName);
			if (pick && pick.projectName)
				config.projectName = pick.projectName;
			else
				config.projectName = lsPlugin.JAVA_DEFAULT_PROJECT_NAME;

			// If no debug configuration is provided, then generate one in memory.
			if (this.isEmptyConfig(config)) {
				config.type = "processing";
				config.name = sketchName;
				config.request = "launch";
			}
			out.logToOutput("Preparing Launch...");
			progressReporter.report("preparing to launch...");
			if (config.request === "launch") {
				config.mainClass = "processing.core.PApplet";

				if (config.__workspaceFolder && config.__workspaceFolder !== folder) {
					folder = config.__workspaceFolder;
				}
				// Update the job name if the main class is changed during the resolving of configuration provider.
				if (configCopy && configCopy.mainClass !== config.mainClass) {
					config.name = config.mainClass.substring(config.mainClass.lastIndexOf(".") + 1);
					progressReporter.setJobName(utility.launchJobName(config.name, config.noDebug));
				}
				if (progressReporter.isCancelled()) {
					progressReporter.done();
					return undefined;
				}

				progressReporter.report("Resolving launch configuration...");
				this.mergeEnvFile(config);
				// If the user doesn't specify 'vmArgs' in launch.json, use the global setting to get the default vmArgs.
				if (config.vmArgs === undefined) {
					const debugSettings: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
					config.vmArgs = debugSettings.get<string>("processing.debug.vmArgs") || "";
				}

				if (typeof config.vmArgs !== "string") {
					config.vmArgs = "";
				}
				if (config.vmArgs.search("-Djava.library.path") < 0) {
					// Remove trailing path separator to avoid "path\" where \" is
					// interpreted as an escaped quote by the Java argfile parser.
					const libPath = sketch.getProcessingJavaLibraries().replace(/[\\/]+$/, "");
					config.vmArgs += ` "-Djava.library.path=${libPath}"`;
				}
				// If the user doesn't specify 'console' in launch.json, use the global setting to get the launch console.
				if (!config.console) {
					const debugSettings: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
					config.console = debugSettings.get<string>("processing.debug.console") || "integratedTerminal";
				}
				// If the console is integratedTerminal, don't auto switch the focus to DEBUG CONSOLE.
				if (config.console === "integratedTerminal" && !config.internalConsoleOptions)
					config.internalConsoleOptions = "neverOpen";

				if (progressReporter.isCancelled())
					return undefined;

				config.env = config.env || {};
				config.env.JAVA_HOME = sketch.getProcessingJavaHome();

				if (_.isEmpty(config.classPaths) && _.isEmpty(config.modulePaths)) {
					config.modulePaths = [];
					config.classPaths = [];
					sketch.fillWithAllClassPaths(config.classPaths);
				} else {
					config.modulePaths = await this.resolvePath(folder, config.modulePaths, config.mainClass, config.projectName, true /*isModulePath*/);
					config.classPaths = await this.resolvePath(folder, config.classPaths, config.mainClass,	config.projectName, false /*isModulePath*/);
				}
				if (_.isEmpty(config.classPaths) && _.isEmpty(config.modulePaths)) {
					throw new utility.UserError({
						message: "Cannot resolve the modulepaths/classpaths automatically, please specify the value in the launch.json.",
						type: utility.LogMsgType.USAGEERROR,
					});
				}

				// Add the default launch options to the config.
				config.javaExec = sketch.getProcessingJavaExecutable();
				config.cwd = sketch.getSketchPath();

				// Inject sourcePaths for stepping into workspace Java sources (e.g., libraries built as JARs)
				this.injectSourcePaths(config, folder);

				// Ensure --sketch-path is set in args, replacing if exists
				if (!Array.isArray(config.args))
					config.args = [];
				if (!Array.isArray(config.processingArgs))
					config.processingArgs = [];

				// Remove any existing --sketch-path argument
				config.args = config.args.filter((arg: any) => typeof arg !== 'string' || !arg.startsWith('--sketch-path='));
				config.args.push(`--sketch-path=${sketch.getSketchPath()}`);
				config.args.push(sketch.getSketchName());
				config.args.push(config.processingArgs);
				config.args = this.concatArgs(config.args);

				if (Array.isArray(config.vmArgs))
					config.vmArgs = this.concatArgs(config.vmArgs);
				
				if (progressReporter.isCancelled())
					return undefined;
				
				// Populate the class filters to the debug configuration.
				await populateStepFilters(config);

				const targetJavaVersion: number = await getJavaVersion(config.javaExec);

				// Add more helpful vmArgs.
				await addMoreHelpfulVMArgs(config, targetJavaVersion);

				if (!config.shortenCommandLine || config.shortenCommandLine === "auto")
					config.shortenCommandLine = await getShortenApproachForCLI(config, targetJavaVersion);
			

				// VS Code internal console uses UTF-8 to display output by default.
				if (config.console === "internalConsole" && !config.encoding) {
					config.encoding = "UTF-8";
				}
			} else if (config.request === "attach") {
				if (config.hostName && config.port && Number.isInteger(Number(config.port))) {
					config.port = Number(config.port);
					config.processId = undefined;
					// Continue if the hostName and port are configured.
				} else if (config.processId !== undefined) {
					// tslint:disable-next-line
					if (config.processId === "${command:PickJavaProcess}") {
						return undefined;
					}

					const pid: number = Number(config.processId);
					if (Number.isNaN(pid)) {
						vscode.window.showErrorMessage(`The processId config '${config.processId}' is not a valid process id.`);
						return undefined;
					}

					const javaProcess = await resolveJavaProcess(pid);
					if (!javaProcess) {
						vscode.window.showErrorMessage(`Attach to process: pid '${config.processId}' is not a debuggable Java process. `
							+ `Please make sure the process has turned on debug mode using vmArgs like `
							+ `'-agentlib:jdwp=transport=dt_socket,server=y,address=5005.'`);
						return undefined;
					}

					config.processId = undefined;
					config.hostName = javaProcess.hostName;
					config.port = javaProcess.debugPort;
				} else {
					throw new utility.UserError({
						message: "Please specify the hostName/port directly, or provide the processId of the remote debuggee in the launch.json.",
						type: utility.LogMsgType.USAGEERROR,
						anchor: anchor.ATTACH_CONFIG_ERROR,
					});
				}

				// Populate the class filters to the debug configuration.
				await populateStepFilters(config);
			} else {
				throw new utility.UserError({
					message: `Request type "${config.request}" is not supported. Only "launch" and "attach" are supported.`,
					type: utility.LogMsgType.USAGEERROR,
					anchor: anchor.REQUEST_TYPE_NOT_SUPPORTED,
				});
			}

			if (token?.isCancellationRequested || progressReporter.isCancelled()) {
				return undefined;
			}

			out.logToOutput("Java executable: " + config.javaExec);
			out.logToOutput("JAVA_HOME: " + config.env?.JAVA_HOME);
			out.logToOutput("Classpaths: " + JSON.stringify(config.classPaths));
			out.logToOutput("Modulepaths: " + JSON.stringify(config.modulePaths));
			out.logToOutput("Working directory: " + config.cwd);

			vscode.commands.executeCommand("workbench.panel.repl.view.focus");

			if (configCopy && config.mainClass) {
				configCopy!.name = config.name;
				configCopy!.mainClass = config.mainClass;
				configCopy!.projectName = config.projectName;
				configCopy!.__workspaceFolder = folder;
				lastUsedLaunchConfig = configCopy;
			}

			progressReporter.done();
			vscode.window.showInformationMessage(`Processing Build Succeeded`);

			delete config.__progressId;
			return config;
		} catch (ex) {
			progressReporter.done();

			if (ex instanceof utility.JavaExtensionNotEnabledError) {
				utility.guideToInstallJavaExtension();
			} else if (ex instanceof utility.UserError) {
				utility.showErrorMessageWithTroubleshooting(ex.context);
			} else {
				const errorMsg = utility.convertErrorToMessage(ex instanceof Error ? ex : new Error(String(ex)));
				vscode.window.showErrorMessage(`Processing Debug Failed: ${errorMsg.message}`);
			}

			return undefined;
		}
	}

	private injectSourcePaths(config: vscode.DebugConfiguration, folder: vscode.WorkspaceFolder | undefined): void {
		try {
			const debugSettings: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
			const enableLookup = debugSettings.get<boolean>("processing.debug.enableLibrarySourceLookup", true);
			if (!enableLookup) {
				return; // feature disabled by user
			}

			// Start from any existing sourcePaths contributed by user/config
			let sourcePaths: string[] = Array.isArray(config.sourcePaths) ? _.clone(config.sourcePaths) : [];

			// Common Java source roots to probe in each workspace folder
			const commonRoots = [
				"src/main/java",
				"src/test/java",
				"src",
				"test",
				"source",
				"sources"
			];

			const workspaceFolders = vscode.workspace.workspaceFolders || [];
			for (const wf of workspaceFolders) {
				for (const rel of commonRoots) {
					const abs = path.join(wf.uri.fsPath, rel);
					if (this.isExistingDirectory(abs)) {
						sourcePaths.push(vscode.Uri.file(abs).fsPath);
					}
				}
			}

			// Include any user-specified additional source paths (absolute or workspace-relative)
			const additional = debugSettings.get<string[]>("processing.debug.additionalSourcePaths", []) || [];
			for (const p of additional) {
				if (!p || typeof p !== "string") { continue; }
				let abs = p;
				if (!path.isAbsolute(abs)) {
					const base = folder?.uri.fsPath || workspaceFolders[0]?.uri.fsPath;
					if (base) {
						abs = path.join(base, p);
					}
				}
				if (this.isExistingDirectory(abs)) {
					sourcePaths.push(vscode.Uri.file(abs).fsPath);
				}
			}

			// De-duplicate and assign if we have anything meaningful
			sourcePaths = _.uniq(sourcePaths);
			if (sourcePaths.length > 0) {
				config.sourcePaths = sourcePaths;
				out.logToOutput("Source lookup paths: " + JSON.stringify(sourcePaths));
			}
		} catch (e) {
			// Don't fail the launch if source path detection errs; just log it.
			out.logToOutput("Source lookup injection failed: " + String((e && (e as any).message) || e));
		}
	}

	private isExistingDirectory(p: string): boolean {
		try {
			return fs.existsSync(p) && fs.statSync(p).isDirectory();
		} catch {
			return false;
		}
	}

	private async resolvePath(folder: vscode.WorkspaceFolder | undefined, pathArray: string[], mainClass: string,
							  projectName: string, isModulePath: boolean): Promise<string[]> {
		if (_.isEmpty(pathArray)) {
			return [];
		}

		const pathVariables: string[] = [ClasspathVariable.Auto, ClasspathVariable.Runtime, ClasspathVariable.Test];
		const containedVariables: string[] = pathArray.filter((cp: string) => pathVariables.includes(cp));
		if (_.isEmpty(containedVariables)) {
			return this.filterExcluded(folder, pathArray);
		}

		const scope: string | undefined = this.mergeScope(containedVariables);
		const response: any[] = <any[]> await lsPlugin.resolveClasspath(mainClass, projectName, scope);
		const resolvedPaths: string[] = isModulePath ? response?.[0] : response?.[1];
		if (!resolvedPaths) {
			// tslint:disable-next-line:no-console
			console.log("The Java Language Server failed to resolve the classpaths/modulepaths");
		}
		const paths: string[] = [];
		let replaced: boolean = false;
		for (const p of pathArray) {
			if (pathVariables.includes(p)) {
				if (!replaced) {
					paths.push(...resolvedPaths);
					replaced = true;
				}
				continue;
			}
			paths.push(p);
		}
		return this.filterExcluded(folder, paths);
	}

	private async filterExcluded(folder: vscode.WorkspaceFolder | undefined, paths: string[]): Promise<string[]> {
		const result: string[] = [];
		const excludes: Map<string, boolean> = new Map<string, boolean>();
		for (const p of paths) {
			if (p.startsWith("!")) {
				let exclude = p.substr(1);
				if (!path.isAbsolute(exclude)) {
					exclude = path.join(folder?.uri.fsPath || "", exclude);
				}
				// use Uri to normalize the fs path
				excludes.set(vscode.Uri.file(exclude).fsPath, this.isFilePath(exclude));
				continue;
			}

			result.push(vscode.Uri.file(p).fsPath);
		}

		return result.filter((r) => {
			for (const [excludedPath, isFile] of excludes.entries()) 
			{
				if (isFile && r === excludedPath)
					return false;

				if (!isFile && r.startsWith(excludedPath))
					return false;
			}

			return true;
		});
	}

	private mergeScope(scopes: string[]): string | undefined 
	{
		if (scopes.includes(ClasspathVariable.Test))
			return "test";
		if (scopes.includes(ClasspathVariable.Auto))
			return undefined;
		if (scopes.includes(ClasspathVariable.Runtime))
			return "runtime";
		return undefined;
	}

	/**
	 * Converts an array of arguments to a string as the args and vmArgs.
	 */
	private concatArgs(args: any[]): string {
		return _.join(_.map(args, (arg: any): string => {
			const str = String(arg);
			// if it has quotes or spaces, use double quotes to wrap it
			if (/["\s]/.test(str)) {
				return "\"" + str.replace(/(["\\])/g, "\\$1") + "\"";
			}
			return str;

			// if it has only single quotes
		}), " ");
	}

	/**
	 * When VS Code cannot find any available DebugConfiguration, it passes a { noDebug?: boolean } to resolve.
	 * This function judges whether a DebugConfiguration is empty by filtering out the field "noDebug".
	 */
	private isEmptyConfig(config: vscode.DebugConfiguration): boolean {
		return Object.keys(config).filter((key: string) => key !== "noDebug").length === 0;
	}

	private isFilePath(filePath: string): boolean 
	{
		if (!filePath)
			return false;

		try {
			return fs.lstatSync(filePath).isFile();
		} catch (error) {
			// do nothing
			return false;
		}
	}
	
	// from vscode-js-debug https://github.com/microsoft/vscode-js-debug/blob/master/src/targets/node/nodeLauncherBase.ts
	private readEnvFile(file: string): { [key: string]: string } 
	{
		if (!fs.existsSync(file)) 
			return {};
		
		const fc = fs.readFileSync(file, "utf8");
		const buffer = (fc && fc[0] === "\uFEFF") ? fc.slice(1) : fc;
		const env = dotenv.parse(Buffer.from(buffer));
		return env;
	}
}

