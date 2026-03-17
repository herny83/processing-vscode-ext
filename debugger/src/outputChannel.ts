import * as vscode from 'vscode';

// Declare a global variable for your output channel
let outputChannel: vscode.OutputChannel;

export function activate() {
    // Create the output channel when your extension activates
    outputChannel = vscode.window.createOutputChannel('Processing Debugger');
}

// Function to log messages to the output channel
export function logToOutput(message: string) {
    if (outputChannel) {
        outputChannel.appendLine(`[${new Date().toLocaleTimeString()}] ${message}`);
    }
}

export function deactivate() {
    if (outputChannel) {
        outputChannel.dispose();
    }
}