// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

//import * as compareVersions from "compare-versions";
import * as path from "path";
import * as utils from "./utility";
import * as _ from "lodash";
import * as vscode from "vscode";
import * as out from "./outputChannel";
import { BreakpointTrackerFactory } from "./BreakpointTracker";
import { DebugCodeLensContainer } from "./debugCodeLensProvider";
import { ProcessingJavaDebugConfigProvider } from "./JavaConfigurationProvider";
import { ProcessingDebugConfigurationProvider } from "./ProcessingConfigurationProvider";
import { ProcessingInlineValuesProvider } from "./ProcessingInlineValueProvider";
import { ProcessingDebugAdapterDescriptorFactory } from "./ProcessingDebugAdapterDescriptorFactory";
import { initializeHotCodeReplace } from "./hotCodeReplace";

export async function activate(context: vscode.ExtensionContext): Promise<any> {
	out.activate();
	return initializeExtension(context);
}

function initializeExtension(context: vscode.ExtensionContext): any 
{
	ensureWorkspaceSetup();

	// Register Processing debug configuration provider
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider("processing", new ProcessingDebugConfigurationProvider()));
	// Register Java debug configuration provider
	context.subscriptions.push(vscode.debug.registerDebugConfigurationProvider("java", new ProcessingJavaDebugConfigProvider()));

	// Register Processing debug adapter descriptor factory
	context.subscriptions.push(vscode.debug.registerDebugAdapterDescriptorFactory("processing", new ProcessingDebugAdapterDescriptorFactory()));
	// Register the BreakpointTracker to intercept debug messages
	context.subscriptions.push(vscode.debug.registerDebugAdapterTrackerFactory("processing", new BreakpointTrackerFactory()));

	// Register Processing commands
	context.subscriptions.push(vscode.commands.registerCommand("processing.debug.runPdeFile", runPdeFile));
	context.subscriptions.push(vscode.commands.registerCommand("processing.debug.debugPdeFile", debugPdeFile));

	// Initialize hot code replace support
	initializeHotCodeReplace(context);

	// Register Processing inline values provider
	context.subscriptions.push(vscode.languages.registerInlineValuesProvider({ language: "processing", scheme: "file" }, new ProcessingInlineValuesProvider()));
	// Also provide inline values when stopped inside Java sources (helps when stepping into workspace/library code)
	context.subscriptions.push(vscode.languages.registerInlineValuesProvider({ language: "java", scheme: "file" }, new ProcessingInlineValuesProvider()));

	context.subscriptions.push(new DebugCodeLensContainer());
	
	// Register commands for thread operations
	context.subscriptions.push(vscode.commands.registerCommand("java.debug.continueAll", continueAll));
	context.subscriptions.push(vscode.commands.registerCommand("java.debug.continueOthers", continueOthers));
	context.subscriptions.push(vscode.commands.registerCommand("java.debug.pauseAll", pauseAll));
	context.subscriptions.push(vscode.commands.registerCommand("java.debug.pauseOthers", pauseOthers));

	console.log("[ProcessingDebug] Extension activated");
	return {};
}

// this method is called when your extension is deactivated
export async function deactivate() {
	out.deactivate();
}

async function runPdeFile(uri: vscode.Uri) 
{
	uri = validatePdeFilePath(uri);
	// Directly launch the Processing debugger for the .pde file
	console.log(`[ProcessingDebug] Running PDE file: ${uri.fsPath}`);
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
	const debugConfig: vscode.DebugConfiguration = {
		type: "processing",
		name: "Run Processing Sketch From File",
		request: "launch",
		mainClass: uri.fsPath,
		noDebug: true
	};
	await vscode.debug.startDebugging(workspaceFolder, debugConfig);
}

async function debugPdeFile(uri: vscode.Uri) 
{
	uri = validatePdeFilePath(uri);
	console.log(`[ProcessingDebug] Debugging PDE file: ${uri.fsPath}`);
	const workspaceFolder = vscode.workspace.getWorkspaceFolder(uri);
	const debugConfig: vscode.DebugConfiguration = {
		type: "processing",
		name: "Debug Processing Sketch From File",
		request: "launch",
		mainClass: uri.fsPath,
		noDebug: false
	};
	await vscode.debug.startDebugging(workspaceFolder, debugConfig);
}

function validatePdeFilePath(uri: vscode.Uri): vscode.Uri
{
	let uriPath : string = "";
	if (typeof uri === "string")
		uriPath = uri;
	else
		uriPath = uri.fsPath;
	
	// Directly launch the Processing debugger for the .pde file
	if(path.isAbsolute(uriPath)==false)
	{
		for(const folder of vscode.workspace.workspaceFolders || [] )
		{
			const possiblePath = path.join(folder.uri.fsPath, uriPath);
			if(utils.isPathValid(possiblePath))
			{
				uri = vscode.Uri.file(possiblePath);
				break;
			}
		}
	}
	return uri;
}

function ensureWorkspaceSetup() 
{
	const currentWorkspaceConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
	const outputPath = currentWorkspaceConfig.get("processing.outputPath");
	if (!outputPath) {
		currentWorkspaceConfig.update("processing.outputPath", "./out/", vscode.ConfigurationTarget.Workspace);
	}
}

async function pauseOthers(threadId: any): Promise<void>
{
	await operateThread("pauseOthers", threadId);
}

async function pauseAll(threadId: any): Promise<void>
{
	await operateThread("pauseAll", threadId);
}

async function continueOthers(threadId: any): Promise<void>
{
	await operateThread("continueOthers", threadId);
}

async function continueAll(threadId: any): Promise<void>
{
	await operateThread("continueAll", threadId);
}

async function operateThread(request: string, threadId: any): Promise<void> 
{
	const debugSession: vscode.DebugSession | undefined = vscode.debug.activeDebugSession;
	if (!debugSession)
		return;
	if (debugSession.configuration.noDebug)
		return;
	await debugSession.customRequest(request, { threadId });
}
