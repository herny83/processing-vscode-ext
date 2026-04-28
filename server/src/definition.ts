import { Definition, LocationLink, Location, Range } from 'vscode-languageserver'
import { DocumentUri } from 'vscode-languageserver-textdocument'
import * as pp from './grammer/ProcessingParser';
import * as parseUtils from './astutils'
import * as ast from 'antlr4ts/tree'
import * as sketch from './sketch'
import * as psymb from './antlr-sym'

export async function scheduleLookUpDefinition(pdeInfo: sketch.PdeContentInfo, line: number, pos: number): Promise<Definition | null>
{
	if(!pdeInfo.syntaxTokens)
		return null;

	let definition : psymb.PBaseSymbol | undefined;
	let treeContext : ast.ParseTree | undefined;
	// Finds for the symbol (block or scope) that contains our searched identifier
	let scopeAtPos : psymb.PScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(!scopeAtPos )
	{
		scopeAtPos = sketch.getMainClass();
		treeContext = pdeInfo.syntaxTokens;
	}
	else
		treeContext = scopeAtPos.context;

	if(!treeContext)
		return null;
	
	// from our symbol container we can reach out the TerminalNode (it has to be a child of the symbol context) that we are searching for 
	let parseNode : ast.TerminalNode | null = parseUtils.findIdentifierAtPosition(treeContext, line, pos);
	if(!parseNode)
		return null;
	
	let accessByReference : boolean = true;
	// We now filter out if the terminal node matches the symbolContainer
	// (means is also a declaration of some kind since we only record declarations)
	if(treeContext === parseNode.parent)
		definition = scopeAtPos;
	else
	{
		let qualifiedName = pdeInfo.findNodeSymbolDefinitionName(parseNode);
		if(qualifiedName)
		{
			accessByReference = qualifiedName.indexOf('#') >= 0;
			definition = pdeInfo.findSymbol(qualifiedName);
		}
	}
	if(!definition)
	{
		console.error(`Unable to find the symbol definition at ${pdeInfo.name}. (${(line)}:${pos})`);
		return null;
	}
	let definitionPdeName : string | undefined = parseUtils.findPdeName(definition);
	if(definitionPdeName)
	{
		let targetUri: DocumentUri = sketch.getUriFromPdeName(definitionPdeName);
		let targetRange: Range | null = calcDefinitionRange(definition.context);
		return targetRange ? Location.create(targetUri, targetRange ) : null;
	}
	else
	{
		let definitionJavaPath : string | undefined = parseUtils.findJavaSourcePath(definition);
		if(definitionJavaPath)
		{
			let javaFullPath : string | undefined = sketch.resolveJavaFromLibraries(definitionJavaPath);
			if(javaFullPath)
			{
				let targetUri: DocumentUri = parseUtils.getUriFromPath(javaFullPath);
				let targetRange: Range = Range.create(0, 1, 0, 1);
				return Location.create(targetUri, targetRange);
			}
		}

	}
	return null;
}

function calcDefinitionRange(ctx : ast.ParseTree | undefined) : Range | null
{
	if(!ctx)
		return null;

	if( ctx instanceof pp.MethodDeclarationContext)
		return parseUtils.calcRangeFromParseTree(ctx.IDENTIFIER());
	else if(ctx instanceof pp.ConstructorDeclarationContext)
		return parseUtils.calcRangeFromParseTree(ctx.IDENTIFIER());
	else if(ctx instanceof pp.ClassDeclarationContext)
		return parseUtils.calcRangeFromParseTree(ctx.IDENTIFIER());
	else
		return parseUtils.calcRangeFromParseTree(ctx);
}


