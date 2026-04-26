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
        stack: properties.stackTrace,
    };
}

function formatErrorProperties(ex: any): any {
    const exception = (ex && ex.data && ex.data.cause)
        || { stackTrace: (ex && ex.stack), detailMessage: String((ex && ex.message) || ex || "Unknown exception") };

    const properties = {
        message: "",
        stackTrace: "",
    };

    if (exception && typeof exception === "object") {
        properties.message = exception.detailMessage;
        properties.stackTrace = (Array.isArray(exception.stackTrace) && JSON.stringify(exception.stackTrace))
            || String(exception.stackTrace);
    } else {
        properties.message = String(exception);
    }

    return properties;
}

export async function getJavaHome(): Promise<string> {
    const extensionApi = await getJavaExtensionAPI();
    if (extensionApi && extensionApi.javaRequirement) {
        return extensionApi.javaRequirement.java_home;
    }

    return "";
}

export function getJavaExtensionAPI(progressReporter?: IProgressReporter): Thenable<any> {
    const extension = vscode.extensions.getExtension(JAVA_EXTENSION_ID);
    if (!extension) {
        throw new JavaExtensionNotEnabledError("VS Code Java Extension is not enabled.");
    }

    return new Promise<any>(async (resolve) => {
        progressReporter?.getCancellationToken().onCancellationRequested(() => {
            resolve(undefined);
        });

        resolve(await extension.activate());
    });
}

export function getJavaExtension(): vscode.Extension<any> | undefined {
    return vscode.extensions.getExtension(JAVA_EXTENSION_ID);
}

export function isJavaExtEnabled(): boolean {
    const javaExt = vscode.extensions.getExtension(JAVA_EXTENSION_ID);
    return !!javaExt;
}

export function isJavaExtActivated(): boolean {
    const javaExt = vscode.extensions.getExtension(JAVA_EXTENSION_ID);
    return !!javaExt && javaExt.isActive;
}

export function isGitBash(isIntegratedTerminal: boolean): boolean {
    const currentWindowsShellPath: string | undefined = isIntegratedTerminal ? vscode.env.shell :
        vscode.workspace.getConfiguration("terminal")?.get("external.windowsExec");
    if (!currentWindowsShellPath) {
        return false;
    }

    const candidates: string[] = ["Git\\bin\\bash.exe", "Git\\bin\\bash", "Git\\usr\\bin\\bash.exe", "Git\\usr\\bin\\bash"];
    const find: string | undefined = candidates.find((candidate: string) => currentWindowsShellPath.endsWith(candidate));
    return !!find;
}

export enum ServerMode {
    STANDARD = "Standard",
    LIGHTWEIGHT = "LightWeight",
    HYBRID = "Hybrid",
}

/**
 * Wait for Java Language Support extension being on Standard mode,
 * and return true if the final status is on Standard mode.
 */
export async function waitForStandardMode(progressReporter: IProgressReporter): Promise<boolean> {
    const importMessage = progressReporter?.getProgressLocation() === vscode.ProgressLocation.Notification ?
        "Importing projects, [check details](command:java.show.server.task.status)" : "Importing projects...";
    if (await isImportingProjects()) {
        progressReporter.report(importMessage);
    }

    const api = await getJavaExtensionAPI(progressReporter);
    if (!api) {
        return false;
    }

    if (api && api.serverMode === ServerMode.LIGHTWEIGHT) {
        const answer = await vscode.window.showInformationMessage("Run/Debug feature requires Java language server to run in Standard mode. "
            + "Do you want to switch it to Standard mode now?", "Yes", "Cancel");
        if (answer === "Yes") {
            if (api.serverMode === ServerMode.STANDARD) {
                return true;
            }

            progressReporter?.report(importMessage);
            return new Promise<boolean>((resolve) => {
                progressReporter.getCancellationToken().onCancellationRequested(() => {
                    resolve(false);
                });
                api.onDidServerModeChange((mode: string) => {
                    if (mode === ServerMode.STANDARD) {
                        resolve(true);
                    }
                });

                vscode.commands.executeCommand("java.server.mode.switch", ServerMode.STANDARD, true);
            });
        }

        return false;
    } else if (api && api.serverMode === ServerMode.HYBRID) {
        progressReporter.report(importMessage);
        return new Promise<boolean>((resolve) => {
            progressReporter.getCancellationToken().onCancellationRequested(() => {
                resolve(false);
            });
            api.onDidServerModeChange((mode: string) => {
                if (mode === ServerMode.STANDARD) {
                    resolve(true);
                }
            });
        });
    }

    return true;
}

export async function searchMainMethods(uri?: vscode.Uri): Promise<IMainClassOption[]> {
    return resolveMainClass(uri);
}

export async function searchMainMethodsWithProgress(uri?: vscode.Uri): Promise<IMainClassOption[]> {
    try {
        return await vscode.window.withProgress<IMainClassOption[]>(
            { location: vscode.ProgressLocation.Window },
            async (p) => {
                p.report({ message: "Searching main classes..." });
                return resolveMainClass(uri);
            });
    } catch (ex) {
        vscode.window.showErrorMessage(String(ex instanceof Error ? ex.message : ex));
        throw ex;
    }
}

async function isImportingProjects(): Promise<boolean> {
    const extension = vscode.extensions.getExtension(JAVA_EXTENSION_ID);
    if (!extension) {
        return false;
    }

    const serverMode = getJavaServerMode();
    if (serverMode === ServerMode.STANDARD || serverMode === ServerMode.HYBRID) {
        const allCommands = await vscode.commands.getCommands();
        return (!extension.isActive && allCommands.includes("java.show.server.task.status"))
            || (extension.isActive && extension.exports?.serverMode === ServerMode.HYBRID);
    }

    return false;
}

function getJavaServerMode(): ServerMode {
    return vscode.workspace.getConfiguration().get("java.server.launchMode")
        || ServerMode.HYBRID;
}

export function launchJobName(configName: string, noDebug: boolean): string {
    let jobName = noDebug ? "Run" : "Debug";
    jobName += configName ? ` '${configName}'` : "";
    return jobName;
}

export function launchJobNameByMainClass(mainClass: string, noDebug: boolean): string {
    return launchJobName(mainClass.substring(mainClass.lastIndexOf(".") + 1), noDebug);
}

export function convertPdeUriToMainJavaFile(pdeUri : vscode.Uri) : vscode.Uri
{
    let dirname = path.dirname(pdeUri.fsPath);
    let mainfolder = path.basename(dirname);
    let javaUri = vscode.Uri.file(dirname+"\\build\\source\\"+mainfolder+".java");
    return javaUri;
}

export function resolveProcessingNameFromFileUri(pdeUri : vscode.Uri) : string
{
    //let dirname = path.dirname(pdeUri.fsPath);
    let mainfolder = path.basename(path.dirname(pdeUri.fsPath));
    return mainfolder;
}

export function resolveRelativeFolderFromWorspacePath(filePath: string, workspaceFolder: vscode.WorkspaceFolder | undefined): string
{
    if (!workspaceFolder)
        return "";

    const workspacePath = workspaceFolder.uri.fsPath;
    const sketchFullPath = path.dirname(filePath);
    if(workspacePath === sketchFullPath)
            return "";
    if (filePath.startsWith(workspacePath)) 
    {
        const relativePath = path.relative(workspacePath, sketchFullPath);
        return path.sep + relativePath;
    }
    return "";
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

/**
 * Transforms a path to a file uri
 * 
 * @param path Path of a file
 * @returns Uniform resource identifier (URI) to the file path
 */
export function getUriFromPath(path : string) : string  
{
    let tempUri = path.replace(/\\/g, '/');
	tempUri = tempUri.replace(':', '%3A');
	return 'file:///'+ tempUri;
}

export function extractFileInfo(input: string): { filename?: string, lineNumber?: number, type?: string, rest?:string } | undefined
{
    // Regular expression for matching the filename
    const filenamePattern = /^([a-zA-Z]:\\(?:[^\\/:*?"<>|\r\n]+\\)*[^\\/:*?"<>|\r\n]+):/;

    // Try to match the input string with the filename pattern
    const filenameMatch = input.match(filenamePattern);

    // If there is no match, return undefined
    if (!filenameMatch) {
        return undefined;
    }
  
    // Extract filename from the matched group
    const filename = filenameMatch[1];

    // Remove the filename part from the input string
    const lineInput = input.substring(filenameMatch[0].length);
    const linePartEndIndex = lineInput.indexOf(':');
    const lineNumberMatch = lineInput.substring(0, linePartEndIndex);
    // const integerRegex = /^(\d+)/;
    // const lineNumberMatch = lineInput.match(integerRegex);
    // if (!lineNumberMatch)
    //     return undefined;
    const lineNumber = parseInt(lineNumberMatch, 10);

    // Type part
    let type : string | undefined;
    let rest : string;
    const remainingInput = lineInput.substring(linePartEndIndex+2);    
    const typePartIndex = remainingInput.indexOf(':');
    if(typePartIndex >= 0)
    {
        const typeString = remainingInput.substring(0, typePartIndex);
        if(typeString == 'warning' || typeString == 'error')
        {
            type = typeString.substring(0);
            rest = remainingInput.substring(typePartIndex+2);
        }
        else
            rest = remainingInput;
    }
    else
        rest = remainingInput;

     // Return the extracted values
    return { filename, lineNumber, type, rest };
  }

export async function waitForJavaProjectImport(timeoutMs = 30000, intervalMs = 1000): Promise<boolean> {
    const start = Date.now();
    while (await isImportingProjects()) {
        if (Date.now() - start > timeoutMs) {
            return false; // Timed out waiting for import
        }
        await new Promise(res => setTimeout(res, intervalMs));
    }
    return true; // Import finished, workspace ready
}

export function sha256(content: string): string {
    return crypto.createHash('sha256').update(content).digest('hex');
}

export function stringToUri(str: string): vscode.Uri {
    try {
        return vscode.Uri.parse(str);
    } catch (error) {
        console.error("Invalid URI string:", str, error);
        return vscode.Uri.file(str); // Fallback to file URI
    }
}