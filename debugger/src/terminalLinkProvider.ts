// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { resolveSourceUri } from "./languageServerPlugin";

interface ProcessingTerminalLink extends vscode.TerminalLink {
    methodName: string;
    stackTrace: string;
    lineNumber: number;
    isDebuggerTerminal: boolean;
}

export class ProcessingTerminalLinkProvider implements vscode.TerminalLinkProvider<ProcessingTerminalLink> {
    public provideTerminalLinks(context: vscode.TerminalLinkContext, _token: vscode.CancellationToken): vscode.ProviderResult<ProcessingTerminalLink[]> {
        const isDebuggerTerminal: boolean = context.terminal.name.startsWith("Run:") || context.terminal.name.startsWith("Debug:");
        // Updated regex to match both .java and .pde files
        const regex = new RegExp("(\\sat\\s+)([\\w$\\.]+\\/)?(([\\w$]+\\.)+[<\\w$>]+)\\(([\\w-$]+\\.(java|pde):\\d+)\\)");
        const result: RegExpExecArray | null = regex.exec(context.line);
        if (result && result.length) {
            const stackTrace = `${result[2] || ""}${result[3]}(${result[5]})`;
            const sourceLineNumber = Number(result[5].split(":")[1]);
            return [{
                startIndex: result.index + result[1].length,
                length: stackTrace.length,
                methodName: result[3],
                stackTrace,
                lineNumber: sourceLineNumber,
                isDebuggerTerminal,
            }];
        }

        return [];
    }

    public async handleTerminalLink(link: ProcessingTerminalLink): Promise<void> 
    {
        const uri = await resolveSourceUri(link.stackTrace);
        if (uri) {
            const lineNumber = Math.max(link.lineNumber - 1, 0);
            vscode.window.showTextDocument(vscode.Uri.parse(uri), {
                preserveFocus: true,
                selection: new vscode.Range(new vscode.Position(lineNumber, 0), new vscode.Position(lineNumber, 0)),
            });
        } else {
            // If no source is found, then open the searching symbols quickpick box.
            const fullyQualifiedName = link.methodName.substring(0, link.methodName.lastIndexOf("."));
            const className = fullyQualifiedName.substring(fullyQualifiedName.lastIndexOf(".") + 1);
            vscode.commands.executeCommand("workbench.action.quickOpen", "#" + className);
        }
    }
}
