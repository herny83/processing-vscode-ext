// Stub: Returns a fake Java home path. Replace with real logic as needed.
export async function getJavaHome(): Promise<string> {
    return "C:/Program Files/Java/jdk-17";
}
// Stub: Converts a file path to a vscode.Uri string.
export function getUriFromPath(path: string): string {
    return `file://${path}`;
}

// Stub: Resolves a relative folder from a workspace path.
export function resolveRelativeFolderFromWorspacePath(focusedFile: string, folder: any): string {
    // Replace with actual logic as needed.
    return focusedFile.replace(folder.uri.fsPath, '');
}

// Stub: Resolves the Processing main class name from a file URI.
export function resolveProcessingNameFromFileUri(uri: any): string {
    // Replace with actual logic as needed.
    return 'MainSketch';
}
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { IMainClassOption, resolveMainClass } from "./languageServerPlugin";
import { IProgressReporter } from "./progressAPI";
import * as path from "path";
import * as fs from 'fs';
import * as crypto from 'crypto';

const TROUBLESHOOTING_LINK = "https://github.com/Microsoft/vscode-java-debug/blob/master/Troubleshooting.md";
const LEARN_MORE = "Learn More";
const JAVA_EXTENSION_ID = "redhat.java";

export enum LogMsgType {
    EXCEPTION = "exception",
    USAGEDATA = "usageData",
    USAGEERROR = "usageError",
    ACTIVATEEXTENSION = "activateExtension", // TODO: Activation belongs to usage data, remove this category.
}

export class UserError extends Error {
    public context: ITroubleshootingMessage;

    constructor(context: ITroubleshootingMessage) {
        super(context.message);
        this.context = context;
    }
}

export class JavaExtensionNotEnabledError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class OperationCancelledError extends Error {
    constructor(message: string) {
        super(message);
    }
}

interface ILoggingMessage {
    type?: LogMsgType;
    message: string;
    stack?: string;
    bypassLog?: boolean;
}

interface ITroubleshootingMessage extends ILoggingMessage {
    anchor?: string;
}

export async function showWarningMessageWithTroubleshooting(message: ITroubleshootingMessage, ...items: string[]): Promise<string | undefined> {
    const choice = await vscode.window.showWarningMessage(message.message, ...items, LEARN_MORE);
    return handleTroubleshooting(message.message, choice, message.anchor);
}

export async function showErrorMessageWithTroubleshooting(message: ITroubleshootingMessage, ...items: string[]): Promise<string | undefined> {
    const choice = await vscode.window.showErrorMessage(message.message, ...items, LEARN_MORE);
    return handleTroubleshooting(message.message, choice, message.anchor);
}

function handleTroubleshooting(message: string, choice?: string, anchor?: string): string | undefined {
    if (choice === LEARN_MORE) {
        openTroubleshootingPage(message, anchor);
        return undefined;
    }

    return choice;
}

export function openTroubleshootingPage(_message: string, anchor?: string) {
    vscode.commands.executeCommand("vscode.open", vscode.Uri.parse(anchor ? `${TROUBLESHOOTING_LINK}#${anchor}` : TROUBLESHOOTING_LINK));
}

export async function guideToInstallJavaExtension() {
    const MESSAGE = "Language Support for Java is required. Please install and enable it.";
    const INSTALL = "Install";
    const choice = await vscode.window.showWarningMessage(MESSAGE, INSTALL);
    if (choice === INSTALL) {
        await installJavaExtension();
    }
}

async function installJavaExtension() {
    await vscode.window.withProgress({ location: vscode.ProgressLocation.Notification }, async (p) => {
        p.report({ message: "Installing Language Support for Java ..." });
        await vscode.commands.executeCommand("workbench.extensions.installExtension", JAVA_EXTENSION_ID);
    });
    const RELOAD = "Reload Window";
    const choice = await vscode.window.showInformationMessage("Please reload window to activate Language Support for Java.", RELOAD);
    if (choice === RELOAD) {
        await vscode.commands.executeCommand("workbench.action.reloadWindow");
    }
}

export function convertErrorToMessage(err: Error): ILoggingMessage {
    const properties = formatErrorProperties(err);
    return {
        type: LogMsgType.EXCEPTION,
        message: properties.message,
        stack: properties.stack,
        bypassLog: false,
    };
}

function formatErrorProperties(err: Error): { message: string; stack?: string } {
    return {
        message: err.message,
        stack: err.stack,
    };
}

export function getJavaExtension() {
    return vscode.extensions.getExtension(JAVA_EXTENSION_ID);
}

export function sha256(data: string): string {
    return crypto.createHash('sha256').update(data).digest('hex');
}

export function isPathValid(pathStr: string): boolean {
    try {
        fs.accessSync(pathStr);
        return true;
    } catch {
        return false;
    }
}
