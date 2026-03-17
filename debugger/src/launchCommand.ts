// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as cp from "child_process";
import * as fs from "fs";
import * as _ from "lodash";
import * as path from "path";
import * as vscode from "vscode";

import { UNSUPPORTED_CLASS_VERSION_ERROR } from "./anchor";
import { fetchPlatformSettings, inferLaunchCommandLength } from "./languageServerPlugin";
import { getJavaHome, showWarningMessageWithTroubleshooting } from "./utility";

enum shortenApproach {
    none = "none",
    jarmanifest = "jarmanifest",
    argfile = "argfile",
}

const HELPFUL_NPE_VMARGS = "-XX:+ShowCodeDetailsInExceptionMessages";

/**
 * Returns the recommended approach to shorten the command line length.
 * @param config the launch configuration
 * @param runtimeVersion the target runtime version
 */
export async function getShortenApproachForCLI(config: vscode.DebugConfiguration, runtimeVersion: number): Promise<shortenApproach> {
    const recommendedShortenApproach = runtimeVersion <= 8 ? shortenApproach.jarmanifest : shortenApproach.argfile;
    return (await shouldShortenIfNecessary(config)) ? recommendedShortenApproach : shortenApproach.none;
}

// --- Implementation of missing helpers ---
function flattenMajorVersion(version: string): number {
    if (version.startsWith("1.")) {
        version = version.substring(2);
    }
    const regexp = /\d+/g;
    const match = regexp.exec(version);
    let javaVersion = 0;
    if (match) {
        javaVersion = parseInt(match[0], 10);
    }
    return javaVersion;
}

async function shouldShortenIfNecessary(config: vscode.DebugConfiguration): Promise<boolean> {
    const cliLength = await inferLaunchCommandLength(config);
    const classPaths = config.classPaths || [];
    const modulePaths = config.modulePaths || [];
    const classPathLength = classPaths.join(path.delimiter).length;
    const modulePathLength = modulePaths.join(path.delimiter).length;
    if (!config.console || config.console === "internalConsole") {
        return cliLength >= getMaxProcessCommandLineLength(config) || classPathLength >= getMaxArgLength() || modulePathLength >= getMaxArgLength();
    } else {
        return classPaths.length > 1 || modulePaths.length > 1;
    }
}

function getMaxProcessCommandLineLength(config: vscode.DebugConfiguration): number {
    const ARG_MAX_WINDOWS = 32768;
    const ARG_MAX_MACOS = 262144;
    const ARG_MAX_LINUX = 2097152;
    if (process.platform === "win32") {
        return ARG_MAX_WINDOWS - 2048;
    } else if (process.platform === "darwin") {
        return ARG_MAX_MACOS - getEnvironmentLength(config) - 2048;
    } else if (process.platform === "linux") {
        return ARG_MAX_LINUX - getEnvironmentLength(config) - 2048;
    }
    return Number.MAX_SAFE_INTEGER;
}

function getEnvironmentLength(config: vscode.DebugConfiguration): number {
    const env = config.env || {};
    return _.isEmpty(env) ? 0 : Object.keys(env).map((key) => strlen(key) + strlen(env[key]) + 1).reduce((a, b) => a + b);
}

function strlen(str: string): number {
    return str ? str.length : 0;
}

function getMaxArgLength(): number {
    const MAX_ARG_STRLEN_LINUX  = 131072;
    if (process.platform === "linux") {
        return MAX_ARG_STRLEN_LINUX - 2048;
    }
    return Number.MAX_SAFE_INTEGER;
}

async function checkVersionByCLI(javaExec: string): Promise<number> {
    if (!javaExec) {
        return 0;
    }
    return new Promise((resolve) => {
        cp.execFile(javaExec, ["-version"], {}, (_error, _stdout, stderr) => {
            const regexp = /version "(.*)"/g;
            const match = regexp.exec(stderr);
            if (!match) {
                return resolve(0);
            }
            const javaVersion = flattenMajorVersion(match[1]);
            resolve(javaVersion);
        });
    });
}

/**
 * Validates whether the specified runtime version could be supported by the Java tooling.
 * @param runtimeVersion the target runtime version
 */
export async function validateRuntimeCompatibility(runtimeVersion: number) {
    try {
        const platformSettings = await fetchPlatformSettings();
        if (platformSettings && platformSettings.latestSupportedJavaVersion) {
            const latestSupportedVersion = flattenMajorVersion(platformSettings.latestSupportedJavaVersion);
            if (latestSupportedVersion < runtimeVersion) {
                showWarningMessageWithTroubleshooting({
                    message: "The compiled classes are not compatible with the runtime JDK. To mitigate the issue, please refer to \"Learn More\".",
                    anchor: UNSUPPORTED_CLASS_VERSION_ERROR,
                });
            }
        }
    } catch (err) {
        // do nothing
    }
}

/**
 * Add some helpful VM arguments to the launch configuration based on the target runtime version.
 * @param config the launch configuration
 * @param runtimeVersion the target runtime version
 */
export async function addMoreHelpfulVMArgs(config: vscode.DebugConfiguration, runtimeVersion: number) {
    try {
        if (runtimeVersion >= 14) {
            // JEP-358: https://openjdk.java.net/jeps/358
            if (config.vmArgs && config.vmArgs.indexOf(HELPFUL_NPE_VMARGS) >= 0) {
                return;
            }

            config.vmArgs = (config.vmArgs || "") + " " + HELPFUL_NPE_VMARGS;
        }
    } catch (error) {
        // do nothing.
    }
}

/**
 * Returns the target runtime version. If the javaExec is not specified, then return the current Java version
 * that the Java tooling used.
 * @param javaExec the path of the Java executable
 */
export async function getJavaVersion(javaExec: string): Promise<number> {
    javaExec = javaExec || path.join(await getJavaHome(), "bin", "java");
    let javaVersion = await checkVersionInReleaseFile(path.resolve(javaExec, "..", ".."));
    if (!javaVersion) {
        javaVersion = await checkVersionByCLI(javaExec);
    }
    return javaVersion;
}

async function checkVersionInReleaseFile(javaHome: string): Promise<number> {
    if (!javaHome) {
        return 0;
    }
    const releaseFile = path.join(javaHome, "release");
    if (!await fs.existsSync(releaseFile)) {
        return 0;
    }

    try {
        const content = fs.readFileSync(releaseFile);
        const regexp = /^JAVA_VERSION="(.*)"/gm;
        const match = regexp.exec(content.toString());
        if (!match) {
            return 0;
        }
        const majorVersion = flattenMajorVersion(match[1]);
        return majorVersion;
    } catch (error) {
        // ignore
    }
    return 0;
}