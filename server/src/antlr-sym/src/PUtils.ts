import {
	ReferenceKind,
	MethodFlags,
	Modifier,
} from "antlr4-c3";
import { PSymbolConstructor } from "./PSymbolConstructor";

import { PBaseSymbol } from "./PBaseSymbol";
import { PScopedSymbol } from "./PScopedSymbol";
import { PIScopedSymbol } from "./PIScopedSymbol";
import { PVariableSymbol } from "./PVariableSymbol";
import { PClassSymbol } from "./PClassSymbol";
import { PInterfaceSymbol } from "./PInterfaceSymbol";
import { PMethodSymbol } from "./PMethodSymbol";
import { PEnumSymbol } from "./PEnumSymbol";
import { PEnumMemberSymbol } from "./PEnumMemberSymbol";
import { PComponentSymbol } from "./PComponentSymbol";
import { PSymbolTable } from "./PSymbolTable";
import { PNamespaceSymbol } from "./PNamespaceSymbol";
import { PLibraryTable } from "./PLibraryTable";
import { IPType, PType, PTypeKind, PPrimitiveKind } from "./PType";
import { PGenericParamSymbol } from "./PGenericParamSymbol";
import { PParameterSymbol } from "./PParameterSymbol";
import { PThrowsSymbol } from "./PThrowsSymbol";


export class CallContext
{
	public outter : CallContext | undefined;
	public type : PType | undefined;
	public symbol : PScopedSymbol | undefined;
	public generics : Map<string, PType> = new Map<string, PType>();

	constructor( callerType : PType, callerSymbol : PScopedSymbol | undefined )
	{
		this.type = callerType;
		this.symbol = callerSymbol;
		PUtils.tryDefineCallGenerics(this);
	}
	setOutter(outter : CallContext | undefined) : CallContext
	{
		this.outter = outter;
		return this;
	}
	defineGeneric(name:string, asType : PType)
	{
		this.generics.set(name, asType);
	}
	getResolvedGeneric(name : string) : PType | undefined
	{
		let result : PType | undefined;
		result = this.generics.get(name);
		if(!result && this.outter)
			result = this.outter.getResolvedGeneric(name);
		return result;
	}
}

export class PUtils
{
	public static tryDefineCallGenerics(caller : CallContext)
	{
		if(!caller.symbol || !caller.type )
			return;
		let genericParams = PUtils.getAllDirectChildrenMatchSync(caller.symbol, PGenericParamSymbol);
		// what kind of generic were defined for this called symbol
		for(let i=0; i < genericParams.length; i++)
		{
			let genericName = genericParams[i].name;
			let definedType : PType | undefined;
			if(i < caller.type.genericTypes.length)
				definedType = caller.type.genericTypes[i];

			if(definedType)
				caller.defineGeneric(genericName, definedType);
		}
	}

	public static tryDefineCallGenericsFromParamTypeList(caller : CallContext, typeList : IPType[])
	{
		if((caller.symbol instanceof PMethodSymbol)==false)
			return;

		let genericParams = PUtils.getAllDirectChildrenMatchSync(caller.symbol, PGenericParamSymbol);
		if(genericParams.length == 0)
			return;

		let params = PUtils.getAllDirectChildrenMatchSync(caller.symbol, PParameterSymbol);
		// what kind of generic were defined for this called symbol
		for(let i=0; i < genericParams.length; i++)
		{
			let genericName = genericParams[i].name;
			let definedType : PType | undefined;

			// Try to find the param with the right generic
			for(let j=0; params!==undefined && j < params.length; j++)
			{
				let paramType = params[j].type;
				if(!paramType)
					continue;
				if(paramType.typeKind == PTypeKind.Array && paramType.arrayType && paramType.arrayType.typeKind == PTypeKind.Generic)
				{
					if( paramType.arrayType.name == genericName )
					{
						if(j < typeList.length)
							definedType = typeList[j].arrayType;
					}
				}
				else
				{
					for(let k=0; k < paramType.genericTypes.length; k++)
					{
						if( paramType.genericTypes[k].name == genericName )
						{
							if(j < typeList.length)
								definedType = typeList[j].genericTypes[k];
						}
					}
				}
			}

			if(definedType)
				caller.defineGeneric(genericName, definedType);
		}
	}

	public static hasModifier(modifiers:Modifier[], find:Modifier) : boolean
	{
		for(let mod of modifiers)
		{
			if(mod==find)
				return true;
		}
		return false;
	}

	public static cloneTypeAsInstance(type: PType) : PType
	{
		return PType.createClone(type).setReference(ReferenceKind.Instance);
	}

	public static ComponentSymbolToPType(comp: PComponentSymbol | undefined) : PType
	{
		if(comp === undefined)
			return PType.createUnknownType();
		else
		{
			let result : PType;
			if(comp instanceof PEnumSymbol)
				result = PType.createEnumType(comp.name);
			else if(comp instanceof PEnumMemberSymbol && comp.parent instanceof PEnumSymbol)
				return PUtils.ComponentSymbolToPType(comp.parent);
			else if(comp instanceof PClassSymbol)
				result = PType.createClassType(comp.name);
			else if(comp instanceof PInterfaceSymbol)
				result = PType.createInterfaceType(comp.name);
			else if(comp instanceof PNamespaceSymbol)
				result = PType.createNamespaceType(comp.name);
			else
				result = PType.createUnknownType();

			if(result && comp.parent && comp.parent instanceof PComponentSymbol)
				result.setOutter(PUtils.ComponentSymbolToPType(comp.parent));

			return result;

		}

	}

	public static addIfNotRepeated<T extends PBaseSymbol, Args extends unknown[]>(results: T[], candidates : T[])
	{
		for(let parentSymbol of candidates)
		{
			let found : boolean = false;
			for(let resultSymbol of results)
			{
				if( resultSymbol.name == parentSymbol.name )
				{
					found = true;
					break;
				}
			}
			if(!found)
				results.push(parentSymbol);
		}
	}

	public static compareSymbolName(symbol : PBaseSymbol, name:string|undefined, compareFullSignature:boolean=false) : boolean
	{
		let symbolName = symbol.name;
		if(symbol instanceof PMethodSymbol && !compareFullSignature) // if method, should search for specific signature or any with same name?
			symbolName = PUtils.extractMethodName(symbolName);
		return (symbolName == name);
	}

	public static getAllSymbolsSync<T extends PBaseSymbol, Args extends unknown[]>(ctx: PIScopedSymbol, t: PSymbolConstructor<T, Args>, name?:string, localOnly?: boolean, overridesAlso:boolean=false): T[]
	{
        const results = [];

		if(ctx instanceof PScopedSymbol)
		{
			const compareFullSignature : boolean = !!name && name.indexOf('(') >= 0;
			for (const child of ctx.children)
			{
				const isNameMatch = !name || PUtils.compareSymbolName(child, name, compareFullSignature);
				const isRightType = (child instanceof t );
				if (isRightType && isNameMatch)
					results.push(child);
			}
		}
		if(ctx instanceof PClassSymbol || ctx instanceof PInterfaceSymbol)
		{
			if(ctx.extends)
			{
				let extSymbol : PClassSymbol | undefined = PUtils.resolveComponentSyncFromPType(ctx, PClassSymbol, ctx.extends )
				if(extSymbol && extSymbol instanceof PClassSymbol)
				{
					const parentSymbols = PUtils.getAllSymbolsSync(extSymbol, t, name, true);
					if(overridesAlso)
						results.push(...parentSymbols);
					else
						PUtils.addIfNotRepeated(results, parentSymbols);
				}
			}
			if(ctx.implements)
			{
				for(let i=0; i < ctx.implements.length; i++ )
				{
					let extSymbol : PInterfaceSymbol | undefined = PUtils.resolveComponentSyncFromPType(ctx, PInterfaceSymbol, ctx.implements[i] )
					if( extSymbol )
					{
						const parentSymbols = PUtils.getAllSymbolsSync(extSymbol, t, name, true);
						if(overridesAlso)
							results.push(...parentSymbols);
						else
								PUtils.addIfNotRepeated(results, parentSymbols);
					}
				}
			}
		}
		else if(ctx instanceof PSymbolTable)
		{
			let symbols = PUtils.getAllMatchsSync(ctx.children, t, name)
			results.push(...symbols);

			let moreSymbols = PUtils.getAllMatchsSync(ctx.importStatics, t, name);
			results.push(...moreSymbols);
		}

        if (!localOnly && ctx.parent)
		{
			const parentSymbols = PUtils.getAllSymbolsSync(ctx.parent, t, name, false);
			results.push(...parentSymbols);
        }
        return results;
	}

	public static extractMethodName(signature:string)
	{
		let genericIndex = signature.indexOf('<');
		let paramIndex = signature.indexOf('(');
		let nameEndIndex = genericIndex >= 0 && (genericIndex < paramIndex) ? genericIndex : paramIndex;
		return signature.substring(0, nameEndIndex);
	}

	public static resolveChildSymbolSync<T extends PBaseSymbol, Args extends unknown[]>(ctx: PIScopedSymbol, t: PSymbolConstructor<T, Args>, name?:string): T | undefined
	{
		return PUtils.resolveSymbolMatchSync(ctx.children, t, name);
	}

	public static resolveSymbolMatchSync<T extends PBaseSymbol, Args extends unknown[]>(lst: PBaseSymbol[], t: PSymbolConstructor<T, Args>, name?:string): T | undefined
	{
		let result : T | undefined;
		for (const child of lst)
		{
			const isNameMatch = !name || (child.name == name);
			const isRightType = (child instanceof t );
			if (isRightType && isNameMatch)
			{
				result = child;
				break;
			}
		}
		return result;
	}

	public static getAllDirectChildrenMatchSync<T extends PBaseSymbol, Args extends unknown[]>(ctx: PIScopedSymbol, t: PSymbolConstructor<T, Args>, name?:string): T[]
	{
		return PUtils.getAllMatchsSync(ctx.children, t, name);
	}

	public static getAllMatchsSync<T extends PBaseSymbol, Args extends unknown[]>(list: PBaseSymbol[], t: PSymbolConstructor<T, Args>, name?:string): T[]
	{
		let result : T[] = [];
		const compareFullSignature = name && name.indexOf('(') >= 0;
		for (const child of list)
		{
			let childName = child.name;
			if(child instanceof PMethodSymbol && !compareFullSignature)
			{
				childName = PUtils.extractMethodName(childName);
			}
			const isNameMatch = !name || (childName == name);
			const isRightType = (child instanceof t );
			if (isRightType && isNameMatch)
				result.push( child );
		}
		return result;
	}

	public static getClassName( fullname : string )  : string
	{
		if(fullname && fullname.indexOf('.')>=0)
		{
			let nameParts : string [] = fullname.split(".");
			return nameParts[nameParts.length-1];
		}

		return fullname;
	}

	public static resolveSymbolSync<T extends PBaseSymbol, Args extends unknown[]>(ctx: PBaseSymbol, t: PSymbolConstructor<T, Args>, name?:string, localOnly?: boolean): T | undefined
	{
        let result : T | undefined;

		if(name && name.indexOf('.')>=0)
		{
			let nameParts : string [] = name.split(".");
			let callContext = PUtils.resolveSymbolSync(ctx, PScopedSymbol, nameParts[0], false );
			let partIndex = 1;
			while(callContext && partIndex < nameParts.length-1)
			{
				callContext = PUtils.resolveChildSymbolSync(callContext, PScopedSymbol, nameParts[partIndex]);
				partIndex++;
			}
			if(callContext)
				return PUtils.resolveChildSymbolSync(callContext, t, nameParts[partIndex] );
			else
				return undefined;
		}

		if(ctx instanceof PClassSymbol || ctx instanceof PInterfaceSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
			if(ctx.extends)
			{
				let extSymbol : PClassSymbol | undefined = PUtils.resolveComponentSyncFromPType(ctx, PClassSymbol, ctx.extends )
				if(extSymbol)
				{
					const resultSymbol = PUtils.resolveSymbolSync(extSymbol, t, name, true);
					if(resultSymbol)
						return resultSymbol;
				}
			}
			for(let impl of ctx.implements)
			{
				let implSymbol : PInterfaceSymbol | undefined = PUtils.resolveComponentSyncFromPType(ctx, PInterfaceSymbol, impl )
				if(implSymbol)
				{
					const resultSymbol = PUtils.resolveSymbolSync(implSymbol, t, name, true);
					if(resultSymbol)
						return resultSymbol;
				}
			}
		}
		else  if(ctx instanceof PScopedSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
		}
		if(ctx instanceof PSymbolTable)
		{
			let resultSymbol = ctx.resolveImportTableComponent(t, name);
			if(resultSymbol instanceof t)
				return resultSymbol;

			console.error("PSymbolTable.resolveComponentSync: "+name);
		}


        if (!localOnly && ctx.parent)
		{
			const parentSymbol = PUtils.resolveSymbolSync(ctx.parent, t, name, false);
			if(parentSymbol)
				return parentSymbol;
       }
        return undefined;
	}

	public static resolveGenericParamSymbol(ctx: PIScopedSymbol, ptype:IPType) : PGenericParamSymbol | undefined
	{
		if(ptype.outerType)
			return undefined;
		if(ptype.name.indexOf('.') >= 0 )
			return undefined;

		return PUtils.resolveGenericParamSymbolByName(ctx, ptype.name);
	}

	public static resolveGenericParamSymbolByName(ctx: PIScopedSymbol, genericName:string) : PGenericParamSymbol | undefined
	{
		let result : PGenericParamSymbol | undefined;
		while(ctx)
		{
			result = PUtils.resolveChildSymbolSync(ctx, PGenericParamSymbol, genericName);
			if(result)
				break;
			if( (ctx.parent instanceof PScopedSymbol)==false )
				break;
			// if( !(ctx.parent instanceof PClassSymbol) && !(ctx.parent instanceof PInterfaceSymbol) )
			// 	break;
			ctx = ctx.parent;
		}
		return result;
	}

	public static resolveSymbolSyncFromPType<T extends PBaseSymbol, Args extends unknown[]>(ctx: PIScopedSymbol, t: PSymbolConstructor<T, Args>, ptype:IPType): T | undefined
	{
		let outter : PComponentSymbol | undefined;
		if(ptype.outerType)
			outter = PUtils.resolveComponentSyncFromPType(ctx, PComponentSymbol, ptype.outerType);

		if(outter)
			return PUtils.resolveSymbolSync(outter, t, ptype.name);
		else
			return PUtils.resolveSymbolSync(ctx, t, ptype.name);
	}

	public static resolveComponentSyncFromPType<T extends PComponentSymbol, Args extends unknown[]>(ctx: PIScopedSymbol, t: PSymbolConstructor<T, Args>, ptype:IPType): T | undefined
	{
		let outter : PComponentSymbol | undefined;
		if(ptype.outerType)
			outter = PUtils.resolveComponentSyncFromPType(ctx, PComponentSymbol, ptype.outerType);

		if(outter)
			return PUtils.resolveComponentSync(outter, t, ptype.name);
		else
			return PUtils.resolveComponentSync(ctx, t, ptype.name);
	}

	public static resolveComponentSync<T extends PComponentSymbol, Args extends unknown[]>(ctx: PIScopedSymbol, t: PSymbolConstructor<T, Args>, name?:string): T | undefined
	{
        //let result : T | undefined;

		if(name && name.indexOf('.')>=0)
		{
			let nameParts : string [] = name.split(".");
			let callContext = PUtils.resolveComponentSync(ctx, PComponentSymbol, nameParts[0] );
			let partIndex = 1;
			while(callContext && partIndex < nameParts.length)
			{
				callContext = PUtils.resolveChildSymbolSync(callContext, PComponentSymbol, nameParts[partIndex]);
				partIndex++;
			}
			if(callContext instanceof t)
				return callContext;
			return undefined;
		}
		if(ctx instanceof PScopedSymbol)
		{
			const resultSymbol = PUtils.resolveChildSymbolSync(ctx, t, name);
			if(resultSymbol)
				return resultSymbol;
		}
		if(ctx instanceof PSymbolTable)
		{
			let resultSymbol = ctx.resolveImportTableComponent(t, name);
			if(resultSymbol instanceof t)
				return resultSymbol;

			console.error("PSymbolTable.resolveComponentSync: "+name);
		}
		else if (ctx.parent)
		{
			const parentSymbol = PUtils.resolveComponentSync(ctx.parent, t, name);
			if(parentSymbol)
				return parentSymbol;
       	}
    	return undefined;
	}

	public static resolveSymbolFromTypeSync(currentScope: PScopedSymbol, type: IPType): PScopedSymbol
	{
		let result : PScopedSymbol | undefined;
		if(type instanceof PClassSymbol)
			result = type;
		else if(type instanceof PInterfaceSymbol)
			result = type;
		else if(type instanceof PEnumSymbol)
			result = type;
		else if(type.typeKind == PTypeKind.Class || type.typeKind == PTypeKind.Interface ||
				type.typeKind == PTypeKind.Component || type.typeKind == PTypeKind.Namespace || type.typeKind == PTypeKind.Enum)
		{
			result = PUtils.resolveComponentSyncFromPType(currentScope, PComponentSymbol, type );
		}
		if(!result)
			result = currentScope;
		return result;
	}

	public static resolveTypeNameReference(currentScope : PScopedSymbol, typeName: string) : PScopedSymbol | undefined
	{
		let callContext : PScopedSymbol | undefined;
		callContext = PUtils.resolveSymbolSync(currentScope, PClassSymbol, typeName, false );
		if(!callContext)
			callContext = PUtils.resolveSymbolSync(currentScope, PInterfaceSymbol, typeName, false );
		if(!callContext)
			callContext = PUtils.resolveSymbolSync(currentScope, PNamespaceSymbol, typeName, false );
		return callContext;
	}

	public static getFirstParentMatch<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>, ctx: PBaseSymbol): T | undefined
	{
		if (!ctx.parent)
			return;
		if(ctx.parent instanceof t)
			return ctx.parent;
		return PUtils.getFirstParentMatch(t, ctx.parent);
	}

	public static resolveVariableDeclaration(name:string, symb : PBaseSymbol) : PVariableSymbol | undefined
	{
		let res : PBaseSymbol | undefined = symb.resolveSync(name);
		if(res instanceof PVariableSymbol)
			return res;
		return;
	}

	public static comparePrimitiveKind(symbolType : IPType, primKind : PPrimitiveKind) : boolean
	{
		if(symbolType.typeKind == PTypeKind.Primitive && symbolType instanceof PType)
			return symbolType.primitiveKind == primKind;
		else if(symbolType.typeKind == PTypeKind.Class)
			return PType.canClassBeBoxedOrAutoboxed(symbolType, primKind);
		return false;
	}

	public static convertSymbolTypeToString(symbolType : IPType | undefined, full:boolean=false) : string
	{
		if(!symbolType)
			return "<unknown>";

		if(symbolType.typeKind == PTypeKind.Array && symbolType instanceof PType)
		{
			if(symbolType.arrayType)
				return PUtils.convertSymbolTypeToString(symbolType.arrayType, full) + "[]"
			else
				return "<unknown> []"
		}
		else if(symbolType.typeKind == PTypeKind.Class || symbolType.typeKind == PTypeKind.Interface)
		{
			let result : string;
			if(full)
				result = symbolType.name;
			else
				result = symbolType.name.substring(symbolType.name.lastIndexOf(".")+1);

			if(symbolType.genericTypes.length > 0)
				result += "<";
			for(let i=0; i < symbolType.genericTypes.length; i++ )
			{
				if(i > 0)
					result += ", ";
				result += PUtils.convertSymbolTypeToString(symbolType.genericTypes[i], full)
			}
			if(symbolType.genericTypes.length > 0)
				result += ">";

			return result;
		}
		else
			return symbolType.name;
	}

	static checkComparableTypes(left: IPType, right: IPType, scope: PScopedSymbol) : boolean
	{
		let comparingInterfaces = left.typeKind == PTypeKind.Interface || right.typeKind == PTypeKind.Interface;
		let comparingClasses = left.typeKind == PTypeKind.Class || right.typeKind == PTypeKind.Class;
		let comparingGenericClasses = left.typeKind == PTypeKind.Generic || right.typeKind == PTypeKind.Generic;
		let comparingEnums = left.typeKind == PTypeKind.Enum || right.typeKind == PTypeKind.Enum;

		let comparingArray = left.typeKind == PTypeKind.Array || right.typeKind == PTypeKind.Array;
		let comparingNull = left.name == "null" || right.name == "null";
		let comparingPrimitive = left.typeKind == PTypeKind.Primitive || right.typeKind == PTypeKind.Primitive;

		if((comparingInterfaces || comparingClasses || comparingArray || comparingGenericClasses || comparingEnums) && comparingNull)
			return true;

		if(comparingClasses && comparingPrimitive)
		{
			let primitive = left.typeKind == PTypeKind.Primitive ? left : right;
			let classType = left.typeKind == PTypeKind.Class ? left : right;
			let primitiveKind : PPrimitiveKind = (primitive instanceof PType && primitive.primitiveKind !== undefined) ? primitive.primitiveKind : PPrimitiveKind.Unknown;
			return PType.canClassBeBoxedOrAutoboxed(classType, primitiveKind);
			// if(classType.name == "Object" || PType.isDefaultObjectPath(classType.name))
			// 	return true;

			// let classSymb = PUtils.resolveSymbolFromTypeSync(scope, classType);
			// if(!classSymb)
			// 	return false;
			// let callContext = PUtils.resolveSymbolSync(classSymb, PMethodSymbol, primitive.name+"Value", true );
			// return callContext !== undefined;
		}
		if(comparingArray && comparingClasses)
			return true;

		return left.typeKind == right.typeKind;
	}

	public static setMethodLastVargs( method : PMethodSymbol)
	{
		method.methodFlags |= MethodFlags.Virtual;
	}

	public static hasMethodLastVargs( method : PMethodSymbol)
	{
		return (method.methodFlags & MethodFlags.Virtual) != 0;
	}

	public static extractSignature( symbol : PBaseSymbol ) : string
	{
		let result : string;
		if(symbol.parent && !(symbol.parent instanceof PSymbolTable) && !(symbol.parent instanceof PLibraryTable) )
			result = PUtils.extractSignature(symbol.parent) + '.' + symbol.name;
		else
			result = symbol.name;

		// if(symbol instanceof PMethodSymbol)
		// 	result += PUtils.convertToSignature(symbol);

		return result;
	}

	public static convertToSignature( method : PMethodSymbol ) : string
	{
		let genericParams : PGenericParamSymbol [] = PUtils.getAllDirectChildrenMatchSync(method, PGenericParamSymbol);
		let throwsParams : PThrowsSymbol [] = PUtils.getAllDirectChildrenMatchSync(method, PThrowsSymbol);
		let params : PParameterSymbol [] = PUtils.getAllDirectChildrenMatchSync(method, PParameterSymbol);
		let returnSignature = PUtils.convertPTypeToSignature(method.returnType);
		let paramsSignature : string = "";
		let genericSignature : string = "";
		let throwsSignature : string = "";

		if(genericParams.length>0)
		{
			genericSignature += '<';
			for(let param of genericParams)
			{
				genericSignature += param.name;
				genericSignature += ':';

				for(let i=0; i < param.formalTypes.length; i++ )
				{
					if(i!=0 || param.formalTypes[i].typeKind != PTypeKind.Class)
						genericSignature += ':';
					genericSignature += PUtils.convertPTypeToSignature(param.formalTypes[i]);
				}

			}
			genericSignature += '>';
		}

		for(let param of params)
			paramsSignature += PUtils.convertPTypeToSignature(param.type);

		for(let throwParam of throwsParams)
			throwsSignature += '^' + PUtils.convertPTypeToSignature(throwParam.type);

		let result : string = `${genericSignature}(${paramsSignature})${returnSignature}${throwsSignature}`;

		return result;
	}

	public static convertPTypeToSignature( type : PType | undefined ) : string
	{
		if(type == undefined)
			return 'V';
		if(type.typeKind == PTypeKind.Primitive)
			return PUtils.convertPrimitiveToSignature(type.primitiveKind ?? PPrimitiveKind.Unknown);
		else if(type.typeKind == PTypeKind.Void)
			return 'V';
		else if(type.typeKind == PTypeKind.Class || type.typeKind == PTypeKind.Interface || type.typeKind == PTypeKind.Component || type.typeKind == PTypeKind.Enum)
		{
			let result = 'L' + PUtils.convertComponentToSignature(type);
			result += ';';
			return result;
		}
		else if(type.typeKind == PTypeKind.Array)
			return '['+PUtils.convertPTypeToSignature(type.arrayType);
		else if(type.typeKind == PTypeKind.GenericDecl)
		{
			if(type.name=='?')
				return '*';
			else if(type.name=='=')
				return PUtils.convertPTypeToSignature(type.extendType)
			else if(type.name=='+')
				return '+' + PUtils.convertPTypeToSignature(type.extendType);
			else if(type.name=='-')
				return '-' + PUtils.convertPTypeToSignature(type.extendType);
		}
		else if(type.typeKind == PTypeKind.Generic)
		{
			return 'T' + type.name + ';';
		}
		return 'V';
	}

	public static convertPrimitiveToSignature( kind : PPrimitiveKind ) : string
	{
		if(kind == PPrimitiveKind.Boolean )
			return 'Z';
		else if(kind == PPrimitiveKind.Byte )
			return 'B';
		else if(kind == PPrimitiveKind.Char )
			return 'C';
		else if(kind == PPrimitiveKind.Double )
			return 'D';
		else if(kind == PPrimitiveKind.Float )
			return 'F';
		else if(kind == PPrimitiveKind.Int )
			return 'I';
		else if(kind == PPrimitiveKind.Long )
			return 'J';
		else // if(kind == PPrimitiveKind.Short )
			return 'S';
	}

	public static convertComponentToSignature( type : PType ) : string
	{
		let result : string = "";
		if(type.outerType)
			result += PUtils.convertComponentToSignature(type.outerType) + "$";
		result += type.name.replace(/[.$]/g, "/");
		if(type.hasGenericParams())
		{
			result += '<';
			for( let genericParam of type.genericTypes)
				result += PUtils.convertPTypeToSignature(genericParam);
			result += '>';
		}
		return result;
	}
}
