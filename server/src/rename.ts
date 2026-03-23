import { Location, WorkspaceEdit, TextEdit } from 'vscode-languageserver/node';
import * as ast from 'antlr4ts/tree'
import * as reference from './references';
import * as parseUtils from './astutils'
import * as psymb from './antlr-sym'
import * as sketch from './sketch';
import * as symb from 'antlr4-c3'
import * as path from 'path';

export async function scheduleLookUpRename(pdeInfo : sketch.PdeContentInfo, line : number, pos : number, newName: string) : Promise<WorkspaceEdit> 
{
	if( !pdeInfo.syntaxTokens)
		return null;

	let treeContext : ast.ParseTree | undefined;
	let scopeAtPos : symb.BaseSymbol | undefined = parseUtils.findLeafSymbolAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!scopeAtPos )
	{
		scopeAtPos = sketch.getMainClass();
		treeContext = pdeInfo.syntaxTokens;
	}
	else
		treeContext = scopeAtPos.context;

	if(!treeContext)
		return null;
	
	let parseNode : ast.TerminalNode | null = parseUtils.findIdentifierAtPosition(treeContext, line, pos);
	if(!parseNode)
		return null;

	let objectSymbol : symb.BaseSymbol | undefined;
	if(psymb.PUtils.compareSymbolName(scopeAtPos, parseNode.text))
		objectSymbol = scopeAtPos;
	else
		objectSymbol = pdeInfo.findNodeSymbolDefinition(parseNode);

	let focusedDeclFullName : string | undefined;
	let locations : Location [] = [];
	// In case we try to rename a constructor then what we actually need is to rename the entire class name
	if(objectSymbol instanceof psymb.PMethodSymbol && objectSymbol.returnType == undefined)
	{
		// now the objectSymbol is the container class
		objectSymbol = psymb.PUtils.getFirstParentMatch(psymb.PComponentSymbol, objectSymbol);
	}

	// If the symbol is a class, interface of enum then me make sure to rename all the constructors too
	if( objectSymbol instanceof psymb.PClassSymbol || 
		objectSymbol instanceof psymb.PInterfaceSymbol || 
		objectSymbol instanceof psymb.PEnumSymbol)
	{
		// In these specific cases we need to also find the respective constructors
		let candidates = psymb.PUtils.getAllSymbolsSync(objectSymbol, psymb.PMethodSymbol, objectSymbol.name, true);
		for(let candidate of candidates)
		{
			if(candidate !== undefined)
			{
				let qualifiedName : string = psymb.PUtils.extractSignature( candidate );
				reference.collectReferencesForDeclarationName(qualifiedName, locations, false);
			}
			else
				this.pdeInfo?.notifyDiagnostic(`Unable to find declaration for ${objectSymbol.name}`, this.pdeInfo.node);
		}
		focusedDeclFullName = psymb.PUtils.extractSignature( objectSymbol );
	}
	else
		focusedDeclFullName = pdeInfo.findNodeSymbolDefinitionName(parseNode);

	
	if(!focusedDeclFullName)
		return null;

	reference.collectReferencesForDeclarationName(focusedDeclFullName, locations, false);
	
	return handleRename(locations, newName);
}

export async function handleRename(locations: Location[], newName:string): Promise<WorkspaceEdit> 
{
	 const edits: { [uri: string]: TextEdit[] } = {};
	 let uris : string[] = [];

	for(let match of locations)
	{
		if (!edits[match.uri])
			edits[match.uri] = [];

		let replacement = TextEdit.replace(match.range, newName);

		if( !uris.includes(match.uri) )
			uris.push(match.uri);

		sortedPush(edits[match.uri], replacement )
	}

	for(let uri of uris)
	{
		const pdeName : string = path.basename(parseUtils.getPathFromUri(uri));
		let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
		if(!pdeInfo || !pdeInfo.syntaxTokens)
			continue;

		for(let edit of edits[uri])
			console.log(uri + " => "+edit.range.start.line + " | "+edit.range.start.character);

		const content = applyEditsToContent(pdeInfo.rawContent, edits[uri]);
		sketch.updatePdeContent(pdeName, content);
	}
	return { changes: edits };
}

function sortedPush(editLst: TextEdit[], edit : TextEdit)
{
	const index = editLst.findIndex(
		(edit) => edit.range.start.line > edit.range.start.line
			|| (edit.range.start.line === edit.range.start.line && edit.range.start.character > edit.range.start.character)
	);

	if (index !== -1) {
		editLst.splice(index, 0, edit);
	} else {
		editLst.push(edit);
	}
}

function applyEditsToContent(content: string, textEdits: TextEdit[]): string 
{
	const lines = content.split('\n');
	let result = '';
	let lineOffset = 0;
	let lastIsEOL = content[content.length-1] == '\n';

	for (let editIndex = 0; editIndex < textEdits.length; editIndex++) 
	{
		let edit = textEdits[editIndex];
		// Add lines before the edit range
		for ( ; lineOffset < edit.range.start.line; lineOffset++) 
			result += lines[lineOffset] + '\n';

		// Perform the replacement for the line in the edit range
		const sourceLine = lines[lineOffset];
		let newLine = "";

		if(edit.range.start.character > 0)
			newLine += sourceLine.substring(0, edit.range.start.character);

		// Iterate through the line until the next textEdit is not over the same line
		while (editIndex < textEdits.length-1 && textEdits[editIndex+1].range.start.line === edit.range.start.line) 
		{
			const nextEdit = textEdits[editIndex+1];
			const startOffset = edit.range.end.character;
			const endOffset = nextEdit.range.start.character;

			newLine += edit.newText;
			newLine += sourceLine.substring(endOffset, startOffset);

			edit = nextEdit;

			// Move to the next textEdit if it's on the same line
			editIndex++;
		}

		newLine += edit.newText;
		lineOffset++;

		if(edit.range.start.character > 0)
			newLine += sourceLine.substring(edit.range.end.character, sourceLine.length);

		newLine += '\n';
		result += newLine;
	}
	// Add remaining lines if any
	for (let i = lineOffset; i < lines.length; i++)
	{
		result += lines[i];
		if(i < lines.length-1 )
			result += '\n';
	}

	return result;
}