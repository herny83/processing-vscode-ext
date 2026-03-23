// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import * as anchor from "./anchor";
import * as utility from "./utility";

const suppressedReasons: Set<string> = new Set();

export const YES_BUTTON: string = "Yes";
export const NO_BUTTON: string = "No";
const NEVER_BUTTON: string = "Do not show again";

enum HcrChangeType {
    ERROR = "ERROR",
    WARNING = "WARNING",
    STARTING = "STARTING",
    END = "END",
    BUILD_COMPLETE = "BUILD_COMPLETE",
}

export function initializeHotCodeReplace(context: vscode.ExtensionContext) {
    vscode.commands.executeCommand("setContext", "processingHotReload", getHotReloadFlag());
    vscode.workspace.onDidChangeConfiguration((event) => {
        if (event.affectsConfiguration("processing.debug.settings.hotCodeReplace")) {
            vscode.commands.executeCommand("setContext", "processingHotReload", getHotReloadFlag());
        }
    });
    vscode.debug.onDidStartDebugSession((session) => {
        if (session?.configuration.noDebug && !vscode.debug.activeDebugSession) {
            vscode.commands.executeCommand("setContext", "processingHotReloadOn", false);
        }
    });
    vscode.debug.onDidChangeActiveDebugSession((session) => {
        vscode.commands.executeCommand("setContext", "processingHotReloadOn", session && !session.configuration.noDebug);
    });
    context.subscriptions.push(vscode.debug.onDidTerminateDebugSession(() => {
        suppressedReasons.clear();
    }));
}

export function handleHotCodeReplaceCustomEvent(hcrEvent: vscode.DebugSessionCustomEvent) {
    if (hcrEvent.body.changeType === HcrChangeType.BUILD_COMPLETE) {
        if (getHotReloadFlag() === "auto") {
            return vscode.window.withProgress({ location: vscode.ProgressLocation.Window }, (progress) => {
                progress.report({ message: "Applying code changes..." });
                return hcrEvent.session.customRequest("redefineClasses");
            });
        }
    }

    if (hcrEvent.body.changeType === HcrChangeType.ERROR || hcrEvent.body.changeType === HcrChangeType.WARNING) {
        if (!suppressedReasons.has(hcrEvent.body.message)) {
            utility.showWarningMessageWithTroubleshooting({
                message: `Hot code replace failed - ${hcrEvent.body.message}. Would you like to restart the debug session?`,
                anchor: anchor.FAILED_TO_COMPLETE_HCR,
            }, YES_BUTTON, NO_BUTTON, NEVER_BUTTON).then((res) => {
                if (res === NEVER_BUTTON) {
                    suppressedReasons.add(hcrEvent.body.message);
                } else if (res === YES_BUTTON) {
                    vscode.commands.executeCommand("workbench.action.debug.restart");
                }
            });
        }
    }
    return undefined;
}

function getHotReloadFlag(): string {
    // Use "processing.debug.settings" instead of "java.debug.settings"
    return vscode.workspace.getConfiguration("processing.debug.settings").get("hotCodeReplace") || "manual";
}
