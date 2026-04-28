import { Hover, MarkupContent } from 'vscode-languageserver';
import * as lsp from 'vscode-languageserver'
import * as sketch from './sketch'
import * as symb from 'antlr4-c3'
import * as parseUtils from './astutils'
import * as ast from 'antlr4ts/tree'
import * as psymb from "./antlr-sym"

export function scheduleHoverInfo(pdeInfo: sketch.PdeContentInfo, line: number, pos : number): lsp.Hover | null
{
	if( !pdeInfo.syntaxTokens)
		return null;

	let baseContextTree : ast.ParseTree | undefined = pdeInfo.syntaxTokens;
	let definition : psymb.PBaseSymbol | undefined;
	//let definition : symbols.BaseSymbol | undefined = await lookUpSymbolDefinition(pdeInfo.symbols, line, pos);
	// Finds for the symbol (block or scope) that contains our searched identifier
	let symbolContainer : psymb.PBaseSymbol | undefined =  parseUtils.findLeafSymbolAtPositionFromSymbols(pdeInfo.symbols, line, pos);
	if(symbolContainer && symbolContainer.context)
		baseContextTree = symbolContainer.context;

	if(!baseContextTree)
		return null;
	
	// from our symbol container we can reach out the TerminalNode (it has to be a child of the symbol context) that we are searching for 
	let parseNode : ast.TerminalNode | null = parseUtils.findIdentifierAtPosition(baseContextTree, line, pos);
	if(!parseNode)
		return null;
	
	let accessByReference : boolean = false;
	let qualifiedName = pdeInfo.findNodeSymbolDefinitionName(parseNode);
	if(qualifiedName)
	{
		accessByReference = qualifiedName.indexOf('#') >= 0;
		definition = pdeInfo.findSymbol(qualifiedName);
	}
	
	let contextIType = pdeInfo.findNodeContextTypeDefinition(parseNode);

	let hover : Hover | null = null;
	let contextSymbol : psymb.PScopedSymbol | undefined;

	let callContext : psymb.CallContext | undefined = pdeInfo.findNodeCallContext(parseNode);
	if(!callContext)
	{
		if(definition instanceof psymb.PScopedSymbol)
			contextSymbol = definition;
		let contextType : psymb.PType | undefined;
		if(contextIType)
			contextType = psymb.PType.createFromIType(contextIType);
		callContext = new psymb.CallContext(contextType, contextSymbol);
	}

	if(definition)
	{
		hover = {
			contents: formatHoverContent(definition, callContext),
			range: parseUtils.calcRangeFromParseTree(parseNode)
		}
	}
	return hover;
}

function formatHoverContent(baseSymbol : psymb.PBaseSymbol, callContext : psymb.CallContext ) : MarkupContent
{
	let result = "";
	let isLocalVar = false;
	if(baseSymbol instanceof psymb.PClassSymbol)
		result += "(class) ";
	else if(baseSymbol instanceof psymb.PMethodSymbol)
	{
		if(baseSymbol.returnType)
			result += "(function) ";
		else
			result += "(constructor) ";
	}
	else if(baseSymbol instanceof psymb.PFieldSymbol)
		result += "(field) ";
	else if(baseSymbol instanceof psymb.PParameterSymbol)
		result += "(param) ";
	else if(baseSymbol instanceof psymb.PVariableSymbol)
	{
		if( (baseSymbol.parent instanceof psymb.PClassSymbol)==false)
			isLocalVar = true;
		if(isLocalVar)
			result += "(local var) ";
		else
			result += "(var) ";
	}
	else if(baseSymbol instanceof psymb.PNamespaceSymbol)
		result += "(namespace) ";

	//result += "\n\n---\n";
	result += "\n```java\n"
	if(baseSymbol instanceof psymb.PMethodSymbol)
	{
		if(baseSymbol.returnType)
		{
			if(baseSymbol.returnType.typeKind == psymb.PTypeKind.Generic)
				result +=  extractClassName(parseUtils.convertAliasType(baseSymbol.returnType, callContext).name) + " ";
			else
				result += typeTypeToString(baseSymbol.returnType) + " ";
		} 
	}
	if(baseSymbol instanceof psymb.PVariableSymbol)
		result += typeTypeToString(baseSymbol.type) + " ";

	if(baseSymbol instanceof psymb.PMethodSymbol)
		result += psymb.PUtils.extractMethodName(baseSymbol.name);
	else
		result += baseSymbol.name;

	if(baseSymbol instanceof psymb.PVariableSymbol && baseSymbol.value != null )
		result += " = " + baseSymbol.value;
	
	if(baseSymbol instanceof psymb.PMethodSymbol)
	{
		result += "(";
		let params = baseSymbol.getAllSymbolsSync(psymb.PParameterSymbol, true);
		for(let i = 0; i < params.length; i++)
		{
			if(i>0)
				result += ", ";
			let param = params[i];
			if( param instanceof psymb.PParameterSymbol)
				result += resolveTypeName(param.type, callContext);
			else 
				result += "<unknown>";
		}
		result += ")";
	}
	result += "\n```";
	result += "\n---";

	let hasParameters : boolean = false;
	let hasReturnType : boolean = false;
	// Add Parameters section
	if (baseSymbol instanceof psymb.PMethodSymbol && baseSymbol.getAllSymbolsSync(psymb.PParameterSymbol, true).length > 0) {
		result += `\n**Parameters:**\n`;
		for (const param of baseSymbol.getAllSymbolsSync(psymb.PParameterSymbol, true)) {
			result += `- \`${resolveTypeName(param.type, callContext)}\` `;
			if(param.name)
				result += `(${param.name}) `;
			result += "\n";
		}
		hasParameters = true;
	}

	// Return section
	if (baseSymbol instanceof psymb.PMethodSymbol && baseSymbol.returnType) {
		result += `\n**Returns:**\n- \`${resolveTypeName(baseSymbol.returnType, callContext)}\``;
		hasReturnType = true;
	}

	if(hasParameters || hasReturnType)
		result += "\n\n---\n";

	// Defined in section
	if(isLocalVar==false && (baseSymbol instanceof psymb.PParameterSymbol)==false && baseSymbol.parent)
	{
		const qname = baseSymbol.parent.qualifiedName(psymb.PNamespaceSymbol.delimiter, true, false);
		if (qname)
		{
			if (baseSymbol instanceof psymb.PMethodSymbol || baseSymbol instanceof psymb.PFieldSymbol) 
				result += `\n\n\n**Member of:**  *${qname}*`;
			else
				result += `\n\n\n**Defined in:**  *${qname}*`;
		}
	}

	const pdeName : string | undefined = parseUtils.findPdeName(baseSymbol);
	if(pdeName)
		result += `\n\n**PDE:**  *${pdeName}*`;

	let markupResult = {
		kind : lsp.MarkupKind.Markdown,
		value : result
	};
	return markupResult;
}

function resolveTypeName(type : psymb.PType, callContext : psymb.CallContext) : string
{
	if(type.typeKind == psymb.PTypeKind.Generic)
		return extractClassName(parseUtils.convertAliasType(type, callContext).name);
	else
		return typeTypeToString(type);
}

function resolveFormattedQualifiedPath(baseSymbol: psymb.PBaseSymbol): string {
	let segments: string[] = [];

	let current: psymb.PBaseSymbol | undefined = baseSymbol.parent;

	while (current && !(current instanceof psymb.PLibraryTable) && !(current instanceof psymb.PSymbolTable)) 
	{
		// if (current instanceof psymb.PClassSymbol) {
		// 	segments.unshift(`**${current.name}**`); // Class → bold
		// } else if (current instanceof psymb.PNamespaceSymbol) {
		// 	segments.unshift(`*${current.name}*`); // Namespace → Italic
		// } else {
			segments.unshift(current.name);
		//}
		current = current.parent;
	}

	return segments.join('.');
}

function typeTypeToString(type: psymb.PType | undefined) : string
{
	if(!type)
		return "";
	
	if(type.typeKind == psymb.PTypeKind.Array)
		return typeTypeToString(type.arrayType) + "[]";
	if(type.typeKind == psymb.PTypeKind.Generic)
	{
		if(type.genericTypes.length==1)
			return typeTypeToString(type.genericTypes[0]);
		else 
			return type.name;
	}
		

	let result = extractClassName(type.name);
	if(type.genericTypes.length > 0)
	{
		result += '<';
		for(let i=0; i<type.genericTypes.length;i++)
		{
			if(i>0)
				result += ", ";
			result += typeTypeToString(type.genericTypes[i]);
		}
		result += '>';
	}
	return result;
}

function extractClassName(fullName:string) : string
{
	let lastIndex = fullName.lastIndexOf(psymb.PNamespaceSymbol.delimiter);
	return fullName.substring(lastIndex+1);
}