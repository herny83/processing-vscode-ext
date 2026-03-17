// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as fs from "fs";
import * as _ from "lodash";
import * as path from "path";
import * as vscode from "vscode";
import * as dotenv from 'dotenv';
import * as anchor from "./anchor";
import * as commands from "./commands";
import * as lsPlugin from "./languageServerPlugin";
import * as utility from "./utility";
import * as sketch from "./sketch";
import * as out from "./outputChannel";
import { populateStepFilters } from "./classFilter";
import { ClasspathVariable } from "./constants";
import { addMoreHelpfulVMArgs, getJavaVersion, getShortenApproachForCLI } from "./launchCommand";
import { resolveJavaProcess } from "./processPicker";
import { progressProvider } from "./progressImpl";
import { WorkspaceFolder, CancellationToken, DebugConfiguration, ProviderResult } from "vscode";

const platformNameMappings: { [key: string]: string } = {
	win32: "windows",
	linux: "linux",
	darwin: "osx",
};
const platformName = platformNameMappings[process.platform];

export let lastUsedLaunchConfig: DebugConfiguration | undefined;

export class ProcessingDebugConfigurationProvider implements vscode.DebugConfigurationProvider 
{
	// Returns an initial debug configurations based on contextual information.
	public provideDebugConfigurations(folder?: WorkspaceFolder, _token?: CancellationToken): ProviderResult<DebugConfiguration[]> 
	{
		if(folder==undefined)
			return [];

		const defaultConfig = {
			type: "processing",
			request: "launch",
			name: "Debug Sketch",
			processingArgs: []
		};
		console.log("[ProcessingDebug] provideDebugConfigurations returned:", defaultConfig);
		return [defaultConfig];
	}

	// Try to add all missing attributes to the debug configuration being launched.
	public resolveDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, _token?: CancellationToken): ProviderResult<DebugConfiguration> 
	{

		// Fill in missing fields for minimal config
		if (!config.type) config.type = "processing";
		if (!config.request) config.request = "launch";
		if (!config.name) config.name = "Debug Sketch";
		
		const activeEditor = vscode.window.activeTextEditor;
		const activeEditorFilePath = activeEditor ? activeEditor.document.fileName : undefined;
		const focusedFile = config.mainClass ? config.mainClass : activeEditorFilePath;
		const isProcessingFile : boolean = focusedFile && focusedFile.endsWith(".pde");

		// Try to use the active .pde file
		if (isProcessingFile) {
			if(!config.relativePath)
				config.relativePath = utility.resolveRelativeFolderFromWorspacePath(focusedFile, folder);
			if(!config.mainClass)
				config.mainClass = utility.resolveProcessingNameFromFileUri(vscode.Uri.file(focusedFile));
		} else {
			vscode.window.showErrorMessage("No active Processing file to debug.");
			return undefined;
		}
		
		console.log("[ProcessingDebug] resolveDebugConfiguration");
		return config;
	}

	// Try to add all missing attributes to the debug configuration being launched.
	public resolveDebugConfigurationWithSubstitutedVariables(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> 
	{
		console.log("[ProcessingDebug] resolveDebugConfigurationWithSubstitutedVariables");

		try {
			// See https://github.com/microsoft/vscode-java-debug/issues/778
			// Merge the platform specific properties to the global config to simplify the subsequent resolving logic.
			console.log("[ProcessingDebug] debugging received:", config);
			this.mergePlatformProperties(config, folder);
			return this.resolveAndValidateDebugConfiguration(folder, config, token);
		} catch (ex) {
			vscode.window.showErrorMessage(String((ex && ex.message) || ex));
			return undefined;
		}
	}

	private mergePlatformProperties(config: DebugConfiguration, _folder?: WorkspaceFolder) 
	{
		if (config && platformName && config[platformName]) {
			try {
				for (const key of Object.keys(config[platformName])) {
					config[key] = config[platformName][key];
				}
			} catch (err) {
				console.error(err);
			}
		}
	}

	private resolveAndValidateDebugConfiguration(folder: WorkspaceFolder | undefined, config: DebugConfiguration, token?: CancellationToken): ProviderResult<DebugConfiguration> 
	{
		// Add validation logic here if needed
		return config;
	}
}
