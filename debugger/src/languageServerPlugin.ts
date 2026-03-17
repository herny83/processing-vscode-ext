// Stub: Fetches platform settings. Replace with real logic as needed.
export async function fetchPlatformSettings(): Promise<any> {
    return { latestSupportedJavaVersion: 17 };
}


// Stub: Resolves class filters. Replace with real logic as needed.
export async function resolveClassFilters(filters: string[]): Promise<string[]> {
    return filters;
}

// Stub: InlineKind enum for inline values.
export enum InlineKind {
    Evaluation = 0,
    VariableLookup = 1
}

// Stub: InlineVariable type and resolveInlineVariables function.
export interface InlineVariable {
    range: { start: { line: number }, end: { line: number } };
    kind: InlineKind;
    name?: string;
    expression?: string;
    declaringClass?: string;
}
export async function resolveInlineVariables(_args: any): Promise<InlineVariable[]> {
    return [];
}
// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import { Range } from "vscode-languageserver-types";

import * as commands from "./commands";
import * as out from "./outputChannel";

export const JAVA_DEFAULT_PROJECT_NAME = "jdt.ls-java-project";

export enum CompileWorkspaceStatus {
    FAILED = 0,
    SUCCEED = 1,
    WITHERROR = 2,
    CANCELLED = 3,
}

export interface IMainClassOption {
    readonly mainClass: string;
    readonly projectName?: string;
    readonly filePath?: string;
}

export interface IMainMethod extends IMainClassOption {
    range: vscode.Range;
}

export const CONFIGERROR_INVALID_CLASS_NAME = 1;
export const CONFIGERROR_MAIN_CLASS_NOT_EXIST = 2;
export const CONFIGERROR_MAIN_CLASS_NOT_UNIQUE = 3;
export const CONFIGERROR_INVALID_JAVA_PROJECT = 4;
export interface IValidationResult {
    readonly isValid: boolean;
    readonly message?: string;
    readonly kind?: number;
}

export interface ILaunchValidationResponse {
    readonly mainClass: IValidationResult;
    readonly projectName: IValidationResult;
    readonly proposals?: IMainClassOption[];
}

export async function resolveMainMethod(uri: vscode.Uri, token?: vscode.CancellationToken): Promise<IMainMethod[]> {
    if (token) {
        return <IMainMethod[]> await commands.executeJavaLanguageServerCommand(commands.JAVA_RESOLVE_MAINMETHOD, uri.toString(), token);
    }

    return <IMainMethod[]> await commands.executeJavaLanguageServerCommand(commands.JAVA_RESOLVE_MAINMETHOD, uri.toString());
}

export function startDebugSession() {
    return commands.executeJavaLanguageServerCommand(commands.JAVA_START_DEBUGSESSION);
}

export function resolveClasspath(mainClass: string, projectName: string, scope?: string) {
    return commands.executeJavaLanguageServerCommand(commands.JAVA_RESOLVE_CLASSPATH, mainClass, projectName, scope);
}

export function resolveMainClass(workspaceUri?: vscode.Uri): Promise<IMainClassOption[]> {
    if (workspaceUri) {
        return <Promise<IMainClassOption[]>>commands.executeJavaLanguageServerCommand(commands.JAVA_RESOLVE_MAINCLASS, workspaceUri.toString());
    }
    return <Promise<IMainClassOption[]>>commands.executeJavaLanguageServerCommand(commands.JAVA_RESOLVE_MAINCLASS);
}

export function resolveMainClassFromProject(projectName: string): Promise<IMainClassOption[]> {
    return <Promise<IMainClassOption[]>>commands.executeJavaLanguageServerCommand(commands.JAVA_RESOLVE_MAINCLASS, projectName);
}

export function validateLaunchConfig(mainClass: string, projectName: string, containsExternalClasspaths: boolean, workspaceUri?: vscode.Uri): Promise<ILaunchValidationResponse> 
{
    return <Promise<ILaunchValidationResponse>>commands.executeJavaLanguageServerCommand(commands.JAVA_VALIDATE_LAUNCHCONFIG,
        workspaceUri ? workspaceUri.toString() : undefined, mainClass, projectName, containsExternalClasspaths);
}

export function inferLaunchCommandLength(config: vscode.DebugConfiguration): Promise<number> {
    return <Promise<number>>commands.executeJavaLanguageServerCommand(commands.JAVA_INFER_LAUNCH_COMMAND_LENGTH, JSON.stringify(config));
}

export function checkProjectSettings(className: string, projectName: string, inheritedOptions: boolean, expectedOptions: {[key: string]: string}):
Promise<boolean> {
    return <Promise<boolean>>commands.executeJavaLanguageServerCommand(
        commands.JAVA_CHECK_PROJECT_SETTINGS, JSON.stringify({
            className,
            projectName,
            inheritedOptions,
            expectedOptions,
        }));
}

const COMPILER_PB_ENABLE_PREVIEW_FEATURES: string = "org.eclipse.jdt.core.compiler.problem.enablePreviewFeatures";
export async function detectPreviewFlag(className: string, projectName: string): Promise<boolean> {
    const expectedOptions = {
        [COMPILER_PB_ENABLE_PREVIEW_FEATURES]: "enabled",
    };
    return checkProjectSettings(className, projectName, true, expectedOptions);
}
