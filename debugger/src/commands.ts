// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import * as utility from "./utility";
import * as out from "./outputChannel";

export const VSCODE_STARTDEBUG = "vscode.startDebug";

export const VSCODE_ADD_DEBUGCONFIGURATION = "debug.addConfiguration";

export const JAVA_START_DEBUGSESSION = "vscode.java.startDebugSession";

export const JAVA_RESOLVE_CLASSPATH = "vscode.java.resolveClasspath";

export const JAVA_RESOLVE_MAINCLASS = "vscode.java.resolveMainClass";

export const JAVA_VALIDATE_LAUNCHCONFIG = "vscode.java.validateLaunchConfig";

export const JAVA_BUILD_WORKSPACE = "vscode.java.buildWorkspace";

export const JAVA_EXECUTE_WORKSPACE_COMMAND = "java.execute.workspaceCommand";

export const JAVA_FETCH_USAGE_DATA = "vscode.java.fetchUsageData";

export const JAVA_UPDATE_DEBUG_SETTINGS = "vscode.java.updateDebugSettings";

export const JAVA_RESOLVE_MAINMETHOD = "vscode.java.resolveMainMethod";

export const JAVA_INFER_LAUNCH_COMMAND_LENGTH = "vscode.java.inferLaunchCommandLength";

export const JAVA_CHECK_PROJECT_SETTINGS = "vscode.java.checkProjectSettings";

export const JAVA_RESOLVE_ELEMENT_AT_SELECTION = "vscode.java.resolveElementAtSelection";

export const JAVA_RESOLVE_BUILD_FILES = "vscode.java.resolveBuildFiles";

export const JAVA_IS_ON_CLASSPATH = "vscode.java.isOnClasspath";

export const JAVA_RESOLVE_JAVAEXECUTABLE = "vscode.java.resolveJavaExecutable";

export const JAVA_FETCH_PLATFORM_SETTINGS = "vscode.java.fetchPlatformSettings";

export const JAVA_RESOLVE_CLASSFILTERS = "vscode.java.resolveClassFilters";

export const JAVA_RESOLVE_SOURCE_URI = "vscode.java.resolveSourceUri";

export const JAVA_RESOLVE_INLINE_VARIABLES = "vscode.java.resolveInlineVariables";

export const JAVA_GET_ALL_PROJECTS = "java.project.getAll";

export const JAVA_GET_PROJECT_SETTINGS = "java.project.getSettings";

/**
 * Mark the folder as the source root of the closest project.
 * client-side & server-side commands
 */
export const ADD_TO_SOURCEPATH_CMD = 'java.project.addToSourcePath.command';
export const ADD_TO_SOURCEPATH = 'java.project.addToSourcePath';
/**
 * Unmark the folder as the source root of the project.
 * client-side & server-side commands
 */
export const REMOVE_FROM_SOURCEPATH_CMD = 'java.project.removeFromSourcePath.command';
export const REMOVE_FROM_SOURCEPATH = 'java.project.removeFromSourcePath';
/**
 * List all recognized source roots in the workspace.
 * client-side & server-side commands
 */
export const LIST_SOURCEPATHS_CMD = 'java.project.listSourcePaths.command';
export const LIST_SOURCEPATHS = 'java.project.listSourcePaths';

export function executeJavaLanguageServerCommand(...rest: any[]) {
    return executeJavaExtensionCommand(JAVA_EXECUTE_WORKSPACE_COMMAND, ...rest);
}

export async function executeJavaExtensionCommand(commandName: string, ...rest: any[]) {
    // TODO: need to handle error and trace telemetry
    const javaExtension = utility.getJavaExtension();
    if (!javaExtension) {
        throw new utility.JavaExtensionNotEnabledError(`Cannot execute command ${commandName}, VS Code Java Extension is not enabled.`);
    }
    if (!javaExtension.isActive) {
        await javaExtension.activate();
    }
    return vscode.commands.executeCommand(commandName, ...rest);
}

export async function ensureJavaExtensionActivation(progressReporter?: { report: (msg: string) => void })
{
    // TODO: need to handle error and trace telemetry
    const javaExtension = utility.getJavaExtension();
    if (!javaExtension) {
        throw new utility.JavaExtensionNotEnabledError(`VS Code Java Extension is not enabled.`);
    }

    out.logToOutput("Is Java Extension Active? "+javaExtension.isActive);
    if (!javaExtension.isActive) {
        if (progressReporter)
            progressReporter.report("Activating Java Extension...");

        out.logToOutput("Activating Java Extension...");
        await javaExtension.activate();
        // Wait 5 seconds after activation to allow full initialization
        await new Promise(resolve => setTimeout(resolve, 20000));
    }
}
