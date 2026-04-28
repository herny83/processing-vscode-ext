import { ProcessingParserVisitor } from './grammer/ProcessingParserVisitor';
import { AbstractParseTreeVisitor, ParseTree, TerminalNode } from 'antlr4ts/tree'
import { PdeContentInfo } from "./sketch";
import * as symb from 'antlr4-c3'
import { PIScopedSymbol } from './antlr-sym';
import * as pp from './grammer/ProcessingParser';
import * as log from './syslogs'
import * as psymb from "./antlr-sym"

import * as parseUtils from './astutils'


const VAR_FIELD = 1;
const VAR_PARAM = 2;
const VAR_LOCAL = 3;
const VAR_TYPE_PARAM = 4;

export class SymbolTableVisitor extends AbstractParseTreeVisitor<void> implements ProcessingParserVisitor<void>
{
	private visitingSymbols : psymb.PBaseSymbol[] | null = null;
	private visitorRootSymbol : psymb.PScopedSymbol | null = null;
	private mainClass : psymb.PClassSymbol;
	protected pdeInfo: PdeContentInfo | undefined;
	public symbolTable : psymb.PSymbolTable;

	private unresolvedTypes : psymb.PType[];
	private scopeStack : psymb.PScopedSymbol[];
	protected scope : psymb.PScopedSymbol;

	constructor(symbolTable : psymb.PSymbolTable, mainClass : psymb.PClassSymbol)
	{
		super();
		this.symbolTable = symbolTable;
		this.mainClass = mainClass;
		this.scope = this.mainClass;
		this.unresolvedTypes = [];
		this.scopeStack = [];
	}

	public getMainClass() : psymb.PClassSymbol { return this.mainClass; }
	protected defaultResult() { return; }

	clearUnresolvedTypes()
	{
		this.unresolvedTypes = [];
	}

	saveUnresolvedType( type: psymb.PType ) : psymb.PType
	{
		this.unresolvedTypes.push(type);
		return type;
	}

	saveUnresolvedTypes( types: psymb.PType[] ) : psymb.PType[]
	{
		this.unresolvedTypes.push(...types);
		return types;
	}

	pushScope(newScope: psymb.PScopedSymbol)
	{
		this.scopeStack.push(this.scope);
		this.scope = newScope;
	}

	popScope()
	{
		this.scope = this.scopeStack.pop();
	}

	public visitPdeLinked(pdeInfo: PdeContentInfo)
	{
		this.scope = this.mainClass;
		this.visitorRootSymbol = this.scope;
		this.visitingSymbols = pdeInfo.symbols;
		this.pdeInfo = pdeInfo;
		if(pdeInfo.syntaxTokens)
			this.visit(pdeInfo.syntaxTokens);
		this.visitingSymbols = null;
		// we record our current pde name for future use...
		for(let i=0; i < pdeInfo.symbols.length; i++ )
			this.registerPdeName(pdeInfo.symbols[i], pdeInfo.name);
	}

	visitClassBodyDeclaration(ctx: pp.ClassBodyDeclarationContext)
	{
		let importDecl = ctx.importDeclaration();
		let memberDecl = ctx.memberDeclaration();
		let memberModif = ctx.modifier();

		let visibility : symb.MemberVisibility = this.evaluateMemberVisibility(memberModif);
		let modifiers : symb.Modifier[] = this.evaluateMemberModifiers(memberModif);
		if(importDecl)
			this.visitImportDeclaration(importDecl);
		else if(memberDecl)
		{
			let method = memberDecl.methodDeclaration();
			let genericMethod = memberDecl.genericMethodDeclaration();
			let field = memberDecl.fieldDeclaration();
			let constr = memberDecl.constructorDeclaration();
			let genericConstr = memberDecl.genericConstructorDeclaration();
			let interf = memberDecl.interfaceDeclaration();
			let annotation = memberDecl.annotationTypeDeclaration();
			let classDecl = memberDecl.classDeclaration();
			let enumDecl = memberDecl.enumDeclaration();

			if(method)
				return this.tryDeclareMethod(undefined, method, visibility, modifiers);
			else if(genericMethod)
				return this.tryDeclareGenericMethod(genericMethod, visibility, modifiers);
			else if(field)
				return this.tryDeclareField(field, visibility, modifiers);
			else if(constr)
				this.tryDeclareConstructor(undefined, constr, visibility, modifiers);
			else if(genericConstr)
				this.tryDeclareGenericConstructor(genericConstr, visibility, modifiers);
			else if(interf)
				this.visit(interf);
				//this.tryDeclareInterface(interf);
			else if(annotation)
			{
				// ignored for now
			}
			else if(classDecl)
				this.visit(classDecl);
			else if(enumDecl)
				this.tryDeclareEnum(enumDecl, visibility, modifiers);
		}
	}

	visitImportDeclaration(ctx: pp.ImportDeclarationContext)
	{
		let staticCtx = ctx.STATIC();
		let qualifiedName = ctx.qualifiedName();
		let allMembers = ctx.MUL() != undefined;
		const staticImport = staticCtx !== undefined;

		let fullName = parseUtils.buildFullClassName(qualifiedName.IDENTIFIER())

		let result : string | undefined;
		if(staticImport)
			result = this.pdeInfo.tryImportStatic(fullName, allMembers);
		else
			result = this.pdeInfo.tryImport(fullName, allMembers);
		if(result)
			this.pdeInfo.notifyDiagnostic(result, ctx);
	} 

	visitEnhancedForControl(ctx: pp.EnhancedForControlContext)
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}

		let symbolType = this.convertTypeType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_LOCAL, symb.MemberVisibility.Private, modifiers);
	}

	visitLocalVariableDeclaration(ctx: pp.LocalVariableDeclarationContext)
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}
		let typeCtx = ctx.typeType();
		let symbolType = this.convertTypeType(typeCtx);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators(), VAR_LOCAL, symb.MemberVisibility.Private, modifiers);
	}
	
	visitFormalParameter(ctx: pp.FormalParameterContext)
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}

		let symbolType = this.convertTypeType(ctx.typeType());
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_PARAM, symb.MemberVisibility.Private, modifiers);
	}

	visitLastFormalParameter(ctx: pp.LastFormalParameterContext)
	{
		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}
		let ctxType = ctx.typeType();
		let symbolType = this.convertTypeType(ctxType);
		if(ctx.ELLIPSIS() && symbolType)
		{
			symbolType = psymb.PType.createArrayType(symbolType);
			if(this.scope instanceof psymb.PMethodSymbol)
				psymb.PUtils.setMethodLastVargs(this.scope);
		}
		this.addTypedSymbol(symbolType, ctx.variableDeclaratorId(), VAR_PARAM, symb.MemberVisibility.Private, modifiers);
	}

	tryDeclareField(ctx: pp.FieldDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[])
	{
		let fileTypeCtx = ctx.typeType();
		let symbolType = this.convertTypeType(fileTypeCtx);
		this.addTypedSymbols(symbolType, ctx.variableDeclarators(), VAR_FIELD, visibility, modifiers);
	}

	visitClassDeclaration(ctx: pp.ClassDeclarationContext)
	{
		let classIdentifier = ctx.IDENTIFIER();
		let classBody = ctx.classBody();
		let genericParams = ctx.typeParameters();
		let extendsCtx = ctx.typeType();
		let implemCtx =ctx.typeList();

		let ext : psymb.PType;
		let impl : psymb.PType [] = [];

		if(extendsCtx)
		{
			ext = this.convertTypeType(extendsCtx);
			this.pdeInfo.addUnresolvedType(ext, this.scope);
		}
		else
			ext = psymb.PType.createObjectType();

		ext.typeKind = psymb.PTypeKind.Class;
		if(implemCtx)
			impl = this.convertTypeList(implemCtx);
		for(let interf of impl)
		{
			interf.typeKind = psymb.PTypeKind.Interface;
			this.pdeInfo.addUnresolvedType(interf, this.scope);
		}

		let savedScope = this.scope;
		let className = classIdentifier.text;
		let classSymbol = new psymb.PClassSymbol(className, ext, impl);
		this.addChildSymbol(ctx, classSymbol);
		this.scope = classSymbol;

		if(genericParams)
			this.tryDeclareGenericParams(genericParams, classSymbol);

		this.visitChildren(classBody);
		this.scope = savedScope;
	}

	visitInterfaceDeclaration(ctx: pp.InterfaceDeclarationContext) 
	{
		let identifier = ctx.IDENTIFIER();
		let typeParams = ctx.typeParameters();
		let extendsCtx =ctx.typeList();
		let interfaceBody = ctx.interfaceBody();

		let exts : psymb.PType [] = [];

		if(extendsCtx)
			exts = this.convertTypeList(extendsCtx);
		for(let ext of exts)
			ext.typeKind = psymb.PTypeKind.Interface;

		let savedScope = this.scope;
		let interfName = identifier.text;
		let interfSymbol = new psymb.PInterfaceSymbol(interfName, exts);
		this.addChildSymbol(ctx, interfSymbol);
		this.scope = interfSymbol;

		if(typeParams)
		{
			let params = typeParams.typeParameter();
			for(let param of params)
			{
				let identif = param.IDENTIFIER();
				let bound = param.typeBound();
				let formalTypes : psymb.PType [] = [];

				if(bound)
				{
					let boundTypesCtx = bound.typeType();
					for(let boundTypeCtx of boundTypesCtx)
						formalTypes.push( this.convertTypeType(boundTypeCtx) );
				}
				let typeParam = new psymb.PGenericParamSymbol(identif.text, formalTypes);
				interfSymbol.addSymbol(typeParam);
			}
		}
		this.visitChildren(interfaceBody);
		this.scope = savedScope;
	}

	visitInterfaceBodyDeclaration(ctx: pp.InterfaceBodyDeclarationContext)
	{
		let memberModif = ctx.modifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			let interfModif = modifCtx.classOrInterfaceModifier();
			if(interfModif)
			{
				if( interfModif.FINAL() )
					modifiers.push(symb.Modifier.Final);
				else if(interfModif.STATIC)
					modifiers.push(symb.Modifier.Static);
			}
		}
		let decl = ctx.interfaceMemberDeclaration();
		if(decl)
		{
			let constDeclCtx = decl.constDeclaration();
			let methodDeclCtx = decl.interfaceMethodDeclaration();
			let genericDeclCtx = decl.genericInterfaceMethodDeclaration();
			let interfDeclCtx = decl.interfaceDeclaration();
			let annotTypeDeclCtx = decl.annotationTypeDeclaration();
			let classDeclCtx = decl.classDeclaration();
			let enumDeclCtx = decl.enumDeclaration();

			if(constDeclCtx)
			{

			}
			else if(methodDeclCtx)
				this.tryVisitInterfaceMethodDeclaration(undefined, methodDeclCtx, modifiers );
			else if(genericDeclCtx)
				this.tryVisitGenericInterfaceMethodDeclaration(genericDeclCtx, modifiers );
			else if(interfDeclCtx)
				this.visitInterfaceDeclaration(interfDeclCtx);
			else if(annotTypeDeclCtx)
			{

			}
			else if(classDeclCtx)
				this.visitClassDeclaration(classDeclCtx);
			else if(enumDeclCtx)
				this.visitEnumDeclaration(enumDeclCtx);
		}
	}

	tryVisitInterfaceMethodDeclaration(typeParameters: pp.TypeParametersContext|undefined, ctx: pp.InterfaceMethodDeclarationContext, modifiers : symb.Modifier[])
	{
		return this.tryDeclareMethodRaw(typeParameters, 
			ctx.typeTypeOrVoid(), 
			ctx.IDENTIFIER(), 
			ctx.formalParameters().formalParameterList(),
			ctx.qualifiedNameList(),
			ctx.methodBody().block(),
			symb.MemberVisibility.Public,
			modifiers);
	}

	tryVisitGenericInterfaceMethodDeclaration(ctx: pp.GenericInterfaceMethodDeclarationContext, modifiers : symb.Modifier[])
	{
		let typeParams = ctx.typeParameters();
		let methodDeclCtx = ctx.interfaceMethodDeclaration();
		this.tryVisitInterfaceMethodDeclaration(typeParams, methodDeclCtx, modifiers);
	}

	visitClassCreatorRest(ctx: pp.ClassCreatorRestContext)
	{
		let ext : psymb.PType = psymb.PType.createObjectType();
		let impl : psymb.PType [] = [];
		let classSymbol = new psymb.PClassSymbol("", ext, impl);
		this.addChildSymbol(ctx, classSymbol);
		this.pushScope(classSymbol);
		this.visitChildren(ctx);
		this.popScope();
		return this.defaultResult();
	}

	visitEnumDeclaration(ctx: pp.EnumDeclarationContext)
	{
		return this.tryDeclareEnum(ctx, undefined, []);
	}

	tryDeclareMethod(typeParameters: pp.TypeParametersContext|undefined, ctx: pp.MethodDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[])
	{
		return this.tryDeclareMethodRaw(typeParameters, 
										ctx.typeTypeOrVoid(), 
										ctx.IDENTIFIER(), 
										ctx.formalParameters().formalParameterList(),
										ctx.qualifiedNameList(),
										ctx.methodBody().block(),
										visibility,
										modifiers);
	}

	tryDeclareMethodRaw(genericParams: pp.TypeParametersContext|undefined, 
						returnTypeOrVoid: pp.TypeTypeOrVoidContext|undefined, 
						identif: TerminalNode, 
						params: pp.FormalParameterListContext|undefined,
						exceptions: pp.QualifiedNameListContext|undefined,
						body : pp.BlockContext|undefined,
						visibility:symb.MemberVisibility, 
						modifiers:symb.Modifier[])
	{

		let methodName : string = identif.text;

		let method : psymb.PMethodSymbol = new psymb.PMethodSymbol(methodName, undefined);
		this.applyModifiers(method, visibility, modifiers);
		this.addChildSymbol(identif.parent, method);
		this.pushScope(method);

		try {

			if(genericParams)
				this.tryDeclareGenericParams(genericParams, method);

			if(returnTypeOrVoid)
			{
				let returnTypeCtx = returnTypeOrVoid.typeType();
				
				if(returnTypeCtx)
				{
					method.returnType = this.convertTypeType(returnTypeCtx);
					this.tryFixComponentTypeIfGeneric(method.returnType, method);
				}
				else
					method.returnType = psymb.PType.createVoidType();
			}

			if(params)
			{
				let paramList = params.formalParameter();
				for(let param of paramList)
					this.visitFormalParameter(param);
				let lastParam = params.lastFormalParameter();
				if(lastParam)
					this.visitLastFormalParameter(lastParam);
			}
			
			let signatureString = psymb.PUtils.convertToSignature(method);
			method.name = methodName + signatureString;

			if(exceptions) // The method symbol is a scope so no need to create another one, we move directly to the body childrens
				this.visitChildren(exceptions);
			if(body) // The method symbol is a scope so no need to create another one, we move directly to the body childrens
				this.visitChildren(body);

		} finally {
			this.popScope();
		}
	}

	tryDeclareGenericMethod(ctx: pp.GenericMethodDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[])
	{
		let genericParams = ctx.typeParameters();
		let methodDecl = ctx.methodDeclaration();

		this.tryDeclareMethod(genericParams, methodDecl, visibility, modifiers);
	}

	private tryDeclareGenericParams(typeParameters: pp.TypeParametersContext, scope : psymb.PScopedSymbol) 
	{
		let typeParameterArray = typeParameters.typeParameter();
		let boundTypes: psymb.PType[] = [];
		for (let i = 0; i < typeParameterArray.length; i++) 
		{
			//let baseType: symb.Type;
			let paramName = typeParameterArray[i].IDENTIFIER().text;
			let extendDecl = typeParameterArray[i].EXTENDS();
			let typeBound = typeParameterArray[i].typeBound();

			if (typeBound) 
			{
				let boundedTypes = typeBound.typeType();
				for (let i = 0; i < boundedTypes.length; i++) 
				{
					let symbolType = this.convertTypeType(boundedTypes[i]);
					if (!symbolType) {
						symbolType = psymb.PType.createUnknownType();
						this.pdeInfo?.notifyDiagnostic("Unknown Type", boundedTypes[i]);
					}
					boundTypes.push(symbolType);
				}
			}
			else
				boundTypes.push(psymb.PType.createObjectType());

			scope.addSymbol(new psymb.PGenericParamSymbol(paramName, boundTypes));
		}
	}

	tryDeclareConstructor(	typeParameters: pp.TypeParametersContext|undefined,
							ctx: pp.ConstructorDeclarationContext, 
							visibility:symb.MemberVisibility, 
							modifiers:symb.Modifier[])
	{
		return this.tryDeclareMethodRaw(typeParameters, 
										undefined, 
										ctx.IDENTIFIER(), 
										ctx.formalParameters().formalParameterList(),
										ctx.qualifiedNameList(),
										ctx.block(),
										visibility,
										modifiers);
	}

	tryDeclareGenericConstructor(ctx: pp.GenericConstructorDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[])
	{
		let typeParameters = ctx.typeParameters();
		let constDecl = ctx.constructorDeclaration();
		this.tryDeclareConstructor(typeParameters, constDecl, visibility, modifiers);
	}

	tryDeclareEnum(ctx: pp.EnumDeclarationContext, visibility:symb.MemberVisibility, modifiers:symb.Modifier[])
	{
		let enumID = ctx.IDENTIFIER();
		let implCtx = ctx.typeList();
		let enumMembers = ctx.enumConstants();
		let enumBodyDecl = ctx.enumBodyDeclarations();

		let implementing : psymb.PType [] = [];
		if(implCtx)
			implementing = this.convertTypeList(implCtx);
		for(let impl of implementing)
			impl.typeKind = psymb.PTypeKind.Interface;

		let savedScope = this.scope;
		let enumSymbol = new psymb.PEnumSymbol(enumID.text, implementing)
		this.addChildSymbol(ctx, enumSymbol);
		this.scope = enumSymbol;

		let enumContantArray = enumMembers.enumConstant();
		for(let enumConstant of enumContantArray)
		{
			let enumMemberID = enumConstant.IDENTIFIER();
			let args = enumConstant.arguments();
			let body = enumConstant.classBody();

			let enumInitValue : String | undefined;
			if(args)
			{
				let expLstCtx = args.expressionList();
				if(expLstCtx)
					enumInitValue = expLstCtx.text;
			}
			
			let enumType = psymb.PType.createEnumType(enumID.text);

			let enumMemberSymbol = new psymb.PEnumMemberSymbol(enumMemberID.text, enumInitValue, enumType);
			this.addChildSymbol(enumConstant, enumMemberSymbol);

			this.scope = enumMemberSymbol;

			if(body)
				this.visitChildren(body);

			this.scope = enumSymbol;
		}
		if(enumBodyDecl)
			this.visitChildren(enumBodyDecl);

		let enumArrayType = psymb.PType.createArrayType(psymb.PType.createFromIType(enumSymbol));
		let valuesMethod = new psymb.PMethodSymbol("values", enumArrayType);
		valuesMethod.modifiers.add(symb.Modifier.Static);
		this.addChildSymbol(undefined, valuesMethod);
		let signatureString = psymb.PUtils.convertToSignature(valuesMethod);
		valuesMethod.name = "values" + signatureString;
		
		this.scope = savedScope;
	}

	visitBlock(ctx: pp.BlockContext)
	{
		let fakeSymbolName : string = "block"+ctx.start.startIndex;
		let newSymbol : psymb.PScopedSymbol = new psymb.PScopedSymbol(fakeSymbolName);
		this.addChildSymbol(ctx, newSymbol);
		this.pushScope(newSymbol);
		this.visitChildren(ctx);
		this.popScope();
	}

	visitVariableDeclaratorId(ctx: pp.VariableDeclaratorIdContext)
	{
		let terminalNode = ctx.IDENTIFIER();
		if(terminalNode)
		{
			try
			{
				let symbolType : psymb.PType | undefined = undefined;
				this.addChildSymbol(ctx, new psymb.PVariableSymbol(terminalNode.text, null, symbolType));
			}
			catch(e)
			{
				log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
			}
		}
		this.visitChildren(ctx);
	}

	visitStatement(ctx: pp.StatementContext)
	{
		let blockStatement = ctx.block();
		let expressions = ctx.expression();
		let statements = ctx.statement();
		// let assertToken = ctx.ASSERT();
		let ifToken = ctx.IF();
		let forLoop = ctx.forLoop();
		let whileToken = ctx.WHILE();
		let doToken = ctx.DO();
		let tryToken = ctx.TRY();
		let switchToken = ctx.SWITCH();
		let syncToken = ctx.SYNCHRONIZED();
		// let returnToken = ctx.RETURN();
		// let throwToken = ctx.THROW();
		// let breakToken = ctx.BREAK();
		// let continueToken = ctx.CONTINUE();
		// let identifier = ctx.IDENTIFIER();

		if(ctx._blockLabel)
			this.visitBlock(blockStatement);
		else if(ifToken)
		{
			for(let i=0; i<statements.length;i++)
				this.visitChildren(statements[i]);
		}
		else if(forLoop)
			this.visitForLoop(forLoop);

		else if(whileToken)
		{
			for(let i=0; i<statements.length;i++)
				this.visitChildren(statements[i]);
		}
		else if(doToken)
		{
			for(let i=0; i<statements.length;i++)
				this.visitChildren(statements[i]);
		}
		else if(tryToken)
		{
			let resources = ctx.resourceSpecification();
			if(resources)
				this.visitChildren(resources);

			this.visitBlock(blockStatement);

			let catchCtx = ctx.catchClause();
			let finallyCtx = ctx.finallyBlock();
			if(catchCtx && catchCtx.length > 0)
			{
				for(let i=0; i<catchCtx.length;i++)
					this.visitCatchClause(catchCtx[i]);
			}
			if(finallyCtx)
			{
				let block = finallyCtx.block();
				if(block)
					this.visitBlock(block);
			}
		}
		else if(switchToken)
		{
			let switchBlocks = ctx.switchBlockStatementGroup();
			let switchLabels = ctx.switchLabel();
			for(let i=0; i< switchBlocks.length; i++ )
				this.visitChildren(switchBlocks[i]);
			for(let i=0; i< switchLabels.length; i++ )
				this.visitChildren(switchLabels[i]);
		}
		else if(syncToken)
			this.visitBlock(blockStatement);
		else if(ctx._identifierLabel)
		{
			for(let i=0; i<statements.length;i++)
				this.visitChildren(statements[i]);
		}
	}

	visitCatchClause(ctx: pp.CatchClauseContext)
	{
		let catchType = ctx.catchType();
		let identif = ctx.IDENTIFIER();

		let memberModif = ctx.variableModifier();
		let modifiers : symb.Modifier[] = [];
		for(let modifCtx of memberModif)
		{
			if( modifCtx.FINAL() )
				modifiers.push(symb.Modifier.Final);
		}
		let savedSymbol = this.scope;
		let catchSymbol : psymb.PScopedSymbol = new psymb.PScopedSymbol("catch"+ctx.start.startIndex);
		this.addChildSymbol(ctx, catchSymbol);
		this.scope = catchSymbol;

		let qualifName = catchType.qualifiedName();
		if(qualifName.length > 0)
		{
			let exceptionType = psymb.PType.createClassType(qualifName[0].text);
			let exceptionSymbol = new psymb.PVariableSymbol(identif.text, null, exceptionType);

			this.applyModifiers(exceptionSymbol, symb.MemberVisibility.Private, modifiers);
			this.addChildSymbol(ctx, exceptionSymbol);
		}
		this.visitChildren(ctx.block());
		this.scope = savedSymbol;
	}
	
	visitForLoop(ctx: pp.ForLoopContext)
	{
		let fakeSymbolName : string = "for"+ctx.start.startIndex;
		let newSymbol : psymb.PScopedSymbol = new psymb.PScopedSymbol(fakeSymbolName);
		this.addChildSymbol(ctx, newSymbol, true);
		this.pushScope(newSymbol);
		this.visitChildren(ctx);
		this.popScope();
	};

	// =============================================================
	// =============================================================
	// =============================================================
	// =============================================================
	// PROTECTED HELPER FUNCTIONS
	// =============================================================

	protected addScope(ctx: ParseTree, newSymbol: psymb.PScopedSymbol, action: () => symb.SymbolTable)
	{
		
		try {
			this.addChildSymbol(ctx, newSymbol);
			this.scope = newSymbol;

			try {
				return action();
			} finally {
				this.scope = newSymbol.parent as psymb.PScopedSymbol;
			}
		} 
		catch(e) 
		{
			log.write("adding scope failed at: "+this.scope.qualifiedName(":", true, false)+"."+newSymbol.qualifiedName("|", false, false), log.severity.WARNING);
			
			log.write(e, log.severity.ERROR);
			if(e instanceof TypeError)
				console.error(e.stack);
		}
	}

	protected addChildSymbol(ctx: ParseTree, newSymbol: psymb.PBaseSymbol, ignoreRegisterSymbol:boolean=false)
	{
		newSymbol.context = ctx;
		this.scope.addSymbol(newSymbol);

		if( ignoreRegisterSymbol == false && this.visitingSymbols !== null && this.scope === this.visitorRootSymbol )
			this.visitingSymbols.push(newSymbol);

	}

	protected addTypedSymbols(symbolType : psymb.PType, ctx: pp.VariableDeclaratorsContext, kind : number = 1, visibility:symb.MemberVisibility, modifiers:symb.Modifier[] )
	{
		let variableDeclarators : pp.VariableDeclaratorContext [] = ctx.variableDeclarator();
		for( let i:number=0; i < variableDeclarators.length; i++ )
		{
			let varDeclarator = variableDeclarators[i];
			let decl = varDeclarator.variableDeclaratorId();
			let initializer = varDeclarator.variableInitializer();

			let constantValue:string|undefined;
			if(psymb.PUtils.hasModifier(modifiers, symb.Modifier.Final) && initializer)
				constantValue = initializer.text;

			this.addTypedSymbol(symbolType, decl, kind, visibility, modifiers, constantValue);
		}
	}

	protected addTypedSymbol(varType : psymb.PType, ctx: pp.VariableDeclaratorIdContext, kind : number = 1, visibility:symb.MemberVisibility, modifiers:symb.Modifier[], val:string|null=null )
	{
		let terminalNode = ctx.IDENTIFIER();
		let arraySize = ctx.LBRACK().length;
		if(!terminalNode)
		{
			log.write("adding undefined typed variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+ctx.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
			return;
		}
		while(arraySize > 0)
		{
			varType = psymb.PType.createArrayType(varType);
			arraySize--;
		}
		try
		{
			let symbol : psymb.PBaseSymbol;
			if(kind == VAR_PARAM)
				symbol = new psymb.PParameterSymbol(terminalNode.text, val, varType);
			else if(kind == VAR_FIELD)
				symbol = new psymb.PFieldSymbol(terminalNode.text, val, varType);
			else
				symbol = new psymb.PVariableSymbol(terminalNode.text, val, varType);

			this.applyModifiers(symbol, visibility, modifiers);
			this.addChildSymbol(ctx, symbol);
		}
		catch(e)
		{
			log.write("add variable declaration at: "+this.scope.qualifiedName(":", true, false)+"."+terminalNode.text+` [${ctx.start.line}|${ctx.start.charPositionInLine}]`, log.severity.ERROR);
		}
	}

	protected registerPdeName(relatedSymbol: any, pdeName:string)
	{
		relatedSymbol.pdeName = pdeName;
	}

	tryFixComponentTypeIfGeneric(type:psymb.IPType, scope : PIScopedSymbol)
	{
		if(type==null)
			return;
		if(type.typeKind!=psymb.PTypeKind.Component)
			return;
		let genericParam = psymb.PUtils.resolveGenericParamSymbolByName(scope, type.name);
		if(genericParam)
			type.typeKind = psymb.PTypeKind.Generic;
	}

	evaluateMemberVisibility(memberModifiers: pp.ModifierContext[]) : symb.MemberVisibility
	{
		let result : symb.MemberVisibility = symb.MemberVisibility.Public;
		for(let memberModif of memberModifiers)
		{
			let actualModif = memberModif.classOrInterfaceModifier();
			if(!actualModif)
				continue;
			if(actualModif.PUBLIC())
				return symb.MemberVisibility.Public;
			if(actualModif.PROTECTED())
				return symb.MemberVisibility.Protected;
			if(actualModif.PRIVATE())
				return symb.MemberVisibility.Private;
		}
		return result;
	}
	evaluateMemberModifiers(memberModifiers: pp.ModifierContext[]) : symb.Modifier[]
	{
		let result : symb.Modifier[] = [];
		for(let memberModif of memberModifiers)
		{
			let actualModif = memberModif.classOrInterfaceModifier();
			if(!actualModif)
				continue;
			if(actualModif.STATIC())
				result.push( symb.Modifier.Static );
			if(actualModif.FINAL())
				result.push( symb.Modifier.Final );
			if(actualModif.ABSTRACT())
				result.push( symb.Modifier.Abstract );
		}
		return result;
	}
	applyModifiers(symbol: psymb.PBaseSymbol, visibility:symb.MemberVisibility, modifiers:symb.Modifier[])
	{
		symbol.visibility = visibility;
		symbol.modifiers.clear();
		for(let modif of modifiers)
			symbol.modifiers.add(modif);
	}

	private convertTypeList(typeContext : pp.TypeListContext) : psymb.PType []
	{
		let result : psymb.PType[] = [];
		let typesCtx = typeContext.typeType();
		for(let i=0; i<typesCtx.length; i++)
		{
			let type = this.convertTypeType(typesCtx[i]);
			result.push(type);
		}
		return result;
	}

	private convertTypeType(typeContext : pp.TypeTypeContext) : psymb.PType
	{
		let result : psymb.PType | undefined

		let classOrInterface : pp.ClassOrInterfaceTypeContext | undefined = typeContext.classOrInterfaceType();
		let primitive : pp.PrimitiveTypeContext | undefined =  typeContext.primitiveType();
		let arrayMultiSize : TerminalNode [] = typeContext.LBRACK();

		if(primitive)
			result = parseUtils.convertPrimitiveType(primitive);
		else if(classOrInterface)
			result = this.convertClassOrInterfacePath(classOrInterface.classOrInterfaceIdentifier());

		if(arrayMultiSize.length > 0)
		{
			if(!result)
				result = psymb.PType.createUnknownType(); 
			
			let arraySize = arrayMultiSize.length;
			while(arraySize>0)
			{
				result = psymb.PType.createArrayType(result);
				arraySize--;
			}
		}
		if(!result)
			result = psymb.PType.createUnknownType(); 
		return result;
	}

	private convertClassOrInterfacePath(identifiers : pp.ClassOrInterfaceIdentifierContext[]) : psymb.PType | undefined
	{
		let resultSymbol = this.convertClassOrInterfaceID(identifiers[0]);
		let idIndex = 1;
		while(idIndex < identifiers.length)
		{
			resultSymbol = this.convertClassOrInterfaceID(identifiers[idIndex]).setOutter(resultSymbol);
			idIndex++;
		}
		return resultSymbol;
	}

	private convertClassOrInterfaceID(ctx : pp.ClassOrInterfaceIdentifierContext) : psymb.PType
	{
		let identifier = ctx.IDENTIFIER();
		let typeArguments = ctx.typeArguments();

		let genericArguments : psymb.PType[] = [];
		if(typeArguments)
		{
			let typeArgumentList = typeArguments.typeArgument();
			for(let i=0; i < typeArgumentList.length; i++)
			{
				let typeType = typeArgumentList[i].typeType();
				if(typeType)
					genericArguments.push( this.convertTypeType(typeType) );
			}
		}
		let result = psymb.PType.createComponentType(identifier.text).setGenericTypes(genericArguments);
		return result;
	}
}