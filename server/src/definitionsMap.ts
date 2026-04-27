import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ErrorNode, TerminalNode } from 'antlr4ts/tree'
import { PComponentSymbol } from './antlr-sym/src/PComponentSymbol';
import { PdeContentInfo } from "./sketch";
import { Token } from 'antlr4ts'
import { Range } from 'vscode-languageserver'
import * as symb from 'antlr4-c3'
import { PReferenceKind } from './antlr-sym';
import { PIScopedSymbol } from './antlr-sym';
import * as pp from './grammer/ProcessingParser';
import * as parseUtils from './astutils'
import * as psymb from "./antlr-sym"

let integralTypes = [ 
	psymb.PPrimitiveKind.Boolean,
	psymb.PPrimitiveKind.Int,
	psymb.PPrimitiveKind.Long,
	psymb.PPrimitiveKind.Byte,
	psymb.PPrimitiveKind.Short,
	psymb.PPrimitiveKind.Char,
	psymb.PPrimitiveKind.Color
 ];
 let moddeableTypes = [
	psymb.PPrimitiveKind.Int,
	psymb.PPrimitiveKind.Long,
	psymb.PPrimitiveKind.Byte,
	psymb.PPrimitiveKind.Short,
	psymb.PPrimitiveKind.Float,
	psymb.PPrimitiveKind.Double,
]
let incrementableTypes = [
	psymb.PPrimitiveKind.Char,
	psymb.PPrimitiveKind.Int,
	psymb.PPrimitiveKind.Long,
	psymb.PPrimitiveKind.Byte,
	psymb.PPrimitiveKind.Short,
	psymb.PPrimitiveKind.Float,
	psymb.PPrimitiveKind.Double,
 ]

export class UsageVisitor extends AbstractParseTreeVisitor<psymb.IPType | undefined> implements ProcessingParserVisitor<psymb.IPType | undefined>
{
	private alreadyHandledErrors : Set<ErrorNode> = new Set<ErrorNode>();
	private mainClass : psymb.PClassSymbol;
	private pdeInfo: PdeContentInfo;
	private symbolTable : psymb.PSymbolTable;

	constructor(symbolTable : psymb.PSymbolTable, mainClass : psymb.PClassSymbol, pdeInfo: PdeContentInfo) 
	{ 
		super();
		this.symbolTable = symbolTable;
		this.pdeInfo = pdeInfo;
		this.mainClass = mainClass; 
	}
	protected defaultResult(): psymb.IPType | undefined { return this.mainClass; }

	visitClassDeclaration(ctx: pp.ClassDeclarationContext) : psymb.IPType | undefined
	{
		let classIdentifier = ctx.IDENTIFIER();
		let classBody = ctx.classBody();
		let typeParams = ctx.typeParameters();
		let extendsCtx = ctx.typeType();
		let implemCtx =ctx.typeList();

		let currentScope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);
		let classSymbol = psymb.PUtils.resolveComponentSync(currentScope, psymb.PClassSymbol, classIdentifier.text);
		let classFullName : string = psymb.PUtils.extractSignature( classSymbol );// + (isInstance?"":"#");
		this.pdeInfo?.registerDefinitionName(classIdentifier, classFullName, false);

		if(extendsCtx)
		{
			let callContext = this.registerUsageForTypeType(extendsCtx, currentScope);
			if(callContext.symbol!==undefined)
			{
				let extFullName : string = psymb.PUtils.extractSignature( callContext.symbol );
				this.pdeInfo?.registerImplementation(extFullName, classFullName);
			}
			else
				this.pdeInfo?.notifyDiagnostic(`Unable to find symbol for '${classIdentifier.text}' super class ${extendsCtx.text}`, extendsCtx);
		}
		if(implemCtx)
		{
			let typesCtx = implemCtx.typeType();
			for(let i=0; i<typesCtx.length; i++)
			{
				let callContext = this.registerUsageForTypeType(typesCtx[i], currentScope);
				if(callContext.symbol!==undefined)
				{
					let extFullName : string = psymb.PUtils.extractSignature( callContext.symbol );
					this.pdeInfo?.registerImplementation(extFullName, classFullName);
				}
				else
					this.pdeInfo?.notifyDiagnostic(`Unable to find symbol for '${classIdentifier.text}' implement: ${typesCtx[i].text}`, typesCtx[i]);
			
			}
		}
		if(typeParams)
		{
			let params = typeParams.typeParameter();
			for(let param of params)
			{
				let bound = param.typeBound();

				if(bound)
				{
					let boundTypesCtx = bound.typeType();
					
					for(let boundTypeCtx of boundTypesCtx)
						this.registerUsageForTypeType(boundTypeCtx, currentScope);
				}
			}
		}
		this.visit(classBody);
		return;
	}

	visitInterfaceDeclaration(ctx: pp.InterfaceDeclarationContext) : psymb.IPType | undefined
	{
		let identifier = ctx.IDENTIFIER();
		let currentScope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);
		let interfSymbol = psymb.PUtils.resolveComponentSync(currentScope, psymb.PInterfaceSymbol, identifier.text);
		if(interfSymbol !== undefined)
		{
			//this.pdeInfo?.registerDefinition(identifier, interfSymbol, false );
			let interfFullName : string = psymb.PUtils.extractSignature( interfSymbol );// + (isInstance?"":"#");
			this.pdeInfo?.registerDefinitionName(identifier, interfFullName, false);

			let implemCtx = ctx.typeList();
			if(implemCtx)
			{
				let typesCtx = implemCtx.typeType();
				for(let i=0; i<typesCtx.length; i++)
				{
					let callContext = this.registerUsageForTypeType(typesCtx[i], currentScope);
					let extFullName : string = psymb.PUtils.extractSignature( callContext.symbol );
					this.pdeInfo?.registerImplementation(extFullName, interfFullName);
				}
			}
		}
        else
            this.pdeInfo?.notifyDiagnostic(`Unable to find declaration for interface ${identifier.text}`, identifier);


		return this.visitChildren(ctx);
	}

	visitEnhancedForControl(ctx: pp.EnhancedForControlContext) : psymb.IPType | undefined
	{
		let iteratorType = this.visitExpression(ctx.expression());
		let typeTypeCtx = ctx.typeType();
		let currentScope : symb.ScopedSymbol = this.findScopeAtToken(typeTypeCtx.start);
		let context = this.registerUsageForTypeType(typeTypeCtx, currentScope);
		let declIdCtx = ctx.variableDeclaratorId();
		this.visitAndRegisterDeclaratorId(declIdCtx, currentScope);
		return;
	}

	visitForControl(ctx: pp.ForControlContext): psymb.IPType | undefined
	{
		let enhanced = ctx.enhancedForControl();
		if(enhanced)
			this.visitEnhancedForControl(enhanced);
		else
		{
			let forInit = ctx.forInit();
			let comparerExpression = ctx.expression();
			let updateExpression = ctx.expressionList();
			if(forInit)
				this.visitChildren(forInit);
			if(comparerExpression)
			{
				let currentScope = this.findScopeAtToken(comparerExpression.start);
				let expressionResult = this.visitAndRegisterExpression(comparerExpression, currentScope);
				if(expressionResult && !psymb.PUtils.comparePrimitiveKind(expressionResult, psymb.PPrimitiveKind.Boolean) )
					this.pdeInfo.notifyDiagnostic(`Incompatible types. Expression should be boolean (${expressionResult.name})`, comparerExpression)
				else if(!expressionResult)
					this.pdeInfo.notifyDiagnostic(`Unable to evaluate expression (${comparerExpression.text})`, comparerExpression)
			}
			if(updateExpression)
				this.visitChildren(updateExpression);
		}
		return;
	}



	visitLocalVariableDeclaration(ctx: pp.LocalVariableDeclarationContext) : psymb.IPType | undefined 
	{
		let scope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);
		let typeTypeContext = ctx.typeType();
		let callContext = this.registerUsageForTypeType(typeTypeContext, scope);
		let declaratorsContext = ctx.variableDeclarators();
		this.visitAndRegisterDeclarators(declaratorsContext, scope);
		return;// this.visitChildren(declaratorsContext);
	}

	visitEnumDeclaration(ctx: pp.EnumDeclarationContext): psymb.IPType | undefined
	{
		let currentScope = this.findScopeAtToken(ctx.start);
		//return this.tryDeclareEnum(ctx, undefined, []);
		return this.visitAndRegisterEnum(ctx, currentScope);
	}

	visitFormalParameter(ctx: pp.FormalParameterContext) : psymb.IPType | undefined
	{
		let callContext = this.registerUsageForDeclarationType(ctx.typeType());
		let scope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);
		this.visitAndRegisterDeclaratorId(ctx.variableDeclaratorId(), scope);
		return callContext.type;
	}

	visitFieldDeclaration(ctx: pp.FieldDeclarationContext) : psymb.IPType | undefined
	{
		let callContext = this.registerUsageForDeclarationType(ctx.typeType());
		let scope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);
		let declaratorsContext = ctx.variableDeclarators();
		this.visitAndRegisterDeclarators(declaratorsContext, scope);
		return callContext.type;
	}

	visitConstructorDeclaration(ctx: pp.ConstructorDeclarationContext) : psymb.IPType | undefined
	{
		let methodIdentifier = ctx.IDENTIFIER();

		let scope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);
		if(scope instanceof psymb.PMethodSymbol)
			this.pdeInfo.registerDefinition(methodIdentifier, scope);

		this.visitChildren(ctx.formalParameters());
		this.visitChildren(ctx.block());
		let qualifNameList = ctx.qualifiedNameList();
		if(qualifNameList)
		{
			let qualifName = qualifNameList.qualifiedName();
			if(qualifName && qualifName.length > 0)
			{
				for(let i=0; i < qualifName.length; i++ )
					this.visitAndRegisterQualifiedName(qualifName[i], scope);
			}
		}
		return;
	}

	visitMethodDeclaration(ctx: pp.MethodDeclarationContext) : psymb.IPType | undefined
	{
		let callContext : psymb.CallContext | undefined;
		let returnTypeOrVoid : pp.TypeTypeOrVoidContext = ctx.typeTypeOrVoid();
		let returnTypeCtx = returnTypeOrVoid.typeType();
		let methodIdentifier = ctx.IDENTIFIER();
		if(returnTypeCtx)
			callContext = this.registerUsageForDeclarationType(returnTypeCtx);

		let scope : symb.ScopedSymbol = this.findScopeAtToken(ctx.start);
		if(scope instanceof psymb.PMethodSymbol)
			this.pdeInfo.registerDefinition(methodIdentifier, scope);

		this.visitTerminal(methodIdentifier);
		this.visitChildren(ctx.formalParameters());
		this.visitChildren(ctx.methodBody());
		return callContext?.type;
	};

	visitExpression(ctx: pp.ExpressionContext) : psymb.IPType | undefined
	{
		return this.visitAndRegisterExpression(ctx, this.findScopeAtToken(ctx.start));
	}

	visitStatement(ctx: pp.StatementContext) : psymb.IPType | undefined
	{
		let switchToken = ctx.SWITCH();
		if(switchToken)
		{
			let currentScope = this.findScopeAtToken(ctx.start);
			let parExpression = ctx.parExpression();
			let switchBlockStatement = ctx.switchBlockStatementGroup();
			let switchLabel = ctx.switchLabel();
			let switchType : psymb.IPType | undefined;
			if(parExpression)
			{
				let expression = parExpression.expression();
				if(expression)
					switchType = this.visitAndRegisterExpression(expression, currentScope);
			}
			for(let i=0; i < switchBlockStatement.length; i++)
				this.visitAndRegisterSwithStatementGroup(switchBlockStatement[i], currentScope, switchType);
		
			for(let i=0; i < switchLabel.length; i++)
				this.visitAndRegisterSwithLabel(switchLabel[i], currentScope, switchType);
			
		}
		else
			return this.visitChildren(ctx);
	}

	visitErrorNode(node: ErrorNode): psymb.IPType | undefined
	{
		if(this.alreadyHandledErrors.has(node))
			return;

		let contextType : psymb.IPType | undefined;
		let scopedSymbol : symb.ScopedSymbol | undefined;
		let localOnly : boolean = false;

		for(let i:number=0; i < node.parent.childCount; i++ )
		{
			let childNode = node.parent.getChild(i);
			if(childNode instanceof TerminalNode)
			{
				this.alreadyHandledErrors.add(childNode);

				if(childNode.symbol.type == pp.ProcessingParser.IDENTIFIER)
				{
					if(scopedSymbol == undefined)
						scopedSymbol = this.findScopeAtToken(node.symbol);
					else
						localOnly = true;
					contextType = this.tryVisitAndRegisterIdentifier(scopedSymbol, childNode, localOnly);
				}
				else if(childNode.symbol.type == pp.ProcessingParser.DOT )
				{
					this.pdeInfo.registerContextType(childNode, contextType);
				}
			}
		}
	}

	visitAndRegisterDeclarators(declCtx : pp.VariableDeclaratorsContext, currentScope: symb.ScopedSymbol)
	{
		let declLst = declCtx.variableDeclarator();
		for(let i=0; i < declLst.length; i++ )
			this.visitAndRegisterDeclarator(declLst[i], currentScope);
	}

	visitAndRegisterDeclarator(declCtx : pp.VariableDeclaratorContext, currentScope: symb.ScopedSymbol)
	{
		let declIdCtx = declCtx.variableDeclaratorId();
		let initialCtx = declCtx.variableInitializer();

		this.visitAndRegisterDeclaratorId(declIdCtx, currentScope);
		if(initialCtx)
			this.visit(initialCtx);
	}

	visitAndRegisterDeclaratorId(declIdCtx : pp.VariableDeclaratorIdContext, currentScope : symb.ScopedSymbol)
	{
		if(!declIdCtx)
			return;
		let varIdentifier = declIdCtx.IDENTIFIER();
		let varSymbol = psymb.PUtils.resolveSymbolSync(currentScope, psymb.PVariableSymbol, varIdentifier.text );
		this.pdeInfo.registerDefinition(varIdentifier, varSymbol);
	}

	visitAndRegisterEnum(ctx: pp.EnumDeclarationContext, currentScope : symb.ScopedSymbol) : psymb.IPType | undefined
	{
		let enumID = ctx.IDENTIFIER();
		let implCtx = ctx.typeList();
		let enumMembers = ctx.enumConstants();
		let enumBodyDecl = ctx.enumBodyDeclarations();


		// let implementing : psymb.PType [] = [];
		// if(implCtx)
		// 	implementing = parseUtils.convertTypeListToSymbolTypeArray(implCtx);
		// for(let impl of implementing)
		// 	impl.typeKind = psymb.PTypeKind.Interface;

		let enumSymbol = psymb.PUtils.resolveSymbolSync(currentScope, psymb.PEnumSymbol, enumID.text );
		this.pdeInfo?.registerDefinition( enumID, enumSymbol, false );

		let enumContantArray = enumMembers.enumConstant();
		for(let enumConstant of enumContantArray)
		{
			let enumMemberID = enumConstant.IDENTIFIER();
			let args = enumConstant.arguments();
			let body = enumConstant.classBody();

			let enumMemberSymbol = psymb.PUtils.resolveChildSymbolSync(enumSymbol, psymb.PEnumMemberSymbol, enumMemberID.text );
			this.pdeInfo?.registerDefinition( enumMemberID, enumMemberSymbol, false );

			if(body)
				this.visitChildren(body);
		}
		if(enumBodyDecl)
			this.visitChildren(enumBodyDecl)

		return this.defaultResult();
	}

	visitAndRegisterSwithStatementGroup(ctx: pp.SwitchBlockStatementGroupContext, currentScope: symb.ScopedSymbol, switchType:psymb.IPType|undefined)
	{
		let switchLabel = ctx.switchLabel();
		let blockStatement = ctx.blockStatement();

		for(let i=0; i < switchLabel.length; i++)
			this.visitAndRegisterSwithLabel(switchLabel[i], currentScope, switchType);

		for(let i=0; i < blockStatement.length; i++)
			this.visit(blockStatement[i]);
	}

	visitAndRegisterSwithLabel(ctx: pp.SwitchLabelContext, currentScope: symb.ScopedSymbol, switchType:psymb.IPType|undefined)  : psymb.PType
	{
		if(ctx.DEFAULT())
			return;

		let expression = ctx.expression();
		let labelType : psymb.IPType | undefined;
		let identifier = ctx.IDENTIFIER();
		if(switchType && switchType.typeKind == psymb.PTypeKind.Enum)
		{
			if(identifier)
			{
				let enumMember : psymb.PEnumMemberSymbol | undefined;
				let callContext = psymb.PUtils.resolveComponentSyncFromPType(currentScope, PComponentSymbol, switchType );
				if(callContext)
					enumMember = psymb.PUtils.resolveChildSymbolSync(callContext, psymb.PEnumMemberSymbol, ctx._enumConstantName.text);
				this.pdeInfo.registerDefinition(ctx.IDENTIFIER(), enumMember );
			}
		}
		else if(expression)
		{
			labelType = this.visitAndRegisterExpression(ctx._constantExpression, currentScope );
		}
		else if(identifier)
		{
			let varSymbol : psymb.PVariableSymbol | undefined = psymb.PUtils.resolveSymbolSync(currentScope, psymb.PVariableSymbol, identifier.text, false );
			if(varSymbol)
			{
				// TODO: Should I check if it has the 'final' modifier?
				this.pdeInfo.registerDefinition(identifier, varSymbol);
				if(varSymbol.type)
				{
					this.tryFixComponentType(varSymbol.type, currentScope);
					return psymb.PUtils.cloneTypeAsInstance(varSymbol.type);
				}
				else
					return psymb.PType.createUnknownType();
			}
		}
	}

	visitAndRegisterEnumConstant(ctx: pp.SwitchLabelContext, currentScope: symb.ScopedSymbol, enumType:psymb.IPType|undefined)
	{
		let enumMember : psymb.PEnumMemberSymbol | undefined;
		if(enumType)
		{
			let callContext = psymb.PUtils.resolveComponentSync(currentScope, PComponentSymbol, enumType.name );
			if(callContext)
				enumMember = psymb.PUtils.resolveChildSymbolSync(callContext, psymb.PEnumMemberSymbol, ctx._enumConstantName.text);
		}
		this.pdeInfo.registerDefinition(ctx.IDENTIFIER(), enumMember );
	}

	visitAndRegisterExpression(ctx: pp.ExpressionContext, currentScope: symb.ScopedSymbol) : psymb.IPType | undefined
	{
		let methodCall : pp.MethodCallContext | undefined = ctx.methodCall();
		let expressions : pp.ExpressionContext[] = ctx.expression();
		let primary : pp.PrimaryContext | undefined = ctx.primary();
		let identif : TerminalNode | undefined = ctx.IDENTIFIER();
		let creator : pp.CreatorContext | undefined = ctx.creator();
		let typeTypeCtx : pp.TypeTypeContext | undefined = ctx.typeType();
		let expression : pp.ExpressionContext | undefined;

		if(expressions.length>0)
			expression = expressions[0];
		
		let parenToken = ctx.LPAREN();
		let dotToken = ctx.DOT();
		let instanceOfToken = ctx.INSTANCEOF();

		if(primary) 														// : primary
			return this.visitAndRegisterPrimary(primary, currentScope);

		else if(expressions.length == 1 && dotToken && identif )
			return this.visitAndRegisterVariable(expression, dotToken, identif, currentScope);

		else if(expressions.length == 2 && ctx.LBRACK() ) 					// | expression '[' expression ']'
		{
			let symbType = this.visitAndRegisterExpression(expressions[0], currentScope);
			this.visitAndRegisterExpression(expressions[1], currentScope);

			if(!symbType)
			{
				this.pdeInfo.notifyDiagnostic("Unable to evaluate expression: "+expressions[0].text, expressions[0]);
				symbType = psymb.PType.createUnknownType();
			}

			if(symbType && symbType.typeKind == psymb.PTypeKind.Array && symbType.arrayType)
			 	symbType = symbType.arrayType;
			return symbType;
		}
		else if(methodCall)													// | methodCall
			return this.visitAndRegisterMethodCall(expression, dotToken, methodCall, currentScope);

		else if( ctx.NEW() && creator )										// | NEW creator
			return this.visitAndRegisterCreator(creator, currentScope);

		else if( parenToken && typeTypeCtx && expression )
		{
			let result = this.visitAndRegisterExpression(expression, currentScope);
			let context = this.registerUsageForTypeType(typeTypeCtx, currentScope);
			this.tryFixComponentType(context.type, currentScope);
			return context.type;
		}
		else if( expression && instanceOfToken && typeTypeCtx)
		{
			let expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.registerUsageForDeclarationType(typeTypeCtx);
			return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
		}
		else if( expressions.length == 1 && dotToken )
		{
			let	expressionType = this.visitAndRegisterExpression(expressions[0], currentScope);
			this.pdeInfo.registerContextType(expression, expressionType);
			this.pdeInfo.registerContextType(dotToken, expressionType);
		}
		else if(expressions)
		{
			let results : psymb.IPType[] = [];
			for(let i=0; i < expressions.length; i++)
			{
				let result = this.visitAndRegisterExpression(expressions[i], currentScope);
				if(!result)
					result = psymb.PType.createUnknownType();
				if(result instanceof psymb.PType)
					this.tryFixComponentType(result, currentScope);
				results.push(result);
			}

			if(results.length==3 )
			{
				if( ctx.QUESTION() )										// expression '?' expression ':' expression
					return results[1];
			}
			else if(results.length==2)
			{
				let gt = ctx.GT();
				let lt = ctx.LT();

				if(ctx.ASSIGN())											// expression = expression
					return results[0];

				else if(gt.length == 1 || lt.length==1)											// expression ('<'|'>') expression
					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);

				else if(ctx.EQUAL() )										// expression '==' expression	
				{
					if(!psymb.PUtils.checkComparableTypes(results[0], results[1], currentScope))
						this.pdeInfo.notifyDiagnostic(`Incompatible types in expression (${results[0].name}) == (${results[1].name})`, ctx.EQUAL());

					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.NOTEQUAL())										// expression '!=' expression	
				{
					if(!psymb.PUtils.checkComparableTypes(results[0], results[1], currentScope))
						this.pdeInfo.notifyDiagnostic(`Incompatible types in expression (${results[0].name}) != (${results[1].name})`, ctx.NOTEQUAL());

					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.LE() || ctx.GE() )								// expression ('<='|'>=') expression
				{
					if( results[0].typeKind != results[1].typeKind )				
						this.pdeInfo.notifyDiagnostic(`Incompatible types in expression: possible lossy conversion (${results[0].name})`, expressions[0])
					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.AND() )											// expression '&&' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyDiagnostic(`Incompatible types. Left expression should be boolean (${results[0].name})`, expressions[0])
					if( !psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyDiagnostic(`Incompatible types. Right expression should be boolean (${results[1].name})`, expressions[1])
					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.OR() )											// expression '||' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyDiagnostic(`Incompatible types. Left expression should be boolean (${results[0].name})`, expressions[0])
					if( !psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Boolean) )				
						this.pdeInfo.notifyDiagnostic(`Incompatible types. Right expression should be boolean (${results[1].name})`, expressions[1])
					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.ADD() )											// expression '+' expression
				{
					if( this.IsTypeStringType(results[0]) || this.IsTypeStringType(results[1]) )
						return psymb.PType.createStringType();
					return results[0];
				}
				else if(ctx.SUB() )											// expression '-' expression
				{
					return results[0];
				}
				else if(ctx.MUL() )											// expression '*' expression
				{
					return results[0];
				}
				else if(ctx.DIV() )											// expression '/' expression
				{
					if( psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Double) || psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Double))
						return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Double);
					if( psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Float) || psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Float))
						return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Float);
					if( psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Long) || psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Long))
						return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Long);
					if( psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Int) || psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Int))
						return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Int);
					if( psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Color) || psymb.PUtils.comparePrimitiveKind(results[1], psymb.PPrimitiveKind.Color))
						return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Color);
					return results[1];
				}
				else if(ctx.BITAND())										// expression '&' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.BITOR())										// expression '|' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.CARET())										// expression '^' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(ctx.MOD())											// expression '%' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], moddeableTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], moddeableTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[1].name})`, expressions[1])
					return results[0];
				}
				else if(lt.length==2 || gt.length==2)						// expression ('<<' | '>>') expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[0].name})`, expressions[0])
					if( !this.validateExpressionAsPrimitiveType(results[1], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression (${results[1].name})`, expressions[1])
					//return results[0];
					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Int);
				}
				else if(ctx.ADD_ASSIGN())									// expression '+=' expression
					return results[0];
				else if(ctx.ADD_ASSIGN())									// expression '+=' expression
					return results[0];
				else if(ctx.SUB_ASSIGN())									// expression '-=' expression
					return results[0];
				else if(ctx.MUL_ASSIGN())									// expression '*=' expression
					return results[0];
				else if(ctx.DIV_ASSIGN())									// expression '/=' expression
					return results[0];
				else if(ctx.AND_ASSIGN())									// expression '&=' expression
					return results[0];
				else if(ctx.OR_ASSIGN())									// expression '|=' expression
					return results[0];
				else if(ctx.XOR_ASSIGN())									// expression '^=' expression
					return results[0];
				else if(ctx.MOD_ASSIGN())									// expression '%=' expression
					return results[0];
				else if(ctx.LSHIFT_ASSIGN())									// expression '<<=' expression
					return results[0];
				else if(ctx.RSHIFT_ASSIGN())									// expression '>>=' expression
					return results[0];
				else if(ctx.URSHIFT_ASSIGN())									// expression '>>>=' expression
					return results[0];
			}
			if(results.length==1)
			{
				if(ctx.BANG())												// '!' expression
				{
					if( !psymb.PUtils.comparePrimitiveKind(results[0], psymb.PPrimitiveKind.Boolean) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type. Expression should be of boolean type (${results[0].name})`, expressions[0]);
					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
				}
				else if(ctx.TILDE())										// '~' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], integralTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type in expression: possible lossy conversion (${results[0].name})`, expressions[0]);
					return results[0]
				}
				else if(ctx.INC())											// '++' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], incrementableTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible type using operator ++ (${results[0].name})`, expressions[0]);
					return results[0];
				}
				else if(ctx.DEC())											// '--' expression
				{
					if( !this.validateExpressionAsPrimitiveType(results[0], incrementableTypes) )
						this.pdeInfo.notifyDiagnostic(`Incompatible types using operator -- (${results[0].name})`, expressions[0]);
					return results[0];
				}
				else if(ctx.ADD())											// '+' expression
				{
					return results[0];
				}
				else if(ctx.SUB())											// '-' expression
				{
					return results[0];
				}
			}
		}
		else
			this.visitChildren(ctx);
	}

	visitAndRegisterCreator(creator: pp.CreatorContext, currentScope: symb.ScopedSymbol) : psymb.IPType | undefined
	{
		let primitiveTypeCtx : pp.PrimitiveTypeContext | undefined = creator.primitiveType();
		let createdObjectName : pp.CreatedObjectNameContext | undefined = creator.createdObjectName();
		let classCreatorCtx : pp.ClassCreatorRestContext | undefined = creator.classCreatorRest();
		let arrayCreatorCtx : pp.ArrayCreatorRestContext | undefined = creator.arrayCreatorRest();

		if(primitiveTypeCtx && arrayCreatorCtx)
		{
			let primType : psymb.PType = parseUtils.convertPrimitiveType(primitiveTypeCtx)
			let expressions = arrayCreatorCtx.expression();
			let initializer =  arrayCreatorCtx.arrayInitializer();
			for(let expr of expressions)
				this.visitAndRegisterExpression(expr, currentScope);

			return psymb.PType.createArrayType(primType);
		}
		else if(createdObjectName)
		{
			let contextType : psymb.PType | undefined;
			let createdTypesCtx = createdObjectName.createdType();
			for(let i:number = 0; i < createdTypesCtx.length; i++)
			{
				let createTypeCtx : pp.CreatedTypeContext = createdTypesCtx[i];
				let objIDCtx : TerminalNode = createTypeCtx.IDENTIFIER();
				let objTypeArguments : pp.TypeArgumentsOrDiamondContext = createTypeCtx.typeArgumentsOrDiamond();
				contextType = this.visitAndRegisterObjectIdentifier(objIDCtx, objTypeArguments, currentScope).setOutter(contextType);
				this.tryFixComponentType(contextType, currentScope);
			}
			
			if( classCreatorCtx )
			{
				let argumentsCt : pp.ArgumentsContext = classCreatorCtx.arguments();
				let classBodyCtx : pp.ClassBodyContext = classCreatorCtx.classBody();

				let paramExpressionList : pp.ExpressionListContext = argumentsCt.expressionList();
				let methodID = createdTypesCtx[createdTypesCtx.length-1].IDENTIFIER();
				let className = contextType.name;

				//let classObject = psymb.PUtils.resolveComponentSyncFromPType(currentScope, psymb.PClassSymbol, contextType);

				//this.visitChildren(classBodyCtx);
				this.visitBaseMethodCall(contextType, methodID, className, paramExpressionList, currentScope);
				return contextType;
			}
			else if( arrayCreatorCtx )
			{
				let expressions = arrayCreatorCtx.expression();
				for(let expr of expressions)
					this.visitAndRegisterExpression(expr, currentScope);
				return contextType;
			}
		}
		return undefined;
	}

	visitAndRegisterObjectIdentifier(identifier : TerminalNode, typeArguments : pp.TypeArgumentsOrDiamondContext, currentScope: symb.ScopedSymbol) : psymb.PType
	{
		//let identifier = ctx.IDENTIFIER();
		//let typeArguments = ctx.typeArgumentsOrDiamond();
		let idName : string = identifier.text;

		let genericArguments : psymb.PType[] = [];
		if(typeArguments)
		{
			let typeArgumentsCtx = typeArguments.typeArguments();
			if( typeArgumentsCtx )
			{
				let typeArgumentCtx : pp.TypeArgumentContext [] = typeArgumentsCtx.typeArgument();
				for(let i=0; i < typeArgumentCtx.length; i++)
				{
					let typeType = typeArgumentCtx[i].typeType();
					let context = this.registerUsageForTypeType(typeType, currentScope);
					genericArguments.push(context.type);
					// if(typeType)
					// 	genericArguments.push( parseUtils.convertTypeType(typeType) );
				}
			}
		}
		return psymb.PType.createComponentType(idName).setGenericTypes(genericArguments);
	}

	// visitTerminal(node: TerminalNode) : symb.Type | undefined
	// {
	// 	if(node.symbol.type == pp.ProcessingParser.IDENTIFIER)
	// 	{
	// 		let focusedDecl : symb.BaseSymbol | undefined = this.pdeInfo.findNodeSymbolDefinition(node);
	// 		if(focusedDecl===undefined)
	// 			this.pdeInfo.registerDefinition(node, focusedDecl);
	// 		return;
	// 	}
	// }

	visitAndRegisterMethodCall(expression: pp.ExpressionContext|undefined, dot:TerminalNode|undefined, methodCall: pp.MethodCallContext, currentScope: symb.ScopedSymbol) : psymb.IPType | undefined
	{
		let methodID =  methodCall.IDENTIFIER();
		let thisCall = methodCall.THIS();
		let superCall = methodCall.SUPER();
	
		let callScope: PIScopedSymbol = currentScope;
		let expressionType : psymb.IPType | undefined;
		let caster = methodCall.functionWithPrimitiveTypeName();
		let paramExpressionList = methodCall.expressionList();
		let lparen = methodCall.LPAREN();

		if(expression)
		{
			expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.pdeInfo.registerContextType(expression, expressionType);
			this.pdeInfo.registerContextType(dot, expressionType);
			this.pdeInfo.registerContextType(methodID, expressionType);
			this.pdeInfo.registerContextType(lparen, expressionType);

			if(expressionType)
				callScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, expressionType);
		}

		if(caster)
		{
			let booleanCast = caster.BOOLEAN();
			let byteCast = caster.BYTE();
			let charCast = caster.CHAR();
			let floatCast = caster.FLOAT();
			let intCast = caster.INT();
			let colorCast = caster.COLOR();
			let expressionToCast = caster.expressionList();

			if(expressionToCast)
				this.visitAndRegisterExpressionList(expressionToCast, currentScope);
			if(booleanCast)
				return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
			else if(byteCast)
				return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Byte);
			else if(charCast)
				return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Char);
			else if(floatCast)
				return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Float);
			else if(intCast)
				return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Int);
			else // colorCast
				return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Color);
		}
		else if(methodID)
		{
			return this.visitBaseMethodCall(expressionType, methodID, methodID.text, paramExpressionList, currentScope);
		}
		else if(thisCall)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope);
			if(result)
			{
				this.visitBaseMethodCall(result, thisCall, result.name, paramExpressionList, currentScope);
			}
		}
		else if(superCall)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope);
			if(result && result instanceof psymb.PClassSymbol)
			{
				// Calling the constructor from the super class
				if(result.extends)
				{
					let className = psymb.PUtils.getClassName(result.extends.name);
					this.visitBaseMethodCall(result.extends, superCall, className, paramExpressionList, currentScope);
				}
				return;
			}

		}
	}

	visitBaseMethodCall(callerType: psymb.IPType|undefined, methodID:TerminalNode, methodName:string, paramExpressionList:pp.ExpressionListContext|undefined, currentScope:symb.ScopedSymbol ) : psymb.PType | undefined
	{
		let callScope = currentScope;
		if(callerType)
		{
			if(callerType.typeKind == psymb.PTypeKind.Generic )
			{
				for(let ptype of callerType.implementTypes)
				{
					let result = this.visitBaseMethodCall(ptype, methodID, methodName, paramExpressionList, currentScope );
					if(result)
						return result;
				}
				return;
			}
			else 
				callScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, callerType);
		}
			
		
		let match : psymb.CallContext | undefined;
		let callContext : psymb.CallContext;
		let localOnly = callScope !== currentScope;

		if(callerType == undefined)
			callContext = new psymb.CallContext(undefined, callScope);
		else
			callContext = new psymb.CallContext(psymb.PType.createFromIType(callerType), callScope);

		let expressionParams = this.visitAndRegisterExpressionList(paramExpressionList, currentScope);
		let candidates = psymb.PUtils.getAllSymbolsSync(callScope, psymb.PMethodSymbol, methodName, localOnly); 

		if(candidates.length == 1)
		{
			match = new psymb.CallContext(undefined, candidates[0]).setOutter(callContext);
		}
		else if(candidates.length > 1)
		{
			match = this.resolveMethodOverloading(callContext, candidates, expressionParams, currentScope, true);
			if(!match)
				match = this.resolveMethodOverloading(callContext, candidates, expressionParams, currentScope, false);
		}
		else if(candidates.length == 0 && callScope.name == methodName ) // Is a constructor? could be not explicity defined
			return psymb.PType.createFromIType(callerType);

		let method : psymb.PMethodSymbol | undefined = match && match.symbol instanceof psymb.PMethodSymbol ? match.symbol : undefined;
		this.pdeInfo.registerDefinition(methodID, method);
		this.pdeInfo.tryRegisterCallContext(methodID, callContext);
		if(!method)
			return;

		if(!method.returnType || method.returnType.name == "void")
			return;

		let result : psymb.PType = method.returnType;

		psymb.PUtils.tryDefineCallGenericsFromParamTypeList(match, expressionParams);
		if(result.typeKind == psymb.PTypeKind.Generic)
			result = parseUtils.convertAliasType(result, match);
		else if(result.typeKind == psymb.PTypeKind.Array && result.arrayType.typeKind == psymb.PTypeKind.Generic)
			result =  parseUtils.convertArrayAliasType(result, match);
		else if(result.genericTypes.length > 0)
		{
			for(let k=0; k<result.genericTypes.length; k++)
				this.tryFixComponentType(result.genericTypes[k], method);
			result =  parseUtils.convertComponentAliasType(result, match);
		}
		this.tryFixComponentType(result, currentScope, method);
		return result;
	}

	visitAndRegisterExpressionList(expressionList: pp.ExpressionListContext|undefined, currentScope: symb.ScopedSymbol) : psymb.IPType []
	{
		let results : psymb.IPType [] = [];
		if(expressionList)
		{
			let expressions : pp.ExpressionContext [] | undefined = expressionList.expression();
			if(expressions)
			{
				for(let i : number = 0; i < expressions.length; i++)
				{
					let expressionType = this.visitAndRegisterExpression(expressions[i], currentScope);
					if(!expressionType)
						expressionType = psymb.PType.createUnknownType();
					results.push(expressionType);
				}
				
			}

		}
		return results;
	}

	visitAndRegisterPrimary(primary: pp.PrimaryContext, currentScope: symb.ScopedSymbol) : psymb.IPType | undefined
	{
		let thisCtx = primary.THIS();
		let identif = primary.IDENTIFIER();
		let literal = primary.literal();
		let expression = primary.expression();
		let superExpr = primary.SUPER();
		let typeTypeOrVoid = primary.typeTypeOrVoid();
		let classToken = primary.CLASS();

		if(expression)
			return this.visitAndRegisterExpression(expression, currentScope);

		else if(thisCtx)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope)
			this.pdeInfo.registerDefinition(thisCtx, result);
			   return psymb.PUtils.ComponentSymbolToPType(result).setReference(PReferenceKind.Instance);
		}
		if(superExpr)
		{
			let result = this.findFirstClassOrInterfaceUp(currentScope);
			if(result && result instanceof psymb.PClassSymbol)
			{
				let extSymb;
				if(result.extends)
					extSymb = psymb.PUtils.resolveComponentSyncFromPType(currentScope, psymb.PClassSymbol, result.extends);

				this.pdeInfo.registerDefinition(superExpr, extSymb);
				return psymb.PUtils.ComponentSymbolToPType(extSymb);
			}
				
		}
		else if(literal)
			return this.visitAndRegisterLiteral(literal);

		else if(identif)
			return this.visitAndRegisterVariable(undefined, undefined, identif, currentScope);

		else if(typeTypeOrVoid && classToken)
		{
			let typeTypeCtx = typeTypeOrVoid.typeType();
			if(typeTypeCtx)
			{
				let genericTypes : psymb.PType [] = [];
				let context = this.registerUsageForTypeType(typeTypeCtx, currentScope);
				genericTypes.push( context.type );
				return psymb.PType.createClassClassType().setGenericTypes(genericTypes);
			}
				
		}
	}

	visitAndRegisterLiteral(literal: pp.LiteralContext) : psymb.PType | undefined
	{
		if(literal.integerLiteral())
			return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Int);
		else if(literal.floatLiteral())
			return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Float);
		else if(literal.CHAR_LITERAL())
			return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Char);
		else if(literal.stringLiteral())
			return psymb.PType.createStringType()
		else if(literal.BOOL_LITERAL())
			return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Boolean);
		else if(literal.NULL_LITERAL())
			return psymb.PType.createNullType();
		else if(literal.hexColorLiteral())
			return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Color);
	}

	visitAndRegisterVariable(expression: pp.ExpressionContext|undefined, dot: TerminalNode|undefined, identifier: TerminalNode, currentScope: symb.ScopedSymbol) : psymb.IPType | undefined
	{
		let varScope = currentScope;
		let varName = identifier.text;
		let expressionType : psymb.IPType | undefined;
		if(expression)
		{
			expressionType = this.visitAndRegisterExpression(expression, currentScope);
			this.pdeInfo.registerContextType(expression, expressionType);
			this.pdeInfo.registerContextType(dot, expressionType);
			this.pdeInfo.registerContextType(identifier, expressionType);
			if(expressionType)
			{
				// A very special built-in case
				if(expressionType.typeKind == psymb.PTypeKind.Array && varName == 'length')
					return psymb.PType.createPrimitiveType(psymb.PPrimitiveKind.Int);
				
				varScope = psymb.PUtils.resolveSymbolFromTypeSync(currentScope, expressionType);
			}
		}
		let localOnly = varScope != currentScope;

		let result : psymb.IPType = this.tryVisitAndRegisterIdentifier(varScope, identifier, localOnly);
		return result;
	}


	visitCatchClause(ctx: pp.CatchClauseContext) : psymb.IPType | undefined
	{
		let catchType = ctx.catchType();
		let identif = ctx.IDENTIFIER();
		
		let currentScope : symb.ScopedSymbol = this.findScopeAtToken(identif.symbol);

		let qualifName = catchType.qualifiedName();
		if(qualifName && qualifName.length > 0)
		{
			for(let i=0; i < qualifName.length; i++ )
				this.visitAndRegisterQualifiedName(qualifName[i], currentScope);
		}

		let exceptParam = psymb.PUtils.resolveSymbolSync(currentScope, psymb.PVariableSymbol, identif.text);
		this.pdeInfo?.registerDefinition(identif, exceptParam );

		this.visit(ctx.block());
		return this.defaultResult();
	}

	visitAndRegisterQualifiedName(nameCtx : pp.QualifiedNameContext, currentScope : symb.ScopedSymbol ) : psymb.CallContext | undefined
	{
		let resultContext : psymb.CallContext | undefined;
		let childIndex = 0;
		while(childIndex < nameCtx.childCount)
		{
			let child = nameCtx.getChild(childIndex);
			if(child instanceof TerminalNode && child.symbol.type == pp.ProcessingParser.IDENTIFIER)
			{
				if(resultContext===undefined)
				{
					let symbol = psymb.PUtils.resolveSymbolSync(currentScope, PComponentSymbol, child.text);
					let type = psymb.PUtils.ComponentSymbolToPType(symbol);
					resultContext = new psymb.CallContext(type, symbol);
				}
				else
				{
					let symbol = psymb.PUtils.resolveSymbolSync(resultContext.symbol, PComponentSymbol, child.text, true);
					let type = psymb.PUtils.ComponentSymbolToPType(symbol).setOutter(resultContext.type);
					resultContext = new psymb.CallContext(type, symbol).setOutter(resultContext);
				}

				this.pdeInfo?.registerDefinition(child, resultContext?resultContext.symbol:undefined );
			}
			else if(child instanceof TerminalNode && child.symbol.type == pp.ProcessingParser.DOT)
			{
				this.pdeInfo.registerContextType(child, resultContext ? resultContext.type : undefined);
			}
			childIndex++;
		}

		return resultContext;
	}

	resolveMethodOverloading(callContext : psymb.CallContext, candidates: psymb.PMethodSymbol[], expressionList: psymb.IPType[], callContainer: symb.ScopedSymbol, perfectMatch:boolean=false) : psymb.CallContext | undefined
	{
		let finalCandidates: psymb.CallContext[] = []
		for (let candidate of candidates) 
		{
			let lastIsVarg = psymb.PUtils.hasMethodLastVargs(candidate);
			let requiredParams = psymb.PUtils.getAllMatchsSync(candidate.children, psymb.PParameterSymbol, undefined);
			for(let expressionParam of expressionList)
			{
				if(expressionParam.typeKind == psymb.PTypeKind.Generic)
				{
					let genericParam = psymb.PUtils.resolveGenericParamSymbolByName(candidate, expressionParam.name);
					if(genericParam)
						expressionParam.implementTypes = psymb.PType.createCloneArray(genericParam.formalTypes);
				}
			}
			let methodCallContext = new psymb.CallContext(undefined, candidate).setOutter(callContext);
			if (!this.compareMethodParameters(methodCallContext, requiredParams, lastIsVarg, expressionList, callContainer, perfectMatch))
				continue;

			finalCandidates.push(methodCallContext)
		}
		if(finalCandidates.length==0)
			return undefined;

		return finalCandidates[0];
	}

	compareMethodParameters(callContext : psymb.CallContext, requiredParams : psymb.PParameterSymbol [], lastIsVarg:boolean, userParams : psymb.IPType[], symbolContext : symb.ScopedSymbol, perfectMatch:boolean=false) : boolean
	{
		let lastParam : psymb.PType | undefined;
		if(lastIsVarg && requiredParams.length > 0 )
		{
			let lastType = requiredParams[requiredParams.length-1].type;
			if(lastType && lastType.typeKind == psymb.PTypeKind.Array && lastType.arrayType)
				lastParam = lastType.arrayType;
		}
		if(requiredParams.length < userParams.length && !lastIsVarg)
			return false;

		for(let i : number = 0; i < requiredParams.length || i < userParams.length; i++)
		{
			let requiredParam : psymb.PType | undefined;
			let argParam : psymb.PType | undefined; 

			if(i < requiredParams.length )
				argParam = requiredParams[i].type;

			if( lastIsVarg && (i >= (requiredParams.length-1)) )
				requiredParam = lastParam;
			else
				requiredParam = argParam;

			let isVArg : boolean = (i >= (requiredParams.length-1)) && lastIsVarg;
			let appliedParam : psymb.IPType | undefined = i < userParams.length ? userParams[i] : undefined;
			if( !appliedParam && isVArg )
				break;

			if( !requiredParam || !appliedParam )
				return false;

			this.tryFixComponentType(requiredParam, callContext.symbol, symbolContext);
			//this.tryFixComponentType(requiredParam, symbolContext, callContext.symbol);
			if( perfectMatch && psymb.PType.isCasteableToObjectType(appliedParam) && psymb.PType.isDefaultObjectPath(requiredParam.name) )
				continue;

			if( !this.compareObjectAgainstRequired(callContext, appliedParam, requiredParam, symbolContext, perfectMatch))
				return false;
		}
		return userParams.length <= requiredParams.length || lastIsVarg;
	}

	tryCompareGenericTypes(caller : psymb.CallContext, sourceType: psymb.PType, appliedType: psymb.IPType) : boolean
	{
		for(let i=0; i < sourceType.genericTypes.length; i++)
		{
			let requiredType : psymb.PType | undefined;
			let wildcardType = sourceType.genericTypes[i];
			if(wildcardType.typeKind == psymb.PTypeKind.GenericDecl)
				requiredType = wildcardType.extendType;
			else
				requiredType = wildcardType;

			if(requiredType)
			{
				if(requiredType.typeKind == psymb.PTypeKind.Generic)
				{
					let resolvedType = caller.getResolvedGeneric(requiredType.name);
					if(!resolvedType)
					{
						if(i < appliedType.genericTypes.length)
						{
							resolvedType = psymb.PType.createFromIType(appliedType.genericTypes[i]);
							caller.defineGeneric(requiredType.name, resolvedType);
						}
					}
				}
				else if( i < appliedType.genericTypes.length )
				{
					this.tryFixComponentType(appliedType.genericTypes[i], caller.symbol);
					this.tryFixComponentType(requiredType, caller.symbol);
					if( !this.compareObjectAgainstRequired(caller, appliedType.genericTypes[i], requiredType, caller.symbol, true))
						return false;
				}
			}
		}
		return true;
	}

	compareObjectAgainstGeneric(objectType : psymb.IPType | undefined, requiredGenericType : psymb.IPType | undefined, symbolContext : symb.ScopedSymbol, callContext : psymb.CallContext, perfectMatch:boolean=false) : boolean
	{
		if( !callContext.symbol )
		{
			console.error("Unable to resolve Generic Alias: "+requiredGenericType.name)
			return false;
		}
	
		let genericParams = psymb.PUtils.getAllMatchsSync(callContext.symbol.children, psymb.PGenericParamSymbol);
		// what kind of generic were defined for this called symbol
		for(let i=0; i < genericParams.length; i++)
		{
			if(genericParams[i].name == requiredGenericType.name)
			{
				if(callContext.type==undefined)
				{
					for(let extendType of genericParams[i].formalTypes)
					{
						if(objectType.typeKind == psymb.PTypeKind.Generic )
						{
							for(let implementingType of objectType.implementTypes)
							{
								if(this.compareObjectAgainstRequired(callContext, implementingType, extendType, symbolContext, perfectMatch))
									return true;
							}
							return false;
						}
						else
						{
							this.tryFixComponentType(extendType, symbolContext);
							if(this.compareObjectAgainstRequired(callContext, objectType, extendType, symbolContext, perfectMatch))
								return true;
						}
					}
				}
				else
				{
					if( callContext.type.genericTypes.length >= i )
					{
						this.tryFixComponentType(callContext.type.genericTypes[i], symbolContext);
						return this.compareObjectAgainstRequired(callContext, objectType, callContext.type.genericTypes[i], symbolContext, perfectMatch);
					}
				}
			}
		}
		if(callContext.outter)
			return this.compareObjectAgainstGeneric(objectType, requiredGenericType, symbolContext, callContext.outter, perfectMatch);
		console.error("Unable to resolve generic type: "+requiredGenericType.name);
	}

	compareObjectAgainstRequired(callContext : psymb.CallContext, appliedType : psymb.IPType | undefined, requiredType : psymb.IPType | undefined, symbolContext : symb.ScopedSymbol, perfectMatch:boolean=false) : boolean
	{
		if(requiredType===undefined || appliedType === undefined)
			return false;

		let comparingInterfaces = appliedType.typeKind == psymb.PTypeKind.Interface || requiredType.typeKind == psymb.PTypeKind.Interface;
		let comparingClasses = appliedType.typeKind == psymb.PTypeKind.Class || requiredType.typeKind == psymb.PTypeKind.Class;
		
		let comparingArray = appliedType.typeKind == psymb.PTypeKind.Array || requiredType.typeKind == psymb.PTypeKind.Array;
		let comparingEnum = appliedType.typeKind == psymb.PTypeKind.Enum || requiredType.typeKind == psymb.PTypeKind.Enum;
		let comparingPrimitive = appliedType.typeKind == psymb.PTypeKind.Primitive || requiredType.typeKind == psymb.PTypeKind.Primitive;
		let comparingSameType = appliedType.typeKind == requiredType.typeKind;

		if(appliedType.typeKind == psymb.PTypeKind.Null && psymb.PType.isNullableType(requiredType) )
			return true;

		if(requiredType.typeKind == psymb.PTypeKind.Generic)
		{
			let genericType = callContext.getResolvedGeneric(requiredType.name);
			this.tryFixComponentType(genericType, symbolContext);
			
			let resolvedType : psymb.PType | undefined;
			if( appliedType.typeKind == psymb.PTypeKind.Primitive && appliedType instanceof psymb.PType)
				resolvedType = psymb.PType.getBoxedPrimitiveType(appliedType.primitiveKind);
			else if(appliedType instanceof PComponentSymbol)
				resolvedType = psymb.PUtils.ComponentSymbolToPType(appliedType);
			else
				resolvedType = psymb.PType.createFromIType(appliedType);
			
			if(resolvedType)
			{
				if(genericType)
					return this.compareClassTypes(genericType, resolvedType, symbolContext, perfectMatch);
					//return resolvedType.getFullName() == genericType.getFullName();
				else
				{
					callContext.defineGeneric(requiredType.name, resolvedType);
					return true;
				}
			}
			else
				return false;
			
		}
	
		if(comparingClasses && comparingPrimitive)
		{
			let primitive = appliedType.typeKind == psymb.PTypeKind.Primitive ? appliedType : requiredType;
			let classType = appliedType.typeKind == psymb.PTypeKind.Class ? appliedType : requiredType;

			let primKind = primitive instanceof psymb.PType ? primitive.primitiveKind : psymb.PPrimitiveKind.Unknown;
			
			return psymb.PType.canClassBeBoxedOrAutoboxed(classType, primKind);
		}
		if(comparingArray && comparingClasses)
			return true;

		if(comparingSameType && comparingPrimitive)
			return this.comparePrimitiveNames(appliedType.name, requiredType.name, perfectMatch);

		if(comparingSameType && comparingArray)
			return this.compareObjectAgainstRequired(callContext, appliedType.arrayType, requiredType.arrayType, symbolContext, perfectMatch);

		if(comparingSameType && comparingEnum)
			return this.compareClassTypes(requiredType, appliedType, symbolContext, perfectMatch);

		if(requiredType.typeKind == psymb.PTypeKind.Class || requiredType.typeKind == psymb.PTypeKind.Interface )
		{
			if(requiredType.genericTypes && appliedType.genericTypes && requiredType.genericTypes.length > 0 && appliedType.genericTypes.length > 0)
			{
				for(let i=0; i < requiredType.genericTypes.length && i < appliedType.genericTypes.length; i++)
					callContext.defineGeneric(requiredType.genericTypes[i].name, appliedType.genericTypes[i]);
			}
			return this.compareClassTypes(requiredType, appliedType, symbolContext, perfectMatch);
		}

		if( !this.tryCompareGenericTypes(callContext, psymb.PType.createFromIType(requiredType), appliedType) )
			return false;

		return false;
	}

	comparePrimitiveNames(expressionTypeName: string, requiredName:string, perfectMatch:boolean=false) : boolean
	{
		if( expressionTypeName == requiredName )
			return true;
		if(perfectMatch)
			return false;

		if(requiredName==="int")
			return expressionTypeName == "char" || expressionTypeName == "color" || expressionTypeName == "byte";
		if(requiredName==="float")
			return expressionTypeName == "int" || expressionTypeName == "char";
		if(requiredName==="double")
			return expressionTypeName == "float" || expressionTypeName == "int" || expressionTypeName == "char";
		if(requiredName=="boolean")
			return expressionTypeName == "int" || expressionTypeName == "char";
		if(requiredName==="color")
			return expressionTypeName == "int";
		return false;
	}

	compareClassTypes(symbolType : psymb.IPType, expressionType : psymb.IPType, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		let requiredName = this.symbolTable.getFullPath(symbolType);
		let expressionName = this.symbolTable.getFullPath(expressionType);

		// If the types doesn't match and we are seeking for a perfect match then just fail
		if(perfectMatch )
		{
			if(requiredName != expressionName)
				return false;
			return true;
		}
		else
		{
			let isComparingDefaultObj = psymb.PType.isDefaultObjectPath(requiredName) || psymb.PType.isDefaultObjectPath(expressionName); 
			let isComparingArray = symbolType.typeKind == psymb.PTypeKind.Array || expressionType.typeKind == psymb.PTypeKind.Array;
			if(isComparingDefaultObj && isComparingArray)
				return true;

			if(requiredName == expressionName)
				return true;

			//if perfectMatch is not required then we still need to check with the class inheritance
			if(symbolContext instanceof symb.ScopedSymbol)
			{

				let expressionSymbol = psymb.PUtils.resolveSymbolFromTypeSync(symbolContext, expressionType)
				if(expressionSymbol instanceof psymb.PClassSymbol)
				{
					this.tryFixComponentType(expressionSymbol.extends, symbolContext);
					if(expressionSymbol.extends && this.compareClassTypes(symbolType, expressionSymbol.extends, symbolContext, perfectMatch ))
						return true;
					for(let impl of expressionSymbol.implements )
					{
						this.tryFixComponentType(impl, symbolContext);
						if( this.compareClassTypes(symbolType, impl, symbolContext, perfectMatch) )
							return true;
					}
					
				}
				if(expressionSymbol instanceof psymb.PInterfaceSymbol)
				{
					for(let impl of expressionSymbol.implements )
					{
						if( this.compareClassTypes(symbolType, impl, symbolContext, perfectMatch) )
							return true;
					}
				}
			}
			return false;
		}

	}

	checkClassInheritanceType(symbolType : psymb.PType, classSymbol:psymb.PClassSymbol, symbolContext : symb.BaseSymbol, perfectMatch:boolean=false) : boolean
	{
		let result : boolean = false;
		if(classSymbol.name===symbolType.name)
			return true;

		if(classSymbol.extends)
			result = this.compareClassTypes(symbolType, classSymbol.extends, symbolContext, perfectMatch );
		if(result)
			return true;

		return false;
	}

	public findFirstClassOrInterfaceUp(scopedSymbol : symb.BaseSymbol) : psymb.PClassSymbol | psymb.PInterfaceSymbol | undefined
	{
		if( scopedSymbol instanceof psymb.PClassSymbol || scopedSymbol instanceof psymb.PInterfaceSymbol )
			return scopedSymbol;
		else if(scopedSymbol.parent)
			return this.findFirstClassOrInterfaceUp(scopedSymbol.parent);
		return;
	}

	public resolveSymbolType(name:string, scope : symb.BaseSymbol) : symb.BaseSymbol | undefined
	{
		let res : symb.BaseSymbol | undefined = scope.resolveSync(name);
		if(res instanceof psymb.PVariableSymbol && res.type)
		{
			   if( res.type.reference == PReferenceKind.Reference )
				res = scope.resolveSync(res.type.name);
		}
		return res;
	}

	public getRange(ctx : TerminalNode) : Range
	{
		let line : number = ctx.symbol.line;
		let pos : number = ctx.symbol.charPositionInLine;
		let length : number = ctx.symbol.stopIndex - ctx.symbol.startIndex + 1;
		return Range.create( line-1, pos, line-1, pos+length);
	}

	private registerUsageForDeclarationType(typeCtx : pp.TypeTypeContext) : psymb.CallContext
	{
		let currentScope : symb.ScopedSymbol = this.findScopeAtToken(typeCtx.start);
		return this.registerUsageForTypeType(typeCtx, currentScope);
	}

	private findScopeAtToken(token: Token) : symb.ScopedSymbol
	{
		const line = token.line;
		const pos = token.charPositionInLine;
		let currentScope : symb.ScopedSymbol | undefined =  parseUtils.findScopeAtPositionFromSymbols(this.pdeInfo.symbols, line, pos+1);
		if(!currentScope)
			currentScope = this.mainClass;
		return currentScope;
	}

	private IsTypeStringType(type: psymb.IPType)
	{
		if(type.typeKind != psymb.PTypeKind.Class )
			return false;
		let classPath = this.symbolTable.ensureIsFullPath(type.name);
		return psymb.PType.isDefaultStringPath(classPath);
	}

	
	tryVisitAndRegisterIdentifier(varScope: symb.ScopedSymbol, identifier: TerminalNode, localOnly : boolean) : psymb.IPType | undefined
	{
		let varName = identifier.text;
		let symbolFound : symb.BaseSymbol | undefined = psymb.PUtils.resolveSymbolSync(varScope, symb.BaseSymbol, varName, localOnly );
		if(symbolFound)
		{
			if(symbolFound instanceof psymb.PVariableSymbol) 
			{			
				this.pdeInfo.registerDefinition(identifier, symbolFound);
				if(symbolFound.type)
				{
					this.tryFixComponentType(symbolFound.type, varScope);
					return psymb.PUtils.cloneTypeAsInstance(symbolFound.type);
				}
				else
					return psymb.PType.createUnknownType();
			}
			else if(symbolFound instanceof psymb.PEnumMemberSymbol && symbolFound.parent instanceof psymb.PEnumSymbol)
			{
				this.pdeInfo.registerDefinition(identifier, symbolFound, false);
				return symbolFound.parent;
			}
			else if(symbolFound instanceof psymb.PComponentSymbol)
			{
				this.pdeInfo.registerDefinition(identifier, symbolFound, false);
	
				if(symbolFound instanceof psymb.PNamespaceSymbol)
					return psymb.PType.createNamespaceType(symbolFound.qualifiedName(psymb.PNamespaceSymbol.delimiter, true, false));
				else if(symbolFound instanceof psymb.PEnumSymbol )
					return symbolFound;
				else if(symbolFound instanceof psymb.PClassSymbol )
					return symbolFound;
				else if(symbolFound instanceof psymb.PInterfaceSymbol )
					return symbolFound;
			}
			else
				this.pdeInfo.registerDefinition(identifier, symbolFound);
		}
		else
			this.pdeInfo.registerDefinition(identifier, symbolFound);
	}

	private registerUsageForIdentifiers(identifiers : TerminalNode[], currentScope : symb.ScopedSymbol)
	{
		let callContext = psymb.PUtils.resolveComponentSync(currentScope, PComponentSymbol, identifiers[0].text );
		this.pdeInfo.registerDefinition(identifiers[0], callContext );
		let idIndex = 1;
		while(idIndex < identifiers.length)
		{
			if(callContext)
				callContext = psymb.PUtils.resolveChildSymbolSync(callContext, PComponentSymbol, identifiers[idIndex].text );
			this.pdeInfo.registerDefinition(identifiers[idIndex], callContext );
			idIndex++;
		}
	}

	private registerUsageForClassOrInterfaceIdentifiers(classOrInterfaceType : pp.ClassOrInterfaceTypeContext, currentScope : symb.ScopedSymbol) : psymb.CallContext
	{
		let callContext : psymb.CallContext | undefined;
		let childIndex = 0;
		while(childIndex < classOrInterfaceType.childCount)
		{
			let child = classOrInterfaceType.getChild(childIndex);
			if(child instanceof pp.ClassOrInterfaceIdentifierContext)
				callContext = this.registerUsageForIdentifier(callContext, child.IDENTIFIER(), child.typeArguments(), currentScope);
			else if(child instanceof TerminalNode && child.symbol.type == pp.ProcessingParser.DOT)
				this.pdeInfo.registerContextType(child, callContext.type);

			childIndex++;
		}
		return callContext;
	}

	private registerUsageForIdentifier(callContext:psymb.CallContext|undefined, identifier : TerminalNode, typeArguments : pp.TypeArgumentsContext, currentScope : symb.ScopedSymbol) : psymb.CallContext
	{
		let idName : string = identifier.text;

		let callSymbol : psymb.PComponentSymbol | undefined;
		let currentCallContext : psymb.CallContext | undefined;
		if(currentScope)
		{
			if(callContext == undefined)
				callSymbol = psymb.PUtils.resolveComponentSync(currentScope, PComponentSymbol, idName );
			else if(callContext.symbol !== undefined)
				callSymbol = psymb.PUtils.resolveChildSymbolSync(callContext.symbol, PComponentSymbol, idName );
		}

		if(callSymbol==undefined)
		{
			let scope = callContext && callContext.symbol ? callContext.symbol : currentScope;
			let localOnly : boolean = (scope != currentScope);
			let varSymbol : psymb.PVariableSymbol | undefined = psymb.PUtils.resolveSymbolSync(scope, psymb.PVariableSymbol, idName, localOnly );
			if(varSymbol)
			{
				this.pdeInfo.registerDefinition(identifier, varSymbol);
				if(varSymbol.type)
				{
					this.tryFixComponentType(varSymbol.type, scope);
					callSymbol = psymb.PUtils.resolveComponentSyncFromPType(currentScope, PComponentSymbol, varSymbol.type );
					currentCallContext = new psymb.CallContext( psymb.PUtils.cloneTypeAsInstance(varSymbol.type), callSymbol).setOutter(callContext);
					this.pdeInfo.tryRegisterCallContext(identifier, currentCallContext);
					return currentCallContext;
				}
			}
			else
			{
				let genericParam = psymb.PUtils.resolveGenericParamSymbolByName(currentScope, idName);
				if(genericParam)
				{
					this.pdeInfo.registerDefinition( identifier, genericParam, false );
					currentCallContext = new psymb.CallContext(psymb.PType.createGenericType(idName), undefined);
					this.pdeInfo.tryRegisterCallContext(identifier, currentCallContext);
					return currentCallContext;
				}
			}
		}

		this.pdeInfo.registerDefinition( identifier, callSymbol );

		let genericArguments : psymb.PType[] = [];
		if(typeArguments)
		{
			let typeArgumentList = typeArguments.typeArgument();
			for(let i=0; i < typeArgumentList.length; i++)
			{
				let typeType = typeArgumentList[i].typeType();
				if(typeType)
					genericArguments.push( this.registerUsageForTypeType(typeType, currentScope).type );
			}
		}
		let outterType : psymb.PType |undefined;
		if(callContext)
			outterType = callContext.type;

		if(callSymbol instanceof psymb.PNamespaceSymbol)
			currentCallContext = new psymb.CallContext(psymb.PType.createNamespaceType(idName).setOutter(outterType), callSymbol);
		else if(callSymbol instanceof psymb.PEnumSymbol)
			currentCallContext = new psymb.CallContext(psymb.PType.createEnumType(idName).setOutter(outterType), callSymbol);
		else if(callSymbol instanceof psymb.PClassSymbol)
			currentCallContext = new psymb.CallContext(psymb.PType.createClassType(idName).setOutter(outterType).setGenericTypes(genericArguments), callSymbol);
		else if(callSymbol instanceof psymb.PInterfaceSymbol)
			currentCallContext = new psymb.CallContext(psymb.PType.createInterfaceType(idName).setOutter(outterType).setGenericTypes(genericArguments), callSymbol);
		else
			currentCallContext = new psymb.CallContext(psymb.PType.createUnknownType().setGenericTypes(genericArguments), callSymbol);

		this.pdeInfo.tryRegisterCallContext(identifier, currentCallContext);
		return currentCallContext;

	}

	private registerUsageForTypeType(typeCtx : pp.TypeTypeContext, currentScope : symb.ScopedSymbol) : psymb.CallContext
	{
		let result : psymb.CallContext;
		let classOrInterfaceType = typeCtx.classOrInterfaceType();
		let primitiveType = typeCtx.primitiveType();
		let varToken = typeCtx.VAR();
		let bracks = typeCtx.LBRACK();

		if(classOrInterfaceType)
		{
			result = this.registerUsageForClassOrInterfaceIdentifiers(classOrInterfaceType, currentScope);
		}
		else if(primitiveType)
		{
			result = new psymb.CallContext( parseUtils.convertPrimitiveType(primitiveType), undefined);
		}
		else // varToken ?
			result = new psymb.CallContext( psymb.PType.createUnknownType(), undefined);

		if(bracks.length>0)
		{
			let callerType = result.type;
			let arraySize = bracks.length;
			while(arraySize>0)
			{
				callerType = psymb.PType.createArrayType(callerType);
				arraySize--;
			}
			result = new psymb.CallContext( callerType, undefined);
		}
		return result;
	}


	validateExpressionAsPrimitiveType(type: psymb.IPType, typesToCheck:psymb.PPrimitiveKind[]) : boolean
	{
		for( let i=0; i < typesToCheck.length; i++)
		{
			if( psymb.PUtils.comparePrimitiveKind(type, typesToCheck[i]) )
				return true;
		}
		return false;
	}

	tryFixComponentType( type: psymb.PType, scope : PIScopedSymbol, callerScope ?: PIScopedSymbol | undefined )
	{
		if(type == undefined)
			return;
		if(type.name=="?" || type.name=='=')
			return;

		if(type.typeKind == psymb.PTypeKind.Primitive)
			return;
		if(type.typeKind == psymb.PTypeKind.String)
			return;
		if(type.typeKind == psymb.PTypeKind.Null)
			return;

		let typeSymbol : PComponentSymbol | undefined;

		if(type.typeKind == psymb.PTypeKind.Component)
		{
			//type.name = this.symbolTable.ensureIsFullPath(type.name);
			let genericParamSymbol = psymb.PUtils.resolveGenericParamSymbol(scope, type);
			if(genericParamSymbol)
			{
				type.implementTypes = psymb.PType.createCloneArray(genericParamSymbol.formalTypes);
				type.typeKind = psymb.PTypeKind.Generic;
			}
			else
			{
				typeSymbol = psymb.PUtils.resolveComponentSyncFromPType(scope, PComponentSymbol, type);
				if(typeSymbol instanceof psymb.PEnumSymbol)
					type.typeKind = psymb.PTypeKind.Enum;
				else if(typeSymbol instanceof psymb.PClassSymbol)
					type.typeKind = psymb.PTypeKind.Class;
				else if(typeSymbol instanceof psymb.PInterfaceSymbol)
					type.typeKind = psymb.PTypeKind.Interface;
				else if(typeSymbol instanceof psymb.PNamespaceSymbol)
					type.typeKind = psymb.PTypeKind.Namespace;
				else if( callerScope )
					this.tryFixComponentType(type, callerScope);
				else
					console.error(`Unable to fix component type: ${type.name} at ... ${this.pdeInfo.name}`);
			}
		}
		else if(type.typeKind == psymb.PTypeKind.Array)
			this.tryFixComponentType(type.arrayType, scope);
		
		for(let i:number=0; i < type.genericTypes.length; i++ )
			this.tryFixComponentType(type.genericTypes[i], scope);


		if(!type.isFullPath && type.outerType == undefined)
		{
			if(!typeSymbol)
				typeSymbol = psymb.PUtils.resolveComponentSyncFromPType(scope, PComponentSymbol, type);

			if(typeSymbol)
			{
				type.name = typeSymbol.name;
				if( typeSymbol.parent && typeSymbol.parent instanceof PComponentSymbol)
					type.setOutter(psymb.PUtils.ComponentSymbolToPType(typeSymbol.parent));
				type.isFullPath = true;
			}
		}
	}

}