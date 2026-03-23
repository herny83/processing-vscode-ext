// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as _ from "lodash";
import * as vscode from "vscode";

const PROCESSING_LANGID = "processing";
const PROCESSING_RUN_CODELENS_COMMAND = "processing.debug.runCodeLens";
const PROCESSING_DEBUG_CODELENS_COMMAND = "processing.debug.debugCodeLens";
const PROCESSING_HOVER_RUN_COMMAND = "processing.debug.runHover";
const PROCESSING_DEBUG_CONFIGURATION = "processing.debug.settings";
const ENABLE_CODE_LENS_VARIABLE = "enableRunDebugCodeLens";

export function initializeCodeLensProvider(context: vscode.ExtensionContext): void {
    context.subscriptions.push(new DebugCodeLensContainer());
}

export class DebugCodeLensContainer implements vscode.Disposable {
    private runCommand: vscode.Disposable;
    private debugCommand: vscode.Disposable;
    private lensProvider: vscode.Disposable | undefined;
    private hoverProvider: vscode.Disposable | undefined;
    private configurationEvent: vscode.Disposable;

    constructor() {
        this.runCommand = vscode.commands.registerCommand(PROCESSING_RUN_CODELENS_COMMAND, runProcessingProgram);
        this.debugCommand = vscode.commands.registerCommand(PROCESSING_DEBUG_CODELENS_COMMAND, debugProcessingProgram);

        const configuration = vscode.workspace.getConfiguration(PROCESSING_DEBUG_CONFIGURATION);
        const isCodeLensEnabled = configuration.get<boolean>(ENABLE_CODE_LENS_VARIABLE);

        if (isCodeLensEnabled) {
            this.lensProvider = vscode.languages.registerCodeLensProvider(
                { language: PROCESSING_LANGID, scheme: "file" }, // <-- add scheme
                new DebugCodeLensProvider()
            );
        } else {
            this.hoverProvider = new ProcessingHoverProvider();
        }

        this.configurationEvent = vscode.workspace.onDidChangeConfiguration((event: vscode.ConfigurationChangeEvent) =>  {
            if (event.affectsConfiguration(PROCESSING_DEBUG_CONFIGURATION)) {
                const newConfiguration = vscode.workspace.getConfiguration(PROCESSING_DEBUG_CONFIGURATION);
                const newEnabled = newConfiguration.get<boolean>(ENABLE_CODE_LENS_VARIABLE);
                if (newEnabled && this.lensProvider === undefined) {
                    this.lensProvider = vscode.languages.registerCodeLensProvider(
                        { language: PROCESSING_LANGID, scheme: "file" }, // <-- add scheme
                        new DebugCodeLensProvider()
                    );
                } else if (!newEnabled && this.lensProvider !== undefined) {
                    this.lensProvider.dispose();
                    this.lensProvider = undefined;
                }

                if (newEnabled && this.hoverProvider) {
                    this.hoverProvider.dispose();
                    this.hoverProvider = undefined;
                } else if (!newEnabled && !this.hoverProvider) {
                    this.hoverProvider = new ProcessingHoverProvider();
                }
            }
        }, this);
    }

    public dispose() 
    {
        if (this.lensProvider !== undefined)
            this.lensProvider.dispose();
    
        if (this.hoverProvider)
            this.hoverProvider.dispose();
    
        this.runCommand.dispose();
        this.debugCommand.dispose();
        this.configurationEvent.dispose();
    }
}

class DebugCodeLensProvider implements vscode.CodeLensProvider
{
    public provideCodeLenses(document: vscode.TextDocument, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.CodeLens[]> 
    {
        // Find Processing entry points (setup/draw)
        const codeLenses: vscode.CodeLens[] = [];
        for (let i = 0; i < document.lineCount; i++) {
            const line = document.lineAt(i);
            if (line.text.match(/void\s+(setup|draw)\s*\(/)) {
                codeLenses.push(new vscode.CodeLens(line.range, {
                    title: "Run",
                    command: PROCESSING_RUN_CODELENS_COMMAND,
                    tooltip: "Run Processing Sketch",
                    arguments: [line.text.trim(), document.uri],
                }));
                codeLenses.push(new vscode.CodeLens(line.range, {
                    title: "Debug",
                    command: PROCESSING_DEBUG_CODELENS_COMMAND,
                    tooltip: "Debug CodeLens Processing Sketch",
                    arguments: [line.text.trim(), document.uri],
                }));
            }
        }
        return codeLenses;
    }
}

function runProcessingProgram(entryPoint: string, uri: vscode.Uri): Promise<boolean> {
    return startDebugging(entryPoint, uri, true);
}

function debugProcessingProgram(entryPoint: string, uri: vscode.Uri): Promise<boolean> {
    return startDebugging(entryPoint, uri, false);
}

export async function startDebugging(entryPoint: string, uri: vscode.Uri, noDebug: boolean): Promise<boolean> {
    const workspaceFolder: vscode.WorkspaceFolder | undefined = vscode.workspace.getWorkspaceFolder(uri);
    const debugConfig: vscode.DebugConfiguration = {
        type: "processing",
        name: `Debug Processing Sketch (${entryPoint})`,
        request: "launch",
        mainClass: uri.fsPath,
        entryPoint,
        noDebug,
    };
    return vscode.debug.startDebugging(workspaceFolder, debugConfig);
}


class ProcessingHoverProvider implements vscode.Disposable {
    private runHoverCommand: vscode.Disposable;
    private hoverProvider: vscode.Disposable | undefined;

    constructor() {
        this.runHoverCommand = vscode.commands.registerCommand(PROCESSING_HOVER_RUN_COMMAND, async (noDebug: boolean, uri: string, _position: any) => {
            const workspaceFolder = vscode.Uri.parse(uri);
            // Start debugging for Processing sketch
            vscode.commands.executeCommand("processing.debug.runPdeFile", workspaceFolder, noDebug);
        });
        this.hoverProvider = vscode.languages.registerHoverProvider(
            { language: "processing", scheme: "file" },
            new InternalProcessingHoverProvider()
        );
    }

    public dispose() {
        if (this.runHoverCommand) {
            this.runHoverCommand.dispose();
        }
        if (this.hoverProvider) {
            this.hoverProvider.dispose();
        }
    }
}

class InternalProcessingHoverProvider implements vscode.HoverProvider {
    public provideHover(document: vscode.TextDocument, position: vscode.Position, _token: vscode.CancellationToken): vscode.ProviderResult<vscode.Hover> {
        const range = document.getWordRangeAtPosition(position, /\w+/);
        if (!range) {
            return undefined;
        }
        const word = document.getText(range);
        if (word !== "setup" && word !== "draw") {
            return undefined;
        }

        const line = document.lineAt(position);
        if (this.isProcessingEntryPoint(line.text.trim())) {
            const commands: vscode.Command[] = [
                {
                    title: "Run",
                    command: PROCESSING_HOVER_RUN_COMMAND,
                    tooltip: "Run Hover Processing Sketch",
                    arguments: [true, document.uri.toString(), { line: position.line, character: position.character, entryPoint: word }],
                },
                {
                    title: "Debug",
                    command: PROCESSING_HOVER_RUN_COMMAND,
                    tooltip: "Debug Hover Processing Sketch",
                    arguments: [false, document.uri.toString(), { line: position.line, character: position.character, entryPoint: word }],
                },
            ];
            const contributed = new vscode.MarkdownString(commands.map((command) => this.convertCommandToMarkdown(command)).join(" | "));
            contributed.isTrusted = true;
            return new vscode.Hover(contributed);
        }

        return undefined;
    }

    private isProcessingEntryPoint(line: string): boolean {
        return line.startsWith("void setup()") || line.startsWith("void draw()");
    }

    private convertCommandToMarkdown(command: vscode.Command): string {
        return `[${command.title}](command:${command.command}?` +
            `${encodeURIComponent(JSON.stringify(command.arguments || []))} "${command.tooltip || command.command}")`;
    }
}