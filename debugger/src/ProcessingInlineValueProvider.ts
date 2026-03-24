// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.
import * as server from "vscode-languageserver-types"
import * as lsp from "./languageServerPlugin";
import * as utility from "./utility";
import * as sketch from "./sketch";
import * as vscode from "vscode";


// Direct mapping between vscode.Range and server.Range (same shape)
function toServerRange(r: vscode.Range): server.Range
{
	return {
		start: { line: r.start.line, character: r.start.character },
		end: { line: r.end.line, character: r.end.character }
	};
}

function toVscodeRange(r: server.Range): vscode.Range
{
	return new vscode.Range(
		r.start.line, r.start.character,
		r.end.line, r.end.character
	);
}

export class ProcessingInlineValuesProvider implements vscode.InlineValuesProvider {

	public async provideInlineValues(document: vscode.TextDocument, viewPort: vscode.Range, context: vscode.InlineValueContext): Promise<vscode.InlineValue[]> 
	{
		let documentUri : string = document.uri.toString();
		let codeRange : server.Range = toServerRange(viewPort);
		let loc : server.Range = toServerRange(context.stoppedLocation);
		let hasPdeConvert : boolean = false;
		if(documentUri.endsWith(".pde"))
		{
			codeRange.start.line = sketch.convertPdeLineToJavaLine(documentUri, codeRange.start.line).line;
			codeRange.end.line = sketch.convertPdeLineToJavaLine(documentUri, codeRange.end.line).line;
			loc.start.line = sketch.convertPdeLineToJavaLine(documentUri, loc.start.line).line;
			loc.end.line = sketch.convertPdeLineToJavaLine(documentUri, loc.end.line).line;
			documentUri = utility.getUriFromPath(sketch.getMainJavaFile());
			hasPdeConvert = true;
		}
	   
		const variables: lsp.InlineVariable[] = await lsp.resolveInlineVariables({
			uri: documentUri,
			viewPort: codeRange,
			stoppedLocation: loc,
		});

		if(hasPdeConvert)
		{
			for(let i=0; i < variables.length; i++)
			{
				const startloc : sketch.Location = sketch.convertJavaLineToPdeLine(variables[i].range.start.line);
				const endloc : sketch.Location = sketch.convertJavaLineToPdeLine(variables[i].range.end.line);
				variables[i].range.start.line = startloc.line;
				variables[i].range.end.line = endloc.line;
			}
		}
		if (!variables || !variables.length)
			return [];
			
		const unresolvedVariables: any[] = variables
			.filter((variable) => variable.kind === lsp.InlineKind.Evaluation)
			.map((variable) => ({
				expression: variable.expression || variable.name,
				declaringClass: variable.declaringClass,
			}));

		let resolvedVariables: any;
		if (unresolvedVariables.length && vscode.debug.activeDebugSession) 
		{
			try {
				const response = await vscode.debug.activeDebugSession.customRequest("inlineValues", {
					frameId: context.frameId,
					variables: unresolvedVariables,
				});
				resolvedVariables = response?.variables;
			} catch (err) {
				console.error("InlineValues request error:", err);
			}
		}

		console.log("Variables:", variables);
		console.log("Unresolved:", unresolvedVariables);
		console.log("Resolved:", resolvedVariables);

		const result: vscode.InlineValue[] = [];
		let next = 0;
		for (const variable of variables) {
			const vsRange = toVscodeRange(variable.range);
			if (variable.kind === lsp.InlineKind.VariableLookup) {
				result.push(new vscode.InlineValueVariableLookup(vsRange, variable.name, true));
			} else if (resolvedVariables && resolvedVariables.length > next) {
				const resolvedValue = resolvedVariables[next++];
				if (resolvedValue) {
					result.push(new vscode.InlineValueText(vsRange, `${variable.name} = ${resolvedValue.value}`));
				} else {
					result.push(new vscode.InlineValueEvaluatableExpression(vsRange, variable.name));
				}
			} else {
				result.push(new vscode.InlineValueEvaluatableExpression(vsRange, variable.name));
			}
		}
		return result;
	}
}
