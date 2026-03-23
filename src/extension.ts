import * as vscode from 'vscode';

let clientModule: any;
let debuggerModule: any;

export async function activate(context: vscode.ExtensionContext)
{
	// Activate the language client (language server, auto-detect, export)
	clientModule = require('../client/out/extension');
	await clientModule.activate(context);

	// Activate the debugger (debug providers, run/debug commands, code lens)
	try
	{
		debuggerModule = require('../debugger/out/extension');
		await debuggerModule.activate(context);
	}
	catch (err)
	{
		console.error("[Processing] Failed to activate debugger module:", err);
	}
}

export function deactivate(): Thenable<void> | undefined
{
	if (debuggerModule?.deactivate)
		debuggerModule.deactivate();

	if (clientModule?.deactivate)
		return clientModule.deactivate();

	return undefined;
}
