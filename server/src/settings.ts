import * as fs from 'fs';
import * as path from 'path';
import * as server from './server'
import * as parseUtils from './astutils'
import * as lsp from 'vscode-languageserver'

let cachedSettings: any = {};
let settingsFile: string;
let settingsDir: string;
let vscodeWatcher: fs.FSWatcher | undefined;
let parentWatcher: fs.FSWatcher | undefined;

export function getLastCached()
{
	return cachedSettings;
}

export function initialize(projectPath: string)
{
	if (!projectPath || !fs.existsSync(projectPath))
		return;

	settingsDir = path.join(projectPath, '.vscode');
	settingsFile = path.join(settingsDir, 'settings.json');

	// Always read once at startup
	readAndCacheSettings();

	// Watch parent directory for .vscode creation/deletion
	parentWatcher = fs.watch(projectPath, onProjectFolderContentChanged);

	// If .vscode already exists, start watcher
	if (fs.existsSync(settingsDir)) {
		startVscodeWatcher(settingsDir);
	}
}

function startVscodeWatcher(settingsDir: string) {
	vscodeWatcher = fs.watch(settingsDir, onVsCodeFolderContentChanged);
}

function onProjectFolderContentChanged(eventType : fs.WatchEventType, filename: string)
{
	if (filename === '.vscode') {
		if (fs.existsSync(settingsDir) && !vscodeWatcher) {
			// .vscode created
			startVscodeWatcher(settingsDir);
		} else if (!fs.existsSync(settingsDir) && vscodeWatcher) {
			// .vscode deleted
			vscodeWatcher.close();
			vscodeWatcher = undefined;
			cachedSettings = {};
		}
	}
}

function onVsCodeFolderContentChanged(eventType : fs.WatchEventType, filename: string)
{
	if (filename === 'settings.json')
		readAndCacheSettings();
}

export function dispose()
{
	if (vscodeWatcher)
	{
		vscodeWatcher.close();
		vscodeWatcher = undefined;
	}
	if (parentWatcher)
	{
		parentWatcher.close();
		parentWatcher = undefined;
	}
}

function readAndCacheSettings()
{
	const settingsFileUri = parseUtils.getUriFromPath(settingsFile);
	if (fs.existsSync(settingsFile)) 
	{
		try {
			const content = fs.readFileSync(settingsFile, 'utf8');
			cachedSettings = JSON.parse(content);
			server.connection.sendDiagnostics({uri: settingsFileUri, diagnostics: []});
		} catch (e) {
			let diagnostic: lsp.Diagnostic = {
						severity: lsp.DiagnosticSeverity.Error,
						range: lsp.Range.create(0, 1, 0, 1), // Placeholder range
						message: e.message,
						source: e.name
				   };
			server.connection.sendDiagnostics({uri: settingsFileUri, diagnostics: [diagnostic]});
			cachedSettings = {};
		}
	} else {
		server.connection.sendDiagnostics({uri: settingsFileUri, diagnostics: []});
		cachedSettings = {};
	}
}