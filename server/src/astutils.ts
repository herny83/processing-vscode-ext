import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext, Token } from 'antlr4ts';
import * as symb from 'antlr4-c3';
import * as psymb from "./antlr-sym"
import * as ls from 'vscode-languageserver';
import * as pp from './grammer/ProcessingParser';
import * as path from "path";
import * as fs from 'fs';

export function findIdentifierInRuleArray(contexts: ParseTree[], line: number, charPosInLine: number): TerminalNode | null
{
	let result : TerminalNode | null = null;
	for(let i : number = 0; i < contexts.length; i++ )
	{
		result = findIdentifierAtPosition(contexts[i], line, charPosInLine)
		if(result!=null)
			return result;
	}
	return null;
}

export function findIdentifierAtPosition(ctx: ParseTree, line: number, pos: number): TerminalNode | null
{

	if (ctx instanceof TerminalNode)
	{
		// Dont't try to analize if it's not a identifier
		if(ctx.symbol.type != pp.ProcessingParser.IDENTIFIER && ctx.symbol.type != pp.ProcessingParser.SUPER && ctx.symbol.type != pp.ProcessingParser.THIS)
			return null;
		if(checkTerminalNodeBounds(ctx, line, pos))
			return ctx;
	}
	else if (ctx instanceof ParserRuleContext)
	{
		if( checkRuleNodeBounds(ctx, line, pos)  )
		{
			if(ctx.children)
				return findIdentifierInRuleArray(ctx.children, line, pos);
		}
	}
	return null;
}

export function findParseTreeInRuleArray(contexts: ParseTree[], line: number, charPosInLine: number): ParseTree | null
{
	let result : ParseTree | null = null;
	for(let i : number = 0; i < contexts.length; i++ )
	{
		result = findParseTreeAtPosition(contexts[i], line, charPosInLine)
		if(result!=null)
			return result;
	}
	return null;
}

export function findParseTreeAtPosition(ctx: ParseTree, line: number, pos: number): ParseTree | null
{
	if (ctx instanceof TerminalNode)
	{
		// Dont't try to analize if it's not a identifier
		if(checkTerminalNodeBounds(ctx, line, pos))
			return ctx;
	}
	else if (ctx instanceof ParserRuleContext)
	{
		if( checkRuleNodeBounds(ctx, line, pos)  )
		{
			let result = null;
			if(ctx.children)
				result = findParseTreeInRuleArray(ctx.children, line, pos);
			return result ? result : ctx;
		}
	}
	return null;
}

export function findLeafSymbolAtPositionFromSymbols(symbols: symb.BaseSymbol[], line: number, pos: number): symb.BaseSymbol | undefined 
{
	let result : symb.BaseSymbol | undefined;
	for( let i : number = 0; i < symbols.length; i++ )
	{
		let sym : symb.BaseSymbol = symbols[i];
		if(sym instanceof symb.ScopedSymbol)
		{
			result = findScopeAtPosition(sym, line, pos);
			if(result)
				break			
		}
		else if( checkParseNodeBounds(sym.context, line, pos) )
			return sym;
	}
	return result;
}

export function findScopeAtPositionFromSymbols(symbols: symb.BaseSymbol[], line: number, pos: number): symb.ScopedSymbol | undefined 
{
	let result : symb.ScopedSymbol | undefined;
	for( let i : number = 0; i < symbols.length; i++ )
	{
		let sym : symb.BaseSymbol = symbols[i];
		if(sym instanceof symb.ScopedSymbol)
		{
			result = findScopeAtPosition(sym, line, pos);
			if(result)
				break			
		}
	}
	return result;
}

export function findScopeAtPosition(sym: symb.ScopedSymbol, line: number, pos: number): symb.ScopedSymbol | undefined 
{
	let ctx : ParseTree | undefined = sym.context;
	if(!ctx)
		return;

	if (ctx instanceof TerminalNode)
	{
		if(checkTerminalNodeBounds(ctx, line, pos))
			return sym;
	}
	else if (ctx instanceof ParserRuleContext)
	{
		if( checkRuleNodeBounds(ctx, line, pos) )
		{
			if(sym instanceof symb.ScopedSymbol)
			{
				let scoped : symb.ScopedSymbol = sym;
				let result : symb.ScopedSymbol | undefined =  findScopeAtPositionFromSymbols(scoped.children, line, pos);
				return result ? result : scoped;
			}
			else
				return sym;
		}
	}

	return;
}

function checkParseNodeBounds(ctx : ParseTree, line : number, pos : number) : boolean
{
	if (ctx instanceof TerminalNode)
		return checkTerminalNodeBounds(ctx, line, pos);
	else if(ctx instanceof ParserRuleContext)
		return checkRuleNodeBounds(ctx, line, pos);
	return false;
}

function checkTerminalNodeBounds(ctx : TerminalNode, line : number, pos : number) : boolean
{
	const token: Token = ctx.symbol;
	var lenght : number = token.stopIndex - token.startIndex + 1;
	return line === token.line && (pos >= token.charPositionInLine) && (pos <= token.charPositionInLine+lenght);
}

function checkRuleNodeBounds(ctx : ParserRuleContext, line : number, pos : number) : boolean
{
	const start : Token = ctx.start;
	const stop : Token = ctx.stop ?? ctx.start;
	var tokenLength : number = stop.stopIndex - stop.startIndex + 1;

	if (line < start.line || line > stop.line)
		return false;

	if(line === start.line && pos < start.charPositionInLine)
		return false;

	if(line === stop.line && pos > stop.charPositionInLine+tokenLength)
		return false;

	return true;
}

export function calcRangeFromParseTree(ctx: ParseTree|undefined) : ls.Range
{
	if (ctx instanceof TerminalNode)
	{
		const token: Token = ctx.symbol;
		var length : number = token.stopIndex - token.startIndex + 1;
		return ls.Range.create(token.line-1, token.charPositionInLine, token.line-1, token.charPositionInLine+length)
	}
	else if (ctx instanceof ParserRuleContext)
	{
		const start : Token = ctx.start;
		const stop : Token = ctx.stop ?? ctx.start;
		var stopLength : number = stop.stopIndex - stop.startIndex + 1;
		return ls.Range.create(start.line-1, start.charPositionInLine, stop.line-1, stop.charPositionInLine+stopLength);
	}
	return ls.Range.create(0, 0, 0, 1);
}  

// export function convertTypeArguments(args : pp.TypeArgumentContext[], result: psymb.PType[])
// {
// 	for(let j=0; j<args.length; j++)
// 	{
// 		let baseType : psymb.PType | undefined;
// 		let typeCtx = args[j].typeType();
// 		if(typeCtx)
// 		baseType = convertTypeType(typeCtx);
// 		if(!baseType)
// 			baseType = psymb.PType.createUnknownType();

// 		result.push(baseType);
// 	}
// } 

export function convertPrimitiveType(primitive : pp.PrimitiveTypeContext) : psymb.PType
{
	
	if(primitive.CHAR())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Char);
	if(primitive.BYTE())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Byte);
	if(primitive.SHORT())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Short);
	if(primitive.INT())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Int);
	if(primitive.LONG())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Long);
	if(primitive.FLOAT())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Float);
	if(primitive.DOUBLE())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Double);
	if(primitive.colorPrimitiveType())
		return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Color)
	//if(primitive.BOOLEAN())
	return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
	//return psymb.PType.createUnknownType(primitive.text);
}


export function buildFullClassName(identifs: TerminalNode[]) : string
{
	let result = identifs[0].text;
	for(let i=1; i < identifs.length; i++)
	{
		result += '.';
		result += identifs[i].text;
	}
	return result;
}

function getPdeName(anySymbol: any) : string | undefined
{
	return anySymbol.pdeName;
}

function getJavaSourceName(anySymbol: any) : string | undefined
{
	return anySymbol.sourceFileName;
}

export function findPdeName(baseSymbol : symb.BaseSymbol) : string | undefined
{
	let result : string | undefined = getPdeName(baseSymbol);
	if( result ) 
		return result;
	if(!baseSymbol.parent)
		return;
	return findPdeName(baseSymbol.parent);
}

export function findJavaSourceName(baseSymbol : symb.BaseSymbol) : string | undefined
{
	let result : string | undefined = getJavaSourceName(baseSymbol);
	if( result ) 
		return result;
	if(!baseSymbol.parent)
		return;
	return findJavaSourceName(baseSymbol.parent);
}

export function findJavaSourcePath(baseSymbol : symb.BaseSymbol) : string | undefined
{
	let javaFileName : string | undefined = getJavaSourceName(baseSymbol);
	while(!javaFileName && baseSymbol.parent)
	{
		baseSymbol = baseSymbol.parent;
		javaFileName = getJavaSourceName(baseSymbol);
	}
	if( !javaFileName ) 
		return undefined;
	if(!baseSymbol.parent)
		return;
	let javaSourceDirs = baseSymbol.parent.qualifiedName(path.sep, true, false);
	if(javaSourceDirs)
		return path.join(javaSourceDirs, javaFileName);
	return javaFileName;
}



export function  convertAliasType( type: psymb.PType, callContext : psymb.CallContext ) : psymb.PType
{
    if( !callContext.symbol )
    {
        console.error("Unable to resolve Generic Alias: "+type.name)
        return type;
    }
	let resolved = callContext.getResolvedGeneric(type.name);
	if(resolved)
		return resolved;
		
	let genericParams = psymb.PUtils.getAllMatchsSync(callContext.symbol.children, psymb.PGenericParamSymbol);
	//let genericParams = callContext.symbol.getNestedSymbolsOfTypeSync(psymb.PGenericParamSymbol);
	for(let i=0; i < genericParams.length; i++)
	{
		if(genericParams[i].name == type.name)
		{
			if(callContext.type && i < callContext.type.genericTypes.length )
				return callContext.type.genericTypes[i];

			if( genericParams[i].formalTypes && i < genericParams[i].formalTypes.length )
				return genericParams[i].formalTypes[0];
		}
	}
    if(callContext.outter)
		return convertAliasType(type, callContext.outter);
    console.error("Unable to resolve generic type: "+type.name);
	return type;
}


export function convertArrayAliasType( type: psymb.PType, callContext : psymb.CallContext ) : psymb.PType
{
    if( !callContext.symbol )
    {
        console.error("Unable to resolve Generic Alias: "+type.name)
        return type;
    }
	let resolved = callContext.getResolvedGeneric(type.arrayType.name);
	if(resolved)
	{
		let newResult : psymb.PType = psymb.PType.createClone(type);
		newResult.arrayType = resolved;
		return newResult;
	}
	return type;
}

export function convertComponentAliasType( type: psymb.PType, callContext : psymb.CallContext ) : psymb.PType
{
    if( !callContext.symbol )
    {
        console.error("Unable to resolve Generic Alias: "+type.name)
        return type;
    }
	for(let i=0; i < type.genericTypes.length; i++)
	{
		if(type.genericTypes[i].name=='?')
			continue;

		if(type.genericTypes[i].typeKind == psymb.PTypeKind.Generic)
			type.genericTypes[i] = convertAliasType(type.genericTypes[i], callContext);
		else if(type.genericTypes[i].typeKind == psymb.PTypeKind.Array && type.genericTypes[i].arrayType.typeKind == psymb.PTypeKind.Generic)
			type.genericTypes[i] =  convertArrayAliasType(type.genericTypes[i], callContext);
		else if(type.genericTypes[i].genericTypes.length > 0)
			type.genericTypes[i] = convertComponentAliasType(type.genericTypes[i], callContext);
	}
	return type;
	// let newResult : psymb.PType = psymb.PType.createClone(type);

	// let resolved = callContext.getResolvedGeneric(type.name);
	// if(resolved)
	// 	return resolved;
		
	// let genericParams = psymb.PUtils.getAllMatchsSync(callContext.symbol.children, psymb.PGenericParamSymbol);
	// //let genericParams = callContext.symbol.getNestedSymbolsOfTypeSync(psymb.PGenericParamSymbol);
	// for(let i=0; i < genericParams.length; i++)
	// {
	// 	if(genericParams[i].name == type.name)
	// 	{
	// 		if(callContext.type && i < callContext.type.genericTypes.length )
	// 			return callContext.type.genericTypes[i];

	// 		if( genericParams[i].formalTypes && i < genericParams[i].formalTypes.length )
	// 			return genericParams[i].formalTypes[0];
	// 	}
	// }
    // if(callContext.outter)
	// 	return convertAliasType(type, callContext.outter);
    // console.error("Unable to resolve generic type: "+type.name);
	// return type;
}

/**
 * Transforms a file uri to a path
 * 
 * @param uri File based Uniform resource identifier
 * @returns Path in OS style
 */
export function getPathFromUri(uri : string) : string 
{
	let path = uri;
	if(process.platform=='darwin')
		path = path.replace('file://', '');
	else // win
		path = path.replace('file:///', '');
	path =  path.replace('%3A', ':');

	return path;
}

/**
 * Transforms a path to a file urivsce package
 * 
 * @param path Path of a file
 * @returns Uniform resource identifier (URI) to the file path
 */
export function getUriFromPath(path : string) : string  
{
	let tempUri = path.replace(':', '%3A').replace(/\\/g, '/');
	if(process.platform=='darwin')
		return 'file://'+ tempUri;
	return 'file:///'+ tempUri;
}

export function removeTrailingSeparator(uri: string): string {
    return uri.replace(/[\/\\]+$/, '');
}

export function readProjectSettings(projectFolder: string): any {
    const settingsPath = path.join(projectFolder, '.vscode', 'settings.json');
    if (fs.existsSync(settingsPath)) {
        try {
            const content = fs.readFileSync(settingsPath, 'utf8');
            return JSON.parse(content);
        } catch (e) {
            // handle error
			console.error(`Error reading project settings from ${settingsPath}: ${e}`);
        }
    }
    return {};
}