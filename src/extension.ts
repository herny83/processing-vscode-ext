import * as vscode from 'vscode';
import * as clientModule from '../client/src/extension';
import * as debuggerModule from '../debugger/src/extension';

export async function activate(context: vscode.ExtensionContext)
{
	// Activate the language client (language server, auto-detect, export)
	await clientModule.activate(context);

	// Activate the debugger (debug providers, run/debug commands, code lens)
	try
	{
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
