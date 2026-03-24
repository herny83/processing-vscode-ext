import * as path from 'path';
import * as fs from 'fs';
import * as vscode from 'vscode';
import * as childProcess from 'child_process';
import * as deploy from "./deployCommand";

import {
	LanguageClient,
	LanguageClientOptions,
	ServerOptions,
	TransportKind,
	WorkDoneProgress
} from 'vscode-languageclient/node';

let client: LanguageClient;
let currentSketchPath: string | undefined;
let currentProcessingPath: string | undefined;
let currentProcessingVersion: string | undefined;

export function getProcessingVersion(): string | undefined
{
	return currentProcessingVersion;
}

export function getProcessingPath(): string | undefined
{
	return currentProcessingPath;
}

/** macOS always has Processing at /Applications/ */
const MACOS_PROCESSING_PATH = '/Applications/';

/**
 * Resolves the Processing installation path.
 * On macOS this is always /Applications/ (Processing.app lives there).
 * On Windows/Linux, reads from the processing.path setting.
 */
function resolveProcessingPath(): string
{
	if (process.platform === 'darwin')
	{
		if (isValidProcessingInstallation(MACOS_PROCESSING_PATH))
			return MACOS_PROCESSING_PATH;
		// Not installed — will trigger the prompt
		return '';
	}
	const config = vscode.workspace.getConfiguration();
	return config.get('processing.path', '');
}

/**
 * Returns the processing CLI executable name based on version.
 * 4.5+ renamed processing-java to processing.
 */
export function getProcessingExecutableName(version?: string): string
{
	const isNewNaming = version && compareVersions(version, '4.5.0') >= 0;
	if (process.platform === 'win32')
		return isNewNaming ? 'processing.exe' : 'processing-java.exe';
	else
		return isNewNaming ? 'processing' : 'processing-java';
}

function compareVersions(a: string, b: string): number
{
	const partsA = a.split('.').map(Number);
	const partsB = b.split('.').map(Number);
	const len = Math.max(partsA.length, partsB.length);
	for (let i = 0; i < len; i++)
	{
		const numA = partsA[i] || 0;
		const numB = partsB[i] || 0;
		if (numA !== numB)
			return numA - numB;
	}
	return 0;
}

export function activate(context: vscode.ExtensionContext)
{
	console.log("Processing Client activation");
	let serverModule = context.asAbsolutePath( path.join('server', 'out', 'server.js') );
	
	let debugOptions = { execArgv: ['--nolazy', '--inspect=6009'] }; // '--inspect-brk=6009'] };

	let serverOptions: ServerOptions = {
		run: { module: serverModule, transport: TransportKind.ipc },
		debug: {
			module: serverModule,
			transport: TransportKind.ipc,
			options: debugOptions
		}
	};

	currentProcessingPath = resolveProcessingPath();
	console.log(`Processing path: ${currentProcessingPath}`);

	if (!currentProcessingPath || currentProcessingPath.trim() === '')
	{
		promptForProcessingPath();
	}
	else
	{
		currentProcessingVersion = detectProcessingVersion(currentProcessingPath);
		if (currentProcessingVersion)
			console.log(`Processing version: ${currentProcessingVersion}`);
	}
	
	let clientOptions: LanguageClientOptions = {
		documentSelector: [{ scheme: 'file', language: 'processing' }],
		progressOnInitialization: true,
		initializationOptions: {
			processingPath: currentProcessingPath,
			processingVersion: currentProcessingVersion,
		},
		synchronize: {}
	};

	client = new LanguageClient('pdeLanguageServer', 'Processing Language Server', serverOptions, clientOptions);

	let referenceDisposable = vscode.commands.registerCommand('processing.command.findReferences', (...args: any[]) => {
		vscode.commands.executeCommand('editor.action.findReferences', vscode.Uri.file(args[0].uri.substring(7,args[0].uri.length)), new vscode.Position(args[0].lineNumber,args[0].column));
	})

	let reloadDisposable = vscode.commands.registerCommand('processing.reloadSketch', reloadSketch);
	let exportDisposable = vscode.commands.registerCommand('processing.exportSketch', exportSketch);

	context.subscriptions.push(reloadDisposable);
	context.subscriptions.push(referenceDisposable);
	context.subscriptions.push(exportDisposable);

	client.start();

	// Show a progress notification during initial setup
	vscode.window.withProgress(
		{
			location: vscode.ProgressLocation.Notification,
			title: "Processing",
			cancellable: false,
		},
		(progress) =>
		{
			let lastPercentage = 0;
			return new Promise<void>((resolve) =>
			{
				client.onProgress(WorkDoneProgress.type, "lsp-init-token", (params) =>
				{
					switch (params.kind)
					{
						case "begin":
							progress.report({ message: params.message || "Initializing..." });
							break;
						case "report":
						{
							const pct = params.percentage || 0;
							const increment = pct - lastPercentage;
							lastPercentage = pct;
							progress.report({ message: params.message, increment });
							break;
						}
						case "end":
						{
							const increment = 100 - lastPercentage;
							progress.report({ message: params.message || "Ready", increment });
							resolve();
							break;
						}
					}
				});
			});
		}
	);
}


export function deactivate(): Thenable<void> | undefined 
{
	console.log("deactivating extension");
	if (!client)
		return undefined;
	
	return client.stop();
}

async function reloadSketch()
{
	vscode.window.showInformationMessage('Reloading Processing Sketch...');
	if (client)
		client.sendNotification('processing/reloadSketch');
}

async function exportSketch(uri?: vscode.Uri)
{
	if(uri)
	{
		uri = validatePdeFilePath(uri);
		const filePath = getPathFromUri(uri.fsPath); // Get the file path
    	const sketchPath = path.dirname(filePath); // Get the folder containing the file
		const validSketchPath =  sketchPath && sketchPath.trim() !== '';

		const currentWorkspaceConfig: vscode.WorkspaceConfiguration = vscode.workspace.getConfiguration();
		let outputPath = currentWorkspaceConfig.get("processing.outputPath") as string | undefined;
		if(!outputPath || outputPath.trim() === '')
			outputPath = "./out/";

		const validProcessing = validateProcessingPath();
		if(validSketchPath && validProcessing)
		{
			if(!currentProcessingVersion)
				currentProcessingVersion = detectProcessingVersion(currentProcessingPath);

			deploy.exportSketch(currentProcessingPath, sketchPath, outputPath, currentProcessingVersion);
		}
		else
		{
			vscode.window.showErrorMessage('Error exporting Processing Sketch...', );
		}
	}
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
			if(isPathValid(possiblePath))
			{
				uri = vscode.Uri.file(possiblePath);
				break;
			}
		}
	}
	return uri;
}

export function isPathValid(directoryPath: string): boolean 
{
	try {
	  const stat = fs.statSync(directoryPath);
	  return stat != null;
	} catch (error) {
	  // If an error occurs, it means the directory doesn't exist or there was an issue accessing it.
	  return false;
	}
}

function getPathFromUri(uri : string) : string 
{
	let path = uri;
	if(process.platform=='darwin')
		path = path.replace('file://', '');
	else // win
		path = path.replace('file:///', '');
	path =  path.replace('%3A', ':');

	return path;
}

function validateProcessingPath() : boolean
{
	if (!currentProcessingPath || currentProcessingPath.trim() === '')
	{
		promptForProcessingPath();
		return false;
	}
	return true;
}

function detectProcessingPath(): string | undefined
{
	// Step 1: Check PATH for processing/processing-java executable
	const pathResult = detectFromPath();
	if (pathResult)
		return pathResult;

	// Step 2: Check common installation directories
	const candidates: string[] = [];

	if (process.platform === 'win32')
	{
		const programFiles = process.env['ProgramFiles'] || 'C:\\Program Files';
		const programFilesX86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)';
		const localAppData = process.env['LOCALAPPDATA'] || '';
		const userProfile = process.env['USERPROFILE'] || '';

		// Newest versions first
		for (const base of [programFiles, programFilesX86])
		{
			candidates.push(
				path.join(base, 'processing-4.5.2'),
				path.join(base, 'processing-4.5.1'),
				path.join(base, 'processing-4.5'),
				path.join(base, 'processing-4.4'),
				path.join(base, 'processing-4.3'),
				path.join(base, 'processing-4.2'),
				path.join(base, 'processing-4.1'),
				path.join(base, 'processing-4.0'),
				path.join(base, 'Processing'),
			);
		}
		if (localAppData)
			candidates.push(path.join(localAppData, 'Programs', 'Processing'));
		if (userProfile)
		{
			candidates.push(
				path.join(userProfile, 'Processing'),
				path.join(userProfile, 'Desktop', 'processing-4.5.2'),
				path.join(userProfile, 'Desktop', 'processing-4.5.1'),
				path.join(userProfile, 'Desktop', 'processing-4.5'),
				path.join(userProfile, 'Desktop', 'processing-4.3'),
			);
		}
	}
	else
	{
		const home = process.env['HOME'] || '';
		candidates.push(
			'/usr/local/lib/processing',
			'/opt/processing',
			path.join(home, 'processing-4.5.2'),
			path.join(home, 'processing-4.5.1'),
			path.join(home, 'processing-4.5'),
			path.join(home, 'processing-4.4'),
			path.join(home, 'processing-4.3'),
			path.join(home, 'processing-4.2'),
			path.join(home, 'processing-4.1'),
			path.join(home, 'processing-4.0'),
		);
	}

	for (const candidate of candidates)
	{
		if (isValidProcessingInstallation(candidate))
			return ensureTrailingSlash(candidate);
	}
	return undefined;
}

function detectFromPath(): string | undefined
{
	const names = process.platform === 'win32'
		? ['processing.exe', 'processing-java.exe']
		: ['processing', 'processing-java'];

	for (const name of names)
	{
		try
		{
			const cmd = process.platform === 'win32' ? `where ${name}` : `which ${name}`;
			const result = childProcess.execSync(cmd, { encoding: 'utf8', timeout: 5000 }).trim();
			if (result)
			{
				const execDir = path.dirname(result.split('\n')[0].trim());
				if (isValidProcessingInstallation(execDir))
					return ensureTrailingSlash(execDir);
			}
		}
		catch (e)
		{
			// Not found in PATH
		}
	}
	return undefined;
}

function isValidProcessingInstallation(dirPath: string): boolean
{
	if (!isPathValid(dirPath))
		return false;

	// Check all known core/library locations across platforms and versions.
	// Adding a new layout only requires appending a candidate here.
	const candidates = [
		path.join(dirPath, 'core', 'library'),
		path.join(dirPath, 'app', 'resources', 'core', 'library'),
		path.join(dirPath, 'Processing.app', 'Contents', 'Java', 'core', 'library'),
		path.join(dirPath, 'Processing.app', 'Contents', 'Resources', 'core', 'library'),
	];
	return candidates.some(c => isPathValid(c));
}

function ensureTrailingSlash(p: string): string
{
	if (p.endsWith(path.sep) || p.endsWith('/'))
		return p;
	return p + path.sep;
}

function detectProcessingVersion(processingPath: string): string | undefined
{
	if (!processingPath)
		return undefined;

	const cleanPath = processingPath.replace(/[\\/]+$/, '');
	// Try app/.jpackage.xml (Processing 4.5+)
	const jpackageFile = path.join(cleanPath, 'app', '.jpackage.xml');
	if (isPathValid(jpackageFile))
	{
		try
		{
			const xml = fs.readFileSync(jpackageFile, 'utf8');
			const match = xml.match(/<app-version>([^<]+)<\/app-version>/i);
			if (match && match[1])
				return match[1].trim();
		}
		catch (e) { /* ignore */ }
	}

	// Try revision.txt (Processing 4.x includes this)
	const revisionFile = path.join(cleanPath, 'revision.txt');
	if (isPathValid(revisionFile))
	{
		try
		{
			const content = fs.readFileSync(revisionFile, 'utf8').trim();
			if (content)
				return content;
		}
		catch (e) { /* ignore */ }
	}

	// Try lib/version.txt
	const versionFile = path.join(cleanPath, 'lib', 'version.txt');
	if (isPathValid(versionFile))
	{
		try
		{
			const content = fs.readFileSync(versionFile, 'utf8').trim();
			if (content)
				return content;
		}
		catch (e) { /* ignore */ }
	}

	// Fallback: parse folder name (e.g., "processing-4.3" → "4.3")
	const folderName = path.basename(cleanPath);
	const match = folderName.match(/processing[- ]?(\d+\.\d+(?:\.\d+)?)/i);
	if (match)
		return match[1];

	return undefined;
}

async function applyProcessingPath(detectedPath: string)
{
	currentProcessingPath = detectedPath;
	currentProcessingVersion = detectProcessingVersion(detectedPath);
	await vscode.workspace.getConfiguration().update('processing.path', detectedPath, vscode.ConfigurationTarget.Global);

	let msg = `Processing found at: ${detectedPath}`;
	if (currentProcessingVersion)
		msg += ` (v${currentProcessingVersion})`;
	vscode.window.showInformationMessage(msg);

	if (client)
		client.sendNotification('processing/reloadSketch');
}

async function browseForProcessingPath()
{
	const result = await vscode.window.showOpenDialog({
		canSelectFiles: false,
		canSelectFolders: true,
		canSelectMany: false,
		openLabel: 'Select Processing Installation Folder',
		title: 'Locate your Processing installation directory'
	});
	if (result && result.length > 0)
	{
		const selected = ensureTrailingSlash(result[0].fsPath);
		if (isValidProcessingInstallation(result[0].fsPath))
			await applyProcessingPath(selected);
		else
			vscode.window.showErrorMessage(`"${selected}" does not appear to be a valid Processing installation (missing core/library/).`);
	}
}

async function promptForProcessingPath()
{
	if (process.platform === 'darwin')
	{
		vscode.window.showErrorMessage(
			'Processing does not appear to be installed. Please install Processing into /Applications/ to enable language features.'
		);
		return;
	}

	const autoDetect = 'Auto-Detect';
	const browse = 'Browse...';
	const manual = 'Configure Manually';
	const msg = 'Processing path is not configured. Set the path to your Processing installation to enable language features.';

	const selection = await vscode.window.showInformationMessage(msg, autoDetect, browse, manual);

	if (selection === autoDetect)
	{
		const detected = detectProcessingPath();
		if (detected)
		{
			await applyProcessingPath(detected);
		}
		else
		{
			const browseBtn = 'Browse...';
			const manualBtn = 'Configure Manually';
			const fallback = await vscode.window.showWarningMessage(
				'Could not auto-detect Processing installation.',
				browseBtn, manualBtn
			);
			if (fallback === browseBtn)
				await browseForProcessingPath();
			else if (fallback === manualBtn)
				vscode.commands.executeCommand('workbench.action.openSettings', 'processing.path');
		}
	}
	else if (selection === browse)
	{
		await browseForProcessingPath();
	}
	else if (selection === manual)
	{
		vscode.commands.executeCommand('workbench.action.openSettings', 'processing.path');
	}
}
