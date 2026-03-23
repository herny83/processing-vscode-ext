import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { Location, Range } from 'vscode-languageserver'
import { ParserRuleContext } from 'antlr4ts'
import * as parseUtils from './astutils'
import * as ast from 'antlr4ts/tree'
import * as symb from 'antlr4-c3'
import * as sketch from './sketch'
import * as psymb from './antlr-sym';
import { MethodDeclarationContext } from './grammer/ProcessingParser';


export async function scheduleLookUpReference(pdeInfo : sketch.PdeContentInfo, line : number, pos : number): Promise<Location[] | null>
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

	// In case we try to rename a method...
	if(objectSymbol instanceof psymb.PMethodSymbol )
	{
		if(objectSymbol.returnType == undefined)
			collectReferencesForConstructor(pdeInfo, parseNode, locations);
		else
			collectReferencesForMethod(objectSymbol, locations);
		return locations;
	}

	// If the symbol is a class, interface of enum then me make sure to rename all the constructors too
	else if( objectSymbol instanceof psymb.PClassSymbol || 
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
				collectReferencesForDeclarationName(qualifiedName, locations);
			}
			else
				this.pdeInfo?.notifyDiagnostic(`Unable to find candidate reference symbol for ${objectSymbol.name}`, this.pdeInfo.node);
		}
		if(objectSymbol !== undefined)
			focusedDeclFullName = psymb.PUtils.extractSignature( objectSymbol );
		else
			this.pdeInfo?.notifyDiagnostic(`Unable to find symbol reference XXX for ${objectSymbol.name}`, this.pdeInfo.node);
	}
	else
		focusedDeclFullName = pdeInfo.findNodeSymbolDefinitionName(parseNode);
		
	if(!focusedDeclFullName)
		return null;

	await collectReferencesForDeclarationName(focusedDeclFullName, locations, false);
	return locations;
}

export async function collectReferencesForDeclarationName(declName : string, resultant : Location [], all:boolean=true)
{
	for (let pdeInfo of sketch.getAllPdeInfos()) 
	{
		let pdeUri : string = sketch.getUriFromPdeName(pdeInfo.name);
		let result : Range[] | undefined = pdeInfo.getUsageReferencesForQualifiedName(declName, all)
		if(result)
		{
			for(let candidate of result)
				sortedPush(resultant, Location.create(pdeUri, candidate));// resultant.push(Location.create(pdeUri, candidate));
		}
	}
}


function collectReferencesForMethod(methodSymbol : psymb.PMethodSymbol, locations : Location [])
{
	let ownerSymbol : symb.BaseSymbol | undefined = psymb.PUtils.getFirstParentMatch(psymb.PComponentSymbol, methodSymbol);
	if(ownerSymbol instanceof psymb.PComponentSymbol)
	{
		let candidates = psymb.PUtils.getAllSymbolsSync(ownerSymbol, psymb.PMethodSymbol, methodSymbol.name, true, true);
		for(let candidate of candidates)
		{
			let qualifiedName : string = psymb.PUtils.extractSignature( candidate );
			collectReferencesForDeclarationName(qualifiedName, locations);
		}
		collectImplementationsForMethod(ownerSymbol, methodSymbol.name, locations);
	}
}

function collectImplementationsForMethod(ownerSymbol : psymb.PComponentSymbol, methodName : string, locations : Location [])
{
	if(ownerSymbol instanceof psymb.PClassSymbol)
	{
		let ownerFullName : string = psymb.PUtils.extractSignature( ownerSymbol );
		for (let pdeInfo of sketch.getAllPdeInfos()) 
		{
			let implementations : string[] | undefined = pdeInfo.getImplementationsForQualifiedName(ownerFullName);
			if(implementations)
			{
				let pdeUri : string = sketch.getUriFromPdeName(pdeInfo.name);
				for(let impl of implementations)
				{
					let implSymbol = pdeInfo.findSymbol(impl);
					if(implSymbol instanceof psymb.PComponentSymbol && !(implSymbol instanceof psymb.PNamespaceSymbol))
					{
						let candidate = psymb.PUtils.resolveChildSymbolSync(implSymbol, psymb.PMethodSymbol, methodName);
						if(candidate && candidate.context instanceof MethodDeclarationContext)
						{
							let range : Range = parseUtils.calcRangeFromParseTree(candidate.context.IDENTIFIER());
							sortedPush(locations, Location.create(pdeUri, range));
						}
						collectImplementationsForMethod(implSymbol, methodName, locations);
					}
				}
			}
		}
	}
}

function collectReferencesForConstructor(pdeInfo : sketch.PdeContentInfo, parseNode : ast.TerminalNode, locations : Location [])
{
	let focusedDeclFullName : string | undefined;
	focusedDeclFullName = pdeInfo.findNodeSymbolDefinitionName(parseNode);
	collectReferencesForDeclarationName(focusedDeclFullName, locations);
}

function sortedPush(editLst: Location[], edit : Location)
{
	let index = -1;
	for(let i=0; i < editLst.length; i++)
	{
		let item = editLst[i];
		let uriComparer = edit.uri.localeCompare(item.uri);
		let lineComparer = edit.range.start.line - item.range.start.line;
		if( (uriComparer < 0) || 
			(uriComparer == 0 && lineComparer < 0) ||
			(uriComparer == 0 && lineComparer == 0 && edit.range.start.character < item.range.start.character) )
		{
			index = i;
			break;
		}
	}

	if (index !== -1) {
		editLst.splice(index, 0, edit);
	} else {
		editLst.push(edit);
	}
}

export class ReferencesVisitor extends ast.AbstractParseTreeVisitor<Range[]> implements ProcessingParserVisitor<Range[]>
{
	private searched : string | null = null;
	private resultsFound : Range[] = [];

	constructor() { super(); }
	protected defaultResult(): Range[] { return this.resultsFound; }

	public searchFor(word : string, ctx : ParserRuleContext) : Range[]
	{
		this.searched = word;
		this.resultsFound = [];
		this.visit(ctx);
		return this.defaultResult();
	}

	visitTerminal(node: ast.TerminalNode): Range[] 
	{
		if( node.text === this.searched )
			this.resultsFound.push(this.getRange(node));

		return this.defaultResult();
	}

	public getRange(ctx : ast.TerminalNode) : Range
	{
		let line : number = ctx.symbol.line;
		let pos : number = ctx.symbol.charPositionInLine;
		let length : number = ctx.symbol.stopIndex - ctx.symbol.startIndex + 1;
		return Range.create( line-1, pos, line-1, pos+length);
	}
}
