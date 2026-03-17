// Generated from c:\Users\User\Desktop\VoxEditSources\voxedit\processing-lsp-vscode\server\grammar\ProcessingParser.g4 by ANTLR 4.9.0-SNAPSHOT


import { ATN } from "antlr4ts/atn/ATN";
import { ATNDeserializer } from "antlr4ts/atn/ATNDeserializer";
import { FailedPredicateException } from "antlr4ts/FailedPredicateException";
import { NotNull } from "antlr4ts/Decorators";
import { NoViableAltException } from "antlr4ts/NoViableAltException";
import { Override } from "antlr4ts/Decorators";
import { Parser } from "antlr4ts/Parser";
import { ParserRuleContext } from "antlr4ts/ParserRuleContext";
import { ParserATNSimulator } from "antlr4ts/atn/ParserATNSimulator";
import { ParseTreeListener } from "antlr4ts/tree/ParseTreeListener";
import { ParseTreeVisitor } from "antlr4ts/tree/ParseTreeVisitor";
import { RecognitionException } from "antlr4ts/RecognitionException";
import { RuleContext } from "antlr4ts/RuleContext";
//import { RuleVersion } from "antlr4ts/RuleVersion";
import { TerminalNode } from "antlr4ts/tree/TerminalNode";
import { Token } from "antlr4ts/Token";
import { TokenStream } from "antlr4ts/TokenStream";
import { Vocabulary } from "antlr4ts/Vocabulary";
import { VocabularyImpl } from "antlr4ts/VocabularyImpl";

import * as Utils from "antlr4ts/misc/Utils";

import { ProcessingParserListener } from "./ProcessingParserListener";
import { ProcessingParserVisitor } from "./ProcessingParserVisitor";


export class ProcessingParser extends Parser {
	public static readonly ABSTRACT = 1;
	public static readonly ASSERT = 2;
	public static readonly BOOLEAN = 3;
	public static readonly BREAK = 4;
	public static readonly BYTE = 5;
	public static readonly CASE = 6;
	public static readonly CATCH = 7;
	public static readonly CHAR = 8;
	public static readonly CLASS = 9;
	public static readonly CONST = 10;
	public static readonly COLOR = 11;
	public static readonly CONTINUE = 12;
	public static readonly DEFAULT = 13;
	public static readonly DO = 14;
	public static readonly DOUBLE = 15;
	public static readonly ELSE = 16;
	public static readonly ENUM = 17;
	public static readonly EXTENDS = 18;
	public static readonly FINAL = 19;
	public static readonly FINALLY = 20;
	public static readonly FLOAT = 21;
	public static readonly FOR = 22;
	public static readonly IF = 23;
	public static readonly GOTO = 24;
	public static readonly IMPLEMENTS = 25;
	public static readonly IMPORT = 26;
	public static readonly INSTANCEOF = 27;
	public static readonly INT = 28;
	public static readonly INTERFACE = 29;
	public static readonly LONG = 30;
	public static readonly NATIVE = 31;
	public static readonly NEW = 32;
	public static readonly PACKAGE = 33;
	public static readonly PRIVATE = 34;
	public static readonly PROTECTED = 35;
	public static readonly PUBLIC = 36;
	public static readonly RETURN = 37;
	public static readonly SHORT = 38;
	public static readonly STATIC = 39;
	public static readonly STRICTFP = 40;
	public static readonly SUPER = 41;
	public static readonly SWITCH = 42;
	public static readonly SYNCHRONIZED = 43;
	public static readonly THIS = 44;
	public static readonly THROW = 45;
	public static readonly THROWS = 46;
	public static readonly TRANSIENT = 47;
	public static readonly TRY = 48;
	public static readonly VAR = 49;
	public static readonly VOID = 50;
	public static readonly VOLATILE = 51;
	public static readonly WHILE = 52;
	public static readonly DECIMAL_LITERAL = 53;
	public static readonly HEX_LITERAL = 54;
	public static readonly OCT_LITERAL = 55;
	public static readonly BINARY_LITERAL = 56;
	public static readonly FLOAT_LITERAL = 57;
	public static readonly HEX_FLOAT_LITERAL = 58;
	public static readonly BOOL_LITERAL = 59;
	public static readonly CHAR_LITERAL = 60;
	public static readonly STRING_LITERAL = 61;
	public static readonly MULTI_STRING_LIT = 62;
	public static readonly NULL_LITERAL = 63;
	public static readonly LPAREN = 64;
	public static readonly RPAREN = 65;
	public static readonly LBRACE = 66;
	public static readonly RBRACE = 67;
	public static readonly LBRACK = 68;
	public static readonly RBRACK = 69;
	public static readonly SEMI = 70;
	public static readonly COMMA = 71;
	public static readonly DOT = 72;
	public static readonly ASSIGN = 73;
	public static readonly GT = 74;
	public static readonly LT = 75;
	public static readonly BANG = 76;
	public static readonly TILDE = 77;
	public static readonly QUESTION = 78;
	public static readonly COLON = 79;
	public static readonly EQUAL = 80;
	public static readonly LE = 81;
	public static readonly GE = 82;
	public static readonly NOTEQUAL = 83;
	public static readonly AND = 84;
	public static readonly OR = 85;
	public static readonly INC = 86;
	public static readonly DEC = 87;
	public static readonly ADD = 88;
	public static readonly SUB = 89;
	public static readonly MUL = 90;
	public static readonly DIV = 91;
	public static readonly BITAND = 92;
	public static readonly BITOR = 93;
	public static readonly CARET = 94;
	public static readonly MOD = 95;
	public static readonly ADD_ASSIGN = 96;
	public static readonly SUB_ASSIGN = 97;
	public static readonly MUL_ASSIGN = 98;
	public static readonly DIV_ASSIGN = 99;
	public static readonly AND_ASSIGN = 100;
	public static readonly OR_ASSIGN = 101;
	public static readonly XOR_ASSIGN = 102;
	public static readonly MOD_ASSIGN = 103;
	public static readonly LSHIFT_ASSIGN = 104;
	public static readonly RSHIFT_ASSIGN = 105;
	public static readonly URSHIFT_ASSIGN = 106;
	public static readonly ARROW = 107;
	public static readonly COLONCOLON = 108;
	public static readonly AT = 109;
	public static readonly ELLIPSIS = 110;
	public static readonly WS = 111;
	public static readonly COMMENT = 112;
	public static readonly LINE_COMMENT = 113;
	public static readonly HexColorLiteral = 114;
	public static readonly IDENTIFIER = 115;
	public static readonly RULE_processingSketch = 0;
	public static readonly RULE_compilationUnit = 1;
	public static readonly RULE_packageDeclaration = 2;
	public static readonly RULE_importDeclaration = 3;
	public static readonly RULE_typeDeclaration = 4;
	public static readonly RULE_modifier = 5;
	public static readonly RULE_classOrInterfaceModifier = 6;
	public static readonly RULE_variableModifier = 7;
	public static readonly RULE_classDeclaration = 8;
	public static readonly RULE_typeParameters = 9;
	public static readonly RULE_typeParameter = 10;
	public static readonly RULE_typeBound = 11;
	public static readonly RULE_enumDeclaration = 12;
	public static readonly RULE_enumConstants = 13;
	public static readonly RULE_enumConstant = 14;
	public static readonly RULE_enumBodyDeclarations = 15;
	public static readonly RULE_interfaceDeclaration = 16;
	public static readonly RULE_classBody = 17;
	public static readonly RULE_interfaceBody = 18;
	public static readonly RULE_classBodyDeclaration = 19;
	public static readonly RULE_memberDeclaration = 20;
	public static readonly RULE_methodDeclaration = 21;
	public static readonly RULE_methodBody = 22;
	public static readonly RULE_typeTypeOrVoid = 23;
	public static readonly RULE_genericMethodDeclaration = 24;
	public static readonly RULE_genericConstructorDeclaration = 25;
	public static readonly RULE_constructorDeclaration = 26;
	public static readonly RULE_fieldDeclaration = 27;
	public static readonly RULE_interfaceBodyDeclaration = 28;
	public static readonly RULE_interfaceMemberDeclaration = 29;
	public static readonly RULE_constDeclaration = 30;
	public static readonly RULE_constantDeclarator = 31;
	public static readonly RULE_interfaceMethodDeclaration = 32;
	public static readonly RULE_interfaceMethodModifier = 33;
	public static readonly RULE_genericInterfaceMethodDeclaration = 34;
	public static readonly RULE_variableDeclarators = 35;
	public static readonly RULE_variableDeclarator = 36;
	public static readonly RULE_variableInitializer = 37;
	public static readonly RULE_arrayInitializer = 38;
	public static readonly RULE_classOrInterfaceType = 39;
	public static readonly RULE_classOrInterfaceIdentifier = 40;
	public static readonly RULE_typeArgument = 41;
	public static readonly RULE_qualifiedNameList = 42;
	public static readonly RULE_formalParameters = 43;
	public static readonly RULE_formalParameterList = 44;
	public static readonly RULE_formalParameter = 45;
	public static readonly RULE_lastFormalParameter = 46;
	public static readonly RULE_baseStringLiteral = 47;
	public static readonly RULE_multilineStringLiteral = 48;
	public static readonly RULE_stringLiteral = 49;
	public static readonly RULE_integerLiteral = 50;
	public static readonly RULE_floatLiteral = 51;
	public static readonly RULE_annotation = 52;
	public static readonly RULE_elementValuePairs = 53;
	public static readonly RULE_elementValuePair = 54;
	public static readonly RULE_elementValue = 55;
	public static readonly RULE_elementValueArrayInitializer = 56;
	public static readonly RULE_annotationTypeDeclaration = 57;
	public static readonly RULE_annotationTypeBody = 58;
	public static readonly RULE_annotationTypeElementDeclaration = 59;
	public static readonly RULE_annotationTypeElementRest = 60;
	public static readonly RULE_annotationMethodOrConstantRest = 61;
	public static readonly RULE_annotationMethodRest = 62;
	public static readonly RULE_annotationConstantRest = 63;
	public static readonly RULE_defaultValue = 64;
	public static readonly RULE_block = 65;
	public static readonly RULE_blockStatement = 66;
	public static readonly RULE_localVariableDeclaration = 67;
	public static readonly RULE_localTypeDeclaration = 68;
	public static readonly RULE_statement = 69;
	public static readonly RULE_catchClause = 70;
	public static readonly RULE_catchType = 71;
	public static readonly RULE_finallyBlock = 72;
	public static readonly RULE_resourceSpecification = 73;
	public static readonly RULE_resources = 74;
	public static readonly RULE_resource = 75;
	public static readonly RULE_switchBlockStatementGroup = 76;
	public static readonly RULE_switchLabel = 77;
	public static readonly RULE_forLoop = 78;
	public static readonly RULE_forControl = 79;
	public static readonly RULE_forInit = 80;
	public static readonly RULE_enhancedForControl = 81;
	public static readonly RULE_parExpression = 82;
	public static readonly RULE_expressionList = 83;
	public static readonly RULE_expression = 84;
	public static readonly RULE_lambdaExpression = 85;
	public static readonly RULE_lambdaParameters = 86;
	public static readonly RULE_lambdaBody = 87;
	public static readonly RULE_primary = 88;
	public static readonly RULE_classType = 89;
	public static readonly RULE_creator = 90;
	public static readonly RULE_createdObjectName = 91;
	public static readonly RULE_createdType = 92;
	public static readonly RULE_innerCreator = 93;
	public static readonly RULE_arrayCreatorRest = 94;
	public static readonly RULE_classCreatorRest = 95;
	public static readonly RULE_explicitGenericInvocation = 96;
	public static readonly RULE_typeArgumentsOrDiamond = 97;
	public static readonly RULE_nonWildcardTypeArgumentsOrDiamond = 98;
	public static readonly RULE_nonWildcardTypeArguments = 99;
	public static readonly RULE_typeList = 100;
	public static readonly RULE_typeType = 101;
	public static readonly RULE_typeArguments = 102;
	public static readonly RULE_superSuffix = 103;
	public static readonly RULE_explicitGenericInvocationSuffix = 104;
	public static readonly RULE_arguments = 105;
	public static readonly RULE_javaProcessingSketch = 106;
	public static readonly RULE_staticProcessingSketch = 107;
	public static readonly RULE_activeProcessingSketch = 108;
	public static readonly RULE_warnMixedModes = 109;
	public static readonly RULE_variableDeclaratorId = 110;
	public static readonly RULE_warnTypeAsVariableName = 111;
	public static readonly RULE_methodCall = 112;
	public static readonly RULE_functionWithPrimitiveTypeName = 113;
	public static readonly RULE_primitiveType = 114;
	public static readonly RULE_colorPrimitiveType = 115;
	public static readonly RULE_qualifiedName = 116;
	public static readonly RULE_literal = 117;
	public static readonly RULE_hexColorLiteral = 118;
	// tslint:disable:no-trailing-whitespace
	public static readonly ruleNames: string[] = [
		"processingSketch", "compilationUnit", "packageDeclaration", "importDeclaration", 
		"typeDeclaration", "modifier", "classOrInterfaceModifier", "variableModifier", 
		"classDeclaration", "typeParameters", "typeParameter", "typeBound", "enumDeclaration", 
		"enumConstants", "enumConstant", "enumBodyDeclarations", "interfaceDeclaration", 
		"classBody", "interfaceBody", "classBodyDeclaration", "memberDeclaration", 
		"methodDeclaration", "methodBody", "typeTypeOrVoid", "genericMethodDeclaration", 
		"genericConstructorDeclaration", "constructorDeclaration", "fieldDeclaration", 
		"interfaceBodyDeclaration", "interfaceMemberDeclaration", "constDeclaration", 
		"constantDeclarator", "interfaceMethodDeclaration", "interfaceMethodModifier", 
		"genericInterfaceMethodDeclaration", "variableDeclarators", "variableDeclarator", 
		"variableInitializer", "arrayInitializer", "classOrInterfaceType", "classOrInterfaceIdentifier", 
		"typeArgument", "qualifiedNameList", "formalParameters", "formalParameterList", 
		"formalParameter", "lastFormalParameter", "baseStringLiteral", "multilineStringLiteral", 
		"stringLiteral", "integerLiteral", "floatLiteral", "annotation", "elementValuePairs", 
		"elementValuePair", "elementValue", "elementValueArrayInitializer", "annotationTypeDeclaration", 
		"annotationTypeBody", "annotationTypeElementDeclaration", "annotationTypeElementRest", 
		"annotationMethodOrConstantRest", "annotationMethodRest", "annotationConstantRest", 
		"defaultValue", "block", "blockStatement", "localVariableDeclaration", 
		"localTypeDeclaration", "statement", "catchClause", "catchType", "finallyBlock", 
		"resourceSpecification", "resources", "resource", "switchBlockStatementGroup", 
		"switchLabel", "forLoop", "forControl", "forInit", "enhancedForControl", 
		"parExpression", "expressionList", "expression", "lambdaExpression", "lambdaParameters", 
		"lambdaBody", "primary", "classType", "creator", "createdObjectName", 
		"createdType", "innerCreator", "arrayCreatorRest", "classCreatorRest", 
		"explicitGenericInvocation", "typeArgumentsOrDiamond", "nonWildcardTypeArgumentsOrDiamond", 
		"nonWildcardTypeArguments", "typeList", "typeType", "typeArguments", "superSuffix", 
		"explicitGenericInvocationSuffix", "arguments", "javaProcessingSketch", 
		"staticProcessingSketch", "activeProcessingSketch", "warnMixedModes", 
		"variableDeclaratorId", "warnTypeAsVariableName", "methodCall", "functionWithPrimitiveTypeName", 
		"primitiveType", "colorPrimitiveType", "qualifiedName", "literal", "hexColorLiteral",
	];

	private static readonly _LITERAL_NAMES: Array<string | undefined> = [
		undefined, "'abstract'", "'assert'", "'boolean'", "'break'", "'byte'", 
		"'case'", "'catch'", "'char'", "'class'", "'const'", "'color'", "'continue'", 
		"'default'", "'do'", "'double'", "'else'", "'enum'", "'extends'", "'final'", 
		"'finally'", "'float'", "'for'", "'if'", "'goto'", "'implements'", "'import'", 
		"'instanceof'", "'int'", "'interface'", "'long'", "'native'", "'new'", 
		"'package'", "'private'", "'protected'", "'public'", "'return'", "'short'", 
		"'static'", "'strictfp'", "'super'", "'switch'", "'synchronized'", "'this'", 
		"'throw'", "'throws'", "'transient'", "'try'", "'var'", "'void'", "'volatile'", 
		"'while'", undefined, undefined, undefined, undefined, undefined, undefined, 
		undefined, undefined, undefined, undefined, "'null'", "'('", "')'", "'{'", 
		"'}'", "'['", "']'", "';'", "','", "'.'", "'='", "'>'", "'<'", "'!'", 
		"'~'", "'?'", "':'", "'=='", "'<='", "'>='", "'!='", "'&&'", "'||'", "'++'", 
		"'--'", "'+'", "'-'", "'*'", "'/'", "'&'", "'|'", "'^'", "'%'", "'+='", 
		"'-='", "'*='", "'/='", "'&='", "'|='", "'^='", "'%='", "'<<='", "'>>='", 
		"'>>>='", "'->'", "'::'", "'@'", "'...'",
	];
	private static readonly _SYMBOLIC_NAMES: Array<string | undefined> = [
		undefined, "ABSTRACT", "ASSERT", "BOOLEAN", "BREAK", "BYTE", "CASE", "CATCH", 
		"CHAR", "CLASS", "CONST", "COLOR", "CONTINUE", "DEFAULT", "DO", "DOUBLE", 
		"ELSE", "ENUM", "EXTENDS", "FINAL", "FINALLY", "FLOAT", "FOR", "IF", "GOTO", 
		"IMPLEMENTS", "IMPORT", "INSTANCEOF", "INT", "INTERFACE", "LONG", "NATIVE", 
		"NEW", "PACKAGE", "PRIVATE", "PROTECTED", "PUBLIC", "RETURN", "SHORT", 
		"STATIC", "STRICTFP", "SUPER", "SWITCH", "SYNCHRONIZED", "THIS", "THROW", 
		"THROWS", "TRANSIENT", "TRY", "VAR", "VOID", "VOLATILE", "WHILE", "DECIMAL_LITERAL", 
		"HEX_LITERAL", "OCT_LITERAL", "BINARY_LITERAL", "FLOAT_LITERAL", "HEX_FLOAT_LITERAL", 
		"BOOL_LITERAL", "CHAR_LITERAL", "STRING_LITERAL", "MULTI_STRING_LIT", 
		"NULL_LITERAL", "LPAREN", "RPAREN", "LBRACE", "RBRACE", "LBRACK", "RBRACK", 
		"SEMI", "COMMA", "DOT", "ASSIGN", "GT", "LT", "BANG", "TILDE", "QUESTION", 
		"COLON", "EQUAL", "LE", "GE", "NOTEQUAL", "AND", "OR", "INC", "DEC", "ADD", 
		"SUB", "MUL", "DIV", "BITAND", "BITOR", "CARET", "MOD", "ADD_ASSIGN", 
		"SUB_ASSIGN", "MUL_ASSIGN", "DIV_ASSIGN", "AND_ASSIGN", "OR_ASSIGN", "XOR_ASSIGN", 
		"MOD_ASSIGN", "LSHIFT_ASSIGN", "RSHIFT_ASSIGN", "URSHIFT_ASSIGN", "ARROW", 
		"COLONCOLON", "AT", "ELLIPSIS", "WS", "COMMENT", "LINE_COMMENT", "HexColorLiteral", 
		"IDENTIFIER",
	];
	public static readonly VOCABULARY: Vocabulary = new VocabularyImpl(ProcessingParser._LITERAL_NAMES, ProcessingParser._SYMBOLIC_NAMES, []);

	// @Override
	// @NotNull
	public get vocabulary(): Vocabulary {
		return ProcessingParser.VOCABULARY;
	}
	// tslint:enable:no-trailing-whitespace

	// @Override
	public get grammarFileName(): string { return "ProcessingParser.g4"; }

	// @Override
	public get ruleNames(): string[] { return ProcessingParser.ruleNames; }

	// @Override
	public get serializedATN(): string { return ProcessingParser._serializedATN; }

	protected createFailedPredicateException(predicate?: string, message?: string): FailedPredicateException {
		return new FailedPredicateException(this, predicate, message);
	}

	constructor(input: TokenStream) {
		super(input);
		this._interp = new ParserATNSimulator(ProcessingParser._ATN, this);
	}
	// @RuleVersion(0)
	public processingSketch(): ProcessingSketchContext {
		let _localctx: ProcessingSketchContext = new ProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 0, ProcessingParser.RULE_processingSketch);
		try {
			this.state = 241;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 0, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 238;
				this.staticProcessingSketch();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 239;
				this.javaProcessingSketch();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 240;
				this.activeProcessingSketch();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public compilationUnit(): CompilationUnitContext {
		let _localctx: CompilationUnitContext = new CompilationUnitContext(this._ctx, this.state);
		this.enterRule(_localctx, 2, ProcessingParser.RULE_compilationUnit);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 244;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 1, this._ctx) ) {
			case 1:
				{
				this.state = 243;
				this.packageDeclaration();
				}
				break;
			}
			this.state = 249;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.IMPORT) {
				{
				{
				this.state = 246;
				this.importDeclaration();
				}
				}
				this.state = 251;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 255;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.INTERFACE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.AT) {
				{
				{
				this.state = 252;
				this.typeDeclaration();
				}
				}
				this.state = 257;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 258;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public packageDeclaration(): PackageDeclarationContext {
		let _localctx: PackageDeclarationContext = new PackageDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 4, ProcessingParser.RULE_packageDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 263;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 260;
				this.annotation();
				}
				}
				this.state = 265;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 266;
			this.match(ProcessingParser.PACKAGE);
			this.state = 267;
			this.qualifiedName();
			this.state = 268;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public importDeclaration(): ImportDeclarationContext {
		let _localctx: ImportDeclarationContext = new ImportDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 6, ProcessingParser.RULE_importDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 270;
			this.match(ProcessingParser.IMPORT);
			this.state = 272;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.STATIC) {
				{
				this.state = 271;
				this.match(ProcessingParser.STATIC);
				}
			}

			this.state = 274;
			this.qualifiedName();
			this.state = 277;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.DOT) {
				{
				this.state = 275;
				this.match(ProcessingParser.DOT);
				this.state = 276;
				this.match(ProcessingParser.MUL);
				}
			}

			this.state = 279;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeDeclaration(): TypeDeclarationContext {
		let _localctx: TypeDeclarationContext = new TypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 8, ProcessingParser.RULE_typeDeclaration);
		try {
			let _alt: number;
			this.state = 294;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.CLASS:
			case ProcessingParser.ENUM:
			case ProcessingParser.FINAL:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 284;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 281;
						this.classOrInterfaceModifier();
						}
						}
					}
					this.state = 286;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 7, this._ctx);
				}
				this.state = 291;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.CLASS:
					{
					this.state = 287;
					this.classDeclaration();
					}
					break;
				case ProcessingParser.ENUM:
					{
					this.state = 288;
					this.enumDeclaration();
					}
					break;
				case ProcessingParser.INTERFACE:
					{
					this.state = 289;
					this.interfaceDeclaration();
					}
					break;
				case ProcessingParser.AT:
					{
					this.state = 290;
					this.annotationTypeDeclaration();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 293;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public modifier(): ModifierContext {
		let _localctx: ModifierContext = new ModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 10, ProcessingParser.RULE_modifier);
		try {
			this.state = 301;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.FINAL:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 296;
				this.classOrInterfaceModifier();
				}
				break;
			case ProcessingParser.NATIVE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 297;
				this.match(ProcessingParser.NATIVE);
				}
				break;
			case ProcessingParser.SYNCHRONIZED:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 298;
				this.match(ProcessingParser.SYNCHRONIZED);
				}
				break;
			case ProcessingParser.TRANSIENT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 299;
				this.match(ProcessingParser.TRANSIENT);
				}
				break;
			case ProcessingParser.VOLATILE:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 300;
				this.match(ProcessingParser.VOLATILE);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext {
		let _localctx: ClassOrInterfaceModifierContext = new ClassOrInterfaceModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 12, ProcessingParser.RULE_classOrInterfaceModifier);
		try {
			this.state = 311;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 303;
				this.annotation();
				}
				break;
			case ProcessingParser.PUBLIC:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 304;
				this.match(ProcessingParser.PUBLIC);
				}
				break;
			case ProcessingParser.PROTECTED:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 305;
				this.match(ProcessingParser.PROTECTED);
				}
				break;
			case ProcessingParser.PRIVATE:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 306;
				this.match(ProcessingParser.PRIVATE);
				}
				break;
			case ProcessingParser.STATIC:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 307;
				this.match(ProcessingParser.STATIC);
				}
				break;
			case ProcessingParser.ABSTRACT:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 308;
				this.match(ProcessingParser.ABSTRACT);
				}
				break;
			case ProcessingParser.FINAL:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 309;
				this.match(ProcessingParser.FINAL);
				}
				break;
			case ProcessingParser.STRICTFP:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 310;
				this.match(ProcessingParser.STRICTFP);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableModifier(): VariableModifierContext {
		let _localctx: VariableModifierContext = new VariableModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 14, ProcessingParser.RULE_variableModifier);
		try {
			this.state = 315;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.FINAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 313;
				this.match(ProcessingParser.FINAL);
				}
				break;
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 314;
				this.annotation();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classDeclaration(): ClassDeclarationContext {
		let _localctx: ClassDeclarationContext = new ClassDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 16, ProcessingParser.RULE_classDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 317;
			this.match(ProcessingParser.CLASS);
			this.state = 318;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 320;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 319;
				this.typeParameters();
				}
			}

			this.state = 324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.EXTENDS) {
				{
				this.state = 322;
				this.match(ProcessingParser.EXTENDS);
				this.state = 323;
				this.typeType();
				}
			}

			this.state = 328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.IMPLEMENTS) {
				{
				this.state = 326;
				this.match(ProcessingParser.IMPLEMENTS);
				this.state = 327;
				this.typeList();
				}
			}

			this.state = 330;
			this.classBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeParameters(): TypeParametersContext {
		let _localctx: TypeParametersContext = new TypeParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 18, ProcessingParser.RULE_typeParameters);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 332;
			this.match(ProcessingParser.LT);
			this.state = 333;
			this.typeParameter();
			this.state = 338;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 334;
				this.match(ProcessingParser.COMMA);
				this.state = 335;
				this.typeParameter();
				}
				}
				this.state = 340;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 341;
			this.match(ProcessingParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeParameter(): TypeParameterContext {
		let _localctx: TypeParameterContext = new TypeParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 20, ProcessingParser.RULE_typeParameter);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 346;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 343;
				this.annotation();
				}
				}
				this.state = 348;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 349;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 352;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.EXTENDS) {
				{
				this.state = 350;
				this.match(ProcessingParser.EXTENDS);
				this.state = 351;
				this.typeBound();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeBound(): TypeBoundContext {
		let _localctx: TypeBoundContext = new TypeBoundContext(this._ctx, this.state);
		this.enterRule(_localctx, 22, ProcessingParser.RULE_typeBound);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 354;
			this.typeType();
			this.state = 359;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.BITAND) {
				{
				{
				this.state = 355;
				this.match(ProcessingParser.BITAND);
				this.state = 356;
				this.typeType();
				}
				}
				this.state = 361;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumDeclaration(): EnumDeclarationContext {
		let _localctx: EnumDeclarationContext = new EnumDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 24, ProcessingParser.RULE_enumDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 362;
			this.match(ProcessingParser.ENUM);
			this.state = 363;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 366;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.IMPLEMENTS) {
				{
				this.state = 364;
				this.match(ProcessingParser.IMPLEMENTS);
				this.state = 365;
				this.typeList();
				}
			}

			this.state = 368;
			this.match(ProcessingParser.LBRACE);
			this.state = 370;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				this.state = 369;
				this.enumConstants();
				}
			}

			this.state = 373;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.COMMA) {
				{
				this.state = 372;
				this.match(ProcessingParser.COMMA);
				}
			}

			this.state = 376;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.SEMI) {
				{
				this.state = 375;
				this.enumBodyDeclarations();
				}
			}

			this.state = 378;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumConstants(): EnumConstantsContext {
		let _localctx: EnumConstantsContext = new EnumConstantsContext(this._ctx, this.state);
		this.enterRule(_localctx, 26, ProcessingParser.RULE_enumConstants);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 380;
			this.enumConstant();
			this.state = 385;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 381;
					this.match(ProcessingParser.COMMA);
					this.state = 382;
					this.enumConstant();
					}
					}
				}
				this.state = 387;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 24, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumConstant(): EnumConstantContext {
		let _localctx: EnumConstantContext = new EnumConstantContext(this._ctx, this.state);
		this.enterRule(_localctx, 28, ProcessingParser.RULE_enumConstant);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 391;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 388;
				this.annotation();
				}
				}
				this.state = 393;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 394;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 396;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LPAREN) {
				{
				this.state = 395;
				this.arguments();
				}
			}

			this.state = 399;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LBRACE) {
				{
				this.state = 398;
				this.classBody();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enumBodyDeclarations(): EnumBodyDeclarationsContext {
		let _localctx: EnumBodyDeclarationsContext = new EnumBodyDeclarationsContext(this._ctx, this.state);
		this.enterRule(_localctx, 30, ProcessingParser.RULE_enumBodyDeclarations);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 401;
			this.match(ProcessingParser.SEMI);
			this.state = 405;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ProcessingParser.LBRACE - 66)) | (1 << (ProcessingParser.SEMI - 66)) | (1 << (ProcessingParser.LT - 66)))) !== 0) || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 402;
				this.classBodyDeclaration();
				}
				}
				this.state = 407;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceDeclaration(): InterfaceDeclarationContext {
		let _localctx: InterfaceDeclarationContext = new InterfaceDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 32, ProcessingParser.RULE_interfaceDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 408;
			this.match(ProcessingParser.INTERFACE);
			this.state = 409;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 411;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 410;
				this.typeParameters();
				}
			}

			this.state = 415;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.EXTENDS) {
				{
				this.state = 413;
				this.match(ProcessingParser.EXTENDS);
				this.state = 414;
				this.typeList();
				}
			}

			this.state = 417;
			this.interfaceBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classBody(): ClassBodyContext {
		let _localctx: ClassBodyContext = new ClassBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 34, ProcessingParser.RULE_classBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 419;
			this.match(ProcessingParser.LBRACE);
			this.state = 423;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ProcessingParser.LBRACE - 66)) | (1 << (ProcessingParser.SEMI - 66)) | (1 << (ProcessingParser.LT - 66)))) !== 0) || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 420;
				this.classBodyDeclaration();
				}
				}
				this.state = 425;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 426;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceBody(): InterfaceBodyContext {
		let _localctx: InterfaceBodyContext = new InterfaceBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 36, ProcessingParser.RULE_interfaceBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 428;
			this.match(ProcessingParser.LBRACE);
			this.state = 432;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DEFAULT) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.LT || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 429;
				this.interfaceBodyDeclaration();
				}
				}
				this.state = 434;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 435;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classBodyDeclaration(): ClassBodyDeclarationContext {
		let _localctx: ClassBodyDeclarationContext = new ClassBodyDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 38, ProcessingParser.RULE_classBodyDeclaration);
		let _la: number;
		try {
			let _alt: number;
			this.state = 450;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 35, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 437;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 438;
				this.importDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 440;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.STATIC) {
					{
					this.state = 439;
					this.match(ProcessingParser.STATIC);
					}
				}

				this.state = 442;
				this.block();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 446;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 443;
						this.modifier();
						}
						}
					}
					this.state = 448;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 34, this._ctx);
				}
				this.state = 449;
				this.memberDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public memberDeclaration(): MemberDeclarationContext {
		let _localctx: MemberDeclarationContext = new MemberDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 40, ProcessingParser.RULE_memberDeclaration);
		try {
			this.state = 461;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 36, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 452;
				this.methodDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 453;
				this.genericMethodDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 454;
				this.fieldDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 455;
				this.constructorDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 456;
				this.genericConstructorDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 457;
				this.interfaceDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 458;
				this.annotationTypeDeclaration();
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 459;
				this.classDeclaration();
				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 460;
				this.enumDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodDeclaration(): MethodDeclarationContext {
		let _localctx: MethodDeclarationContext = new MethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 42, ProcessingParser.RULE_methodDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 463;
			this.typeTypeOrVoid();
			this.state = 464;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 465;
			this.formalParameters();
			this.state = 470;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 466;
				this.match(ProcessingParser.LBRACK);
				this.state = 467;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 472;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 475;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.THROWS) {
				{
				this.state = 473;
				this.match(ProcessingParser.THROWS);
				this.state = 474;
				this.qualifiedNameList();
				}
			}

			this.state = 477;
			this.methodBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodBody(): MethodBodyContext {
		let _localctx: MethodBodyContext = new MethodBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 44, ProcessingParser.RULE_methodBody);
		try {
			this.state = 481;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.LBRACE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 479;
				this.block();
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 480;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeTypeOrVoid(): TypeTypeOrVoidContext {
		let _localctx: TypeTypeOrVoidContext = new TypeTypeOrVoidContext(this._ctx, this.state);
		this.enterRule(_localctx, 46, ProcessingParser.RULE_typeTypeOrVoid);
		try {
			this.state = 485;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
			case ProcessingParser.VAR:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 483;
				this.typeType();
				}
				break;
			case ProcessingParser.VOID:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 484;
				this.match(ProcessingParser.VOID);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public genericMethodDeclaration(): GenericMethodDeclarationContext {
		let _localctx: GenericMethodDeclarationContext = new GenericMethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 48, ProcessingParser.RULE_genericMethodDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 487;
			this.typeParameters();
			this.state = 488;
			this.methodDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public genericConstructorDeclaration(): GenericConstructorDeclarationContext {
		let _localctx: GenericConstructorDeclarationContext = new GenericConstructorDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 50, ProcessingParser.RULE_genericConstructorDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 490;
			this.typeParameters();
			this.state = 491;
			this.constructorDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constructorDeclaration(): ConstructorDeclarationContext {
		let _localctx: ConstructorDeclarationContext = new ConstructorDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 52, ProcessingParser.RULE_constructorDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 493;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 494;
			this.formalParameters();
			this.state = 497;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.THROWS) {
				{
				this.state = 495;
				this.match(ProcessingParser.THROWS);
				this.state = 496;
				this.qualifiedNameList();
				}
			}

			this.state = 499;
			_localctx._constructorBody = this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public fieldDeclaration(): FieldDeclarationContext {
		let _localctx: FieldDeclarationContext = new FieldDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 54, ProcessingParser.RULE_fieldDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 501;
			this.typeType();
			this.state = 502;
			this.variableDeclarators();
			this.state = 503;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceBodyDeclaration(): InterfaceBodyDeclarationContext {
		let _localctx: InterfaceBodyDeclarationContext = new InterfaceBodyDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 56, ProcessingParser.RULE_interfaceBodyDeclaration);
		try {
			let _alt: number;
			this.state = 513;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.CLASS:
			case ProcessingParser.COLOR:
			case ProcessingParser.DEFAULT:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.ENUM:
			case ProcessingParser.FINAL:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.LONG:
			case ProcessingParser.NATIVE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.SHORT:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.SYNCHRONIZED:
			case ProcessingParser.TRANSIENT:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.VOLATILE:
			case ProcessingParser.LT:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 508;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 505;
						this.modifier();
						}
						}
					}
					this.state = 510;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 42, this._ctx);
				}
				this.state = 511;
				this.interfaceMemberDeclaration();
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 512;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext {
		let _localctx: InterfaceMemberDeclarationContext = new InterfaceMemberDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 58, ProcessingParser.RULE_interfaceMemberDeclaration);
		try {
			this.state = 522;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 44, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 515;
				this.constDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 516;
				this.interfaceMethodDeclaration();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 517;
				this.genericInterfaceMethodDeclaration();
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 518;
				this.interfaceDeclaration();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 519;
				this.annotationTypeDeclaration();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 520;
				this.classDeclaration();
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 521;
				this.enumDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constDeclaration(): ConstDeclarationContext {
		let _localctx: ConstDeclarationContext = new ConstDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 60, ProcessingParser.RULE_constDeclaration);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 524;
			this.typeType();
			this.state = 525;
			this.constantDeclarator();
			this.state = 530;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 526;
				this.match(ProcessingParser.COMMA);
				this.state = 527;
				this.constantDeclarator();
				}
				}
				this.state = 532;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 533;
			this.match(ProcessingParser.SEMI);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public constantDeclarator(): ConstantDeclaratorContext {
		let _localctx: ConstantDeclaratorContext = new ConstantDeclaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 62, ProcessingParser.RULE_constantDeclarator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 535;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 540;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 536;
				this.match(ProcessingParser.LBRACK);
				this.state = 537;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 542;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 543;
			this.match(ProcessingParser.ASSIGN);
			this.state = 544;
			this.variableInitializer();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext {
		let _localctx: InterfaceMethodDeclarationContext = new InterfaceMethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 64, ProcessingParser.RULE_interfaceMethodDeclaration);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 549;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 546;
					this.interfaceMethodModifier();
					}
					}
				}
				this.state = 551;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 47, this._ctx);
			}
			this.state = 562;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 552;
				this.typeTypeOrVoid();
				}
				break;
			case ProcessingParser.LT:
				{
				this.state = 553;
				this.typeParameters();
				this.state = 557;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 554;
						this.annotation();
						}
						}
					}
					this.state = 559;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 48, this._ctx);
				}
				this.state = 560;
				this.typeTypeOrVoid();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 564;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 565;
			this.formalParameters();
			this.state = 570;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 566;
				this.match(ProcessingParser.LBRACK);
				this.state = 567;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 572;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 575;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.THROWS) {
				{
				this.state = 573;
				this.match(ProcessingParser.THROWS);
				this.state = 574;
				this.qualifiedNameList();
				}
			}

			this.state = 577;
			this.methodBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public interfaceMethodModifier(): InterfaceMethodModifierContext {
		let _localctx: InterfaceMethodModifierContext = new InterfaceMethodModifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 66, ProcessingParser.RULE_interfaceMethodModifier);
		try {
			this.state = 585;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 579;
				this.annotation();
				}
				break;
			case ProcessingParser.PUBLIC:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 580;
				this.match(ProcessingParser.PUBLIC);
				}
				break;
			case ProcessingParser.ABSTRACT:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 581;
				this.match(ProcessingParser.ABSTRACT);
				}
				break;
			case ProcessingParser.DEFAULT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 582;
				this.match(ProcessingParser.DEFAULT);
				}
				break;
			case ProcessingParser.STATIC:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 583;
				this.match(ProcessingParser.STATIC);
				}
				break;
			case ProcessingParser.STRICTFP:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 584;
				this.match(ProcessingParser.STRICTFP);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public genericInterfaceMethodDeclaration(): GenericInterfaceMethodDeclarationContext {
		let _localctx: GenericInterfaceMethodDeclarationContext = new GenericInterfaceMethodDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 68, ProcessingParser.RULE_genericInterfaceMethodDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 587;
			this.typeParameters();
			this.state = 588;
			this.interfaceMethodDeclaration();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclarators(): VariableDeclaratorsContext {
		let _localctx: VariableDeclaratorsContext = new VariableDeclaratorsContext(this._ctx, this.state);
		this.enterRule(_localctx, 70, ProcessingParser.RULE_variableDeclarators);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 590;
			this.variableDeclarator();
			this.state = 595;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 591;
				this.match(ProcessingParser.COMMA);
				this.state = 592;
				this.variableDeclarator();
				}
				}
				this.state = 597;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclarator(): VariableDeclaratorContext {
		let _localctx: VariableDeclaratorContext = new VariableDeclaratorContext(this._ctx, this.state);
		this.enterRule(_localctx, 72, ProcessingParser.RULE_variableDeclarator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 598;
			this.variableDeclaratorId();
			this.state = 601;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.ASSIGN) {
				{
				this.state = 599;
				this.match(ProcessingParser.ASSIGN);
				this.state = 600;
				this.variableInitializer();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableInitializer(): VariableInitializerContext {
		let _localctx: VariableInitializerContext = new VariableInitializerContext(this._ctx, this.state);
		this.enterRule(_localctx, 74, ProcessingParser.RULE_variableInitializer);
		try {
			this.state = 605;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.LBRACE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 603;
				this.arrayInitializer();
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.NEW:
			case ProcessingParser.SHORT:
			case ProcessingParser.SUPER:
			case ProcessingParser.THIS:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
			case ProcessingParser.BOOL_LITERAL:
			case ProcessingParser.CHAR_LITERAL:
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
			case ProcessingParser.NULL_LITERAL:
			case ProcessingParser.LPAREN:
			case ProcessingParser.LT:
			case ProcessingParser.BANG:
			case ProcessingParser.TILDE:
			case ProcessingParser.INC:
			case ProcessingParser.DEC:
			case ProcessingParser.ADD:
			case ProcessingParser.SUB:
			case ProcessingParser.AT:
			case ProcessingParser.HexColorLiteral:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 604;
				this.expression(0);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayInitializer(): ArrayInitializerContext {
		let _localctx: ArrayInitializerContext = new ArrayInitializerContext(this._ctx, this.state);
		this.enterRule(_localctx, 76, ProcessingParser.RULE_arrayInitializer);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 607;
			this.match(ProcessingParser.LBRACE);
			this.state = 619;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 608;
				this.variableInitializer();
				this.state = 613;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 609;
						this.match(ProcessingParser.COMMA);
						this.state = 610;
						this.variableInitializer();
						}
						}
					}
					this.state = 615;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 56, this._ctx);
				}
				this.state = 617;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.COMMA) {
					{
					this.state = 616;
					this.match(ProcessingParser.COMMA);
					}
				}

				}
			}

			this.state = 621;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classOrInterfaceType(): ClassOrInterfaceTypeContext {
		let _localctx: ClassOrInterfaceTypeContext = new ClassOrInterfaceTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 78, ProcessingParser.RULE_classOrInterfaceType);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 623;
			this.classOrInterfaceIdentifier();
			this.state = 628;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 624;
					this.match(ProcessingParser.DOT);
					this.state = 625;
					this.classOrInterfaceIdentifier();
					}
					}
				}
				this.state = 630;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 59, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classOrInterfaceIdentifier(): ClassOrInterfaceIdentifierContext {
		let _localctx: ClassOrInterfaceIdentifierContext = new ClassOrInterfaceIdentifierContext(this._ctx, this.state);
		this.enterRule(_localctx, 80, ProcessingParser.RULE_classOrInterfaceIdentifier);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 631;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 633;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 60, this._ctx) ) {
			case 1:
				{
				this.state = 632;
				this.typeArguments();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeArgument(): TypeArgumentContext {
		let _localctx: TypeArgumentContext = new TypeArgumentContext(this._ctx, this.state);
		this.enterRule(_localctx, 82, ProcessingParser.RULE_typeArgument);
		let _la: number;
		try {
			this.state = 641;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
			case ProcessingParser.VAR:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 635;
				this.typeType();
				}
				break;
			case ProcessingParser.QUESTION:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 636;
				this.match(ProcessingParser.QUESTION);
				this.state = 639;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.EXTENDS || _la === ProcessingParser.SUPER) {
					{
					this.state = 637;
					_la = this._input.LA(1);
					if (!(_la === ProcessingParser.EXTENDS || _la === ProcessingParser.SUPER)) {
					this._errHandler.recoverInline(this);
					} else {
						if (this._input.LA(1) === Token.EOF) {
							this.matchedEOF = true;
						}

						this._errHandler.reportMatch(this);
						this.consume();
					}
					this.state = 638;
					this.typeType();
					}
				}

				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedNameList(): QualifiedNameListContext {
		let _localctx: QualifiedNameListContext = new QualifiedNameListContext(this._ctx, this.state);
		this.enterRule(_localctx, 84, ProcessingParser.RULE_qualifiedNameList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 643;
			this.qualifiedName();
			this.state = 648;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 644;
				this.match(ProcessingParser.COMMA);
				this.state = 645;
				this.qualifiedName();
				}
				}
				this.state = 650;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameters(): FormalParametersContext {
		let _localctx: FormalParametersContext = new FormalParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 86, ProcessingParser.RULE_formalParameters);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 651;
			this.match(ProcessingParser.LPAREN);
			this.state = 653;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || _la === ProcessingParser.SHORT || _la === ProcessingParser.VAR || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				this.state = 652;
				this.formalParameterList();
				}
			}

			this.state = 655;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameterList(): FormalParameterListContext {
		let _localctx: FormalParameterListContext = new FormalParameterListContext(this._ctx, this.state);
		this.enterRule(_localctx, 88, ProcessingParser.RULE_formalParameterList);
		let _la: number;
		try {
			let _alt: number;
			this.state = 670;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 67, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 657;
				this.formalParameter();
				this.state = 662;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 65, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 658;
						this.match(ProcessingParser.COMMA);
						this.state = 659;
						this.formalParameter();
						}
						}
					}
					this.state = 664;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 65, this._ctx);
				}
				this.state = 667;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.COMMA) {
					{
					this.state = 665;
					this.match(ProcessingParser.COMMA);
					this.state = 666;
					this.lastFormalParameter();
					}
				}

				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 669;
				this.lastFormalParameter();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public formalParameter(): FormalParameterContext {
		let _localctx: FormalParameterContext = new FormalParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 90, ProcessingParser.RULE_formalParameter);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 675;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 672;
					this.variableModifier();
					}
					}
				}
				this.state = 677;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 68, this._ctx);
			}
			this.state = 678;
			this.typeType();
			this.state = 679;
			this.variableDeclaratorId();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lastFormalParameter(): LastFormalParameterContext {
		let _localctx: LastFormalParameterContext = new LastFormalParameterContext(this._ctx, this.state);
		this.enterRule(_localctx, 92, ProcessingParser.RULE_lastFormalParameter);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 684;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 69, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 681;
					this.variableModifier();
					}
					}
				}
				this.state = 686;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 69, this._ctx);
			}
			this.state = 687;
			this.typeType();
			this.state = 688;
			this.match(ProcessingParser.ELLIPSIS);
			this.state = 689;
			this.variableDeclaratorId();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public baseStringLiteral(): BaseStringLiteralContext {
		let _localctx: BaseStringLiteralContext = new BaseStringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 94, ProcessingParser.RULE_baseStringLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 691;
			this.match(ProcessingParser.STRING_LITERAL);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public multilineStringLiteral(): MultilineStringLiteralContext {
		let _localctx: MultilineStringLiteralContext = new MultilineStringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 96, ProcessingParser.RULE_multilineStringLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 693;
			this.match(ProcessingParser.MULTI_STRING_LIT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public stringLiteral(): StringLiteralContext {
		let _localctx: StringLiteralContext = new StringLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 98, ProcessingParser.RULE_stringLiteral);
		try {
			this.state = 697;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.STRING_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 695;
				this.baseStringLiteral();
				}
				break;
			case ProcessingParser.MULTI_STRING_LIT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 696;
				this.multilineStringLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public integerLiteral(): IntegerLiteralContext {
		let _localctx: IntegerLiteralContext = new IntegerLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 100, ProcessingParser.RULE_integerLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 699;
			_la = this._input.LA(1);
			if (!(((((_la - 53)) & ~0x1F) === 0 && ((1 << (_la - 53)) & ((1 << (ProcessingParser.DECIMAL_LITERAL - 53)) | (1 << (ProcessingParser.HEX_LITERAL - 53)) | (1 << (ProcessingParser.OCT_LITERAL - 53)) | (1 << (ProcessingParser.BINARY_LITERAL - 53)))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public floatLiteral(): FloatLiteralContext {
		let _localctx: FloatLiteralContext = new FloatLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 102, ProcessingParser.RULE_floatLiteral);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 701;
			_la = this._input.LA(1);
			if (!(_la === ProcessingParser.FLOAT_LITERAL || _la === ProcessingParser.HEX_FLOAT_LITERAL)) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotation(): AnnotationContext {
		let _localctx: AnnotationContext = new AnnotationContext(this._ctx, this.state);
		this.enterRule(_localctx, 104, ProcessingParser.RULE_annotation);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 703;
			this.match(ProcessingParser.AT);
			this.state = 704;
			this.qualifiedName();
			this.state = 711;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LPAREN) {
				{
				this.state = 705;
				this.match(ProcessingParser.LPAREN);
				this.state = 708;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 71, this._ctx) ) {
				case 1:
					{
					this.state = 706;
					this.elementValuePairs();
					}
					break;

				case 2:
					{
					this.state = 707;
					this.elementValue();
					}
					break;
				}
				this.state = 710;
				this.match(ProcessingParser.RPAREN);
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValuePairs(): ElementValuePairsContext {
		let _localctx: ElementValuePairsContext = new ElementValuePairsContext(this._ctx, this.state);
		this.enterRule(_localctx, 106, ProcessingParser.RULE_elementValuePairs);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 713;
			this.elementValuePair();
			this.state = 718;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 714;
				this.match(ProcessingParser.COMMA);
				this.state = 715;
				this.elementValuePair();
				}
				}
				this.state = 720;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValuePair(): ElementValuePairContext {
		let _localctx: ElementValuePairContext = new ElementValuePairContext(this._ctx, this.state);
		this.enterRule(_localctx, 108, ProcessingParser.RULE_elementValuePair);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 721;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 722;
			this.match(ProcessingParser.ASSIGN);
			this.state = 723;
			this.elementValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValue(): ElementValueContext {
		let _localctx: ElementValueContext = new ElementValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 110, ProcessingParser.RULE_elementValue);
		try {
			this.state = 728;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 74, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 725;
				this.expression(0);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 726;
				this.annotation();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 727;
				this.elementValueArrayInitializer();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public elementValueArrayInitializer(): ElementValueArrayInitializerContext {
		let _localctx: ElementValueArrayInitializerContext = new ElementValueArrayInitializerContext(this._ctx, this.state);
		this.enterRule(_localctx, 112, ProcessingParser.RULE_elementValueArrayInitializer);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 730;
			this.match(ProcessingParser.LBRACE);
			this.state = 739;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 731;
				this.elementValue();
				this.state = 736;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 75, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 732;
						this.match(ProcessingParser.COMMA);
						this.state = 733;
						this.elementValue();
						}
						}
					}
					this.state = 738;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 75, this._ctx);
				}
				}
			}

			this.state = 742;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.COMMA) {
				{
				this.state = 741;
				this.match(ProcessingParser.COMMA);
				}
			}

			this.state = 744;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext {
		let _localctx: AnnotationTypeDeclarationContext = new AnnotationTypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 114, ProcessingParser.RULE_annotationTypeDeclaration);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 746;
			this.match(ProcessingParser.AT);
			this.state = 747;
			this.match(ProcessingParser.INTERFACE);
			this.state = 748;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 749;
			this.annotationTypeBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeBody(): AnnotationTypeBodyContext {
		let _localctx: AnnotationTypeBodyContext = new AnnotationTypeBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 116, ProcessingParser.RULE_annotationTypeBody);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 751;
			this.match(ProcessingParser.LBRACE);
			this.state = 755;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				{
				this.state = 752;
				this.annotationTypeElementDeclaration();
				}
				}
				this.state = 757;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 758;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeElementDeclaration(): AnnotationTypeElementDeclarationContext {
		let _localctx: AnnotationTypeElementDeclarationContext = new AnnotationTypeElementDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 118, ProcessingParser.RULE_annotationTypeElementDeclaration);
		try {
			let _alt: number;
			this.state = 768;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.CLASS:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.ENUM:
			case ProcessingParser.FINAL:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.LONG:
			case ProcessingParser.NATIVE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.SHORT:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.SYNCHRONIZED:
			case ProcessingParser.TRANSIENT:
			case ProcessingParser.VAR:
			case ProcessingParser.VOLATILE:
			case ProcessingParser.AT:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 763;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 760;
						this.modifier();
						}
						}
					}
					this.state = 765;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 79, this._ctx);
				}
				this.state = 766;
				this.annotationTypeElementRest();
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 767;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationTypeElementRest(): AnnotationTypeElementRestContext {
		let _localctx: AnnotationTypeElementRestContext = new AnnotationTypeElementRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 120, ProcessingParser.RULE_annotationTypeElementRest);
		try {
			this.state = 790;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 85, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 770;
				this.typeType();
				this.state = 771;
				this.annotationMethodOrConstantRest();
				this.state = 772;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 774;
				this.classDeclaration();
				this.state = 776;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 81, this._ctx) ) {
				case 1:
					{
					this.state = 775;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 778;
				this.interfaceDeclaration();
				this.state = 780;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 82, this._ctx) ) {
				case 1:
					{
					this.state = 779;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 782;
				this.enumDeclaration();
				this.state = 784;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 83, this._ctx) ) {
				case 1:
					{
					this.state = 783;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 786;
				this.annotationTypeDeclaration();
				this.state = 788;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 84, this._ctx) ) {
				case 1:
					{
					this.state = 787;
					this.match(ProcessingParser.SEMI);
					}
					break;
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationMethodOrConstantRest(): AnnotationMethodOrConstantRestContext {
		let _localctx: AnnotationMethodOrConstantRestContext = new AnnotationMethodOrConstantRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 122, ProcessingParser.RULE_annotationMethodOrConstantRest);
		try {
			this.state = 794;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 86, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 792;
				this.annotationMethodRest();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 793;
				this.annotationConstantRest();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationMethodRest(): AnnotationMethodRestContext {
		let _localctx: AnnotationMethodRestContext = new AnnotationMethodRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 124, ProcessingParser.RULE_annotationMethodRest);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 796;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 797;
			this.match(ProcessingParser.LPAREN);
			this.state = 798;
			this.match(ProcessingParser.RPAREN);
			this.state = 800;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.DEFAULT) {
				{
				this.state = 799;
				this.defaultValue();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public annotationConstantRest(): AnnotationConstantRestContext {
		let _localctx: AnnotationConstantRestContext = new AnnotationConstantRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 126, ProcessingParser.RULE_annotationConstantRest);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 802;
			this.variableDeclarators();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public defaultValue(): DefaultValueContext {
		let _localctx: DefaultValueContext = new DefaultValueContext(this._ctx, this.state);
		this.enterRule(_localctx, 128, ProcessingParser.RULE_defaultValue);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 804;
			this.match(ProcessingParser.DEFAULT);
			this.state = 805;
			this.elementValue();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public block(): BlockContext {
		let _localctx: BlockContext = new BlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 130, ProcessingParser.RULE_block);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 807;
			this.match(ProcessingParser.LBRACE);
			this.state = 811;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				{
				this.state = 808;
				this.blockStatement();
				}
				}
				this.state = 813;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 814;
			this.match(ProcessingParser.RBRACE);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public blockStatement(): BlockStatementContext {
		let _localctx: BlockStatementContext = new BlockStatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 132, ProcessingParser.RULE_blockStatement);
		try {
			this.state = 821;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 89, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 816;
				this.localVariableDeclaration();
				this.state = 817;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 819;
				this.statement();
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 820;
				this.localTypeDeclaration();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public localVariableDeclaration(): LocalVariableDeclarationContext {
		let _localctx: LocalVariableDeclarationContext = new LocalVariableDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 134, ProcessingParser.RULE_localVariableDeclaration);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 826;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 90, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 823;
					this.variableModifier();
					}
					}
				}
				this.state = 828;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 90, this._ctx);
			}
			this.state = 829;
			this.typeType();
			this.state = 830;
			this.variableDeclarators();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public localTypeDeclaration(): LocalTypeDeclarationContext {
		let _localctx: LocalTypeDeclarationContext = new LocalTypeDeclarationContext(this._ctx, this.state);
		this.enterRule(_localctx, 136, ProcessingParser.RULE_localTypeDeclaration);
		let _la: number;
		try {
			this.state = 843;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.ABSTRACT:
			case ProcessingParser.CLASS:
			case ProcessingParser.FINAL:
			case ProcessingParser.INTERFACE:
			case ProcessingParser.PRIVATE:
			case ProcessingParser.PROTECTED:
			case ProcessingParser.PUBLIC:
			case ProcessingParser.STATIC:
			case ProcessingParser.STRICTFP:
			case ProcessingParser.AT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 835;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.ABSTRACT || _la === ProcessingParser.FINAL || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)))) !== 0) || _la === ProcessingParser.AT) {
					{
					{
					this.state = 832;
					this.classOrInterfaceModifier();
					}
					}
					this.state = 837;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 840;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.CLASS:
					{
					this.state = 838;
					this.classDeclaration();
					}
					break;
				case ProcessingParser.INTERFACE:
					{
					this.state = 839;
					this.interfaceDeclaration();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			case ProcessingParser.SEMI:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 842;
				this.match(ProcessingParser.SEMI);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public statement(): StatementContext {
		let _localctx: StatementContext = new StatementContext(this._ctx, this.state);
		this.enterRule(_localctx, 138, ProcessingParser.RULE_statement);
		let _la: number;
		try {
			let _alt: number;
			this.state = 944;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 106, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 845;
				_localctx._blockLabel = this.block();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 846;
				this.match(ProcessingParser.ASSERT);
				this.state = 847;
				this.expression(0);
				this.state = 850;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.COLON) {
					{
					this.state = 848;
					this.match(ProcessingParser.COLON);
					this.state = 849;
					this.expression(0);
					}
				}

				this.state = 852;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 854;
				this.match(ProcessingParser.IF);
				this.state = 855;
				this.parExpression();
				this.state = 856;
				this.statement();
				this.state = 859;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 95, this._ctx) ) {
				case 1:
					{
					this.state = 857;
					this.match(ProcessingParser.ELSE);
					this.state = 858;
					this.statement();
					}
					break;
				}
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 861;
				this.forLoop();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 862;
				this.match(ProcessingParser.WHILE);
				this.state = 863;
				this.parExpression();
				this.state = 864;
				this.statement();
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 866;
				this.match(ProcessingParser.DO);
				this.state = 867;
				this.statement();
				this.state = 868;
				this.match(ProcessingParser.WHILE);
				this.state = 869;
				this.parExpression();
				this.state = 870;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 872;
				this.match(ProcessingParser.TRY);
				this.state = 873;
				this.block();
				this.state = 883;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.CATCH:
					{
					this.state = 875;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					do {
						{
						{
						this.state = 874;
						this.catchClause();
						}
						}
						this.state = 877;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
					} while (_la === ProcessingParser.CATCH);
					this.state = 880;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ProcessingParser.FINALLY) {
						{
						this.state = 879;
						this.finallyBlock();
						}
					}

					}
					break;
				case ProcessingParser.FINALLY:
					{
					this.state = 882;
					this.finallyBlock();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 8:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 885;
				this.match(ProcessingParser.TRY);
				this.state = 886;
				this.resourceSpecification();
				this.state = 887;
				this.block();
				this.state = 891;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.CATCH) {
					{
					{
					this.state = 888;
					this.catchClause();
					}
					}
					this.state = 893;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 895;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.FINALLY) {
					{
					this.state = 894;
					this.finallyBlock();
					}
				}

				}
				break;

			case 9:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 897;
				this.match(ProcessingParser.SWITCH);
				this.state = 898;
				this.parExpression();
				this.state = 899;
				this.match(ProcessingParser.LBRACE);
				this.state = 903;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 101, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 900;
						this.switchBlockStatementGroup();
						}
						}
					}
					this.state = 905;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 101, this._ctx);
				}
				this.state = 909;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.CASE || _la === ProcessingParser.DEFAULT) {
					{
					{
					this.state = 906;
					this.switchLabel();
					}
					}
					this.state = 911;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 912;
				this.match(ProcessingParser.RBRACE);
				}
				break;

			case 10:
				this.enterOuterAlt(_localctx, 10);
				{
				this.state = 914;
				this.match(ProcessingParser.SYNCHRONIZED);
				this.state = 915;
				this.parExpression();
				this.state = 916;
				this.block();
				}
				break;

			case 11:
				this.enterOuterAlt(_localctx, 11);
				{
				this.state = 918;
				this.match(ProcessingParser.RETURN);
				this.state = 920;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 919;
					this.expression(0);
					}
				}

				this.state = 922;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 12:
				this.enterOuterAlt(_localctx, 12);
				{
				this.state = 923;
				this.match(ProcessingParser.THROW);
				this.state = 924;
				this.expression(0);
				this.state = 925;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 13:
				this.enterOuterAlt(_localctx, 13);
				{
				this.state = 927;
				this.match(ProcessingParser.BREAK);
				this.state = 929;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.IDENTIFIER) {
					{
					this.state = 928;
					this.match(ProcessingParser.IDENTIFIER);
					}
				}

				this.state = 931;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 14:
				this.enterOuterAlt(_localctx, 14);
				{
				this.state = 932;
				this.match(ProcessingParser.CONTINUE);
				this.state = 934;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.IDENTIFIER) {
					{
					this.state = 933;
					this.match(ProcessingParser.IDENTIFIER);
					}
				}

				this.state = 936;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 15:
				this.enterOuterAlt(_localctx, 15);
				{
				this.state = 937;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 16:
				this.enterOuterAlt(_localctx, 16);
				{
				this.state = 938;
				_localctx._statementExpression = this.expression(0);
				this.state = 939;
				this.match(ProcessingParser.SEMI);
				}
				break;

			case 17:
				this.enterOuterAlt(_localctx, 17);
				{
				this.state = 941;
				_localctx._identifierLabel = this.match(ProcessingParser.IDENTIFIER);
				this.state = 942;
				this.match(ProcessingParser.COLON);
				this.state = 943;
				this.statement();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public catchClause(): CatchClauseContext {
		let _localctx: CatchClauseContext = new CatchClauseContext(this._ctx, this.state);
		this.enterRule(_localctx, 140, ProcessingParser.RULE_catchClause);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 946;
			this.match(ProcessingParser.CATCH);
			this.state = 947;
			this.match(ProcessingParser.LPAREN);
			this.state = 951;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.FINAL || _la === ProcessingParser.AT) {
				{
				{
				this.state = 948;
				this.variableModifier();
				}
				}
				this.state = 953;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 954;
			this.catchType();
			this.state = 955;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 956;
			this.match(ProcessingParser.RPAREN);
			this.state = 957;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public catchType(): CatchTypeContext {
		let _localctx: CatchTypeContext = new CatchTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 142, ProcessingParser.RULE_catchType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 959;
			this.qualifiedName();
			this.state = 964;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.BITOR) {
				{
				{
				this.state = 960;
				this.match(ProcessingParser.BITOR);
				this.state = 961;
				this.qualifiedName();
				}
				}
				this.state = 966;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public finallyBlock(): FinallyBlockContext {
		let _localctx: FinallyBlockContext = new FinallyBlockContext(this._ctx, this.state);
		this.enterRule(_localctx, 144, ProcessingParser.RULE_finallyBlock);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 967;
			this.match(ProcessingParser.FINALLY);
			this.state = 968;
			this.block();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resourceSpecification(): ResourceSpecificationContext {
		let _localctx: ResourceSpecificationContext = new ResourceSpecificationContext(this._ctx, this.state);
		this.enterRule(_localctx, 146, ProcessingParser.RULE_resourceSpecification);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 970;
			this.match(ProcessingParser.LPAREN);
			this.state = 971;
			this.resources();
			this.state = 973;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.SEMI) {
				{
				this.state = 972;
				this.match(ProcessingParser.SEMI);
				}
			}

			this.state = 975;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resources(): ResourcesContext {
		let _localctx: ResourcesContext = new ResourcesContext(this._ctx, this.state);
		this.enterRule(_localctx, 148, ProcessingParser.RULE_resources);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 977;
			this.resource();
			this.state = 982;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 110, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 978;
					this.match(ProcessingParser.SEMI);
					this.state = 979;
					this.resource();
					}
					}
				}
				this.state = 984;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 110, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public resource(): ResourceContext {
		let _localctx: ResourceContext = new ResourceContext(this._ctx, this.state);
		this.enterRule(_localctx, 150, ProcessingParser.RULE_resource);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 988;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.FINAL || _la === ProcessingParser.AT) {
				{
				{
				this.state = 985;
				this.variableModifier();
				}
				}
				this.state = 990;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 991;
			this.classOrInterfaceType();
			this.state = 992;
			this.variableDeclaratorId();
			this.state = 993;
			this.match(ProcessingParser.ASSIGN);
			this.state = 994;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switchBlockStatementGroup(): SwitchBlockStatementGroupContext {
		let _localctx: SwitchBlockStatementGroupContext = new SwitchBlockStatementGroupContext(this._ctx, this.state);
		this.enterRule(_localctx, 152, ProcessingParser.RULE_switchBlockStatementGroup);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 997;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 996;
				this.switchLabel();
				}
				}
				this.state = 999;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while (_la === ProcessingParser.CASE || _la === ProcessingParser.DEFAULT);
			this.state = 1002;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1001;
				this.blockStatement();
				}
				}
				this.state = 1004;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0));
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public switchLabel(): SwitchLabelContext {
		let _localctx: SwitchLabelContext = new SwitchLabelContext(this._ctx, this.state);
		this.enterRule(_localctx, 154, ProcessingParser.RULE_switchLabel);
		try {
			this.state = 1014;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.CASE:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1006;
				this.match(ProcessingParser.CASE);
				this.state = 1009;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 114, this._ctx) ) {
				case 1:
					{
					this.state = 1007;
					_localctx._enumConstantName = this.match(ProcessingParser.IDENTIFIER);
					}
					break;

				case 2:
					{
					this.state = 1008;
					_localctx._constantExpression = this.expression(0);
					}
					break;
				}
				this.state = 1011;
				this.match(ProcessingParser.COLON);
				}
				break;
			case ProcessingParser.DEFAULT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1012;
				this.match(ProcessingParser.DEFAULT);
				this.state = 1013;
				this.match(ProcessingParser.COLON);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forLoop(): ForLoopContext {
		let _localctx: ForLoopContext = new ForLoopContext(this._ctx, this.state);
		this.enterRule(_localctx, 156, ProcessingParser.RULE_forLoop);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1016;
			this.match(ProcessingParser.FOR);
			this.state = 1017;
			this.match(ProcessingParser.LPAREN);
			this.state = 1018;
			this.forControl();
			this.state = 1019;
			this.match(ProcessingParser.RPAREN);
			this.state = 1020;
			this.statement();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forControl(): ForControlContext {
		let _localctx: ForControlContext = new ForControlContext(this._ctx, this.state);
		this.enterRule(_localctx, 158, ProcessingParser.RULE_forControl);
		let _la: number;
		try {
			this.state = 1034;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 119, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1022;
				this.enhancedForControl();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1024;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1023;
					this.forInit();
					}
				}

				this.state = 1026;
				this.match(ProcessingParser.SEMI);
				this.state = 1028;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1027;
					this.expression(0);
					}
				}

				this.state = 1030;
				this.match(ProcessingParser.SEMI);
				this.state = 1032;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1031;
					_localctx._forUpdate = this.expressionList();
					}
				}

				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public forInit(): ForInitContext {
		let _localctx: ForInitContext = new ForInitContext(this._ctx, this.state);
		this.enterRule(_localctx, 160, ProcessingParser.RULE_forInit);
		try {
			this.state = 1038;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 120, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1036;
				this.localVariableDeclaration();
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1037;
				this.expressionList();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public enhancedForControl(): EnhancedForControlContext {
		let _localctx: EnhancedForControlContext = new EnhancedForControlContext(this._ctx, this.state);
		this.enterRule(_localctx, 162, ProcessingParser.RULE_enhancedForControl);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1043;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1040;
					this.variableModifier();
					}
					}
				}
				this.state = 1045;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 121, this._ctx);
			}
			this.state = 1046;
			this.typeType();
			this.state = 1047;
			this.variableDeclaratorId();
			this.state = 1048;
			this.match(ProcessingParser.COLON);
			this.state = 1049;
			this.expression(0);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public parExpression(): ParExpressionContext {
		let _localctx: ParExpressionContext = new ParExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 164, ProcessingParser.RULE_parExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1051;
			this.match(ProcessingParser.LPAREN);
			this.state = 1052;
			this.expression(0);
			this.state = 1053;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public expressionList(): ExpressionListContext {
		let _localctx: ExpressionListContext = new ExpressionListContext(this._ctx, this.state);
		this.enterRule(_localctx, 166, ProcessingParser.RULE_expressionList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1055;
			this.expression(0);
			this.state = 1060;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 1056;
				this.match(ProcessingParser.COMMA);
				this.state = 1057;
				this.expression(0);
				}
				}
				this.state = 1062;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public expression(): ExpressionContext;
	public expression(_p: number): ExpressionContext;
	// @RuleVersion(0)
	public expression(_p?: number): ExpressionContext {
		if (_p === undefined) {
			_p = 0;
		}

		let _parentctx: ParserRuleContext = this._ctx;
		let _parentState: number = this.state;
		let _localctx: ExpressionContext = new ExpressionContext(this._ctx, _parentState);
		let _prevctx: ExpressionContext = _localctx;
		let _startState: number = 168;
		this.enterRecursionRule(_localctx, 168, ProcessingParser.RULE_expression, _p);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1094;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 126, this._ctx) ) {
			case 1:
				{
				this.state = 1064;
				this.primary();
				}
				break;

			case 2:
				{
				this.state = 1065;
				this.methodCall();
				}
				break;

			case 3:
				{
				this.state = 1066;
				this.match(ProcessingParser.NEW);
				this.state = 1067;
				this.creator();
				}
				break;

			case 4:
				{
				this.state = 1068;
				this.match(ProcessingParser.LPAREN);
				this.state = 1069;
				this.typeType();
				this.state = 1070;
				this.match(ProcessingParser.RPAREN);
				this.state = 1071;
				this.expression(21);
				}
				break;

			case 5:
				{
				this.state = 1073;
				_localctx._prefix = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(((((_la - 86)) & ~0x1F) === 0 && ((1 << (_la - 86)) & ((1 << (ProcessingParser.INC - 86)) | (1 << (ProcessingParser.DEC - 86)) | (1 << (ProcessingParser.ADD - 86)) | (1 << (ProcessingParser.SUB - 86)))) !== 0))) {
					_localctx._prefix = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1074;
				this.expression(19);
				}
				break;

			case 6:
				{
				this.state = 1075;
				_localctx._prefix = this._input.LT(1);
				_la = this._input.LA(1);
				if (!(_la === ProcessingParser.BANG || _la === ProcessingParser.TILDE)) {
					_localctx._prefix = this._errHandler.recoverInline(this);
				} else {
					if (this._input.LA(1) === Token.EOF) {
						this.matchedEOF = true;
					}

					this._errHandler.reportMatch(this);
					this.consume();
				}
				this.state = 1076;
				this.expression(18);
				}
				break;

			case 7:
				{
				this.state = 1077;
				this.lambdaExpression();
				}
				break;

			case 8:
				{
				this.state = 1078;
				this.typeType();
				this.state = 1079;
				this.match(ProcessingParser.COLONCOLON);
				this.state = 1085;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.LT:
				case ProcessingParser.IDENTIFIER:
					{
					this.state = 1081;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
					if (_la === ProcessingParser.LT) {
						{
						this.state = 1080;
						this.typeArguments();
						}
					}

					this.state = 1083;
					this.match(ProcessingParser.IDENTIFIER);
					}
					break;
				case ProcessingParser.NEW:
					{
					this.state = 1084;
					this.match(ProcessingParser.NEW);
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;

			case 9:
				{
				this.state = 1087;
				this.classType();
				this.state = 1088;
				this.match(ProcessingParser.COLONCOLON);
				this.state = 1090;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if (_la === ProcessingParser.LT) {
					{
					this.state = 1089;
					this.typeArguments();
					}
				}

				this.state = 1092;
				this.match(ProcessingParser.NEW);
				}
				break;
			}
			this._ctx._stop = this._input.tryLT(-1);
			this.state = 1176;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 132, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					if (this._parseListeners != null) {
						this.triggerExitRuleEvent();
					}
					_prevctx = _localctx;
					{
					this.state = 1174;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 131, this._ctx) ) {
					case 1:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1096;
						if (!(this.precpred(this._ctx, 17))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 17)");
						}
						this.state = 1097;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 90)) & ~0x1F) === 0 && ((1 << (_la - 90)) & ((1 << (ProcessingParser.MUL - 90)) | (1 << (ProcessingParser.DIV - 90)) | (1 << (ProcessingParser.MOD - 90)))) !== 0))) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1098;
						this.expression(18);
						}
						break;

					case 2:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1099;
						if (!(this.precpred(this._ctx, 16))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 16)");
						}
						this.state = 1100;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === ProcessingParser.ADD || _la === ProcessingParser.SUB)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1101;
						this.expression(17);
						}
						break;

					case 3:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1102;
						if (!(this.precpred(this._ctx, 15))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 15)");
						}
						this.state = 1110;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 127, this._ctx) ) {
						case 1:
							{
							this.state = 1103;
							this.match(ProcessingParser.LT);
							this.state = 1104;
							this.match(ProcessingParser.LT);
							}
							break;

						case 2:
							{
							this.state = 1105;
							this.match(ProcessingParser.GT);
							this.state = 1106;
							this.match(ProcessingParser.GT);
							this.state = 1107;
							this.match(ProcessingParser.GT);
							}
							break;

						case 3:
							{
							this.state = 1108;
							this.match(ProcessingParser.GT);
							this.state = 1109;
							this.match(ProcessingParser.GT);
							}
							break;
						}
						this.state = 1112;
						this.expression(16);
						}
						break;

					case 4:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1113;
						if (!(this.precpred(this._ctx, 14))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 14)");
						}
						this.state = 1114;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 74)) & ~0x1F) === 0 && ((1 << (_la - 74)) & ((1 << (ProcessingParser.GT - 74)) | (1 << (ProcessingParser.LT - 74)) | (1 << (ProcessingParser.LE - 74)) | (1 << (ProcessingParser.GE - 74)))) !== 0))) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1115;
						this.expression(15);
						}
						break;

					case 5:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1116;
						if (!(this.precpred(this._ctx, 12))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 12)");
						}
						this.state = 1117;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === ProcessingParser.EQUAL || _la === ProcessingParser.NOTEQUAL)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1118;
						this.expression(13);
						}
						break;

					case 6:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1119;
						if (!(this.precpred(this._ctx, 11))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 11)");
						}
						this.state = 1120;
						_localctx._bop = this.match(ProcessingParser.BITAND);
						this.state = 1121;
						this.expression(12);
						}
						break;

					case 7:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1122;
						if (!(this.precpred(this._ctx, 10))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 10)");
						}
						this.state = 1123;
						_localctx._bop = this.match(ProcessingParser.CARET);
						this.state = 1124;
						this.expression(11);
						}
						break;

					case 8:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1125;
						if (!(this.precpred(this._ctx, 9))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 9)");
						}
						this.state = 1126;
						_localctx._bop = this.match(ProcessingParser.BITOR);
						this.state = 1127;
						this.expression(10);
						}
						break;

					case 9:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1128;
						if (!(this.precpred(this._ctx, 8))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 8)");
						}
						this.state = 1129;
						_localctx._bop = this.match(ProcessingParser.AND);
						this.state = 1130;
						this.expression(9);
						}
						break;

					case 10:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1131;
						if (!(this.precpred(this._ctx, 7))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 7)");
						}
						this.state = 1132;
						_localctx._bop = this.match(ProcessingParser.OR);
						this.state = 1133;
						this.expression(8);
						}
						break;

					case 11:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1134;
						if (!(this.precpred(this._ctx, 6))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 6)");
						}
						this.state = 1135;
						_localctx._bop = this.match(ProcessingParser.QUESTION);
						this.state = 1136;
						this.expression(0);
						this.state = 1137;
						this.match(ProcessingParser.COLON);
						this.state = 1138;
						this.expression(7);
						}
						break;

					case 12:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1140;
						if (!(this.precpred(this._ctx, 5))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 5)");
						}
						this.state = 1141;
						_localctx._bop = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(((((_la - 73)) & ~0x1F) === 0 && ((1 << (_la - 73)) & ((1 << (ProcessingParser.ASSIGN - 73)) | (1 << (ProcessingParser.ADD_ASSIGN - 73)) | (1 << (ProcessingParser.SUB_ASSIGN - 73)) | (1 << (ProcessingParser.MUL_ASSIGN - 73)) | (1 << (ProcessingParser.DIV_ASSIGN - 73)) | (1 << (ProcessingParser.AND_ASSIGN - 73)) | (1 << (ProcessingParser.OR_ASSIGN - 73)) | (1 << (ProcessingParser.XOR_ASSIGN - 73)) | (1 << (ProcessingParser.MOD_ASSIGN - 73)) | (1 << (ProcessingParser.LSHIFT_ASSIGN - 73)))) !== 0) || _la === ProcessingParser.RSHIFT_ASSIGN || _la === ProcessingParser.URSHIFT_ASSIGN)) {
							_localctx._bop = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						this.state = 1142;
						this.expression(5);
						}
						break;

					case 13:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1143;
						if (!(this.precpred(this._ctx, 25))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 25)");
						}
						this.state = 1144;
						_localctx._bop = this.match(ProcessingParser.DOT);
						this.state = 1156;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 129, this._ctx) ) {
						case 1:
							{
							this.state = 1145;
							this.match(ProcessingParser.IDENTIFIER);
							}
							break;

						case 2:
							{
							this.state = 1146;
							this.methodCall();
							}
							break;

						case 3:
							{
							this.state = 1147;
							this.match(ProcessingParser.THIS);
							}
							break;

						case 4:
							{
							this.state = 1148;
							this.match(ProcessingParser.NEW);
							this.state = 1150;
							this._errHandler.sync(this);
							_la = this._input.LA(1);
							if (_la === ProcessingParser.LT) {
								{
								this.state = 1149;
								this.nonWildcardTypeArguments();
								}
							}

							this.state = 1152;
							this.innerCreator();
							}
							break;

						case 5:
							{
							this.state = 1153;
							this.match(ProcessingParser.SUPER);
							this.state = 1154;
							this.superSuffix();
							}
							break;

						case 6:
							{
							this.state = 1155;
							this.explicitGenericInvocation();
							}
							break;
						}
						}
						break;

					case 14:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1158;
						if (!(this.precpred(this._ctx, 24))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 24)");
						}
						this.state = 1159;
						this.match(ProcessingParser.LBRACK);
						this.state = 1160;
						this.expression(0);
						this.state = 1161;
						this.match(ProcessingParser.RBRACK);
						}
						break;

					case 15:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1163;
						if (!(this.precpred(this._ctx, 20))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 20)");
						}
						this.state = 1164;
						_localctx._postfix = this._input.LT(1);
						_la = this._input.LA(1);
						if (!(_la === ProcessingParser.INC || _la === ProcessingParser.DEC)) {
							_localctx._postfix = this._errHandler.recoverInline(this);
						} else {
							if (this._input.LA(1) === Token.EOF) {
								this.matchedEOF = true;
							}

							this._errHandler.reportMatch(this);
							this.consume();
						}
						}
						break;

					case 16:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1165;
						if (!(this.precpred(this._ctx, 13))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 13)");
						}
						this.state = 1166;
						_localctx._bop = this.match(ProcessingParser.INSTANCEOF);
						this.state = 1167;
						this.typeType();
						}
						break;

					case 17:
						{
						_localctx = new ExpressionContext(_parentctx, _parentState);
						this.pushNewRecursionContext(_localctx, _startState, ProcessingParser.RULE_expression);
						this.state = 1168;
						if (!(this.precpred(this._ctx, 3))) {
							throw this.createFailedPredicateException("this.precpred(this._ctx, 3)");
						}
						this.state = 1169;
						this.match(ProcessingParser.COLONCOLON);
						this.state = 1171;
						this._errHandler.sync(this);
						_la = this._input.LA(1);
						if (_la === ProcessingParser.LT) {
							{
							this.state = 1170;
							this.typeArguments();
							}
						}

						this.state = 1173;
						this.match(ProcessingParser.IDENTIFIER);
						}
						break;
					}
					}
				}
				this.state = 1178;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 132, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.unrollRecursionContexts(_parentctx);
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaExpression(): LambdaExpressionContext {
		let _localctx: LambdaExpressionContext = new LambdaExpressionContext(this._ctx, this.state);
		this.enterRule(_localctx, 170, ProcessingParser.RULE_lambdaExpression);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1179;
			this.lambdaParameters();
			this.state = 1180;
			this.match(ProcessingParser.ARROW);
			this.state = 1181;
			this.lambdaBody();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaParameters(): LambdaParametersContext {
		let _localctx: LambdaParametersContext = new LambdaParametersContext(this._ctx, this.state);
		this.enterRule(_localctx, 172, ProcessingParser.RULE_lambdaParameters);
		let _la: number;
		try {
			this.state = 1199;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 135, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1183;
				this.match(ProcessingParser.IDENTIFIER);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1184;
				this.match(ProcessingParser.LPAREN);
				this.state = 1186;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || _la === ProcessingParser.SHORT || _la === ProcessingParser.VAR || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
					{
					this.state = 1185;
					this.formalParameterList();
					}
				}

				this.state = 1188;
				this.match(ProcessingParser.RPAREN);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1189;
				this.match(ProcessingParser.LPAREN);
				this.state = 1190;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1195;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.COMMA) {
					{
					{
					this.state = 1191;
					this.match(ProcessingParser.COMMA);
					this.state = 1192;
					this.match(ProcessingParser.IDENTIFIER);
					}
					}
					this.state = 1197;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1198;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public lambdaBody(): LambdaBodyContext {
		let _localctx: LambdaBodyContext = new LambdaBodyContext(this._ctx, this.state);
		this.enterRule(_localctx, 174, ProcessingParser.RULE_lambdaBody);
		try {
			this.state = 1203;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.NEW:
			case ProcessingParser.SHORT:
			case ProcessingParser.SUPER:
			case ProcessingParser.THIS:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
			case ProcessingParser.BOOL_LITERAL:
			case ProcessingParser.CHAR_LITERAL:
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
			case ProcessingParser.NULL_LITERAL:
			case ProcessingParser.LPAREN:
			case ProcessingParser.LT:
			case ProcessingParser.BANG:
			case ProcessingParser.TILDE:
			case ProcessingParser.INC:
			case ProcessingParser.DEC:
			case ProcessingParser.ADD:
			case ProcessingParser.SUB:
			case ProcessingParser.AT:
			case ProcessingParser.HexColorLiteral:
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1201;
				this.expression(0);
				}
				break;
			case ProcessingParser.LBRACE:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1202;
				this.block();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primary(): PrimaryContext {
		let _localctx: PrimaryContext = new PrimaryContext(this._ctx, this.state);
		this.enterRule(_localctx, 176, ProcessingParser.RULE_primary);
		try {
			this.state = 1223;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 138, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1205;
				this.match(ProcessingParser.LPAREN);
				this.state = 1206;
				this.expression(0);
				this.state = 1207;
				this.match(ProcessingParser.RPAREN);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1209;
				this.match(ProcessingParser.THIS);
				}
				break;

			case 3:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1210;
				this.match(ProcessingParser.SUPER);
				}
				break;

			case 4:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1211;
				this.literal();
				}
				break;

			case 5:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1212;
				this.match(ProcessingParser.IDENTIFIER);
				}
				break;

			case 6:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1213;
				this.typeTypeOrVoid();
				this.state = 1214;
				this.match(ProcessingParser.DOT);
				this.state = 1215;
				this.match(ProcessingParser.CLASS);
				}
				break;

			case 7:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1217;
				this.nonWildcardTypeArguments();
				this.state = 1221;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.SUPER:
				case ProcessingParser.IDENTIFIER:
					{
					this.state = 1218;
					this.explicitGenericInvocationSuffix();
					}
					break;
				case ProcessingParser.THIS:
					{
					this.state = 1219;
					this.match(ProcessingParser.THIS);
					this.state = 1220;
					this.arguments();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classType(): ClassTypeContext {
		let _localctx: ClassTypeContext = new ClassTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 178, ProcessingParser.RULE_classType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1228;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 139, this._ctx) ) {
			case 1:
				{
				this.state = 1225;
				this.classOrInterfaceType();
				this.state = 1226;
				this.match(ProcessingParser.DOT);
				}
				break;
			}
			this.state = 1233;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.AT) {
				{
				{
				this.state = 1230;
				this.annotation();
				}
				}
				this.state = 1235;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1236;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 1238;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 1237;
				this.typeArguments();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public creator(): CreatorContext {
		let _localctx: CreatorContext = new CreatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 180, ProcessingParser.RULE_creator);
		try {
			this.state = 1248;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1240;
				this.primitiveType();
				this.state = 1241;
				this.arrayCreatorRest();
				}
				break;
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1243;
				this.createdObjectName();
				this.state = 1246;
				this._errHandler.sync(this);
				switch (this._input.LA(1)) {
				case ProcessingParser.LBRACK:
					{
					this.state = 1244;
					this.arrayCreatorRest();
					}
					break;
				case ProcessingParser.LPAREN:
					{
					this.state = 1245;
					this.classCreatorRest();
					}
					break;
				default:
					throw new NoViableAltException(this);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public createdObjectName(): CreatedObjectNameContext {
		let _localctx: CreatedObjectNameContext = new CreatedObjectNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 182, ProcessingParser.RULE_createdObjectName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1250;
			this.createdType();
			this.state = 1255;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.DOT) {
				{
				{
				this.state = 1251;
				this.match(ProcessingParser.DOT);
				this.state = 1252;
				this.createdType();
				}
				}
				this.state = 1257;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public createdType(): CreatedTypeContext {
		let _localctx: CreatedTypeContext = new CreatedTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 184, ProcessingParser.RULE_createdType);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1258;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 1260;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 1259;
				this.typeArgumentsOrDiamond();
				}
			}

			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public innerCreator(): InnerCreatorContext {
		let _localctx: InnerCreatorContext = new InnerCreatorContext(this._ctx, this.state);
		this.enterRule(_localctx, 186, ProcessingParser.RULE_innerCreator);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1262;
			this.match(ProcessingParser.IDENTIFIER);
			this.state = 1264;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.LT) {
				{
				this.state = 1263;
				this.nonWildcardTypeArgumentsOrDiamond();
				}
			}

			this.state = 1266;
			this.classCreatorRest();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arrayCreatorRest(): ArrayCreatorRestContext {
		let _localctx: ArrayCreatorRestContext = new ArrayCreatorRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 188, ProcessingParser.RULE_arrayCreatorRest);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1268;
			this.match(ProcessingParser.LBRACK);
			this.state = 1296;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.RBRACK:
				{
				this.state = 1269;
				this.match(ProcessingParser.RBRACK);
				this.state = 1274;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.LBRACK) {
					{
					{
					this.state = 1270;
					this.match(ProcessingParser.LBRACK);
					this.state = 1271;
					this.match(ProcessingParser.RBRACK);
					}
					}
					this.state = 1276;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				this.state = 1277;
				this.arrayInitializer();
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.NEW:
			case ProcessingParser.SHORT:
			case ProcessingParser.SUPER:
			case ProcessingParser.THIS:
			case ProcessingParser.VAR:
			case ProcessingParser.VOID:
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
			case ProcessingParser.BOOL_LITERAL:
			case ProcessingParser.CHAR_LITERAL:
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
			case ProcessingParser.NULL_LITERAL:
			case ProcessingParser.LPAREN:
			case ProcessingParser.LT:
			case ProcessingParser.BANG:
			case ProcessingParser.TILDE:
			case ProcessingParser.INC:
			case ProcessingParser.DEC:
			case ProcessingParser.ADD:
			case ProcessingParser.SUB:
			case ProcessingParser.AT:
			case ProcessingParser.HexColorLiteral:
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 1278;
				this.expression(0);
				this.state = 1279;
				this.match(ProcessingParser.RBRACK);
				this.state = 1286;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 148, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1280;
						this.match(ProcessingParser.LBRACK);
						this.state = 1281;
						this.expression(0);
						this.state = 1282;
						this.match(ProcessingParser.RBRACK);
						}
						}
					}
					this.state = 1288;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 148, this._ctx);
				}
				this.state = 1293;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 149, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						{
						this.state = 1289;
						this.match(ProcessingParser.LBRACK);
						this.state = 1290;
						this.match(ProcessingParser.RBRACK);
						}
						}
					}
					this.state = 1295;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 149, this._ctx);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public classCreatorRest(): ClassCreatorRestContext {
		let _localctx: ClassCreatorRestContext = new ClassCreatorRestContext(this._ctx, this.state);
		this.enterRule(_localctx, 190, ProcessingParser.RULE_classCreatorRest);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1298;
			this.arguments();
			this.state = 1300;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 151, this._ctx) ) {
			case 1:
				{
				this.state = 1299;
				this.classBody();
				}
				break;
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public explicitGenericInvocation(): ExplicitGenericInvocationContext {
		let _localctx: ExplicitGenericInvocationContext = new ExplicitGenericInvocationContext(this._ctx, this.state);
		this.enterRule(_localctx, 192, ProcessingParser.RULE_explicitGenericInvocation);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1302;
			this.nonWildcardTypeArguments();
			this.state = 1303;
			this.explicitGenericInvocationSuffix();
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext {
		let _localctx: TypeArgumentsOrDiamondContext = new TypeArgumentsOrDiamondContext(this._ctx, this.state);
		this.enterRule(_localctx, 194, ProcessingParser.RULE_typeArgumentsOrDiamond);
		try {
			this.state = 1308;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 152, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1305;
				this.match(ProcessingParser.LT);
				this.state = 1306;
				this.match(ProcessingParser.GT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1307;
				this.typeArguments();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonWildcardTypeArgumentsOrDiamond(): NonWildcardTypeArgumentsOrDiamondContext {
		let _localctx: NonWildcardTypeArgumentsOrDiamondContext = new NonWildcardTypeArgumentsOrDiamondContext(this._ctx, this.state);
		this.enterRule(_localctx, 196, ProcessingParser.RULE_nonWildcardTypeArgumentsOrDiamond);
		try {
			this.state = 1313;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 153, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1310;
				this.match(ProcessingParser.LT);
				this.state = 1311;
				this.match(ProcessingParser.GT);
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1312;
				this.nonWildcardTypeArguments();
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
		let _localctx: NonWildcardTypeArgumentsContext = new NonWildcardTypeArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 198, ProcessingParser.RULE_nonWildcardTypeArguments);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1315;
			this.match(ProcessingParser.LT);
			this.state = 1316;
			this.typeList();
			this.state = 1317;
			this.match(ProcessingParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeList(): TypeListContext {
		let _localctx: TypeListContext = new TypeListContext(this._ctx, this.state);
		this.enterRule(_localctx, 200, ProcessingParser.RULE_typeList);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1319;
			this.typeType();
			this.state = 1324;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 1320;
				this.match(ProcessingParser.COMMA);
				this.state = 1321;
				this.typeType();
				}
				}
				this.state = 1326;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeType(): TypeTypeContext {
		let _localctx: TypeTypeContext = new TypeTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 202, ProcessingParser.RULE_typeType);
		let _la: number;
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1328;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if (_la === ProcessingParser.AT) {
				{
				this.state = 1327;
				this.annotation();
				}
			}

			this.state = 1333;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 1330;
				this.classOrInterfaceType();
				}
				break;
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
				{
				this.state = 1331;
				this.primitiveType();
				}
				break;
			case ProcessingParser.VAR:
				{
				this.state = 1332;
				this.match(ProcessingParser.VAR);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1339;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 157, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1335;
					this.match(ProcessingParser.LBRACK);
					this.state = 1336;
					this.match(ProcessingParser.RBRACK);
					}
					}
				}
				this.state = 1341;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 157, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public typeArguments(): TypeArgumentsContext {
		let _localctx: TypeArgumentsContext = new TypeArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 204, ProcessingParser.RULE_typeArguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1342;
			this.match(ProcessingParser.LT);
			this.state = 1343;
			this.typeArgument();
			this.state = 1348;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.COMMA) {
				{
				{
				this.state = 1344;
				this.match(ProcessingParser.COMMA);
				this.state = 1345;
				this.typeArgument();
				}
				}
				this.state = 1350;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1351;
			this.match(ProcessingParser.GT);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public superSuffix(): SuperSuffixContext {
		let _localctx: SuperSuffixContext = new SuperSuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 206, ProcessingParser.RULE_superSuffix);
		try {
			this.state = 1359;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.LPAREN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1353;
				this.arguments();
				}
				break;
			case ProcessingParser.DOT:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1354;
				this.match(ProcessingParser.DOT);
				this.state = 1355;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1357;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 159, this._ctx) ) {
				case 1:
					{
					this.state = 1356;
					this.arguments();
					}
					break;
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext {
		let _localctx: ExplicitGenericInvocationSuffixContext = new ExplicitGenericInvocationSuffixContext(this._ctx, this.state);
		this.enterRule(_localctx, 208, ProcessingParser.RULE_explicitGenericInvocationSuffix);
		try {
			this.state = 1365;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.SUPER:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1361;
				this.match(ProcessingParser.SUPER);
				this.state = 1362;
				this.superSuffix();
				}
				break;
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1363;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1364;
				this.arguments();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public arguments(): ArgumentsContext {
		let _localctx: ArgumentsContext = new ArgumentsContext(this._ctx, this.state);
		this.enterRule(_localctx, 210, ProcessingParser.RULE_arguments);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1367;
			this.match(ProcessingParser.LPAREN);
			this.state = 1369;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 1368;
				this.expressionList();
				}
			}

			this.state = 1371;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public javaProcessingSketch(): JavaProcessingSketchContext {
		let _localctx: JavaProcessingSketchContext = new JavaProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 212, ProcessingParser.RULE_javaProcessingSketch);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1374;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 163, this._ctx) ) {
			case 1:
				{
				this.state = 1373;
				this.packageDeclaration();
				}
				break;
			}
			this.state = 1379;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.IMPORT) {
				{
				{
				this.state = 1376;
				this.importDeclaration();
				}
				}
				this.state = 1381;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1383;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			do {
				{
				{
				this.state = 1382;
				this.typeDeclaration();
				}
				}
				this.state = 1385;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			} while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.INTERFACE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)))) !== 0) || _la === ProcessingParser.SEMI || _la === ProcessingParser.AT);
			this.state = 1387;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public staticProcessingSketch(): StaticProcessingSketchContext {
		let _localctx: StaticProcessingSketchContext = new StaticProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 214, ProcessingParser.RULE_staticProcessingSketch);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1394;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 1392;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 166, this._ctx) ) {
				case 1:
					{
					this.state = 1389;
					this.importDeclaration();
					}
					break;

				case 2:
					{
					this.state = 1390;
					this.blockStatement();
					}
					break;

				case 3:
					{
					this.state = 1391;
					this.typeDeclaration();
					}
					break;
				}
				}
				this.state = 1396;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1397;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public activeProcessingSketch(): ActiveProcessingSketchContext {
		let _localctx: ActiveProcessingSketchContext = new ActiveProcessingSketchContext(this._ctx, this.state);
		this.enterRule(_localctx, 216, ProcessingParser.RULE_activeProcessingSketch);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1403;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 34)) & ~0x1F) === 0 && ((1 << (_la - 34)) & ((1 << (ProcessingParser.PRIVATE - 34)) | (1 << (ProcessingParser.PROTECTED - 34)) | (1 << (ProcessingParser.PUBLIC - 34)) | (1 << (ProcessingParser.SHORT - 34)) | (1 << (ProcessingParser.STATIC - 34)) | (1 << (ProcessingParser.STRICTFP - 34)) | (1 << (ProcessingParser.SYNCHRONIZED - 34)) | (1 << (ProcessingParser.TRANSIENT - 34)) | (1 << (ProcessingParser.VAR - 34)) | (1 << (ProcessingParser.VOID - 34)) | (1 << (ProcessingParser.VOLATILE - 34)))) !== 0) || ((((_la - 66)) & ~0x1F) === 0 && ((1 << (_la - 66)) & ((1 << (ProcessingParser.LBRACE - 66)) | (1 << (ProcessingParser.SEMI - 66)) | (1 << (ProcessingParser.LT - 66)))) !== 0) || _la === ProcessingParser.AT || _la === ProcessingParser.IDENTIFIER) {
				{
				this.state = 1401;
				this._errHandler.sync(this);
				switch ( this.interpreter.adaptivePredict(this._input, 168, this._ctx) ) {
				case 1:
					{
					this.state = 1399;
					this.importDeclaration();
					}
					break;

				case 2:
					{
					this.state = 1400;
					this.classBodyDeclaration();
					}
					break;
				}
				}
				this.state = 1405;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}
			this.state = 1406;
			this.match(ProcessingParser.EOF);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public warnMixedModes(): WarnMixedModesContext {
		let _localctx: WarnMixedModesContext = new WarnMixedModesContext(this._ctx, this.state);
		this.enterRule(_localctx, 218, ProcessingParser.RULE_warnMixedModes);
		let _la: number;
		try {
			let _alt: number;
			this.state = 1444;
			this._errHandler.sync(this);
			switch ( this.interpreter.adaptivePredict(this._input, 178, this._ctx) ) {
			case 1:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1413;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 171, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						this.state = 1411;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 170, this._ctx) ) {
						case 1:
							{
							this.state = 1408;
							this.importDeclaration();
							}
							break;

						case 2:
							{
							this.state = 1409;
							this.classBodyDeclaration();
							}
							break;

						case 3:
							{
							this.state = 1410;
							this.blockStatement();
							}
							break;
						}
						}
					}
					this.state = 1415;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 171, this._ctx);
				}
				this.state = 1416;
				this.blockStatement();
				this.state = 1417;
				this.classBodyDeclaration();
				this.state = 1423;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRANSIENT - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.VOLATILE - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1421;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 172, this._ctx) ) {
					case 1:
						{
						this.state = 1418;
						this.importDeclaration();
						}
						break;

					case 2:
						{
						this.state = 1419;
						this.classBodyDeclaration();
						}
						break;

					case 3:
						{
						this.state = 1420;
						this.blockStatement();
						}
						break;
					}
					}
					this.state = 1425;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;

			case 2:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1431;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 175, this._ctx);
				while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
					if (_alt === 1) {
						{
						this.state = 1429;
						this._errHandler.sync(this);
						switch ( this.interpreter.adaptivePredict(this._input, 174, this._ctx) ) {
						case 1:
							{
							this.state = 1426;
							this.importDeclaration();
							}
							break;

						case 2:
							{
							this.state = 1427;
							this.classBodyDeclaration();
							}
							break;

						case 3:
							{
							this.state = 1428;
							this.blockStatement();
							}
							break;
						}
						}
					}
					this.state = 1433;
					this._errHandler.sync(this);
					_alt = this.interpreter.adaptivePredict(this._input, 175, this._ctx);
				}
				this.state = 1434;
				this.classBodyDeclaration();
				this.state = 1435;
				this.blockStatement();
				this.state = 1441;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.ABSTRACT) | (1 << ProcessingParser.ASSERT) | (1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BREAK) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.CLASS) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.CONTINUE) | (1 << ProcessingParser.DO) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.ENUM) | (1 << ProcessingParser.FINAL) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.FOR) | (1 << ProcessingParser.IF) | (1 << ProcessingParser.IMPORT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.INTERFACE) | (1 << ProcessingParser.LONG) | (1 << ProcessingParser.NATIVE))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.PRIVATE - 32)) | (1 << (ProcessingParser.PROTECTED - 32)) | (1 << (ProcessingParser.PUBLIC - 32)) | (1 << (ProcessingParser.RETURN - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.STATIC - 32)) | (1 << (ProcessingParser.STRICTFP - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.SWITCH - 32)) | (1 << (ProcessingParser.SYNCHRONIZED - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.THROW - 32)) | (1 << (ProcessingParser.TRANSIENT - 32)) | (1 << (ProcessingParser.TRY - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.VOLATILE - 32)) | (1 << (ProcessingParser.WHILE - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LBRACE - 64)) | (1 << (ProcessingParser.SEMI - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1439;
					this._errHandler.sync(this);
					switch ( this.interpreter.adaptivePredict(this._input, 176, this._ctx) ) {
					case 1:
						{
						this.state = 1436;
						this.importDeclaration();
						}
						break;

					case 2:
						{
						this.state = 1437;
						this.classBodyDeclaration();
						}
						break;

					case 3:
						{
						this.state = 1438;
						this.blockStatement();
						}
						break;
					}
					}
					this.state = 1443;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		let _localctx: VariableDeclaratorIdContext = new VariableDeclaratorIdContext(this._ctx, this.state);
		this.enterRule(_localctx, 220, ProcessingParser.RULE_variableDeclaratorId);
		let _la: number;
		try {
			this.state = 1455;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.DOUBLE:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
			case ProcessingParser.LONG:
			case ProcessingParser.SHORT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1446;
				this.warnTypeAsVariableName();
				}
				break;
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1447;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1452;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				while (_la === ProcessingParser.LBRACK) {
					{
					{
					this.state = 1448;
					this.match(ProcessingParser.LBRACK);
					this.state = 1449;
					this.match(ProcessingParser.RBRACK);
					}
					}
					this.state = 1454;
					this._errHandler.sync(this);
					_la = this._input.LA(1);
				}
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public warnTypeAsVariableName(): WarnTypeAsVariableNameContext {
		let _localctx: WarnTypeAsVariableNameContext = new WarnTypeAsVariableNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 222, ProcessingParser.RULE_warnTypeAsVariableName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1457;
			_localctx._primitiveType = this.primitiveType();
			this.state = 1462;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			while (_la === ProcessingParser.LBRACK) {
				{
				{
				this.state = 1458;
				this.match(ProcessingParser.LBRACK);
				this.state = 1459;
				this.match(ProcessingParser.RBRACK);
				}
				}
				this.state = 1464;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
			}

			        this.notifyErrorListeners("Type names are not allowed as variable names: "+(_localctx._primitiveType != null ? this._input.getTextFromRange(_localctx._primitiveType._start, _localctx._primitiveType._stop) : undefined));
			      
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public methodCall(): MethodCallContext {
		let _localctx: MethodCallContext = new MethodCallContext(this._ctx, this.state);
		this.enterRule(_localctx, 224, ProcessingParser.RULE_methodCall);
		let _la: number;
		try {
			this.state = 1486;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
			case ProcessingParser.BYTE:
			case ProcessingParser.CHAR:
			case ProcessingParser.COLOR:
			case ProcessingParser.FLOAT:
			case ProcessingParser.INT:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1467;
				this.functionWithPrimitiveTypeName();
				}
				break;
			case ProcessingParser.IDENTIFIER:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1468;
				this.match(ProcessingParser.IDENTIFIER);
				this.state = 1469;
				this.match(ProcessingParser.LPAREN);
				this.state = 1471;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1470;
					this.expressionList();
					}
				}

				this.state = 1473;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			case ProcessingParser.THIS:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1474;
				this.match(ProcessingParser.THIS);
				this.state = 1475;
				this.match(ProcessingParser.LPAREN);
				this.state = 1477;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1476;
					this.expressionList();
					}
				}

				this.state = 1479;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			case ProcessingParser.SUPER:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1480;
				this.match(ProcessingParser.SUPER);
				this.state = 1481;
				this.match(ProcessingParser.LPAREN);
				this.state = 1483;
				this._errHandler.sync(this);
				_la = this._input.LA(1);
				if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
					{
					this.state = 1482;
					this.expressionList();
					}
				}

				this.state = 1485;
				this.match(ProcessingParser.RPAREN);
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public functionWithPrimitiveTypeName(): FunctionWithPrimitiveTypeNameContext {
		let _localctx: FunctionWithPrimitiveTypeNameContext = new FunctionWithPrimitiveTypeNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 226, ProcessingParser.RULE_functionWithPrimitiveTypeName);
		let _la: number;
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1488;
			_la = this._input.LA(1);
			if (!((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT))) !== 0))) {
			this._errHandler.recoverInline(this);
			} else {
				if (this._input.LA(1) === Token.EOF) {
					this.matchedEOF = true;
				}

				this._errHandler.reportMatch(this);
				this.consume();
			}
			this.state = 1489;
			this.match(ProcessingParser.LPAREN);
			this.state = 1491;
			this._errHandler.sync(this);
			_la = this._input.LA(1);
			if ((((_la) & ~0x1F) === 0 && ((1 << _la) & ((1 << ProcessingParser.BOOLEAN) | (1 << ProcessingParser.BYTE) | (1 << ProcessingParser.CHAR) | (1 << ProcessingParser.COLOR) | (1 << ProcessingParser.DOUBLE) | (1 << ProcessingParser.FLOAT) | (1 << ProcessingParser.INT) | (1 << ProcessingParser.LONG))) !== 0) || ((((_la - 32)) & ~0x1F) === 0 && ((1 << (_la - 32)) & ((1 << (ProcessingParser.NEW - 32)) | (1 << (ProcessingParser.SHORT - 32)) | (1 << (ProcessingParser.SUPER - 32)) | (1 << (ProcessingParser.THIS - 32)) | (1 << (ProcessingParser.VAR - 32)) | (1 << (ProcessingParser.VOID - 32)) | (1 << (ProcessingParser.DECIMAL_LITERAL - 32)) | (1 << (ProcessingParser.HEX_LITERAL - 32)) | (1 << (ProcessingParser.OCT_LITERAL - 32)) | (1 << (ProcessingParser.BINARY_LITERAL - 32)) | (1 << (ProcessingParser.FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.HEX_FLOAT_LITERAL - 32)) | (1 << (ProcessingParser.BOOL_LITERAL - 32)) | (1 << (ProcessingParser.CHAR_LITERAL - 32)) | (1 << (ProcessingParser.STRING_LITERAL - 32)) | (1 << (ProcessingParser.MULTI_STRING_LIT - 32)) | (1 << (ProcessingParser.NULL_LITERAL - 32)))) !== 0) || ((((_la - 64)) & ~0x1F) === 0 && ((1 << (_la - 64)) & ((1 << (ProcessingParser.LPAREN - 64)) | (1 << (ProcessingParser.LT - 64)) | (1 << (ProcessingParser.BANG - 64)) | (1 << (ProcessingParser.TILDE - 64)) | (1 << (ProcessingParser.INC - 64)) | (1 << (ProcessingParser.DEC - 64)) | (1 << (ProcessingParser.ADD - 64)) | (1 << (ProcessingParser.SUB - 64)))) !== 0) || ((((_la - 109)) & ~0x1F) === 0 && ((1 << (_la - 109)) & ((1 << (ProcessingParser.AT - 109)) | (1 << (ProcessingParser.HexColorLiteral - 109)) | (1 << (ProcessingParser.IDENTIFIER - 109)))) !== 0)) {
				{
				this.state = 1490;
				this.expressionList();
				}
			}

			this.state = 1493;
			this.match(ProcessingParser.RPAREN);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public primitiveType(): PrimitiveTypeContext {
		let _localctx: PrimitiveTypeContext = new PrimitiveTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 228, ProcessingParser.RULE_primitiveType);
		try {
			this.state = 1504;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.BOOLEAN:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1495;
				this.match(ProcessingParser.BOOLEAN);
				}
				break;
			case ProcessingParser.CHAR:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1496;
				this.match(ProcessingParser.CHAR);
				}
				break;
			case ProcessingParser.BYTE:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1497;
				this.match(ProcessingParser.BYTE);
				}
				break;
			case ProcessingParser.SHORT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1498;
				this.match(ProcessingParser.SHORT);
				}
				break;
			case ProcessingParser.INT:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1499;
				this.match(ProcessingParser.INT);
				}
				break;
			case ProcessingParser.LONG:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1500;
				this.match(ProcessingParser.LONG);
				}
				break;
			case ProcessingParser.FLOAT:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1501;
				this.match(ProcessingParser.FLOAT);
				}
				break;
			case ProcessingParser.DOUBLE:
				this.enterOuterAlt(_localctx, 8);
				{
				this.state = 1502;
				this.match(ProcessingParser.DOUBLE);
				}
				break;
			case ProcessingParser.COLOR:
				this.enterOuterAlt(_localctx, 9);
				{
				this.state = 1503;
				this.colorPrimitiveType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public colorPrimitiveType(): ColorPrimitiveTypeContext {
		let _localctx: ColorPrimitiveTypeContext = new ColorPrimitiveTypeContext(this._ctx, this.state);
		this.enterRule(_localctx, 230, ProcessingParser.RULE_colorPrimitiveType);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1506;
			this.match(ProcessingParser.COLOR);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public qualifiedName(): QualifiedNameContext {
		let _localctx: QualifiedNameContext = new QualifiedNameContext(this._ctx, this.state);
		this.enterRule(_localctx, 232, ProcessingParser.RULE_qualifiedName);
		try {
			let _alt: number;
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1510;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.IDENTIFIER:
				{
				this.state = 1508;
				this.match(ProcessingParser.IDENTIFIER);
				}
				break;
			case ProcessingParser.COLOR:
				{
				this.state = 1509;
				this.colorPrimitiveType();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
			this.state = 1519;
			this._errHandler.sync(this);
			_alt = this.interpreter.adaptivePredict(this._input, 190, this._ctx);
			while (_alt !== 2 && _alt !== ATN.INVALID_ALT_NUMBER) {
				if (_alt === 1) {
					{
					{
					this.state = 1512;
					this.match(ProcessingParser.DOT);
					this.state = 1515;
					this._errHandler.sync(this);
					switch (this._input.LA(1)) {
					case ProcessingParser.IDENTIFIER:
						{
						this.state = 1513;
						this.match(ProcessingParser.IDENTIFIER);
						}
						break;
					case ProcessingParser.COLOR:
						{
						this.state = 1514;
						this.colorPrimitiveType();
						}
						break;
					default:
						throw new NoViableAltException(this);
					}
					}
					}
				}
				this.state = 1521;
				this._errHandler.sync(this);
				_alt = this.interpreter.adaptivePredict(this._input, 190, this._ctx);
			}
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public literal(): LiteralContext {
		let _localctx: LiteralContext = new LiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 234, ProcessingParser.RULE_literal);
		try {
			this.state = 1529;
			this._errHandler.sync(this);
			switch (this._input.LA(1)) {
			case ProcessingParser.DECIMAL_LITERAL:
			case ProcessingParser.HEX_LITERAL:
			case ProcessingParser.OCT_LITERAL:
			case ProcessingParser.BINARY_LITERAL:
				this.enterOuterAlt(_localctx, 1);
				{
				this.state = 1522;
				this.integerLiteral();
				}
				break;
			case ProcessingParser.FLOAT_LITERAL:
			case ProcessingParser.HEX_FLOAT_LITERAL:
				this.enterOuterAlt(_localctx, 2);
				{
				this.state = 1523;
				this.floatLiteral();
				}
				break;
			case ProcessingParser.CHAR_LITERAL:
				this.enterOuterAlt(_localctx, 3);
				{
				this.state = 1524;
				this.match(ProcessingParser.CHAR_LITERAL);
				}
				break;
			case ProcessingParser.STRING_LITERAL:
			case ProcessingParser.MULTI_STRING_LIT:
				this.enterOuterAlt(_localctx, 4);
				{
				this.state = 1525;
				this.stringLiteral();
				}
				break;
			case ProcessingParser.BOOL_LITERAL:
				this.enterOuterAlt(_localctx, 5);
				{
				this.state = 1526;
				this.match(ProcessingParser.BOOL_LITERAL);
				}
				break;
			case ProcessingParser.NULL_LITERAL:
				this.enterOuterAlt(_localctx, 6);
				{
				this.state = 1527;
				this.match(ProcessingParser.NULL_LITERAL);
				}
				break;
			case ProcessingParser.HexColorLiteral:
				this.enterOuterAlt(_localctx, 7);
				{
				this.state = 1528;
				this.hexColorLiteral();
				}
				break;
			default:
				throw new NoViableAltException(this);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}
	// @RuleVersion(0)
	public hexColorLiteral(): HexColorLiteralContext {
		let _localctx: HexColorLiteralContext = new HexColorLiteralContext(this._ctx, this.state);
		this.enterRule(_localctx, 236, ProcessingParser.RULE_hexColorLiteral);
		try {
			this.enterOuterAlt(_localctx, 1);
			{
			this.state = 1531;
			this.match(ProcessingParser.HexColorLiteral);
			}
		}
		catch (re) {
			if (re instanceof RecognitionException) {
				_localctx.exception = re;
				this._errHandler.reportError(this, re);
				this._errHandler.recover(this, re);
			} else {
				throw re;
			}
		}
		finally {
			this.exitRule();
		}
		return _localctx;
	}

	public sempred(_localctx: RuleContext, ruleIndex: number, predIndex: number): boolean {
		switch (ruleIndex) {
		case 84:
			return this.expression_sempred(_localctx as ExpressionContext, predIndex);
		}
		return true;
	}
	private expression_sempred(_localctx: ExpressionContext, predIndex: number): boolean {
		switch (predIndex) {
		case 0:
			return this.precpred(this._ctx, 17);

		case 1:
			return this.precpred(this._ctx, 16);

		case 2:
			return this.precpred(this._ctx, 15);

		case 3:
			return this.precpred(this._ctx, 14);

		case 4:
			return this.precpred(this._ctx, 12);

		case 5:
			return this.precpred(this._ctx, 11);

		case 6:
			return this.precpred(this._ctx, 10);

		case 7:
			return this.precpred(this._ctx, 9);

		case 8:
			return this.precpred(this._ctx, 8);

		case 9:
			return this.precpred(this._ctx, 7);

		case 10:
			return this.precpred(this._ctx, 6);

		case 11:
			return this.precpred(this._ctx, 5);

		case 12:
			return this.precpred(this._ctx, 25);

		case 13:
			return this.precpred(this._ctx, 24);

		case 14:
			return this.precpred(this._ctx, 20);

		case 15:
			return this.precpred(this._ctx, 13);

		case 16:
			return this.precpred(this._ctx, 3);
		}
		return true;
	}

	private static readonly _serializedATNSegments: number = 3;
	private static readonly _serializedATNSegment0: string =
		"\x03\uC91D\uCABA\u058D\uAFBA\u4F53\u0607\uEA8B\uC241\x03u\u0600\x04\x02" +
		"\t\x02\x04\x03\t\x03\x04\x04\t\x04\x04\x05\t\x05\x04\x06\t\x06\x04\x07" +
		"\t\x07\x04\b\t\b\x04\t\t\t\x04\n\t\n\x04\v\t\v\x04\f\t\f\x04\r\t\r\x04" +
		"\x0E\t\x0E\x04\x0F\t\x0F\x04\x10\t\x10\x04\x11\t\x11\x04\x12\t\x12\x04" +
		"\x13\t\x13\x04\x14\t\x14\x04\x15\t\x15\x04\x16\t\x16\x04\x17\t\x17\x04" +
		"\x18\t\x18\x04\x19\t\x19\x04\x1A\t\x1A\x04\x1B\t\x1B\x04\x1C\t\x1C\x04" +
		"\x1D\t\x1D\x04\x1E\t\x1E\x04\x1F\t\x1F\x04 \t \x04!\t!\x04\"\t\"\x04#" +
		"\t#\x04$\t$\x04%\t%\x04&\t&\x04\'\t\'\x04(\t(\x04)\t)\x04*\t*\x04+\t+" +
		"\x04,\t,\x04-\t-\x04.\t.\x04/\t/\x040\t0\x041\t1\x042\t2\x043\t3\x044" +
		"\t4\x045\t5\x046\t6\x047\t7\x048\t8\x049\t9\x04:\t:\x04;\t;\x04<\t<\x04" +
		"=\t=\x04>\t>\x04?\t?\x04@\t@\x04A\tA\x04B\tB\x04C\tC\x04D\tD\x04E\tE\x04" +
		"F\tF\x04G\tG\x04H\tH\x04I\tI\x04J\tJ\x04K\tK\x04L\tL\x04M\tM\x04N\tN\x04" +
		"O\tO\x04P\tP\x04Q\tQ\x04R\tR\x04S\tS\x04T\tT\x04U\tU\x04V\tV\x04W\tW\x04" +
		"X\tX\x04Y\tY\x04Z\tZ\x04[\t[\x04\\\t\\\x04]\t]\x04^\t^\x04_\t_\x04`\t" +
		"`\x04a\ta\x04b\tb\x04c\tc\x04d\td\x04e\te\x04f\tf\x04g\tg\x04h\th\x04" +
		"i\ti\x04j\tj\x04k\tk\x04l\tl\x04m\tm\x04n\tn\x04o\to\x04p\tp\x04q\tq\x04" +
		"r\tr\x04s\ts\x04t\tt\x04u\tu\x04v\tv\x04w\tw\x04x\tx\x03\x02\x03\x02\x03" +
		"\x02\x05\x02\xF4\n\x02\x03\x03\x05\x03\xF7\n\x03\x03\x03\x07\x03\xFA\n" +
		"\x03\f\x03\x0E\x03\xFD\v\x03\x03\x03\x07\x03\u0100\n\x03\f\x03\x0E\x03" +
		"\u0103\v\x03\x03\x03\x03\x03\x03\x04\x07\x04\u0108\n\x04\f\x04\x0E\x04" +
		"\u010B\v\x04\x03\x04\x03\x04\x03\x04\x03\x04\x03\x05\x03\x05\x05\x05\u0113" +
		"\n\x05\x03\x05\x03\x05\x03\x05\x05\x05\u0118\n\x05\x03\x05\x03\x05\x03" +
		"\x06\x07\x06\u011D\n\x06\f\x06\x0E\x06\u0120\v\x06\x03\x06\x03\x06\x03" +
		"\x06\x03\x06\x05\x06\u0126\n\x06\x03\x06\x05\x06\u0129\n\x06\x03\x07\x03" +
		"\x07\x03\x07\x03\x07\x03\x07\x05\x07\u0130\n\x07\x03\b\x03\b\x03\b\x03" +
		"\b\x03\b\x03\b\x03\b\x03\b\x05\b\u013A\n\b\x03\t\x03\t\x05\t\u013E\n\t" +
		"\x03\n\x03\n\x03\n\x05\n\u0143\n\n\x03\n\x03\n\x05\n\u0147\n\n\x03\n\x03" +
		"\n\x05\n\u014B\n\n\x03\n\x03\n\x03\v\x03\v\x03\v\x03\v\x07\v\u0153\n\v" +
		"\f\v\x0E\v\u0156\v\v\x03\v\x03\v\x03\f\x07\f\u015B\n\f\f\f\x0E\f\u015E" +
		"\v\f\x03\f\x03\f\x03\f\x05\f\u0163\n\f\x03\r\x03\r\x03\r\x07\r\u0168\n" +
		"\r\f\r\x0E\r\u016B\v\r\x03\x0E\x03\x0E\x03\x0E\x03\x0E\x05\x0E\u0171\n" +
		"\x0E\x03\x0E\x03\x0E\x05\x0E\u0175\n\x0E\x03\x0E\x05\x0E\u0178\n\x0E\x03" +
		"\x0E\x05\x0E\u017B\n\x0E\x03\x0E\x03\x0E\x03\x0F\x03\x0F\x03\x0F\x07\x0F" +
		"\u0182\n\x0F\f\x0F\x0E\x0F\u0185\v\x0F\x03\x10\x07\x10\u0188\n\x10\f\x10" +
		"\x0E\x10\u018B\v\x10\x03\x10\x03\x10\x05\x10\u018F\n\x10\x03\x10\x05\x10" +
		"\u0192\n\x10\x03\x11\x03\x11\x07\x11\u0196\n\x11\f\x11\x0E\x11\u0199\v" +
		"\x11\x03\x12\x03\x12\x03\x12\x05\x12\u019E\n\x12\x03\x12\x03\x12\x05\x12" +
		"\u01A2\n\x12\x03\x12\x03\x12\x03\x13\x03\x13\x07\x13\u01A8\n\x13\f\x13" +
		"\x0E\x13\u01AB\v\x13\x03\x13\x03\x13\x03\x14\x03\x14\x07\x14\u01B1\n\x14" +
		"\f\x14\x0E\x14\u01B4\v\x14\x03\x14\x03\x14\x03\x15\x03\x15\x03\x15\x05" +
		"\x15\u01BB\n\x15\x03\x15\x03\x15\x07\x15\u01BF\n\x15\f\x15\x0E\x15\u01C2" +
		"\v\x15\x03\x15\x05\x15\u01C5\n\x15\x03\x16\x03\x16\x03\x16\x03\x16\x03" +
		"\x16\x03\x16\x03\x16\x03\x16\x03\x16\x05\x16\u01D0\n\x16\x03\x17\x03\x17" +
		"\x03\x17\x03\x17\x03\x17\x07\x17\u01D7\n\x17\f\x17\x0E\x17\u01DA\v\x17" +
		"\x03\x17\x03\x17\x05\x17\u01DE\n\x17\x03\x17\x03\x17\x03\x18\x03\x18\x05" +
		"\x18\u01E4\n\x18\x03\x19\x03\x19\x05\x19\u01E8\n\x19\x03\x1A\x03\x1A\x03" +
		"\x1A\x03\x1B\x03\x1B\x03\x1B\x03\x1C\x03\x1C\x03\x1C\x03\x1C\x05\x1C\u01F4" +
		"\n\x1C\x03\x1C\x03\x1C\x03\x1D\x03\x1D\x03\x1D\x03\x1D\x03\x1E\x07\x1E" +
		"\u01FD\n\x1E\f\x1E\x0E\x1E\u0200\v\x1E\x03\x1E\x03\x1E\x05\x1E\u0204\n" +
		"\x1E\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x03\x1F\x05\x1F\u020D" +
		"\n\x1F\x03 \x03 \x03 \x03 \x07 \u0213\n \f \x0E \u0216\v \x03 \x03 \x03" +
		"!\x03!\x03!\x07!\u021D\n!\f!\x0E!\u0220\v!\x03!\x03!\x03!\x03\"\x07\"" +
		"\u0226\n\"\f\"\x0E\"\u0229\v\"\x03\"\x03\"\x03\"\x07\"\u022E\n\"\f\"\x0E" +
		"\"\u0231\v\"\x03\"\x03\"\x05\"\u0235\n\"\x03\"\x03\"\x03\"\x03\"\x07\"" +
		"\u023B\n\"\f\"\x0E\"\u023E\v\"\x03\"\x03\"\x05\"\u0242\n\"\x03\"\x03\"" +
		"\x03#\x03#\x03#\x03#\x03#\x03#\x05#\u024C\n#\x03$\x03$\x03$\x03%\x03%" +
		"\x03%\x07%\u0254\n%\f%\x0E%\u0257\v%\x03&\x03&\x03&\x05&\u025C\n&\x03" +
		"\'\x03\'\x05\'\u0260\n\'\x03(\x03(\x03(\x03(\x07(\u0266\n(\f(\x0E(\u0269" +
		"\v(\x03(\x05(\u026C\n(\x05(\u026E\n(\x03(\x03(\x03)\x03)\x03)\x07)\u0275" +
		"\n)\f)\x0E)\u0278\v)\x03*\x03*\x05*\u027C\n*\x03+\x03+\x03+\x03+\x05+" +
		"\u0282\n+\x05+\u0284\n+\x03,\x03,\x03,\x07,\u0289\n,\f,\x0E,\u028C\v," +
		"\x03-\x03-\x05-\u0290\n-\x03-\x03-\x03.\x03.\x03.\x07.\u0297\n.\f.\x0E" +
		".\u029A\v.\x03.\x03.\x05.\u029E\n.\x03.\x05.\u02A1\n.\x03/\x07/\u02A4" +
		"\n/\f/\x0E/\u02A7\v/\x03/\x03/\x03/\x030\x070\u02AD\n0\f0\x0E0\u02B0\v" +
		"0\x030\x030\x030\x030\x031\x031\x032\x032\x033\x033\x053\u02BC\n3\x03" +
		"4\x034\x035\x035\x036\x036\x036\x036\x036\x056\u02C7\n6\x036\x056\u02CA" +
		"\n6\x037\x037\x037\x077\u02CF\n7\f7\x0E7\u02D2\v7\x038\x038\x038\x038" +
		"\x039\x039\x039\x059\u02DB\n9\x03:\x03:\x03:\x03:\x07:\u02E1\n:\f:\x0E" +
		":\u02E4\v:\x05:\u02E6\n:\x03:\x05:\u02E9\n:\x03:\x03:\x03;\x03;\x03;\x03" +
		";\x03;\x03<\x03<\x07<\u02F4\n<\f<\x0E<\u02F7\v<\x03<\x03<\x03=\x07=\u02FC" +
		"\n=\f=\x0E=\u02FF\v=\x03=\x03=\x05=\u0303\n=\x03>\x03>\x03>\x03>\x03>" +
		"\x03>\x05>\u030B\n>\x03>\x03>\x05>\u030F\n>\x03>\x03>\x05>\u0313\n>\x03" +
		">\x03>\x05>\u0317\n>\x05>\u0319\n>\x03?\x03?\x05?\u031D\n?\x03@\x03@\x03" +
		"@\x03@\x05@\u0323\n@\x03A\x03A\x03B\x03B\x03B\x03C\x03C\x07C\u032C\nC" +
		"\fC\x0EC\u032F\vC\x03C\x03C\x03D\x03D\x03D\x03D\x03D\x05D\u0338\nD\x03" +
		"E\x07E\u033B\nE\fE\x0EE\u033E\vE\x03E\x03E\x03E\x03F\x07F\u0344\nF\fF" +
		"\x0EF\u0347\vF\x03F\x03F\x05F\u034B\nF\x03F\x05F\u034E\nF\x03G\x03G\x03" +
		"G\x03G\x03G\x05G\u0355\nG\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x05G\u035E" +
		"\nG\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03" +
		"G\x06G\u036E\nG\rG\x0EG\u036F\x03G\x05G\u0373\nG\x03G\x05G\u0376\nG\x03" +
		"G\x03G\x03G\x03G\x07G\u037C\nG\fG\x0EG\u037F\vG\x03G\x05G\u0382\nG\x03" +
		"G\x03G\x03G\x03G\x07G\u0388\nG\fG\x0EG\u038B\vG\x03G\x07G\u038E\nG\fG" +
		"\x0EG\u0391\vG\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x05G\u039B\nG\x03" +
		"G\x03G\x03G\x03G\x03G\x03G\x03G\x05G\u03A4\nG\x03G\x03G\x03G\x05G\u03A9" +
		"\nG\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x03G\x05G\u03B3\nG\x03H\x03H\x03" +
		"H\x07H\u03B8\nH\fH\x0EH\u03BB\vH\x03H\x03H\x03H\x03H\x03H\x03I\x03I\x03" +
		"I\x07I\u03C5\nI\fI\x0EI\u03C8\vI\x03J\x03J\x03J\x03K\x03K\x03K\x05K\u03D0" +
		"\nK\x03K\x03K\x03L\x03L\x03L\x07L\u03D7\nL\fL\x0EL\u03DA\vL\x03M\x07M" +
		"\u03DD\nM\fM\x0EM\u03E0\vM\x03M\x03M\x03M\x03M\x03M\x03N\x06N\u03E8\n" +
		"N\rN\x0EN\u03E9\x03N\x06N\u03ED\nN\rN\x0EN\u03EE\x03O\x03O\x03O\x05O\u03F4" +
		"\nO\x03O\x03O\x03O\x05O\u03F9\nO\x03P\x03P\x03P\x03P\x03P\x03P\x03Q\x03" +
		"Q\x05Q\u0403\nQ\x03Q\x03Q\x05Q\u0407\nQ\x03Q\x03Q\x05Q\u040B\nQ\x05Q\u040D" +
		"\nQ\x03R\x03R\x05R\u0411\nR\x03S\x07S\u0414\nS\fS\x0ES\u0417\vS\x03S\x03" +
		"S\x03S\x03S\x03S\x03T\x03T\x03T\x03T\x03U\x03U\x03U\x07U\u0425\nU\fU\x0E" +
		"U\u0428\vU\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x03V\x03V\x03V\x03V\x05V\u043C\nV\x03V\x03V\x05V\u0440\nV" +
		"\x03V\x03V\x03V\x05V\u0445\nV\x03V\x03V\x05V\u0449\nV\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x05V\u0459\nV\x03" +
		"V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x05V\u0481\nV\x03V\x03" +
		"V\x03V\x03V\x05V\u0487\nV\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03V\x03" +
		"V\x03V\x03V\x03V\x03V\x05V\u0496\nV\x03V\x07V\u0499\nV\fV\x0EV\u049C\v" +
		"V\x03W\x03W\x03W\x03W\x03X\x03X\x03X\x05X\u04A5\nX\x03X\x03X\x03X\x03" +
		"X\x03X\x07X\u04AC\nX\fX\x0EX\u04AF\vX\x03X\x05X\u04B2\nX\x03Y\x03Y\x05" +
		"Y\u04B6\nY\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03Z\x03" +
		"Z\x03Z\x03Z\x03Z\x03Z\x05Z\u04C8\nZ\x05Z\u04CA\nZ\x03[\x03[\x03[\x05[" +
		"\u04CF\n[\x03[\x07[\u04D2\n[\f[\x0E[\u04D5\v[\x03[\x03[\x05[\u04D9\n[" +
		"\x03\\\x03\\\x03\\\x03\\\x03\\\x03\\\x05\\\u04E1\n\\\x05\\\u04E3\n\\\x03" +
		"]\x03]\x03]\x07]\u04E8\n]\f]\x0E]\u04EB\v]\x03^\x03^\x05^\u04EF\n^\x03" +
		"_\x03_\x05_\u04F3\n_\x03_\x03_\x03`\x03`\x03`\x03`\x07`\u04FB\n`\f`\x0E" +
		"`\u04FE\v`\x03`\x03`\x03`\x03`\x03`\x03`\x03`\x07`\u0507\n`\f`\x0E`\u050A" +
		"\v`\x03`\x03`\x07`\u050E\n`\f`\x0E`\u0511\v`\x05`\u0513\n`\x03a\x03a\x05" +
		"a\u0517\na\x03b\x03b\x03b\x03c\x03c\x03c\x05c\u051F\nc\x03d\x03d\x03d" +
		"\x05d\u0524\nd\x03e\x03e\x03e\x03e\x03f\x03f\x03f\x07f\u052D\nf\ff\x0E" +
		"f\u0530\vf\x03g\x05g\u0533\ng\x03g\x03g\x03g\x05g\u0538\ng\x03g\x03g\x07" +
		"g\u053C\ng\fg\x0Eg\u053F\vg\x03h\x03h\x03h\x03h\x07h\u0545\nh\fh\x0Eh" +
		"\u0548\vh\x03h\x03h\x03i\x03i\x03i\x03i\x05i\u0550\ni\x05i\u0552\ni\x03" +
		"j\x03j\x03j\x03j\x05j\u0558\nj\x03k\x03k\x05k\u055C\nk\x03k\x03k\x03l" +
		"\x05l\u0561\nl\x03l\x07l\u0564\nl\fl\x0El\u0567\vl\x03l\x06l\u056A\nl" +
		"\rl\x0El\u056B\x03l\x03l\x03m\x03m\x03m\x07m\u0573\nm\fm\x0Em\u0576\v" +
		"m\x03m\x03m\x03n\x03n\x07n\u057C\nn\fn\x0En\u057F\vn\x03n\x03n\x03o\x03" +
		"o\x03o\x07o\u0586\no\fo\x0Eo\u0589\vo\x03o\x03o\x03o\x03o\x03o\x07o\u0590" +
		"\no\fo\x0Eo\u0593\vo\x03o\x03o\x03o\x07o\u0598\no\fo\x0Eo\u059B\vo\x03" +
		"o\x03o\x03o\x03o\x03o\x07o\u05A2\no\fo\x0Eo\u05A5\vo\x05o\u05A7\no\x03" +
		"p\x03p\x03p\x03p\x07p\u05AD\np\fp\x0Ep\u05B0\vp\x05p\u05B2\np\x03q\x03" +
		"q\x03q\x07q\u05B7\nq\fq\x0Eq\u05BA\vq\x03q\x03q\x03r\x03r\x03r\x03r\x05" +
		"r\u05C2\nr\x03r\x03r\x03r\x03r\x05r\u05C8\nr\x03r\x03r\x03r\x03r\x05r" +
		"\u05CE\nr\x03r\x05r\u05D1\nr\x03s\x03s\x03s\x05s\u05D6\ns\x03s\x03s\x03" +
		"t\x03t\x03t\x03t\x03t\x03t\x03t\x03t\x03t\x05t\u05E3\nt\x03u\x03u\x03" +
		"v\x03v\x05v\u05E9\nv\x03v\x03v\x03v\x05v\u05EE\nv\x07v\u05F0\nv\fv\x0E" +
		"v\u05F3\vv\x03w\x03w\x03w\x03w\x03w\x03w\x03w\x05w\u05FC\nw\x03x\x03x" +
		"\x03x\x02\x02\x03\xAAy\x02\x02\x04\x02\x06\x02\b\x02\n\x02\f\x02\x0E\x02" +
		"\x10\x02\x12\x02\x14\x02\x16\x02\x18\x02\x1A\x02\x1C\x02\x1E\x02 \x02" +
		"\"\x02$\x02&\x02(\x02*\x02,\x02.\x020\x022\x024\x026\x028\x02:\x02<\x02" +
		">\x02@\x02B\x02D\x02F\x02H\x02J\x02L\x02N\x02P\x02R\x02T\x02V\x02X\x02" +
		"Z\x02\\\x02^\x02`\x02b\x02d\x02f\x02h\x02j\x02l\x02n\x02p\x02r\x02t\x02" +
		"v\x02x\x02z\x02|\x02~\x02\x80\x02\x82\x02\x84\x02\x86\x02\x88\x02\x8A" +
		"\x02\x8C\x02\x8E\x02\x90\x02\x92\x02\x94\x02\x96\x02\x98\x02\x9A\x02\x9C" +
		"\x02\x9E\x02\xA0\x02\xA2\x02\xA4\x02\xA6\x02\xA8\x02\xAA\x02\xAC\x02\xAE" +
		"\x02\xB0\x02\xB2\x02\xB4\x02\xB6\x02\xB8\x02\xBA\x02\xBC\x02\xBE\x02\xC0" +
		"\x02\xC2\x02\xC4\x02\xC6\x02\xC8\x02\xCA\x02\xCC\x02\xCE\x02\xD0\x02\xD2" +
		"\x02\xD4\x02\xD6\x02\xD8\x02\xDA\x02\xDC\x02\xDE\x02\xE0\x02\xE2\x02\xE4" +
		"\x02\xE6\x02\xE8\x02\xEA\x02\xEC\x02\xEE\x02\x02\x0E\x04\x02\x14\x14+" +
		"+\x03\x027:\x03\x02;<\x03\x02X[\x03\x02NO\x04\x02\\]aa\x03\x02Z[\x04\x02" +
		"LMST\x04\x02RRUU\x04\x02KKbl\x03\x02XY\b\x02\x05\x05\x07\x07\n\n\r\r\x17" +
		"\x17\x1E\x1E\x02\u06B0\x02\xF3\x03\x02\x02\x02\x04\xF6\x03\x02\x02\x02" +
		"\x06\u0109\x03\x02\x02\x02\b\u0110\x03\x02\x02\x02\n\u0128\x03\x02\x02" +
		"\x02\f\u012F\x03\x02\x02\x02\x0E\u0139\x03\x02\x02\x02\x10\u013D\x03\x02" +
		"\x02\x02\x12\u013F\x03\x02\x02\x02\x14\u014E\x03\x02\x02\x02\x16\u015C" +
		"\x03\x02\x02\x02\x18\u0164\x03\x02\x02\x02\x1A\u016C\x03\x02\x02\x02\x1C" +
		"\u017E\x03\x02\x02\x02\x1E\u0189\x03\x02\x02\x02 \u0193\x03\x02\x02\x02" +
		"\"\u019A\x03\x02\x02\x02$\u01A5\x03\x02\x02\x02&\u01AE\x03\x02\x02\x02" +
		"(\u01C4\x03\x02\x02\x02*\u01CF\x03\x02\x02\x02,\u01D1\x03\x02\x02\x02" +
		".\u01E3\x03\x02\x02\x020\u01E7\x03\x02\x02\x022\u01E9\x03\x02\x02\x02" +
		"4\u01EC\x03\x02\x02\x026\u01EF\x03\x02\x02\x028\u01F7\x03\x02\x02\x02" +
		":\u0203\x03\x02\x02\x02<\u020C\x03\x02\x02\x02>\u020E\x03\x02\x02\x02" +
		"@\u0219\x03\x02\x02\x02B\u0227\x03\x02\x02\x02D\u024B\x03\x02\x02\x02" +
		"F\u024D\x03\x02\x02\x02H\u0250\x03\x02\x02\x02J\u0258\x03\x02\x02\x02" +
		"L\u025F\x03\x02\x02\x02N\u0261\x03\x02\x02\x02P\u0271\x03\x02\x02\x02" +
		"R\u0279\x03\x02\x02\x02T\u0283\x03\x02\x02\x02V\u0285\x03\x02\x02\x02" +
		"X\u028D\x03\x02\x02\x02Z\u02A0\x03\x02\x02\x02\\\u02A5\x03\x02\x02\x02" +
		"^\u02AE\x03\x02\x02\x02`\u02B5\x03\x02\x02\x02b\u02B7\x03\x02\x02\x02" +
		"d\u02BB\x03\x02\x02\x02f\u02BD\x03\x02\x02\x02h\u02BF\x03\x02\x02\x02" +
		"j\u02C1\x03\x02\x02\x02l\u02CB\x03\x02\x02\x02n\u02D3\x03\x02\x02\x02" +
		"p\u02DA\x03\x02\x02\x02r\u02DC\x03\x02\x02\x02t\u02EC\x03\x02\x02\x02" +
		"v\u02F1\x03\x02\x02\x02x\u0302\x03\x02\x02\x02z\u0318\x03\x02\x02\x02" +
		"|\u031C\x03\x02\x02\x02~\u031E\x03\x02\x02\x02\x80\u0324\x03\x02\x02\x02" +
		"\x82\u0326\x03\x02\x02\x02\x84\u0329\x03\x02\x02\x02\x86\u0337\x03\x02" +
		"\x02\x02\x88\u033C\x03\x02\x02\x02\x8A\u034D\x03\x02\x02\x02\x8C\u03B2" +
		"\x03\x02\x02\x02\x8E\u03B4\x03\x02\x02\x02\x90\u03C1\x03\x02\x02\x02\x92" +
		"\u03C9\x03\x02\x02\x02\x94\u03CC\x03\x02\x02\x02\x96\u03D3\x03\x02\x02" +
		"\x02\x98\u03DE\x03\x02\x02\x02\x9A\u03E7\x03\x02\x02\x02\x9C\u03F8\x03" +
		"\x02\x02\x02\x9E\u03FA\x03\x02\x02\x02\xA0\u040C\x03\x02\x02\x02\xA2\u0410" +
		"\x03\x02\x02\x02\xA4\u0415\x03\x02\x02\x02\xA6\u041D\x03\x02\x02\x02\xA8" +
		"\u0421\x03\x02\x02\x02\xAA\u0448\x03\x02\x02\x02\xAC\u049D\x03\x02\x02" +
		"\x02\xAE\u04B1\x03\x02\x02\x02\xB0\u04B5\x03\x02\x02\x02\xB2\u04C9\x03" +
		"\x02\x02\x02\xB4\u04CE\x03\x02\x02\x02\xB6\u04E2\x03\x02\x02\x02\xB8\u04E4" +
		"\x03\x02\x02\x02\xBA\u04EC\x03\x02\x02\x02\xBC\u04F0\x03\x02\x02\x02\xBE" +
		"\u04F6\x03\x02\x02\x02\xC0\u0514\x03\x02\x02\x02\xC2\u0518\x03\x02\x02" +
		"\x02\xC4\u051E\x03\x02\x02\x02\xC6\u0523\x03\x02\x02\x02\xC8\u0525\x03" +
		"\x02\x02\x02\xCA\u0529\x03\x02\x02\x02\xCC\u0532\x03\x02\x02\x02\xCE\u0540" +
		"\x03\x02\x02\x02\xD0\u0551\x03\x02\x02\x02\xD2\u0557\x03\x02\x02\x02\xD4" +
		"\u0559\x03\x02\x02\x02\xD6\u0560\x03\x02\x02\x02\xD8\u0574\x03\x02\x02" +
		"\x02\xDA\u057D\x03\x02\x02\x02\xDC\u05A6\x03\x02\x02\x02\xDE\u05B1\x03" +
		"\x02\x02\x02\xE0\u05B3\x03\x02\x02\x02\xE2\u05D0\x03\x02\x02\x02\xE4\u05D2" +
		"\x03\x02\x02\x02\xE6\u05E2\x03\x02\x02\x02\xE8\u05E4\x03\x02\x02\x02\xEA" +
		"\u05E8\x03\x02\x02\x02\xEC\u05FB\x03\x02\x02\x02\xEE\u05FD\x03\x02\x02" +
		"\x02\xF0\xF4\x05\xD8m\x02\xF1\xF4\x05\xD6l\x02\xF2\xF4\x05\xDAn\x02\xF3" +
		"\xF0\x03\x02\x02\x02\xF3\xF1\x03\x02\x02\x02\xF3\xF2\x03\x02\x02\x02\xF4" +
		"\x03\x03\x02\x02\x02\xF5\xF7\x05\x06\x04\x02\xF6\xF5\x03\x02\x02\x02\xF6" +
		"\xF7\x03\x02\x02\x02\xF7\xFB\x03\x02\x02\x02\xF8\xFA\x05\b\x05\x02\xF9" +
		"\xF8\x03\x02\x02\x02\xFA\xFD\x03\x02\x02\x02\xFB\xF9\x03\x02\x02\x02\xFB" +
		"\xFC\x03\x02\x02\x02\xFC\u0101\x03\x02\x02\x02\xFD\xFB\x03\x02\x02\x02" +
		"\xFE\u0100\x05\n\x06\x02\xFF\xFE\x03\x02\x02\x02\u0100\u0103\x03\x02\x02" +
		"\x02\u0101\xFF\x03\x02\x02\x02\u0101\u0102\x03\x02\x02\x02\u0102\u0104" +
		"\x03\x02\x02\x02\u0103\u0101\x03\x02\x02\x02\u0104\u0105\x07\x02\x02\x03" +
		"\u0105\x05\x03\x02\x02\x02\u0106\u0108\x05j6\x02\u0107\u0106\x03\x02\x02" +
		"\x02\u0108\u010B\x03\x02\x02\x02\u0109\u0107\x03\x02\x02\x02\u0109\u010A" +
		"\x03\x02\x02\x02\u010A\u010C\x03\x02\x02\x02\u010B\u0109\x03\x02\x02\x02" +
		"\u010C\u010D\x07#\x02\x02\u010D\u010E\x05\xEAv\x02\u010E\u010F\x07H\x02" +
		"\x02\u010F\x07\x03\x02\x02\x02\u0110\u0112\x07\x1C\x02\x02\u0111\u0113" +
		"\x07)\x02\x02\u0112\u0111\x03\x02\x02\x02\u0112\u0113\x03\x02\x02\x02" +
		"\u0113\u0114\x03\x02\x02\x02\u0114\u0117\x05\xEAv\x02\u0115\u0116\x07" +
		"J\x02\x02\u0116\u0118\x07\\\x02\x02\u0117\u0115\x03\x02\x02\x02\u0117" +
		"\u0118\x03\x02\x02\x02\u0118\u0119\x03\x02\x02\x02\u0119\u011A\x07H\x02" +
		"\x02\u011A\t\x03\x02\x02\x02\u011B\u011D\x05\x0E\b\x02\u011C\u011B\x03" +
		"\x02\x02\x02\u011D\u0120\x03\x02\x02\x02\u011E\u011C\x03\x02\x02\x02\u011E" +
		"\u011F\x03\x02\x02\x02\u011F\u0125\x03\x02\x02\x02\u0120\u011E\x03\x02" +
		"\x02\x02\u0121\u0126\x05\x12\n\x02\u0122\u0126\x05\x1A\x0E\x02\u0123\u0126" +
		"\x05\"\x12\x02\u0124\u0126\x05t;\x02\u0125\u0121\x03\x02\x02\x02\u0125" +
		"\u0122\x03\x02\x02\x02\u0125\u0123\x03\x02\x02\x02\u0125\u0124\x03\x02" +
		"\x02\x02\u0126\u0129\x03\x02\x02\x02\u0127\u0129\x07H\x02\x02\u0128\u011E" +
		"\x03\x02\x02\x02\u0128\u0127\x03\x02\x02\x02\u0129\v\x03\x02\x02\x02\u012A" +
		"\u0130\x05\x0E\b\x02\u012B\u0130\x07!\x02\x02\u012C\u0130\x07-\x02\x02" +
		"\u012D\u0130\x071\x02\x02\u012E\u0130\x075\x02\x02\u012F\u012A\x03\x02" +
		"\x02\x02\u012F\u012B\x03\x02\x02\x02\u012F\u012C\x03\x02\x02\x02\u012F" +
		"\u012D\x03\x02\x02\x02\u012F\u012E\x03\x02\x02\x02\u0130\r\x03\x02\x02" +
		"\x02\u0131\u013A\x05j6\x02\u0132\u013A\x07&\x02\x02\u0133\u013A\x07%\x02" +
		"\x02\u0134\u013A\x07$\x02\x02\u0135\u013A\x07)\x02\x02\u0136\u013A\x07" +
		"\x03\x02\x02\u0137\u013A\x07\x15\x02\x02\u0138\u013A\x07*\x02\x02\u0139" +
		"\u0131\x03\x02\x02\x02\u0139\u0132\x03\x02\x02\x02\u0139\u0133\x03\x02" +
		"\x02\x02\u0139\u0134\x03\x02\x02\x02\u0139\u0135\x03\x02\x02\x02\u0139" +
		"\u0136\x03\x02\x02\x02\u0139\u0137\x03\x02\x02\x02\u0139\u0138\x03\x02" +
		"\x02\x02\u013A\x0F\x03\x02\x02\x02\u013B\u013E\x07\x15\x02\x02\u013C\u013E" +
		"\x05j6\x02\u013D\u013B\x03\x02\x02\x02\u013D\u013C\x03\x02\x02\x02\u013E" +
		"\x11\x03\x02\x02\x02\u013F\u0140\x07\v\x02\x02\u0140\u0142\x07u\x02\x02" +
		"\u0141\u0143\x05";
	private static readonly _serializedATNSegment1: string =
		"\x14\v\x02\u0142\u0141\x03\x02\x02\x02\u0142\u0143\x03\x02\x02\x02\u0143" +
		"\u0146\x03\x02\x02\x02\u0144\u0145\x07\x14\x02\x02\u0145\u0147\x05\xCC" +
		"g\x02\u0146\u0144\x03\x02\x02\x02\u0146\u0147\x03\x02\x02\x02\u0147\u014A" +
		"\x03\x02\x02\x02\u0148\u0149\x07\x1B\x02\x02\u0149\u014B\x05\xCAf\x02" +
		"\u014A\u0148\x03\x02\x02\x02\u014A\u014B\x03\x02\x02\x02\u014B\u014C\x03" +
		"\x02\x02\x02\u014C\u014D\x05$\x13\x02\u014D\x13\x03\x02\x02\x02\u014E" +
		"\u014F\x07M\x02\x02\u014F\u0154\x05\x16\f\x02\u0150\u0151\x07I\x02\x02" +
		"\u0151\u0153\x05\x16\f\x02\u0152\u0150\x03\x02\x02\x02\u0153\u0156\x03" +
		"\x02\x02\x02\u0154\u0152\x03\x02\x02\x02\u0154\u0155\x03\x02\x02\x02\u0155" +
		"\u0157\x03\x02\x02\x02\u0156\u0154\x03\x02\x02\x02\u0157\u0158\x07L\x02" +
		"\x02\u0158\x15\x03\x02\x02\x02\u0159\u015B\x05j6\x02\u015A\u0159\x03\x02" +
		"\x02\x02\u015B\u015E\x03\x02\x02\x02\u015C\u015A\x03\x02\x02\x02\u015C" +
		"\u015D\x03\x02\x02\x02\u015D\u015F\x03\x02\x02\x02\u015E\u015C\x03\x02" +
		"\x02\x02\u015F\u0162\x07u\x02\x02\u0160\u0161\x07\x14\x02\x02\u0161\u0163" +
		"\x05\x18\r\x02\u0162\u0160\x03\x02\x02\x02\u0162\u0163\x03\x02\x02\x02" +
		"\u0163\x17\x03\x02\x02\x02\u0164\u0169\x05\xCCg\x02\u0165\u0166\x07^\x02" +
		"\x02\u0166\u0168\x05\xCCg\x02\u0167\u0165\x03\x02\x02\x02\u0168\u016B" +
		"\x03\x02\x02\x02\u0169\u0167\x03\x02\x02\x02\u0169\u016A\x03\x02\x02\x02" +
		"\u016A\x19\x03\x02\x02\x02\u016B\u0169\x03\x02\x02\x02\u016C\u016D\x07" +
		"\x13\x02\x02\u016D\u0170\x07u\x02\x02\u016E\u016F\x07\x1B\x02\x02\u016F" +
		"\u0171\x05\xCAf\x02\u0170\u016E\x03\x02\x02\x02\u0170\u0171\x03\x02\x02" +
		"\x02\u0171\u0172\x03\x02\x02\x02\u0172\u0174\x07D\x02\x02\u0173\u0175" +
		"\x05\x1C\x0F\x02\u0174\u0173\x03\x02\x02\x02\u0174\u0175\x03\x02\x02\x02" +
		"\u0175\u0177\x03\x02\x02\x02\u0176\u0178\x07I\x02\x02\u0177\u0176\x03" +
		"\x02\x02\x02\u0177\u0178\x03\x02\x02\x02\u0178\u017A\x03\x02\x02\x02\u0179" +
		"\u017B\x05 \x11\x02\u017A\u0179\x03\x02\x02\x02\u017A\u017B\x03\x02\x02" +
		"\x02\u017B\u017C\x03\x02\x02\x02\u017C\u017D\x07E\x02\x02\u017D\x1B\x03" +
		"\x02\x02\x02\u017E\u0183\x05\x1E\x10\x02\u017F\u0180\x07I\x02\x02\u0180" +
		"\u0182\x05\x1E\x10\x02\u0181\u017F\x03\x02\x02\x02\u0182\u0185\x03\x02" +
		"\x02\x02\u0183\u0181\x03\x02\x02\x02\u0183\u0184\x03\x02\x02\x02\u0184" +
		"\x1D\x03\x02\x02\x02\u0185\u0183\x03\x02\x02\x02\u0186\u0188\x05j6\x02" +
		"\u0187\u0186\x03\x02\x02\x02\u0188\u018B\x03\x02\x02\x02\u0189\u0187\x03" +
		"\x02\x02\x02\u0189\u018A\x03\x02\x02\x02\u018A\u018C\x03\x02\x02\x02\u018B" +
		"\u0189\x03\x02\x02\x02\u018C\u018E\x07u\x02\x02\u018D\u018F\x05\xD4k\x02" +
		"\u018E\u018D\x03\x02\x02\x02\u018E\u018F\x03\x02\x02\x02\u018F\u0191\x03" +
		"\x02\x02\x02\u0190\u0192\x05$\x13\x02\u0191\u0190\x03\x02\x02\x02\u0191" +
		"\u0192\x03\x02\x02\x02\u0192\x1F\x03\x02\x02\x02\u0193\u0197\x07H\x02" +
		"\x02\u0194\u0196\x05(\x15\x02\u0195\u0194\x03\x02\x02\x02\u0196\u0199" +
		"\x03\x02\x02\x02\u0197\u0195\x03\x02\x02\x02\u0197\u0198\x03\x02\x02\x02" +
		"\u0198!\x03\x02\x02\x02\u0199\u0197\x03\x02\x02\x02\u019A\u019B\x07\x1F" +
		"\x02\x02\u019B\u019D\x07u\x02\x02\u019C\u019E\x05\x14\v\x02\u019D\u019C" +
		"\x03\x02\x02\x02\u019D\u019E\x03\x02\x02\x02\u019E\u01A1\x03\x02\x02\x02" +
		"\u019F\u01A0\x07\x14\x02\x02\u01A0\u01A2\x05\xCAf\x02\u01A1\u019F\x03" +
		"\x02\x02\x02\u01A1\u01A2\x03\x02\x02\x02\u01A2\u01A3\x03\x02\x02\x02\u01A3" +
		"\u01A4\x05&\x14\x02\u01A4#\x03\x02\x02\x02\u01A5\u01A9\x07D\x02\x02\u01A6" +
		"\u01A8\x05(\x15\x02\u01A7\u01A6\x03\x02\x02\x02\u01A8\u01AB\x03\x02\x02" +
		"\x02\u01A9\u01A7\x03\x02\x02\x02\u01A9\u01AA\x03\x02\x02\x02\u01AA\u01AC" +
		"\x03\x02\x02\x02\u01AB\u01A9\x03\x02\x02\x02\u01AC\u01AD\x07E\x02\x02" +
		"\u01AD%\x03\x02\x02\x02\u01AE\u01B2\x07D\x02\x02\u01AF\u01B1\x05:\x1E" +
		"\x02\u01B0\u01AF\x03\x02\x02\x02\u01B1\u01B4\x03\x02\x02\x02\u01B2\u01B0" +
		"\x03\x02\x02\x02\u01B2\u01B3\x03\x02\x02\x02\u01B3\u01B5\x03\x02\x02\x02" +
		"\u01B4\u01B2\x03\x02\x02\x02\u01B5\u01B6\x07E\x02\x02\u01B6\'\x03\x02" +
		"\x02\x02\u01B7\u01C5\x07H\x02\x02\u01B8\u01C5\x05\b\x05\x02\u01B9\u01BB" +
		"\x07)\x02\x02\u01BA\u01B9\x03\x02\x02\x02\u01BA\u01BB\x03\x02\x02\x02" +
		"\u01BB\u01BC\x03\x02\x02\x02\u01BC\u01C5\x05\x84C\x02\u01BD\u01BF\x05" +
		"\f\x07\x02\u01BE\u01BD\x03\x02\x02\x02\u01BF\u01C2\x03\x02\x02\x02\u01C0" +
		"\u01BE\x03\x02\x02\x02\u01C0\u01C1\x03\x02\x02\x02\u01C1\u01C3\x03\x02" +
		"\x02\x02\u01C2\u01C0\x03\x02\x02\x02\u01C3\u01C5\x05*\x16\x02\u01C4\u01B7" +
		"\x03\x02\x02\x02\u01C4\u01B8\x03\x02\x02\x02\u01C4\u01BA\x03\x02\x02\x02" +
		"\u01C4\u01C0\x03\x02\x02\x02\u01C5)\x03\x02\x02\x02\u01C6\u01D0\x05,\x17" +
		"\x02\u01C7\u01D0\x052\x1A\x02\u01C8\u01D0\x058\x1D\x02\u01C9\u01D0\x05" +
		"6\x1C\x02\u01CA\u01D0\x054\x1B\x02\u01CB\u01D0\x05\"\x12\x02\u01CC\u01D0" +
		"\x05t;\x02\u01CD\u01D0\x05\x12\n\x02\u01CE\u01D0\x05\x1A\x0E\x02\u01CF" +
		"\u01C6\x03\x02\x02\x02\u01CF\u01C7\x03\x02\x02\x02\u01CF\u01C8\x03\x02" +
		"\x02\x02\u01CF\u01C9\x03\x02\x02\x02\u01CF\u01CA\x03\x02\x02\x02\u01CF" +
		"\u01CB\x03\x02\x02\x02\u01CF\u01CC\x03\x02\x02\x02\u01CF\u01CD\x03\x02" +
		"\x02\x02\u01CF\u01CE\x03\x02\x02\x02\u01D0+\x03\x02\x02\x02\u01D1\u01D2" +
		"\x050\x19\x02\u01D2\u01D3\x07u\x02\x02\u01D3\u01D8\x05X-\x02\u01D4\u01D5" +
		"\x07F\x02\x02\u01D5\u01D7\x07G\x02\x02\u01D6\u01D4\x03\x02\x02\x02\u01D7" +
		"\u01DA\x03\x02\x02\x02\u01D8\u01D6\x03\x02\x02\x02\u01D8\u01D9\x03\x02" +
		"\x02\x02\u01D9\u01DD\x03\x02\x02\x02\u01DA\u01D8\x03\x02\x02\x02\u01DB" +
		"\u01DC\x070\x02\x02\u01DC\u01DE\x05V,\x02\u01DD\u01DB\x03\x02\x02\x02" +
		"\u01DD\u01DE\x03\x02\x02\x02\u01DE\u01DF\x03\x02\x02\x02\u01DF\u01E0\x05" +
		".\x18\x02\u01E0-\x03\x02\x02\x02\u01E1\u01E4\x05\x84C\x02\u01E2\u01E4" +
		"\x07H\x02\x02\u01E3\u01E1\x03\x02\x02\x02\u01E3\u01E2\x03\x02\x02\x02" +
		"\u01E4/\x03\x02\x02\x02\u01E5\u01E8\x05\xCCg\x02\u01E6\u01E8\x074\x02" +
		"\x02\u01E7\u01E5\x03\x02\x02\x02\u01E7\u01E6\x03\x02\x02\x02\u01E81\x03" +
		"\x02\x02\x02\u01E9\u01EA\x05\x14\v\x02\u01EA\u01EB\x05,\x17\x02\u01EB" +
		"3\x03\x02\x02\x02\u01EC\u01ED\x05\x14\v\x02\u01ED\u01EE\x056\x1C\x02\u01EE" +
		"5\x03\x02\x02\x02\u01EF\u01F0\x07u\x02\x02\u01F0\u01F3\x05X-\x02\u01F1" +
		"\u01F2\x070\x02\x02\u01F2\u01F4\x05V,\x02\u01F3\u01F1\x03\x02\x02\x02" +
		"\u01F3\u01F4\x03\x02\x02\x02\u01F4\u01F5\x03\x02\x02\x02\u01F5\u01F6\x05" +
		"\x84C\x02\u01F67\x03\x02\x02\x02\u01F7\u01F8\x05\xCCg\x02\u01F8\u01F9" +
		"\x05H%\x02\u01F9\u01FA\x07H\x02\x02\u01FA9\x03\x02\x02\x02\u01FB\u01FD" +
		"\x05\f\x07\x02\u01FC\u01FB\x03\x02\x02\x02\u01FD\u0200\x03\x02\x02\x02" +
		"\u01FE\u01FC\x03\x02\x02\x02\u01FE\u01FF\x03\x02\x02\x02\u01FF\u0201\x03" +
		"\x02\x02\x02\u0200\u01FE\x03\x02\x02\x02\u0201\u0204\x05<\x1F\x02\u0202" +
		"\u0204\x07H\x02\x02\u0203\u01FE\x03\x02\x02\x02\u0203\u0202\x03\x02\x02" +
		"\x02\u0204;\x03\x02\x02\x02\u0205\u020D\x05> \x02\u0206\u020D\x05B\"\x02" +
		"\u0207\u020D\x05F$\x02\u0208\u020D\x05\"\x12\x02\u0209\u020D\x05t;\x02" +
		"\u020A\u020D\x05\x12\n\x02\u020B\u020D\x05\x1A\x0E\x02\u020C\u0205\x03" +
		"\x02\x02\x02\u020C\u0206\x03\x02\x02\x02\u020C\u0207\x03\x02\x02\x02\u020C" +
		"\u0208\x03\x02\x02\x02\u020C\u0209\x03\x02\x02\x02\u020C\u020A\x03\x02" +
		"\x02\x02\u020C\u020B\x03\x02\x02\x02\u020D=\x03\x02\x02\x02\u020E\u020F" +
		"\x05\xCCg\x02\u020F\u0214\x05@!\x02\u0210\u0211\x07I\x02\x02\u0211\u0213" +
		"\x05@!\x02\u0212\u0210\x03\x02\x02\x02\u0213\u0216\x03\x02\x02\x02\u0214" +
		"\u0212\x03\x02\x02\x02\u0214\u0215\x03\x02\x02\x02\u0215\u0217\x03\x02" +
		"\x02\x02\u0216\u0214\x03\x02\x02\x02\u0217\u0218\x07H\x02\x02\u0218?\x03" +
		"\x02\x02\x02\u0219\u021E\x07u\x02\x02\u021A\u021B\x07F\x02\x02\u021B\u021D" +
		"\x07G\x02\x02\u021C\u021A\x03\x02\x02\x02\u021D\u0220\x03\x02\x02\x02" +
		"\u021E\u021C\x03\x02\x02\x02\u021E\u021F\x03\x02\x02\x02\u021F\u0221\x03" +
		"\x02\x02\x02\u0220\u021E\x03\x02\x02\x02\u0221\u0222\x07K\x02\x02\u0222" +
		"\u0223\x05L\'\x02\u0223A\x03\x02\x02\x02\u0224\u0226\x05D#\x02\u0225\u0224" +
		"\x03\x02\x02\x02\u0226\u0229\x03\x02\x02\x02\u0227\u0225\x03\x02\x02\x02" +
		"\u0227\u0228\x03\x02\x02\x02\u0228\u0234\x03\x02\x02\x02\u0229\u0227\x03" +
		"\x02\x02\x02\u022A\u0235\x050\x19\x02\u022B\u022F\x05\x14\v\x02\u022C" +
		"\u022E\x05j6\x02\u022D\u022C\x03\x02\x02\x02\u022E\u0231\x03\x02\x02\x02" +
		"\u022F\u022D\x03\x02\x02\x02\u022F\u0230\x03\x02\x02\x02\u0230\u0232\x03" +
		"\x02\x02\x02\u0231\u022F\x03\x02\x02\x02\u0232\u0233\x050\x19\x02\u0233" +
		"\u0235\x03\x02\x02\x02\u0234\u022A\x03\x02\x02\x02\u0234\u022B\x03\x02" +
		"\x02\x02\u0235\u0236\x03\x02\x02\x02\u0236\u0237\x07u\x02\x02\u0237\u023C" +
		"\x05X-\x02\u0238\u0239\x07F\x02\x02\u0239\u023B\x07G\x02\x02\u023A\u0238" +
		"\x03\x02\x02\x02\u023B\u023E\x03\x02\x02\x02\u023C\u023A\x03\x02\x02\x02" +
		"\u023C\u023D\x03\x02\x02\x02\u023D\u0241\x03\x02\x02\x02\u023E\u023C\x03" +
		"\x02\x02\x02\u023F\u0240\x070\x02\x02\u0240\u0242\x05V,\x02\u0241\u023F" +
		"\x03\x02\x02\x02\u0241\u0242\x03\x02\x02\x02\u0242\u0243\x03\x02\x02\x02" +
		"\u0243\u0244\x05.\x18\x02\u0244C\x03\x02\x02\x02\u0245\u024C\x05j6\x02" +
		"\u0246\u024C\x07&\x02\x02\u0247\u024C\x07\x03\x02\x02\u0248\u024C\x07" +
		"\x0F\x02\x02\u0249\u024C\x07)\x02\x02\u024A\u024C\x07*\x02\x02\u024B\u0245" +
		"\x03\x02\x02\x02\u024B\u0246\x03\x02\x02\x02\u024B\u0247\x03\x02\x02\x02" +
		"\u024B\u0248\x03\x02\x02\x02\u024B\u0249\x03\x02\x02\x02\u024B\u024A\x03" +
		"\x02\x02\x02\u024CE\x03\x02\x02\x02\u024D\u024E\x05\x14\v\x02\u024E\u024F" +
		"\x05B\"\x02\u024FG\x03\x02\x02\x02\u0250\u0255\x05J&\x02\u0251\u0252\x07" +
		"I\x02\x02\u0252\u0254\x05J&\x02\u0253\u0251\x03\x02\x02\x02\u0254\u0257" +
		"\x03\x02\x02\x02\u0255\u0253\x03\x02\x02\x02\u0255\u0256\x03\x02\x02\x02" +
		"\u0256I\x03\x02\x02\x02\u0257\u0255\x03\x02\x02\x02\u0258\u025B\x05\xDE" +
		"p\x02\u0259\u025A\x07K\x02\x02\u025A\u025C\x05L\'\x02\u025B\u0259\x03" +
		"\x02\x02\x02\u025B\u025C\x03\x02\x02\x02\u025CK\x03\x02\x02\x02\u025D" +
		"\u0260\x05N(\x02\u025E\u0260\x05\xAAV\x02\u025F\u025D\x03\x02\x02\x02" +
		"\u025F\u025E\x03\x02\x02\x02\u0260M\x03\x02\x02\x02\u0261\u026D\x07D\x02" +
		"\x02\u0262\u0267\x05L\'\x02\u0263\u0264\x07I\x02\x02\u0264\u0266\x05L" +
		"\'\x02\u0265\u0263\x03\x02\x02\x02\u0266\u0269\x03\x02\x02\x02\u0267\u0265" +
		"\x03\x02\x02\x02\u0267\u0268\x03\x02\x02\x02\u0268\u026B\x03\x02\x02\x02" +
		"\u0269\u0267\x03\x02\x02\x02\u026A\u026C\x07I\x02\x02\u026B\u026A\x03" +
		"\x02\x02\x02\u026B\u026C\x03\x02\x02\x02\u026C\u026E\x03\x02\x02\x02\u026D" +
		"\u0262\x03\x02\x02\x02\u026D\u026E\x03\x02\x02\x02\u026E\u026F\x03\x02" +
		"\x02\x02\u026F\u0270\x07E\x02\x02\u0270O\x03\x02\x02\x02\u0271\u0276\x05" +
		"R*\x02\u0272\u0273\x07J\x02\x02\u0273\u0275\x05R*\x02\u0274\u0272\x03" +
		"\x02\x02\x02\u0275\u0278\x03\x02\x02\x02\u0276\u0274\x03\x02\x02\x02\u0276" +
		"\u0277\x03\x02\x02\x02\u0277Q\x03\x02\x02\x02\u0278\u0276\x03\x02\x02" +
		"\x02\u0279\u027B\x07u\x02\x02\u027A\u027C\x05\xCEh\x02\u027B\u027A\x03" +
		"\x02\x02\x02\u027B\u027C\x03\x02\x02\x02\u027CS\x03\x02\x02\x02\u027D" +
		"\u0284\x05\xCCg\x02\u027E\u0281\x07P\x02\x02\u027F\u0280\t\x02\x02\x02" +
		"\u0280\u0282\x05\xCCg\x02\u0281\u027F\x03\x02\x02\x02\u0281\u0282\x03" +
		"\x02\x02\x02\u0282\u0284\x03\x02\x02\x02\u0283\u027D\x03\x02\x02\x02\u0283" +
		"\u027E\x03\x02\x02\x02\u0284U\x03\x02\x02\x02\u0285\u028A\x05\xEAv\x02" +
		"\u0286\u0287\x07I\x02\x02\u0287\u0289\x05\xEAv\x02\u0288\u0286\x03\x02" +
		"\x02\x02\u0289\u028C\x03\x02\x02\x02\u028A\u0288\x03\x02\x02\x02\u028A" +
		"\u028B\x03\x02\x02\x02\u028BW\x03\x02\x02\x02\u028C\u028A\x03\x02\x02" +
		"\x02\u028D\u028F\x07B\x02\x02\u028E\u0290\x05Z.\x02\u028F\u028E\x03\x02" +
		"\x02\x02\u028F\u0290\x03\x02\x02\x02\u0290\u0291\x03\x02\x02\x02\u0291" +
		"\u0292\x07C\x02\x02\u0292Y\x03\x02\x02\x02\u0293\u0298\x05\\/\x02\u0294" +
		"\u0295\x07I\x02\x02\u0295\u0297\x05\\/\x02\u0296\u0294\x03\x02\x02\x02" +
		"\u0297\u029A\x03\x02\x02\x02\u0298\u0296\x03\x02\x02\x02\u0298\u0299\x03" +
		"\x02\x02\x02\u0299\u029D\x03\x02\x02\x02\u029A\u0298\x03\x02\x02\x02\u029B" +
		"\u029C\x07I\x02\x02\u029C\u029E\x05^0\x02\u029D\u029B\x03\x02\x02\x02" +
		"\u029D\u029E\x03\x02\x02\x02\u029E\u02A1\x03\x02\x02\x02\u029F\u02A1\x05" +
		"^0\x02\u02A0\u0293\x03\x02\x02\x02\u02A0\u029F\x03\x02\x02\x02\u02A1[" +
		"\x03\x02\x02\x02\u02A2\u02A4\x05\x10\t\x02\u02A3\u02A2\x03\x02\x02\x02" +
		"\u02A4\u02A7\x03\x02\x02\x02\u02A5\u02A3\x03\x02\x02\x02\u02A5\u02A6\x03" +
		"\x02\x02\x02\u02A6\u02A8\x03\x02\x02\x02\u02A7\u02A5\x03\x02\x02\x02\u02A8" +
		"\u02A9\x05\xCCg\x02\u02A9\u02AA\x05\xDEp\x02\u02AA]\x03\x02\x02\x02\u02AB" +
		"\u02AD\x05\x10\t\x02\u02AC\u02AB\x03\x02\x02\x02\u02AD\u02B0\x03\x02\x02" +
		"\x02\u02AE\u02AC\x03\x02\x02\x02\u02AE\u02AF\x03\x02\x02\x02\u02AF\u02B1" +
		"\x03\x02\x02\x02\u02B0\u02AE\x03\x02\x02\x02\u02B1\u02B2\x05\xCCg\x02" +
		"\u02B2\u02B3\x07p\x02\x02\u02B3\u02B4\x05\xDEp\x02\u02B4_\x03\x02\x02" +
		"\x02\u02B5\u02B6\x07?\x02\x02\u02B6a\x03\x02\x02\x02\u02B7\u02B8\x07@" +
		"\x02\x02\u02B8c\x03\x02\x02\x02\u02B9\u02BC\x05`1\x02\u02BA\u02BC\x05" +
		"b2\x02\u02BB\u02B9\x03\x02\x02\x02\u02BB\u02BA\x03\x02\x02\x02\u02BCe" +
		"\x03\x02\x02\x02\u02BD\u02BE\t\x03\x02\x02\u02BEg\x03\x02\x02\x02\u02BF" +
		"\u02C0\t\x04\x02\x02\u02C0i\x03\x02\x02\x02\u02C1\u02C2\x07o\x02\x02\u02C2" +
		"\u02C9\x05\xEAv\x02\u02C3\u02C6\x07B\x02\x02\u02C4\u02C7\x05l7\x02\u02C5" +
		"\u02C7\x05p9\x02\u02C6\u02C4\x03\x02\x02\x02\u02C6\u02C5\x03\x02\x02\x02" +
		"\u02C6\u02C7\x03\x02\x02\x02\u02C7\u02C8\x03\x02\x02\x02\u02C8\u02CA\x07" +
		"C\x02\x02\u02C9\u02C3\x03\x02\x02\x02\u02C9\u02CA\x03\x02\x02\x02\u02CA" +
		"k\x03\x02\x02\x02\u02CB\u02D0\x05n8\x02\u02CC\u02CD\x07I\x02\x02\u02CD" +
		"\u02CF\x05n8\x02\u02CE\u02CC\x03\x02\x02\x02\u02CF\u02D2\x03\x02\x02\x02" +
		"\u02D0\u02CE\x03\x02\x02\x02\u02D0\u02D1\x03\x02\x02\x02\u02D1m\x03\x02" +
		"\x02\x02\u02D2\u02D0\x03\x02\x02\x02\u02D3\u02D4\x07u\x02\x02\u02D4\u02D5" +
		"\x07K\x02\x02\u02D5\u02D6\x05p9\x02\u02D6o\x03\x02\x02\x02\u02D7\u02DB" +
		"\x05\xAAV\x02\u02D8\u02DB\x05j6\x02\u02D9\u02DB\x05r:\x02\u02DA\u02D7" +
		"\x03\x02\x02\x02\u02DA\u02D8\x03\x02\x02\x02\u02DA\u02D9\x03\x02\x02\x02" +
		"\u02DBq\x03\x02\x02\x02\u02DC\u02E5\x07D\x02\x02\u02DD\u02E2\x05p9\x02" +
		"\u02DE\u02DF\x07I\x02\x02\u02DF\u02E1\x05p9\x02\u02E0\u02DE\x03\x02\x02" +
		"\x02\u02E1\u02E4\x03\x02\x02\x02\u02E2\u02E0\x03\x02\x02\x02\u02E2\u02E3" +
		"\x03\x02\x02\x02\u02E3\u02E6\x03\x02\x02\x02\u02E4\u02E2\x03\x02\x02\x02" +
		"\u02E5\u02DD\x03\x02\x02\x02\u02E5\u02E6\x03\x02\x02\x02\u02E6\u02E8\x03" +
		"\x02\x02\x02\u02E7\u02E9\x07I\x02\x02\u02E8\u02E7\x03\x02\x02\x02\u02E8" +
		"\u02E9\x03\x02\x02\x02\u02E9\u02EA\x03\x02\x02\x02\u02EA\u02EB\x07E\x02" +
		"\x02\u02EBs\x03\x02\x02\x02\u02EC\u02ED\x07o\x02\x02\u02ED\u02EE\x07\x1F" +
		"\x02\x02\u02EE\u02EF\x07u\x02\x02\u02EF\u02F0\x05v<\x02\u02F0u\x03\x02" +
		"\x02\x02\u02F1\u02F5\x07D\x02\x02\u02F2\u02F4\x05x=\x02\u02F3\u02F2\x03" +
		"\x02\x02\x02\u02F4\u02F7\x03\x02\x02\x02\u02F5\u02F3\x03\x02\x02\x02\u02F5" +
		"\u02F6\x03\x02\x02\x02\u02F6\u02F8\x03\x02\x02\x02\u02F7\u02F5\x03\x02" +
		"\x02\x02\u02F8\u02F9\x07E\x02\x02\u02F9w\x03\x02\x02\x02\u02FA\u02FC\x05" +
		"\f\x07\x02\u02FB\u02FA\x03\x02\x02\x02\u02FC\u02FF\x03\x02\x02\x02\u02FD" +
		"\u02FB\x03\x02\x02\x02\u02FD\u02FE\x03\x02\x02\x02\u02FE\u0300\x03\x02" +
		"\x02\x02\u02FF\u02FD\x03\x02\x02\x02\u0300\u0303\x05z>\x02\u0301\u0303" +
		"\x07H\x02\x02\u0302\u02FD\x03\x02\x02\x02\u0302\u0301\x03\x02\x02\x02" +
		"\u0303y\x03\x02\x02\x02\u0304\u0305\x05\xCCg\x02\u0305\u0306\x05|?\x02" +
		"\u0306\u0307\x07H\x02\x02\u0307\u0319\x03\x02\x02\x02\u0308\u030A\x05" +
		"\x12\n\x02\u0309\u030B\x07H\x02\x02\u030A\u0309\x03\x02\x02\x02\u030A" +
		"\u030B\x03\x02\x02\x02\u030B\u0319\x03\x02\x02\x02\u030C\u030E\x05\"\x12" +
		"\x02\u030D\u030F\x07H\x02\x02\u030E\u030D\x03\x02\x02\x02\u030E\u030F" +
		"\x03\x02\x02\x02\u030F\u0319\x03\x02\x02\x02\u0310\u0312\x05\x1A\x0E\x02" +
		"\u0311\u0313\x07H\x02\x02\u0312\u0311\x03\x02\x02\x02\u0312\u0313\x03" +
		"\x02\x02\x02\u0313\u0319\x03\x02\x02\x02\u0314\u0316\x05t;\x02\u0315\u0317" +
		"\x07H\x02\x02\u0316\u0315\x03\x02\x02\x02\u0316\u0317\x03\x02\x02\x02" +
		"\u0317\u0319\x03\x02\x02\x02\u0318\u0304\x03\x02\x02\x02\u0318\u0308\x03" +
		"\x02\x02\x02\u0318\u030C\x03\x02\x02\x02\u0318\u0310\x03\x02\x02\x02\u0318" +
		"\u0314\x03\x02\x02\x02\u0319{\x03\x02\x02\x02\u031A\u031D\x05~@\x02\u031B" +
		"\u031D\x05\x80A\x02\u031C\u031A\x03\x02\x02\x02\u031C\u031B\x03\x02\x02" +
		"\x02\u031D}\x03\x02\x02\x02\u031E\u031F\x07u\x02\x02\u031F\u0320\x07B" +
		"\x02\x02\u0320\u0322\x07C\x02\x02\u0321\u0323\x05\x82B\x02\u0322\u0321" +
		"\x03\x02\x02\x02\u0322\u0323\x03\x02\x02\x02\u0323\x7F\x03\x02\x02\x02" +
		"\u0324\u0325\x05H%\x02\u0325\x81\x03\x02\x02\x02\u0326\u0327\x07\x0F\x02" +
		"\x02\u0327\u0328\x05p9\x02\u0328\x83\x03\x02\x02\x02\u0329\u032D\x07D" +
		"\x02\x02\u032A\u032C\x05\x86D\x02\u032B\u032A\x03\x02\x02\x02\u032C\u032F" +
		"\x03\x02\x02\x02\u032D\u032B\x03\x02\x02\x02\u032D\u032E\x03\x02\x02\x02" +
		"\u032E\u0330\x03\x02\x02\x02\u032F\u032D\x03\x02\x02\x02\u0330\u0331\x07" +
		"E\x02\x02\u0331\x85\x03\x02\x02\x02\u0332\u0333\x05\x88E\x02\u0333\u0334" +
		"\x07H\x02\x02\u0334\u0338\x03\x02\x02\x02\u0335\u0338\x05\x8CG\x02\u0336" +
		"\u0338\x05\x8AF\x02\u0337\u0332\x03\x02\x02\x02\u0337\u0335\x03\x02\x02" +
		"\x02\u0337\u0336\x03\x02\x02\x02\u0338\x87\x03\x02\x02\x02\u0339\u033B" +
		"\x05\x10\t\x02\u033A\u0339\x03\x02\x02\x02\u033B\u033E\x03\x02\x02\x02" +
		"\u033C\u033A\x03\x02\x02\x02\u033C\u033D\x03\x02\x02\x02\u033D\u033F\x03" +
		"\x02\x02\x02\u033E\u033C\x03\x02\x02\x02\u033F\u0340\x05\xCCg\x02\u0340" +
		"\u0341\x05H%\x02\u0341\x89\x03\x02\x02\x02\u0342\u0344\x05\x0E\b\x02\u0343" +
		"\u0342\x03\x02\x02\x02\u0344\u0347\x03\x02\x02\x02\u0345\u0343\x03\x02" +
		"\x02\x02\u0345\u0346\x03\x02\x02\x02\u0346\u034A\x03\x02\x02\x02\u0347" +
		"\u0345\x03\x02\x02\x02\u0348\u034B\x05\x12\n\x02\u0349\u034B\x05\"\x12" +
		"\x02\u034A\u0348\x03\x02\x02\x02\u034A\u0349\x03\x02\x02\x02\u034B\u034E" +
		"\x03\x02\x02\x02\u034C\u034E\x07H\x02\x02\u034D\u0345\x03\x02\x02\x02" +
		"\u034D\u034C\x03\x02\x02\x02\u034E\x8B\x03\x02\x02\x02\u034F\u03B3\x05" +
		"\x84C\x02\u0350\u0351\x07\x04\x02\x02\u0351\u0354\x05\xAAV\x02\u0352\u0353" +
		"\x07Q\x02\x02\u0353\u0355\x05\xAAV\x02\u0354\u0352\x03\x02\x02\x02\u0354" +
		"\u0355\x03\x02\x02\x02\u0355\u0356\x03\x02\x02\x02\u0356\u0357\x07H\x02" +
		"\x02\u0357\u03B3\x03\x02\x02\x02\u0358\u0359\x07\x19\x02\x02\u0359\u035A" +
		"\x05\xA6T\x02\u035A\u035D\x05\x8CG\x02\u035B\u035C\x07\x12\x02\x02\u035C" +
		"\u035E\x05\x8CG\x02\u035D\u035B\x03\x02\x02\x02\u035D\u035E\x03\x02\x02" +
		"\x02\u035E\u03B3\x03\x02\x02\x02\u035F\u03B3\x05\x9EP\x02\u0360\u0361" +
		"\x076\x02\x02\u0361\u0362\x05\xA6T\x02\u0362\u0363\x05\x8CG\x02\u0363" +
		"\u03B3\x03\x02\x02\x02\u0364\u0365\x07\x10\x02\x02\u0365\u0366\x05\x8C" +
		"G\x02\u0366\u0367\x076\x02\x02\u0367\u0368\x05\xA6T\x02\u0368\u0369\x07" +
		"H\x02\x02\u0369\u03B3\x03\x02\x02\x02\u036A\u036B\x072\x02\x02\u036B\u0375" +
		"\x05\x84C\x02\u036C\u036E\x05\x8EH\x02\u036D\u036C\x03\x02\x02\x02\u036E" +
		"\u036F\x03\x02\x02\x02\u036F\u036D\x03\x02\x02\x02\u036F\u0370\x03\x02" +
		"\x02\x02\u0370\u0372\x03\x02\x02\x02\u0371\u0373\x05\x92J\x02\u0372\u0371" +
		"\x03\x02\x02\x02\u0372\u0373\x03\x02\x02\x02\u0373\u0376\x03\x02\x02\x02" +
		"\u0374\u0376\x05\x92J\x02\u0375\u036D\x03\x02\x02\x02\u0375\u0374\x03" +
		"\x02\x02\x02\u0376\u03B3\x03\x02\x02\x02\u0377\u0378\x072\x02\x02\u0378" +
		"\u0379\x05\x94K\x02\u0379\u037D\x05\x84C\x02\u037A\u037C\x05\x8EH\x02" +
		"\u037B\u037A\x03\x02\x02\x02\u037C\u037F\x03\x02\x02\x02\u037D\u037B\x03" +
		"\x02\x02\x02\u037D\u037E\x03\x02\x02\x02\u037E\u0381\x03\x02\x02\x02\u037F" +
		"\u037D\x03\x02\x02\x02\u0380\u0382\x05\x92J\x02\u0381\u0380\x03\x02\x02" +
		"\x02\u0381\u0382\x03\x02\x02\x02\u0382\u03B3\x03\x02\x02\x02\u0383\u0384" +
		"\x07,\x02\x02\u0384\u0385\x05\xA6T\x02\u0385\u0389\x07D\x02\x02\u0386" +
		"\u0388\x05\x9AN\x02\u0387\u0386\x03\x02\x02\x02\u0388\u038B\x03\x02\x02" +
		"\x02\u0389\u0387\x03\x02\x02\x02\u0389\u038A\x03\x02\x02\x02\u038A\u038F" +
		"\x03\x02\x02\x02\u038B\u0389\x03\x02\x02\x02\u038C\u038E\x05\x9CO\x02" +
		"\u038D\u038C\x03\x02\x02\x02\u038E\u0391\x03\x02\x02\x02\u038F\u038D\x03" +
		"\x02\x02\x02\u038F\u0390\x03\x02\x02\x02\u0390\u0392\x03\x02\x02\x02\u0391" +
		"\u038F\x03\x02\x02\x02\u0392\u0393\x07E\x02\x02\u0393\u03B3\x03\x02\x02" +
		"\x02\u0394\u0395\x07-\x02\x02\u0395\u0396\x05\xA6T\x02\u0396\u0397\x05" +
		"\x84C\x02\u0397\u03B3\x03\x02\x02\x02\u0398\u039A\x07\'\x02\x02\u0399" +
		"\u039B\x05\xAAV\x02\u039A\u0399\x03\x02\x02\x02\u039A\u039B\x03\x02\x02" +
		"\x02\u039B\u039C\x03\x02\x02\x02\u039C\u03B3\x07H\x02\x02\u039D\u039E" +
		"\x07/\x02\x02\u039E\u039F\x05\xAAV\x02\u039F\u03A0\x07H\x02\x02\u03A0" +
		"\u03B3\x03\x02\x02\x02\u03A1\u03A3\x07\x06\x02\x02\u03A2\u03A4\x07u\x02" +
		"\x02\u03A3\u03A2\x03\x02\x02\x02\u03A3\u03A4\x03\x02\x02\x02\u03A4\u03A5" +
		"\x03\x02\x02\x02\u03A5\u03B3\x07H\x02\x02\u03A6\u03A8\x07\x0E\x02\x02" +
		"\u03A7\u03A9\x07u\x02\x02\u03A8\u03A7\x03\x02\x02\x02\u03A8\u03A9\x03" +
		"\x02\x02\x02\u03A9\u03AA\x03\x02\x02\x02\u03AA\u03B3\x07H\x02\x02\u03AB" +
		"\u03B3\x07H\x02\x02\u03AC\u03AD\x05\xAAV\x02\u03AD\u03AE\x07H\x02\x02" +
		"\u03AE\u03B3\x03\x02\x02\x02\u03AF\u03B0\x07u\x02\x02\u03B0\u03B1\x07" +
		"Q\x02\x02\u03B1\u03B3\x05\x8CG\x02\u03B2\u034F\x03\x02\x02\x02\u03B2\u0350" +
		"\x03\x02\x02\x02\u03B2\u0358\x03\x02\x02\x02\u03B2\u035F\x03\x02\x02\x02" +
		"\u03B2\u0360\x03\x02\x02\x02\u03B2\u0364\x03\x02\x02\x02\u03B2\u036A\x03" +
		"\x02\x02\x02\u03B2\u0377\x03\x02\x02\x02\u03B2\u0383\x03\x02\x02\x02\u03B2" +
		"\u0394\x03\x02\x02\x02\u03B2\u0398\x03\x02\x02\x02\u03B2\u039D\x03\x02" +
		"\x02\x02\u03B2\u03A1\x03\x02\x02\x02\u03B2\u03A6\x03\x02\x02\x02\u03B2" +
		"\u03AB\x03\x02\x02\x02\u03B2\u03AC\x03\x02\x02\x02\u03B2\u03AF\x03\x02" +
		"\x02\x02\u03B3\x8D\x03\x02\x02\x02\u03B4\u03B5\x07\t\x02\x02\u03B5\u03B9" +
		"\x07B\x02\x02\u03B6\u03B8\x05\x10\t\x02\u03B7\u03B6\x03\x02\x02\x02\u03B8" +
		"\u03BB\x03\x02\x02\x02\u03B9\u03B7\x03\x02\x02\x02\u03B9\u03BA\x03\x02" +
		"\x02\x02\u03BA\u03BC\x03\x02\x02\x02\u03BB\u03B9\x03\x02\x02\x02\u03BC" +
		"\u03BD\x05\x90I\x02\u03BD\u03BE\x07u\x02\x02\u03BE\u03BF\x07C\x02\x02" +
		"\u03BF\u03C0\x05\x84C\x02\u03C0\x8F\x03\x02\x02\x02\u03C1\u03C6\x05\xEA" +
		"v\x02\u03C2\u03C3\x07_\x02\x02\u03C3\u03C5\x05\xEAv\x02\u03C4\u03C2\x03" +
		"\x02\x02\x02\u03C5\u03C8\x03\x02\x02\x02\u03C6\u03C4\x03\x02\x02\x02\u03C6" +
		"\u03C7\x03\x02\x02\x02\u03C7\x91\x03\x02\x02\x02\u03C8\u03C6\x03\x02\x02" +
		"\x02\u03C9\u03CA\x07\x16\x02\x02\u03CA\u03CB\x05\x84C\x02\u03CB\x93\x03" +
		"\x02\x02\x02\u03CC\u03CD\x07B\x02\x02\u03CD\u03CF\x05\x96L\x02\u03CE\u03D0" +
		"\x07H\x02\x02\u03CF\u03CE\x03\x02\x02\x02\u03CF\u03D0\x03\x02\x02\x02" +
		"\u03D0\u03D1\x03\x02\x02\x02\u03D1\u03D2\x07C\x02\x02\u03D2\x95\x03\x02" +
		"\x02\x02\u03D3\u03D8\x05\x98M\x02\u03D4\u03D5\x07H\x02\x02\u03D5\u03D7" +
		"\x05\x98M\x02\u03D6\u03D4\x03\x02\x02\x02\u03D7\u03DA\x03\x02\x02\x02" +
		"\u03D8\u03D6\x03\x02\x02\x02\u03D8\u03D9\x03\x02\x02\x02\u03D9\x97\x03" +
		"\x02\x02\x02\u03DA\u03D8\x03\x02\x02\x02\u03DB\u03DD\x05\x10\t\x02\u03DC" +
		"\u03DB\x03\x02\x02\x02\u03DD\u03E0\x03\x02\x02\x02\u03DE\u03DC\x03\x02" +
		"\x02\x02\u03DE\u03DF\x03\x02\x02\x02\u03DF\u03E1\x03\x02\x02\x02\u03E0" +
		"\u03DE\x03\x02\x02\x02\u03E1\u03E2\x05P)\x02\u03E2\u03E3\x05\xDEp\x02" +
		"\u03E3\u03E4\x07K\x02\x02\u03E4\u03E5\x05\xAAV\x02\u03E5\x99\x03\x02\x02" +
		"\x02\u03E6\u03E8\x05\x9CO\x02\u03E7\u03E6\x03\x02\x02\x02\u03E8\u03E9" +
		"\x03\x02\x02\x02\u03E9\u03E7\x03\x02\x02\x02\u03E9\u03EA\x03\x02\x02\x02" +
		"\u03EA\u03EC\x03\x02\x02\x02\u03EB\u03ED\x05\x86D\x02\u03EC\u03EB\x03" +
		"\x02\x02\x02\u03ED\u03EE\x03\x02\x02\x02\u03EE\u03EC\x03\x02\x02\x02\u03EE" +
		"\u03EF\x03\x02\x02\x02\u03EF\x9B\x03\x02\x02\x02\u03F0\u03F3\x07\b\x02" +
		"\x02\u03F1\u03F4\x07u\x02\x02\u03F2\u03F4\x05\xAAV\x02\u03F3\u03F1\x03" +
		"\x02\x02\x02\u03F3\u03F2\x03\x02\x02\x02\u03F4\u03F5\x03\x02\x02\x02\u03F5" +
		"\u03F9\x07Q\x02";
	private static readonly _serializedATNSegment2: string =
		"\x02\u03F6\u03F7\x07\x0F\x02\x02\u03F7\u03F9\x07Q\x02\x02\u03F8\u03F0" +
		"\x03\x02\x02\x02\u03F8\u03F6\x03\x02\x02\x02\u03F9\x9D\x03\x02\x02\x02" +
		"\u03FA\u03FB\x07\x18\x02\x02\u03FB\u03FC\x07B\x02\x02\u03FC\u03FD\x05" +
		"\xA0Q\x02\u03FD\u03FE\x07C\x02\x02\u03FE\u03FF\x05\x8CG\x02\u03FF\x9F" +
		"\x03\x02\x02\x02\u0400\u040D\x05\xA4S\x02\u0401\u0403\x05\xA2R\x02\u0402" +
		"\u0401\x03\x02\x02\x02\u0402\u0403\x03\x02\x02\x02\u0403\u0404\x03\x02" +
		"\x02\x02\u0404\u0406\x07H\x02\x02\u0405\u0407\x05\xAAV\x02\u0406\u0405" +
		"\x03\x02\x02\x02\u0406\u0407\x03\x02\x02\x02\u0407\u0408\x03\x02\x02\x02" +
		"\u0408\u040A\x07H\x02\x02\u0409\u040B\x05\xA8U\x02\u040A\u0409\x03\x02" +
		"\x02\x02\u040A\u040B\x03\x02\x02\x02\u040B\u040D\x03\x02\x02\x02\u040C" +
		"\u0400\x03\x02\x02\x02\u040C\u0402\x03\x02\x02\x02\u040D\xA1\x03\x02\x02" +
		"\x02\u040E\u0411\x05\x88E\x02\u040F\u0411\x05\xA8U\x02\u0410\u040E\x03" +
		"\x02\x02\x02\u0410\u040F\x03\x02\x02\x02\u0411\xA3\x03\x02\x02\x02\u0412" +
		"\u0414\x05\x10\t\x02\u0413\u0412\x03\x02\x02\x02\u0414\u0417\x03\x02\x02" +
		"\x02\u0415\u0413\x03\x02\x02\x02\u0415\u0416\x03\x02\x02\x02\u0416\u0418" +
		"\x03\x02\x02\x02\u0417\u0415\x03\x02\x02\x02\u0418\u0419\x05\xCCg\x02" +
		"\u0419\u041A\x05\xDEp\x02\u041A\u041B\x07Q\x02\x02\u041B\u041C\x05\xAA" +
		"V\x02\u041C\xA5\x03\x02\x02\x02\u041D\u041E\x07B\x02\x02\u041E\u041F\x05" +
		"\xAAV\x02\u041F\u0420\x07C\x02\x02\u0420\xA7\x03\x02\x02\x02\u0421\u0426" +
		"\x05\xAAV\x02\u0422\u0423\x07I\x02\x02\u0423\u0425\x05\xAAV\x02\u0424" +
		"\u0422\x03\x02\x02\x02\u0425\u0428\x03\x02\x02\x02\u0426\u0424\x03\x02" +
		"\x02\x02\u0426\u0427\x03\x02\x02\x02\u0427\xA9\x03\x02\x02\x02\u0428\u0426" +
		"\x03\x02\x02\x02\u0429\u042A\bV\x01\x02\u042A\u0449\x05\xB2Z\x02\u042B" +
		"\u0449\x05\xE2r\x02\u042C\u042D\x07\"\x02\x02\u042D\u0449\x05\xB6\\\x02" +
		"\u042E\u042F\x07B\x02\x02\u042F\u0430\x05\xCCg\x02\u0430\u0431\x07C\x02" +
		"\x02\u0431\u0432\x05\xAAV\x17\u0432\u0449\x03\x02\x02\x02\u0433\u0434" +
		"\t\x05\x02\x02\u0434\u0449\x05\xAAV\x15\u0435\u0436\t\x06\x02\x02\u0436" +
		"\u0449\x05\xAAV\x14\u0437\u0449\x05\xACW\x02\u0438\u0439\x05\xCCg\x02" +
		"\u0439\u043F\x07n\x02\x02\u043A\u043C\x05\xCEh\x02\u043B\u043A\x03\x02" +
		"\x02\x02\u043B\u043C\x03\x02\x02\x02\u043C\u043D\x03\x02\x02\x02\u043D" +
		"\u0440\x07u\x02\x02\u043E\u0440\x07\"\x02\x02\u043F\u043B\x03\x02\x02" +
		"\x02\u043F\u043E\x03\x02\x02\x02\u0440\u0449\x03\x02\x02\x02\u0441\u0442" +
		"\x05\xB4[\x02\u0442\u0444\x07n\x02\x02\u0443\u0445\x05\xCEh\x02\u0444" +
		"\u0443\x03\x02\x02\x02\u0444\u0445\x03\x02\x02\x02\u0445\u0446\x03\x02" +
		"\x02\x02\u0446\u0447\x07\"\x02\x02\u0447\u0449\x03\x02\x02\x02\u0448\u0429" +
		"\x03\x02\x02\x02\u0448\u042B\x03\x02\x02\x02\u0448\u042C\x03\x02\x02\x02" +
		"\u0448\u042E\x03\x02\x02\x02\u0448\u0433\x03\x02\x02\x02\u0448\u0435\x03" +
		"\x02\x02\x02\u0448\u0437\x03\x02\x02\x02\u0448\u0438\x03\x02\x02\x02\u0448" +
		"\u0441\x03\x02\x02\x02\u0449\u049A\x03\x02\x02\x02\u044A\u044B\f\x13\x02" +
		"\x02\u044B\u044C\t\x07\x02\x02\u044C\u0499\x05\xAAV\x14\u044D\u044E\f" +
		"\x12\x02\x02\u044E\u044F\t\b\x02\x02\u044F\u0499\x05\xAAV\x13\u0450\u0458" +
		"\f\x11\x02\x02\u0451\u0452\x07M\x02\x02\u0452\u0459\x07M\x02\x02\u0453" +
		"\u0454\x07L\x02\x02\u0454\u0455\x07L\x02\x02\u0455\u0459\x07L\x02\x02" +
		"\u0456\u0457\x07L\x02\x02\u0457\u0459\x07L\x02\x02\u0458\u0451\x03\x02" +
		"\x02\x02\u0458\u0453\x03\x02\x02\x02\u0458\u0456\x03\x02\x02\x02\u0459" +
		"\u045A\x03\x02\x02\x02\u045A\u0499\x05\xAAV\x12\u045B\u045C\f\x10\x02" +
		"\x02\u045C\u045D\t\t\x02\x02\u045D\u0499\x05\xAAV\x11\u045E\u045F\f\x0E" +
		"\x02\x02\u045F\u0460\t\n\x02\x02\u0460\u0499\x05\xAAV\x0F\u0461\u0462" +
		"\f\r\x02\x02\u0462\u0463\x07^\x02\x02\u0463\u0499\x05\xAAV\x0E\u0464\u0465" +
		"\f\f\x02\x02\u0465\u0466\x07`\x02\x02\u0466\u0499\x05\xAAV\r\u0467\u0468" +
		"\f\v\x02\x02\u0468\u0469\x07_\x02\x02\u0469\u0499\x05\xAAV\f\u046A\u046B" +
		"\f\n\x02\x02\u046B\u046C\x07V\x02\x02\u046C\u0499\x05\xAAV\v\u046D\u046E" +
		"\f\t\x02\x02\u046E\u046F\x07W\x02\x02\u046F\u0499\x05\xAAV\n\u0470\u0471" +
		"\f\b\x02\x02\u0471\u0472\x07P\x02\x02\u0472\u0473\x05\xAAV\x02\u0473\u0474" +
		"\x07Q\x02\x02\u0474\u0475\x05\xAAV\t\u0475\u0499\x03\x02\x02\x02\u0476" +
		"\u0477\f\x07\x02\x02\u0477\u0478\t\v\x02\x02\u0478\u0499\x05\xAAV\x07" +
		"\u0479\u047A\f\x1B\x02\x02\u047A\u0486\x07J\x02\x02\u047B\u0487\x07u\x02" +
		"\x02\u047C\u0487\x05\xE2r\x02\u047D\u0487\x07.\x02\x02\u047E\u0480\x07" +
		"\"\x02\x02\u047F\u0481\x05\xC8e\x02\u0480\u047F\x03\x02\x02\x02\u0480" +
		"\u0481\x03\x02\x02\x02\u0481\u0482\x03\x02\x02\x02\u0482\u0487\x05\xBC" +
		"_\x02\u0483\u0484\x07+\x02\x02\u0484\u0487\x05\xD0i\x02\u0485\u0487\x05" +
		"\xC2b\x02\u0486\u047B\x03\x02\x02\x02\u0486\u047C\x03\x02\x02\x02\u0486" +
		"\u047D\x03\x02\x02\x02\u0486\u047E\x03\x02\x02\x02\u0486\u0483\x03\x02" +
		"\x02\x02\u0486\u0485\x03\x02\x02\x02\u0487\u0499\x03\x02\x02\x02\u0488" +
		"\u0489\f\x1A\x02\x02\u0489\u048A\x07F\x02\x02\u048A\u048B\x05\xAAV\x02" +
		"\u048B\u048C\x07G\x02\x02\u048C\u0499\x03\x02\x02\x02\u048D\u048E\f\x16" +
		"\x02\x02\u048E\u0499\t\f\x02\x02\u048F\u0490\f\x0F\x02\x02\u0490\u0491" +
		"\x07\x1D\x02\x02\u0491\u0499\x05\xCCg\x02\u0492\u0493\f\x05\x02\x02\u0493" +
		"\u0495\x07n\x02\x02\u0494\u0496\x05\xCEh\x02\u0495\u0494\x03\x02\x02\x02" +
		"\u0495\u0496\x03\x02\x02\x02\u0496\u0497\x03\x02\x02\x02\u0497\u0499\x07" +
		"u\x02\x02\u0498\u044A\x03\x02\x02\x02\u0498\u044D\x03\x02\x02\x02\u0498" +
		"\u0450\x03\x02\x02\x02\u0498\u045B\x03\x02\x02\x02\u0498\u045E\x03\x02" +
		"\x02\x02\u0498\u0461\x03\x02\x02\x02\u0498\u0464\x03\x02\x02\x02\u0498" +
		"\u0467\x03\x02\x02\x02\u0498\u046A\x03\x02\x02\x02\u0498\u046D\x03\x02" +
		"\x02\x02\u0498\u0470\x03\x02\x02\x02\u0498\u0476\x03\x02\x02\x02\u0498" +
		"\u0479\x03\x02\x02\x02\u0498\u0488\x03\x02\x02\x02\u0498\u048D\x03\x02" +
		"\x02\x02\u0498\u048F\x03\x02\x02\x02\u0498\u0492\x03\x02\x02\x02\u0499" +
		"\u049C\x03\x02\x02\x02\u049A\u0498\x03\x02\x02\x02\u049A\u049B\x03\x02" +
		"\x02\x02\u049B\xAB\x03\x02\x02\x02\u049C\u049A\x03\x02\x02\x02\u049D\u049E" +
		"\x05\xAEX\x02\u049E\u049F\x07m\x02\x02\u049F\u04A0\x05\xB0Y\x02\u04A0" +
		"\xAD\x03\x02\x02\x02\u04A1\u04B2\x07u\x02\x02\u04A2\u04A4\x07B\x02\x02" +
		"\u04A3\u04A5\x05Z.\x02\u04A4\u04A3\x03\x02\x02\x02\u04A4\u04A5\x03\x02" +
		"\x02\x02\u04A5\u04A6\x03\x02\x02\x02\u04A6\u04B2\x07C\x02\x02\u04A7\u04A8" +
		"\x07B\x02\x02\u04A8\u04AD\x07u\x02\x02\u04A9\u04AA\x07I\x02\x02\u04AA" +
		"\u04AC\x07u\x02\x02\u04AB\u04A9\x03\x02\x02\x02\u04AC\u04AF\x03\x02\x02" +
		"\x02\u04AD\u04AB\x03\x02\x02\x02\u04AD\u04AE\x03\x02\x02\x02\u04AE\u04B0" +
		"\x03\x02\x02\x02\u04AF\u04AD\x03\x02\x02\x02\u04B0\u04B2\x07C\x02\x02" +
		"\u04B1\u04A1\x03\x02\x02\x02\u04B1\u04A2\x03\x02\x02\x02\u04B1\u04A7\x03" +
		"\x02\x02\x02\u04B2\xAF\x03\x02\x02\x02\u04B3\u04B6\x05\xAAV\x02\u04B4" +
		"\u04B6\x05\x84C\x02\u04B5\u04B3\x03\x02\x02\x02\u04B5\u04B4\x03\x02\x02" +
		"\x02\u04B6\xB1\x03\x02\x02\x02\u04B7\u04B8\x07B\x02\x02\u04B8\u04B9\x05" +
		"\xAAV\x02\u04B9\u04BA\x07C\x02\x02\u04BA\u04CA\x03\x02\x02\x02\u04BB\u04CA" +
		"\x07.\x02\x02\u04BC\u04CA\x07+\x02\x02\u04BD\u04CA\x05\xECw\x02\u04BE" +
		"\u04CA\x07u\x02\x02\u04BF\u04C0\x050\x19\x02\u04C0\u04C1\x07J\x02\x02" +
		"\u04C1\u04C2\x07\v\x02\x02\u04C2\u04CA\x03\x02\x02\x02\u04C3\u04C7\x05" +
		"\xC8e\x02\u04C4\u04C8\x05\xD2j\x02\u04C5\u04C6\x07.\x02\x02\u04C6\u04C8" +
		"\x05\xD4k\x02\u04C7\u04C4\x03\x02\x02\x02\u04C7\u04C5\x03\x02\x02\x02" +
		"\u04C8\u04CA\x03\x02\x02\x02\u04C9\u04B7\x03\x02\x02\x02\u04C9\u04BB\x03" +
		"\x02\x02\x02\u04C9\u04BC\x03\x02\x02\x02\u04C9\u04BD\x03\x02\x02\x02\u04C9" +
		"\u04BE\x03\x02\x02\x02\u04C9\u04BF\x03\x02\x02\x02\u04C9\u04C3\x03\x02" +
		"\x02\x02\u04CA\xB3\x03\x02\x02\x02\u04CB\u04CC\x05P)\x02\u04CC\u04CD\x07" +
		"J\x02\x02\u04CD\u04CF\x03\x02\x02\x02\u04CE\u04CB\x03\x02\x02\x02\u04CE" +
		"\u04CF\x03\x02\x02\x02\u04CF\u04D3\x03\x02\x02\x02\u04D0\u04D2\x05j6\x02" +
		"\u04D1\u04D0\x03\x02\x02\x02\u04D2\u04D5\x03\x02\x02\x02\u04D3\u04D1\x03" +
		"\x02\x02\x02\u04D3\u04D4\x03\x02\x02\x02\u04D4\u04D6\x03\x02\x02\x02\u04D5" +
		"\u04D3\x03\x02\x02\x02\u04D6\u04D8\x07u\x02\x02\u04D7\u04D9\x05\xCEh\x02" +
		"\u04D8\u04D7\x03\x02\x02\x02\u04D8\u04D9\x03\x02\x02\x02\u04D9\xB5\x03" +
		"\x02\x02\x02\u04DA\u04DB\x05\xE6t\x02\u04DB\u04DC\x05\xBE`\x02\u04DC\u04E3" +
		"\x03\x02\x02\x02\u04DD\u04E0\x05\xB8]\x02\u04DE\u04E1\x05\xBE`\x02\u04DF" +
		"\u04E1\x05\xC0a\x02\u04E0\u04DE\x03\x02\x02\x02\u04E0\u04DF\x03\x02\x02" +
		"\x02\u04E1\u04E3\x03\x02\x02\x02\u04E2\u04DA\x03\x02\x02\x02\u04E2\u04DD" +
		"\x03\x02\x02\x02\u04E3\xB7\x03\x02\x02\x02\u04E4\u04E9\x05\xBA^\x02\u04E5" +
		"\u04E6\x07J\x02\x02\u04E6\u04E8\x05\xBA^\x02\u04E7\u04E5\x03\x02\x02\x02" +
		"\u04E8\u04EB\x03\x02\x02\x02\u04E9\u04E7\x03\x02\x02\x02\u04E9\u04EA\x03" +
		"\x02\x02\x02\u04EA\xB9\x03\x02\x02\x02\u04EB\u04E9\x03\x02\x02\x02\u04EC" +
		"\u04EE\x07u\x02\x02\u04ED\u04EF\x05\xC4c\x02\u04EE\u04ED\x03\x02\x02\x02" +
		"\u04EE\u04EF\x03\x02\x02\x02\u04EF\xBB\x03\x02\x02\x02\u04F0\u04F2\x07" +
		"u\x02\x02\u04F1\u04F3\x05\xC6d\x02\u04F2\u04F1\x03\x02\x02\x02\u04F2\u04F3" +
		"\x03\x02\x02\x02\u04F3\u04F4\x03\x02\x02\x02\u04F4\u04F5\x05\xC0a\x02" +
		"\u04F5\xBD\x03\x02\x02\x02\u04F6\u0512\x07F\x02\x02\u04F7\u04FC\x07G\x02" +
		"\x02\u04F8\u04F9\x07F\x02\x02\u04F9\u04FB\x07G\x02\x02\u04FA\u04F8\x03" +
		"\x02\x02\x02\u04FB\u04FE\x03\x02\x02\x02\u04FC\u04FA\x03\x02\x02\x02\u04FC" +
		"\u04FD\x03\x02\x02\x02\u04FD\u04FF\x03\x02\x02\x02\u04FE\u04FC\x03\x02" +
		"\x02\x02\u04FF\u0513\x05N(\x02\u0500\u0501\x05\xAAV\x02\u0501\u0508\x07" +
		"G\x02\x02\u0502\u0503\x07F\x02\x02\u0503\u0504\x05\xAAV\x02\u0504\u0505" +
		"\x07G\x02\x02\u0505\u0507\x03\x02\x02\x02\u0506\u0502\x03\x02\x02\x02" +
		"\u0507\u050A\x03\x02\x02\x02\u0508\u0506\x03\x02\x02\x02\u0508\u0509\x03" +
		"\x02\x02\x02\u0509\u050F\x03\x02\x02\x02\u050A\u0508\x03\x02\x02\x02\u050B" +
		"\u050C\x07F\x02\x02\u050C\u050E\x07G\x02\x02\u050D\u050B\x03\x02\x02\x02" +
		"\u050E\u0511\x03\x02\x02\x02\u050F\u050D\x03\x02\x02\x02\u050F\u0510\x03" +
		"\x02\x02\x02\u0510\u0513\x03\x02\x02\x02\u0511\u050F\x03\x02\x02\x02\u0512" +
		"\u04F7\x03\x02\x02\x02\u0512\u0500\x03\x02\x02\x02\u0513\xBF\x03\x02\x02" +
		"\x02\u0514\u0516\x05\xD4k\x02\u0515\u0517\x05$\x13\x02\u0516\u0515\x03" +
		"\x02\x02\x02\u0516\u0517\x03\x02\x02\x02\u0517\xC1\x03\x02\x02\x02\u0518" +
		"\u0519\x05\xC8e\x02\u0519\u051A\x05\xD2j\x02\u051A\xC3\x03\x02\x02\x02" +
		"\u051B\u051C\x07M\x02\x02\u051C\u051F\x07L\x02\x02\u051D\u051F\x05\xCE" +
		"h\x02\u051E\u051B\x03\x02\x02\x02\u051E\u051D\x03\x02\x02\x02\u051F\xC5" +
		"\x03\x02\x02\x02\u0520\u0521\x07M\x02\x02\u0521\u0524\x07L\x02\x02\u0522" +
		"\u0524\x05\xC8e\x02\u0523\u0520\x03\x02\x02\x02\u0523\u0522\x03\x02\x02" +
		"\x02\u0524\xC7\x03\x02\x02\x02\u0525\u0526\x07M\x02\x02\u0526\u0527\x05" +
		"\xCAf\x02\u0527\u0528\x07L\x02\x02\u0528\xC9\x03\x02\x02\x02\u0529\u052E" +
		"\x05\xCCg\x02\u052A\u052B\x07I\x02\x02\u052B\u052D\x05\xCCg\x02\u052C" +
		"\u052A\x03\x02\x02\x02\u052D\u0530\x03\x02\x02\x02\u052E\u052C\x03\x02" +
		"\x02\x02\u052E\u052F\x03\x02\x02\x02\u052F\xCB\x03\x02\x02\x02\u0530\u052E" +
		"\x03\x02\x02\x02\u0531\u0533\x05j6\x02\u0532\u0531\x03\x02\x02\x02\u0532" +
		"\u0533\x03\x02\x02\x02\u0533\u0537\x03\x02\x02\x02\u0534\u0538\x05P)\x02" +
		"\u0535\u0538\x05\xE6t\x02\u0536\u0538\x073\x02\x02\u0537\u0534\x03\x02" +
		"\x02\x02\u0537\u0535\x03\x02\x02\x02\u0537\u0536\x03\x02\x02\x02\u0538" +
		"\u053D\x03\x02\x02\x02\u0539\u053A\x07F\x02\x02\u053A\u053C\x07G\x02\x02" +
		"\u053B\u0539\x03\x02\x02\x02\u053C\u053F\x03\x02\x02\x02\u053D\u053B\x03" +
		"\x02\x02\x02\u053D\u053E\x03\x02\x02\x02\u053E\xCD\x03\x02\x02\x02\u053F" +
		"\u053D\x03\x02\x02\x02\u0540\u0541\x07M\x02\x02\u0541\u0546\x05T+\x02" +
		"\u0542\u0543\x07I\x02\x02\u0543\u0545\x05T+\x02\u0544\u0542\x03\x02\x02" +
		"\x02\u0545\u0548\x03\x02\x02\x02\u0546\u0544\x03\x02\x02\x02\u0546\u0547" +
		"\x03\x02\x02\x02\u0547\u0549\x03\x02\x02\x02\u0548\u0546\x03\x02\x02\x02" +
		"\u0549\u054A\x07L\x02\x02\u054A\xCF\x03\x02\x02\x02\u054B\u0552\x05\xD4" +
		"k\x02\u054C\u054D\x07J\x02\x02\u054D\u054F\x07u\x02\x02\u054E\u0550\x05" +
		"\xD4k\x02\u054F\u054E\x03\x02\x02\x02\u054F\u0550\x03\x02\x02\x02\u0550" +
		"\u0552\x03\x02\x02\x02\u0551\u054B\x03\x02\x02\x02\u0551\u054C\x03\x02" +
		"\x02\x02\u0552\xD1\x03\x02\x02\x02\u0553\u0554\x07+\x02\x02\u0554\u0558" +
		"\x05\xD0i\x02\u0555\u0556\x07u\x02\x02\u0556\u0558\x05\xD4k\x02\u0557" +
		"\u0553\x03\x02\x02\x02\u0557\u0555\x03\x02\x02\x02\u0558\xD3\x03\x02\x02" +
		"\x02\u0559\u055B\x07B\x02\x02\u055A\u055C\x05\xA8U\x02\u055B\u055A\x03" +
		"\x02\x02\x02\u055B\u055C\x03\x02\x02\x02\u055C\u055D\x03\x02\x02\x02\u055D" +
		"\u055E\x07C\x02\x02\u055E\xD5\x03\x02\x02\x02\u055F\u0561\x05\x06\x04" +
		"\x02\u0560\u055F\x03\x02\x02\x02\u0560\u0561\x03\x02\x02\x02\u0561\u0565" +
		"\x03\x02\x02\x02\u0562\u0564\x05\b\x05\x02\u0563\u0562\x03\x02\x02\x02" +
		"\u0564\u0567\x03\x02\x02\x02\u0565\u0563\x03\x02\x02\x02\u0565\u0566\x03" +
		"\x02\x02\x02\u0566\u0569\x03\x02\x02\x02\u0567\u0565\x03\x02\x02\x02\u0568" +
		"\u056A\x05\n\x06\x02\u0569\u0568\x03\x02\x02\x02\u056A\u056B\x03\x02\x02" +
		"\x02\u056B\u0569\x03\x02\x02\x02\u056B\u056C\x03\x02\x02\x02\u056C\u056D" +
		"\x03\x02\x02\x02\u056D\u056E\x07\x02\x02\x03\u056E\xD7\x03\x02\x02\x02" +
		"\u056F\u0573\x05\b\x05\x02\u0570\u0573\x05\x86D\x02\u0571\u0573\x05\n" +
		"\x06\x02\u0572\u056F\x03\x02\x02\x02\u0572\u0570\x03\x02\x02\x02\u0572" +
		"\u0571\x03\x02\x02\x02\u0573\u0576\x03\x02\x02\x02\u0574\u0572\x03\x02" +
		"\x02\x02\u0574\u0575\x03\x02\x02\x02\u0575\u0577\x03\x02\x02\x02\u0576" +
		"\u0574\x03\x02\x02\x02\u0577\u0578\x07\x02\x02\x03\u0578\xD9\x03\x02\x02" +
		"\x02\u0579\u057C\x05\b\x05\x02\u057A\u057C\x05(\x15\x02\u057B\u0579\x03" +
		"\x02\x02\x02\u057B\u057A\x03\x02\x02\x02\u057C\u057F\x03\x02\x02\x02\u057D" +
		"\u057B\x03\x02\x02\x02\u057D\u057E\x03\x02\x02\x02\u057E\u0580\x03\x02" +
		"\x02\x02\u057F\u057D\x03\x02\x02\x02\u0580\u0581\x07\x02\x02\x03\u0581" +
		"\xDB\x03\x02\x02\x02\u0582\u0586\x05\b\x05\x02\u0583\u0586\x05(\x15\x02" +
		"\u0584\u0586\x05\x86D\x02\u0585\u0582\x03\x02\x02\x02\u0585\u0583\x03" +
		"\x02\x02\x02\u0585\u0584\x03\x02\x02\x02\u0586\u0589\x03\x02\x02\x02\u0587" +
		"\u0585\x03\x02\x02\x02\u0587\u0588\x03\x02\x02\x02\u0588\u058A\x03\x02" +
		"\x02\x02\u0589\u0587\x03\x02\x02\x02\u058A\u058B\x05\x86D\x02\u058B\u0591" +
		"\x05(\x15\x02\u058C\u0590\x05\b\x05\x02\u058D\u0590\x05(\x15\x02\u058E" +
		"\u0590\x05\x86D\x02\u058F\u058C\x03\x02\x02\x02\u058F\u058D\x03\x02\x02" +
		"\x02\u058F\u058E\x03\x02\x02\x02\u0590\u0593\x03\x02\x02\x02\u0591\u058F" +
		"\x03\x02\x02\x02\u0591\u0592\x03\x02\x02\x02\u0592\u05A7\x03\x02\x02\x02" +
		"\u0593\u0591\x03\x02\x02\x02\u0594\u0598\x05\b\x05\x02\u0595\u0598\x05" +
		"(\x15\x02\u0596\u0598\x05\x86D\x02\u0597\u0594\x03\x02\x02\x02\u0597\u0595" +
		"\x03\x02\x02\x02\u0597\u0596\x03\x02\x02\x02\u0598\u059B\x03\x02\x02\x02" +
		"\u0599\u0597\x03\x02\x02\x02\u0599\u059A\x03\x02\x02\x02\u059A\u059C\x03" +
		"\x02\x02\x02\u059B\u0599\x03\x02\x02\x02\u059C\u059D\x05(\x15\x02\u059D" +
		"\u05A3\x05\x86D\x02\u059E\u05A2\x05\b\x05\x02\u059F\u05A2\x05(\x15\x02" +
		"\u05A0\u05A2\x05\x86D\x02\u05A1\u059E\x03\x02\x02\x02\u05A1\u059F\x03" +
		"\x02\x02\x02\u05A1\u05A0\x03\x02\x02\x02\u05A2\u05A5\x03\x02\x02\x02\u05A3" +
		"\u05A1\x03\x02\x02\x02\u05A3\u05A4\x03\x02\x02\x02\u05A4\u05A7\x03\x02" +
		"\x02\x02\u05A5\u05A3\x03\x02\x02\x02\u05A6\u0587\x03\x02\x02\x02\u05A6" +
		"\u0599\x03\x02\x02\x02\u05A7\xDD\x03\x02\x02\x02\u05A8\u05B2\x05\xE0q" +
		"\x02\u05A9\u05AE\x07u\x02\x02\u05AA\u05AB\x07F\x02\x02\u05AB\u05AD\x07" +
		"G\x02\x02\u05AC\u05AA\x03\x02\x02\x02\u05AD\u05B0\x03\x02\x02\x02\u05AE" +
		"\u05AC\x03\x02\x02\x02\u05AE\u05AF\x03\x02\x02\x02\u05AF\u05B2\x03\x02" +
		"\x02\x02\u05B0\u05AE\x03\x02\x02\x02\u05B1\u05A8\x03\x02\x02\x02\u05B1" +
		"\u05A9\x03\x02\x02\x02\u05B2\xDF\x03\x02\x02\x02\u05B3\u05B8\x05\xE6t" +
		"\x02\u05B4\u05B5\x07F\x02\x02\u05B5\u05B7\x07G\x02\x02\u05B6\u05B4\x03" +
		"\x02\x02\x02\u05B7\u05BA\x03\x02\x02\x02\u05B8\u05B6\x03\x02\x02\x02\u05B8" +
		"\u05B9\x03\x02\x02\x02\u05B9\u05BB\x03\x02\x02\x02\u05BA\u05B8\x03\x02" +
		"\x02\x02\u05BB\u05BC\bq\x01\x02\u05BC\xE1\x03\x02\x02\x02\u05BD\u05D1" +
		"\x05\xE4s\x02\u05BE\u05BF\x07u\x02\x02\u05BF\u05C1\x07B\x02\x02\u05C0" +
		"\u05C2\x05\xA8U\x02\u05C1\u05C0\x03\x02\x02\x02\u05C1\u05C2\x03\x02\x02" +
		"\x02\u05C2\u05C3\x03\x02\x02\x02\u05C3\u05D1\x07C\x02\x02\u05C4\u05C5" +
		"\x07.\x02\x02\u05C5\u05C7\x07B\x02\x02\u05C6\u05C8\x05\xA8U\x02\u05C7" +
		"\u05C6\x03\x02\x02\x02\u05C7\u05C8\x03\x02\x02\x02\u05C8\u05C9\x03\x02" +
		"\x02\x02\u05C9\u05D1\x07C\x02\x02\u05CA\u05CB\x07+\x02\x02\u05CB\u05CD" +
		"\x07B\x02\x02\u05CC\u05CE\x05\xA8U\x02\u05CD\u05CC\x03\x02\x02\x02\u05CD" +
		"\u05CE\x03\x02\x02\x02\u05CE\u05CF\x03\x02\x02\x02\u05CF\u05D1\x07C\x02" +
		"\x02\u05D0\u05BD\x03\x02\x02\x02\u05D0\u05BE\x03\x02\x02\x02\u05D0\u05C4" +
		"\x03\x02\x02\x02\u05D0\u05CA\x03\x02\x02\x02\u05D1\xE3\x03\x02\x02\x02" +
		"\u05D2\u05D3\t\r\x02\x02\u05D3\u05D5\x07B\x02\x02\u05D4\u05D6\x05\xA8" +
		"U\x02\u05D5\u05D4\x03\x02\x02\x02\u05D5\u05D6\x03\x02\x02\x02\u05D6\u05D7" +
		"\x03\x02\x02\x02\u05D7\u05D8\x07C\x02\x02\u05D8\xE5\x03\x02\x02\x02\u05D9" +
		"\u05E3\x07\x05\x02\x02\u05DA\u05E3\x07\n\x02\x02\u05DB\u05E3\x07\x07\x02" +
		"\x02\u05DC\u05E3\x07(\x02\x02\u05DD\u05E3\x07\x1E\x02\x02\u05DE\u05E3" +
		"\x07 \x02\x02\u05DF\u05E3\x07\x17\x02\x02\u05E0\u05E3\x07\x11\x02\x02" +
		"\u05E1\u05E3\x05\xE8u\x02\u05E2\u05D9\x03\x02\x02\x02\u05E2\u05DA\x03" +
		"\x02\x02\x02\u05E2\u05DB\x03\x02\x02\x02\u05E2\u05DC\x03\x02\x02\x02\u05E2" +
		"\u05DD\x03\x02\x02\x02\u05E2\u05DE\x03\x02\x02\x02\u05E2\u05DF\x03\x02" +
		"\x02\x02\u05E2\u05E0\x03\x02\x02\x02\u05E2\u05E1\x03\x02\x02\x02\u05E3" +
		"\xE7\x03\x02\x02\x02\u05E4\u05E5\x07\r\x02\x02\u05E5\xE9\x03\x02\x02\x02" +
		"\u05E6\u05E9\x07u\x02\x02\u05E7\u05E9\x05\xE8u\x02\u05E8\u05E6\x03\x02" +
		"\x02\x02\u05E8\u05E7\x03\x02\x02\x02\u05E9\u05F1\x03\x02\x02\x02\u05EA" +
		"\u05ED\x07J\x02\x02\u05EB\u05EE\x07u\x02\x02\u05EC\u05EE\x05\xE8u\x02" +
		"\u05ED\u05EB\x03\x02\x02\x02\u05ED\u05EC\x03\x02\x02\x02\u05EE\u05F0\x03" +
		"\x02\x02\x02\u05EF\u05EA\x03\x02\x02\x02\u05F0\u05F3\x03\x02\x02\x02\u05F1" +
		"\u05EF\x03\x02\x02\x02\u05F1\u05F2\x03\x02\x02\x02\u05F2\xEB\x03\x02\x02" +
		"\x02\u05F3\u05F1\x03\x02\x02\x02\u05F4\u05FC\x05f4\x02\u05F5\u05FC\x05" +
		"h5\x02\u05F6\u05FC\x07>\x02\x02\u05F7\u05FC\x05d3\x02\u05F8\u05FC\x07" +
		"=\x02\x02\u05F9\u05FC\x07A\x02\x02\u05FA\u05FC\x05\xEEx\x02\u05FB\u05F4" +
		"\x03\x02\x02\x02\u05FB\u05F5\x03\x02\x02\x02\u05FB\u05F6\x03\x02\x02\x02" +
		"\u05FB\u05F7\x03\x02\x02\x02\u05FB\u05F8\x03\x02\x02\x02\u05FB\u05F9\x03" +
		"\x02\x02\x02\u05FB\u05FA\x03\x02\x02\x02\u05FC\xED\x03\x02\x02\x02\u05FD" +
		"\u05FE\x07t\x02\x02\u05FE\xEF\x03\x02\x02\x02\xC2\xF3\xF6\xFB\u0101\u0109" +
		"\u0112\u0117\u011E\u0125\u0128\u012F\u0139\u013D\u0142\u0146\u014A\u0154" +
		"\u015C\u0162\u0169\u0170\u0174\u0177\u017A\u0183\u0189\u018E\u0191\u0197" +
		"\u019D\u01A1\u01A9\u01B2\u01BA\u01C0\u01C4\u01CF\u01D8\u01DD\u01E3\u01E7" +
		"\u01F3\u01FE\u0203\u020C\u0214\u021E\u0227\u022F\u0234\u023C\u0241\u024B" +
		"\u0255\u025B\u025F\u0267\u026B\u026D\u0276\u027B\u0281\u0283\u028A\u028F" +
		"\u0298\u029D\u02A0\u02A5\u02AE\u02BB\u02C6\u02C9\u02D0\u02DA\u02E2\u02E5" +
		"\u02E8\u02F5\u02FD\u0302\u030A\u030E\u0312\u0316\u0318\u031C\u0322\u032D" +
		"\u0337\u033C\u0345\u034A\u034D\u0354\u035D\u036F\u0372\u0375\u037D\u0381" +
		"\u0389\u038F\u039A\u03A3\u03A8\u03B2\u03B9\u03C6\u03CF\u03D8\u03DE\u03E9" +
		"\u03EE\u03F3\u03F8\u0402\u0406\u040A\u040C\u0410\u0415\u0426\u043B\u043F" +
		"\u0444\u0448\u0458\u0480\u0486\u0495\u0498\u049A\u04A4\u04AD\u04B1\u04B5" +
		"\u04C7\u04C9\u04CE\u04D3\u04D8\u04E0\u04E2\u04E9\u04EE\u04F2\u04FC\u0508" +
		"\u050F\u0512\u0516\u051E\u0523\u052E\u0532\u0537\u053D\u0546\u054F\u0551" +
		"\u0557\u055B\u0560\u0565\u056B\u0572\u0574\u057B\u057D\u0585\u0587\u058F" +
		"\u0591\u0597\u0599\u05A1\u05A3\u05A6\u05AE\u05B1\u05B8\u05C1\u05C7\u05CD" +
		"\u05D0\u05D5\u05E2\u05E8\u05ED\u05F1\u05FB";
	public static readonly _serializedATN: string = Utils.join(
		[
			ProcessingParser._serializedATNSegment0,
			ProcessingParser._serializedATNSegment1,
			ProcessingParser._serializedATNSegment2,
		],
		"",
	);
	public static __ATN: ATN;
	public static get _ATN(): ATN {
		if (!ProcessingParser.__ATN) {
			ProcessingParser.__ATN = new ATNDeserializer().deserialize(Utils.toCharArray(ProcessingParser._serializedATN));
		}

		return ProcessingParser.__ATN;
	}

}

export class ProcessingSketchContext extends ParserRuleContext {
	public staticProcessingSketch(): StaticProcessingSketchContext | undefined {
		return this.tryGetRuleContext(0, StaticProcessingSketchContext);
	}
	public javaProcessingSketch(): JavaProcessingSketchContext | undefined {
		return this.tryGetRuleContext(0, JavaProcessingSketchContext);
	}
	public activeProcessingSketch(): ActiveProcessingSketchContext | undefined {
		return this.tryGetRuleContext(0, ActiveProcessingSketchContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_processingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterProcessingSketch) {
			listener.enterProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitProcessingSketch) {
			listener.exitProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitProcessingSketch) {
			return visitor.visitProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CompilationUnitContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public packageDeclaration(): PackageDeclarationContext | undefined {
		return this.tryGetRuleContext(0, PackageDeclarationContext);
	}
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext[];
	public typeDeclaration(i: number): TypeDeclarationContext;
	public typeDeclaration(i?: number): TypeDeclarationContext | TypeDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeDeclarationContext);
		} else {
			return this.getRuleContext(i, TypeDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_compilationUnit; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCompilationUnit) {
			listener.enterCompilationUnit(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCompilationUnit) {
			listener.exitCompilationUnit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCompilationUnit) {
			return visitor.visitCompilationUnit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PackageDeclarationContext extends ParserRuleContext {
	public PACKAGE(): TerminalNode { return this.getToken(ProcessingParser.PACKAGE, 0); }
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_packageDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterPackageDeclaration) {
			listener.enterPackageDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitPackageDeclaration) {
			listener.exitPackageDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitPackageDeclaration) {
			return visitor.visitPackageDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ImportDeclarationContext extends ParserRuleContext {
	public IMPORT(): TerminalNode { return this.getToken(ProcessingParser.IMPORT, 0); }
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MUL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_importDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterImportDeclaration) {
			listener.enterImportDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitImportDeclaration) {
			listener.exitImportDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitImportDeclaration) {
			return visitor.visitImportDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeDeclarationContext extends ParserRuleContext {
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext[];
	public classOrInterfaceModifier(i: number): ClassOrInterfaceModifierContext;
	public classOrInterfaceModifier(i?: number): ClassOrInterfaceModifierContext | ClassOrInterfaceModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassOrInterfaceModifierContext);
		} else {
			return this.getRuleContext(i, ClassOrInterfaceModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeDeclaration) {
			listener.enterTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeDeclaration) {
			listener.exitTypeDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeDeclaration) {
			return visitor.visitTypeDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ModifierContext extends ParserRuleContext {
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext | undefined {
		return this.tryGetRuleContext(0, ClassOrInterfaceModifierContext);
	}
	public NATIVE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NATIVE, 0); }
	public SYNCHRONIZED(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SYNCHRONIZED, 0); }
	public TRANSIENT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.TRANSIENT, 0); }
	public VOLATILE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.VOLATILE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_modifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterModifier) {
			listener.enterModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitModifier) {
			listener.exitModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitModifier) {
			return visitor.visitModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassOrInterfaceModifierContext extends ParserRuleContext {
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public PUBLIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PUBLIC, 0); }
	public PROTECTED(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PROTECTED, 0); }
	public PRIVATE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PRIVATE, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ABSTRACT, 0); }
	public FINAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FINAL, 0); }
	public STRICTFP(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STRICTFP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classOrInterfaceModifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassOrInterfaceModifier) {
			listener.enterClassOrInterfaceModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassOrInterfaceModifier) {
			listener.exitClassOrInterfaceModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassOrInterfaceModifier) {
			return visitor.visitClassOrInterfaceModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableModifierContext extends ParserRuleContext {
	public FINAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FINAL, 0); }
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableModifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableModifier) {
			listener.enterVariableModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableModifier) {
			listener.exitVariableModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableModifier) {
			return visitor.visitVariableModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassDeclarationContext extends ParserRuleContext {
	public CLASS(): TerminalNode { return this.getToken(ProcessingParser.CLASS, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public classBody(): ClassBodyContext {
		return this.getRuleContext(0, ClassBodyContext);
	}
	public typeParameters(): TypeParametersContext | undefined {
		return this.tryGetRuleContext(0, TypeParametersContext);
	}
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public IMPLEMENTS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IMPLEMENTS, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassDeclaration) {
			listener.enterClassDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassDeclaration) {
			listener.exitClassDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassDeclaration) {
			return visitor.visitClassDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParametersContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(ProcessingParser.LT, 0); }
	public typeParameter(): TypeParameterContext[];
	public typeParameter(i: number): TypeParameterContext;
	public typeParameter(i?: number): TypeParameterContext | TypeParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeParameterContext);
		} else {
			return this.getRuleContext(i, TypeParameterContext);
		}
	}
	public GT(): TerminalNode { return this.getToken(ProcessingParser.GT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeParameters; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeParameters) {
			listener.enterTypeParameters(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeParameters) {
			listener.exitTypeParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeParameters) {
			return visitor.visitTypeParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeParameterContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public typeBound(): TypeBoundContext | undefined {
		return this.tryGetRuleContext(0, TypeBoundContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeParameter; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeParameter) {
			listener.enterTypeParameter(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeParameter) {
			listener.exitTypeParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeParameter) {
			return visitor.visitTypeParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeBoundContext extends ParserRuleContext {
	public typeType(): TypeTypeContext[];
	public typeType(i: number): TypeTypeContext;
	public typeType(i?: number): TypeTypeContext | TypeTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeTypeContext);
		} else {
			return this.getRuleContext(i, TypeTypeContext);
		}
	}
	public BITAND(): TerminalNode[];
	public BITAND(i: number): TerminalNode;
	public BITAND(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.BITAND);
		} else {
			return this.getToken(ProcessingParser.BITAND, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeBound; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeBound) {
			listener.enterTypeBound(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeBound) {
			listener.exitTypeBound(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeBound) {
			return visitor.visitTypeBound(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumDeclarationContext extends ParserRuleContext {
	public ENUM(): TerminalNode { return this.getToken(ProcessingParser.ENUM, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public IMPLEMENTS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IMPLEMENTS, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	public enumConstants(): EnumConstantsContext | undefined {
		return this.tryGetRuleContext(0, EnumConstantsContext);
	}
	public COMMA(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COMMA, 0); }
	public enumBodyDeclarations(): EnumBodyDeclarationsContext | undefined {
		return this.tryGetRuleContext(0, EnumBodyDeclarationsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumDeclaration) {
			listener.enterEnumDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumDeclaration) {
			listener.exitEnumDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumDeclaration) {
			return visitor.visitEnumDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumConstantsContext extends ParserRuleContext {
	public enumConstant(): EnumConstantContext[];
	public enumConstant(i: number): EnumConstantContext;
	public enumConstant(i?: number): EnumConstantContext | EnumConstantContext[] {
		if (i === undefined) {
			return this.getRuleContexts(EnumConstantContext);
		} else {
			return this.getRuleContext(i, EnumConstantContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumConstants; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumConstants) {
			listener.enterEnumConstants(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumConstants) {
			listener.exitEnumConstants(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumConstants) {
			return visitor.visitEnumConstants(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumConstantContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	public classBody(): ClassBodyContext | undefined {
		return this.tryGetRuleContext(0, ClassBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumConstant; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumConstant) {
			listener.enterEnumConstant(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumConstant) {
			listener.exitEnumConstant(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumConstant) {
			return visitor.visitEnumConstant(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnumBodyDeclarationsContext extends ParserRuleContext {
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enumBodyDeclarations; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnumBodyDeclarations) {
			listener.enterEnumBodyDeclarations(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnumBodyDeclarations) {
			listener.exitEnumBodyDeclarations(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnumBodyDeclarations) {
			return visitor.visitEnumBodyDeclarations(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceDeclarationContext extends ParserRuleContext {
	public INTERFACE(): TerminalNode { return this.getToken(ProcessingParser.INTERFACE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public interfaceBody(): InterfaceBodyContext {
		return this.getRuleContext(0, InterfaceBodyContext);
	}
	public typeParameters(): TypeParametersContext | undefined {
		return this.tryGetRuleContext(0, TypeParametersContext);
	}
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public typeList(): TypeListContext | undefined {
		return this.tryGetRuleContext(0, TypeListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceDeclaration) {
			listener.enterInterfaceDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceDeclaration) {
			listener.exitInterfaceDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceDeclaration) {
			return visitor.visitInterfaceDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassBodyContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassBody) {
			listener.enterClassBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassBody) {
			listener.exitClassBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassBody) {
			return visitor.visitClassBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceBodyContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public interfaceBodyDeclaration(): InterfaceBodyDeclarationContext[];
	public interfaceBodyDeclaration(i: number): InterfaceBodyDeclarationContext;
	public interfaceBodyDeclaration(i?: number): InterfaceBodyDeclarationContext | InterfaceBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InterfaceBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, InterfaceBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceBody) {
			listener.enterInterfaceBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceBody) {
			listener.exitInterfaceBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceBody) {
			return visitor.visitInterfaceBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassBodyDeclarationContext extends ParserRuleContext {
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public importDeclaration(): ImportDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ImportDeclarationContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public memberDeclaration(): MemberDeclarationContext | undefined {
		return this.tryGetRuleContext(0, MemberDeclarationContext);
	}
	public modifier(): ModifierContext[];
	public modifier(i: number): ModifierContext;
	public modifier(i?: number): ModifierContext | ModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModifierContext);
		} else {
			return this.getRuleContext(i, ModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classBodyDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassBodyDeclaration) {
			listener.enterClassBodyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassBodyDeclaration) {
			listener.exitClassBodyDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassBodyDeclaration) {
			return visitor.visitClassBodyDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MemberDeclarationContext extends ParserRuleContext {
	public methodDeclaration(): MethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, MethodDeclarationContext);
	}
	public genericMethodDeclaration(): GenericMethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GenericMethodDeclarationContext);
	}
	public fieldDeclaration(): FieldDeclarationContext | undefined {
		return this.tryGetRuleContext(0, FieldDeclarationContext);
	}
	public constructorDeclaration(): ConstructorDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ConstructorDeclarationContext);
	}
	public genericConstructorDeclaration(): GenericConstructorDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GenericConstructorDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_memberDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMemberDeclaration) {
			listener.enterMemberDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMemberDeclaration) {
			listener.exitMemberDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMemberDeclaration) {
			return visitor.visitMemberDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodDeclarationContext extends ParserRuleContext {
	public typeTypeOrVoid(): TypeTypeOrVoidContext {
		return this.getRuleContext(0, TypeTypeOrVoidContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public formalParameters(): FormalParametersContext {
		return this.getRuleContext(0, FormalParametersContext);
	}
	public methodBody(): MethodBodyContext {
		return this.getRuleContext(0, MethodBodyContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	public THROWS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROWS, 0); }
	public qualifiedNameList(): QualifiedNameListContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_methodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMethodDeclaration) {
			listener.enterMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMethodDeclaration) {
			listener.exitMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMethodDeclaration) {
			return visitor.visitMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodBodyContext extends ParserRuleContext {
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_methodBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMethodBody) {
			listener.enterMethodBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMethodBody) {
			listener.exitMethodBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMethodBody) {
			return visitor.visitMethodBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeTypeOrVoidContext extends ParserRuleContext {
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public VOID(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.VOID, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeTypeOrVoid; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeTypeOrVoid) {
			listener.enterTypeTypeOrVoid(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeTypeOrVoid) {
			listener.exitTypeTypeOrVoid(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeTypeOrVoid) {
			return visitor.visitTypeTypeOrVoid(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericMethodDeclarationContext extends ParserRuleContext {
	public typeParameters(): TypeParametersContext {
		return this.getRuleContext(0, TypeParametersContext);
	}
	public methodDeclaration(): MethodDeclarationContext {
		return this.getRuleContext(0, MethodDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_genericMethodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterGenericMethodDeclaration) {
			listener.enterGenericMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitGenericMethodDeclaration) {
			listener.exitGenericMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitGenericMethodDeclaration) {
			return visitor.visitGenericMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericConstructorDeclarationContext extends ParserRuleContext {
	public typeParameters(): TypeParametersContext {
		return this.getRuleContext(0, TypeParametersContext);
	}
	public constructorDeclaration(): ConstructorDeclarationContext {
		return this.getRuleContext(0, ConstructorDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_genericConstructorDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterGenericConstructorDeclaration) {
			listener.enterGenericConstructorDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitGenericConstructorDeclaration) {
			listener.exitGenericConstructorDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitGenericConstructorDeclaration) {
			return visitor.visitGenericConstructorDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstructorDeclarationContext extends ParserRuleContext {
	public _constructorBody!: BlockContext;
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public formalParameters(): FormalParametersContext {
		return this.getRuleContext(0, FormalParametersContext);
	}
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public THROWS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROWS, 0); }
	public qualifiedNameList(): QualifiedNameListContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_constructorDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterConstructorDeclaration) {
			listener.enterConstructorDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitConstructorDeclaration) {
			listener.exitConstructorDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitConstructorDeclaration) {
			return visitor.visitConstructorDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FieldDeclarationContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclarators(): VariableDeclaratorsContext {
		return this.getRuleContext(0, VariableDeclaratorsContext);
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_fieldDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFieldDeclaration) {
			listener.enterFieldDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFieldDeclaration) {
			listener.exitFieldDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFieldDeclaration) {
			return visitor.visitFieldDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceBodyDeclarationContext extends ParserRuleContext {
	public interfaceMemberDeclaration(): InterfaceMemberDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceMemberDeclarationContext);
	}
	public modifier(): ModifierContext[];
	public modifier(i: number): ModifierContext;
	public modifier(i?: number): ModifierContext | ModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModifierContext);
		} else {
			return this.getRuleContext(i, ModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceBodyDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceBodyDeclaration) {
			listener.enterInterfaceBodyDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceBodyDeclaration) {
			listener.exitInterfaceBodyDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceBodyDeclaration) {
			return visitor.visitInterfaceBodyDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceMemberDeclarationContext extends ParserRuleContext {
	public constDeclaration(): ConstDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ConstDeclarationContext);
	}
	public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceMethodDeclarationContext);
	}
	public genericInterfaceMethodDeclaration(): GenericInterfaceMethodDeclarationContext | undefined {
		return this.tryGetRuleContext(0, GenericInterfaceMethodDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceMemberDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceMemberDeclaration) {
			listener.enterInterfaceMemberDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceMemberDeclaration) {
			listener.exitInterfaceMemberDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceMemberDeclaration) {
			return visitor.visitInterfaceMemberDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstDeclarationContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public constantDeclarator(): ConstantDeclaratorContext[];
	public constantDeclarator(i: number): ConstantDeclaratorContext;
	public constantDeclarator(i?: number): ConstantDeclaratorContext | ConstantDeclaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ConstantDeclaratorContext);
		} else {
			return this.getRuleContext(i, ConstantDeclaratorContext);
		}
	}
	public SEMI(): TerminalNode { return this.getToken(ProcessingParser.SEMI, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_constDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterConstDeclaration) {
			listener.enterConstDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitConstDeclaration) {
			listener.exitConstDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitConstDeclaration) {
			return visitor.visitConstDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ConstantDeclaratorContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(ProcessingParser.ASSIGN, 0); }
	public variableInitializer(): VariableInitializerContext {
		return this.getRuleContext(0, VariableInitializerContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_constantDeclarator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterConstantDeclarator) {
			listener.enterConstantDeclarator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitConstantDeclarator) {
			listener.exitConstantDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitConstantDeclarator) {
			return visitor.visitConstantDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceMethodDeclarationContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public formalParameters(): FormalParametersContext {
		return this.getRuleContext(0, FormalParametersContext);
	}
	public methodBody(): MethodBodyContext {
		return this.getRuleContext(0, MethodBodyContext);
	}
	public typeTypeOrVoid(): TypeTypeOrVoidContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeOrVoidContext);
	}
	public typeParameters(): TypeParametersContext | undefined {
		return this.tryGetRuleContext(0, TypeParametersContext);
	}
	public interfaceMethodModifier(): InterfaceMethodModifierContext[];
	public interfaceMethodModifier(i: number): InterfaceMethodModifierContext;
	public interfaceMethodModifier(i?: number): InterfaceMethodModifierContext | InterfaceMethodModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(InterfaceMethodModifierContext);
		} else {
			return this.getRuleContext(i, InterfaceMethodModifierContext);
		}
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	public THROWS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROWS, 0); }
	public qualifiedNameList(): QualifiedNameListContext | undefined {
		return this.tryGetRuleContext(0, QualifiedNameListContext);
	}
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceMethodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceMethodDeclaration) {
			listener.enterInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceMethodDeclaration) {
			listener.exitInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceMethodDeclaration) {
			return visitor.visitInterfaceMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InterfaceMethodModifierContext extends ParserRuleContext {
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public PUBLIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.PUBLIC, 0); }
	public ABSTRACT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ABSTRACT, 0); }
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DEFAULT, 0); }
	public STATIC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STATIC, 0); }
	public STRICTFP(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.STRICTFP, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_interfaceMethodModifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInterfaceMethodModifier) {
			listener.enterInterfaceMethodModifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInterfaceMethodModifier) {
			listener.exitInterfaceMethodModifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInterfaceMethodModifier) {
			return visitor.visitInterfaceMethodModifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class GenericInterfaceMethodDeclarationContext extends ParserRuleContext {
	public typeParameters(): TypeParametersContext {
		return this.getRuleContext(0, TypeParametersContext);
	}
	public interfaceMethodDeclaration(): InterfaceMethodDeclarationContext {
		return this.getRuleContext(0, InterfaceMethodDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_genericInterfaceMethodDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterGenericInterfaceMethodDeclaration) {
			listener.enterGenericInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitGenericInterfaceMethodDeclaration) {
			listener.exitGenericInterfaceMethodDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitGenericInterfaceMethodDeclaration) {
			return visitor.visitGenericInterfaceMethodDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclaratorsContext extends ParserRuleContext {
	public variableDeclarator(): VariableDeclaratorContext[];
	public variableDeclarator(i: number): VariableDeclaratorContext;
	public variableDeclarator(i?: number): VariableDeclaratorContext | VariableDeclaratorContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableDeclaratorContext);
		} else {
			return this.getRuleContext(i, VariableDeclaratorContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableDeclarators; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableDeclarators) {
			listener.enterVariableDeclarators(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableDeclarators) {
			listener.exitVariableDeclarators(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclarators) {
			return visitor.visitVariableDeclarators(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclaratorContext extends ParserRuleContext {
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ASSIGN, 0); }
	public variableInitializer(): VariableInitializerContext | undefined {
		return this.tryGetRuleContext(0, VariableInitializerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableDeclarator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableDeclarator) {
			listener.enterVariableDeclarator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableDeclarator) {
			listener.exitVariableDeclarator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclarator) {
			return visitor.visitVariableDeclarator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableInitializerContext extends ParserRuleContext {
	public arrayInitializer(): ArrayInitializerContext | undefined {
		return this.tryGetRuleContext(0, ArrayInitializerContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableInitializer; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableInitializer) {
			listener.enterVariableInitializer(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableInitializer) {
			listener.exitVariableInitializer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableInitializer) {
			return visitor.visitVariableInitializer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayInitializerContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public variableInitializer(): VariableInitializerContext[];
	public variableInitializer(i: number): VariableInitializerContext;
	public variableInitializer(i?: number): VariableInitializerContext | VariableInitializerContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableInitializerContext);
		} else {
			return this.getRuleContext(i, VariableInitializerContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_arrayInitializer; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterArrayInitializer) {
			listener.enterArrayInitializer(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitArrayInitializer) {
			listener.exitArrayInitializer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitArrayInitializer) {
			return visitor.visitArrayInitializer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassOrInterfaceTypeContext extends ParserRuleContext {
	public classOrInterfaceIdentifier(): ClassOrInterfaceIdentifierContext[];
	public classOrInterfaceIdentifier(i: number): ClassOrInterfaceIdentifierContext;
	public classOrInterfaceIdentifier(i?: number): ClassOrInterfaceIdentifierContext | ClassOrInterfaceIdentifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassOrInterfaceIdentifierContext);
		} else {
			return this.getRuleContext(i, ClassOrInterfaceIdentifierContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.DOT);
		} else {
			return this.getToken(ProcessingParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classOrInterfaceType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassOrInterfaceType) {
			listener.enterClassOrInterfaceType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassOrInterfaceType) {
			listener.exitClassOrInterfaceType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassOrInterfaceType) {
			return visitor.visitClassOrInterfaceType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassOrInterfaceIdentifierContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classOrInterfaceIdentifier; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassOrInterfaceIdentifier) {
			listener.enterClassOrInterfaceIdentifier(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassOrInterfaceIdentifier) {
			listener.exitClassOrInterfaceIdentifier(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassOrInterfaceIdentifier) {
			return visitor.visitClassOrInterfaceIdentifier(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentContext extends ParserRuleContext {
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public QUESTION(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.QUESTION, 0); }
	public EXTENDS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EXTENDS, 0); }
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeArgument; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeArgument) {
			listener.enterTypeArgument(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeArgument) {
			listener.exitTypeArgument(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeArgument) {
			return visitor.visitTypeArgument(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedNameListContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext[];
	public qualifiedName(i: number): QualifiedNameContext;
	public qualifiedName(i?: number): QualifiedNameContext | QualifiedNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualifiedNameContext);
		} else {
			return this.getRuleContext(i, QualifiedNameContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_qualifiedNameList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterQualifiedNameList) {
			listener.enterQualifiedNameList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitQualifiedNameList) {
			listener.exitQualifiedNameList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitQualifiedNameList) {
			return visitor.visitQualifiedNameList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParametersContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_formalParameters; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFormalParameters) {
			listener.enterFormalParameters(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFormalParameters) {
			listener.exitFormalParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFormalParameters) {
			return visitor.visitFormalParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParameterListContext extends ParserRuleContext {
	public formalParameter(): FormalParameterContext[];
	public formalParameter(i: number): FormalParameterContext;
	public formalParameter(i?: number): FormalParameterContext | FormalParameterContext[] {
		if (i === undefined) {
			return this.getRuleContexts(FormalParameterContext);
		} else {
			return this.getRuleContext(i, FormalParameterContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	public lastFormalParameter(): LastFormalParameterContext | undefined {
		return this.tryGetRuleContext(0, LastFormalParameterContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_formalParameterList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFormalParameterList) {
			listener.enterFormalParameterList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFormalParameterList) {
			listener.exitFormalParameterList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFormalParameterList) {
			return visitor.visitFormalParameterList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FormalParameterContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_formalParameter; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFormalParameter) {
			listener.enterFormalParameter(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFormalParameter) {
			listener.exitFormalParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFormalParameter) {
			return visitor.visitFormalParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LastFormalParameterContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public ELLIPSIS(): TerminalNode { return this.getToken(ProcessingParser.ELLIPSIS, 0); }
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lastFormalParameter; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLastFormalParameter) {
			listener.enterLastFormalParameter(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLastFormalParameter) {
			listener.exitLastFormalParameter(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLastFormalParameter) {
			return visitor.visitLastFormalParameter(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BaseStringLiteralContext extends ParserRuleContext {
	public STRING_LITERAL(): TerminalNode { return this.getToken(ProcessingParser.STRING_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_baseStringLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterBaseStringLiteral) {
			listener.enterBaseStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitBaseStringLiteral) {
			listener.exitBaseStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitBaseStringLiteral) {
			return visitor.visitBaseStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MultilineStringLiteralContext extends ParserRuleContext {
	public MULTI_STRING_LIT(): TerminalNode { return this.getToken(ProcessingParser.MULTI_STRING_LIT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_multilineStringLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMultilineStringLiteral) {
			listener.enterMultilineStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMultilineStringLiteral) {
			listener.exitMultilineStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMultilineStringLiteral) {
			return visitor.visitMultilineStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StringLiteralContext extends ParserRuleContext {
	public baseStringLiteral(): BaseStringLiteralContext | undefined {
		return this.tryGetRuleContext(0, BaseStringLiteralContext);
	}
	public multilineStringLiteral(): MultilineStringLiteralContext | undefined {
		return this.tryGetRuleContext(0, MultilineStringLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_stringLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterStringLiteral) {
			listener.enterStringLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitStringLiteral) {
			listener.exitStringLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitStringLiteral) {
			return visitor.visitStringLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class IntegerLiteralContext extends ParserRuleContext {
	public DECIMAL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DECIMAL_LITERAL, 0); }
	public HEX_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.HEX_LITERAL, 0); }
	public OCT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.OCT_LITERAL, 0); }
	public BINARY_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BINARY_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_integerLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterIntegerLiteral) {
			listener.enterIntegerLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitIntegerLiteral) {
			listener.exitIntegerLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitIntegerLiteral) {
			return visitor.visitIntegerLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FloatLiteralContext extends ParserRuleContext {
	public FLOAT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FLOAT_LITERAL, 0); }
	public HEX_FLOAT_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.HEX_FLOAT_LITERAL, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_floatLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFloatLiteral) {
			listener.enterFloatLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFloatLiteral) {
			listener.exitFloatLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFloatLiteral) {
			return visitor.visitFloatLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationContext extends ParserRuleContext {
	public AT(): TerminalNode { return this.getToken(ProcessingParser.AT, 0); }
	public qualifiedName(): QualifiedNameContext {
		return this.getRuleContext(0, QualifiedNameContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public elementValuePairs(): ElementValuePairsContext | undefined {
		return this.tryGetRuleContext(0, ElementValuePairsContext);
	}
	public elementValue(): ElementValueContext | undefined {
		return this.tryGetRuleContext(0, ElementValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotation; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotation) {
			listener.enterAnnotation(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotation) {
			listener.exitAnnotation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotation) {
			return visitor.visitAnnotation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValuePairsContext extends ParserRuleContext {
	public elementValuePair(): ElementValuePairContext[];
	public elementValuePair(i: number): ElementValuePairContext;
	public elementValuePair(i?: number): ElementValuePairContext | ElementValuePairContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElementValuePairContext);
		} else {
			return this.getRuleContext(i, ElementValuePairContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValuePairs; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValuePairs) {
			listener.enterElementValuePairs(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValuePairs) {
			listener.exitElementValuePairs(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValuePairs) {
			return visitor.visitElementValuePairs(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValuePairContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public ASSIGN(): TerminalNode { return this.getToken(ProcessingParser.ASSIGN, 0); }
	public elementValue(): ElementValueContext {
		return this.getRuleContext(0, ElementValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValuePair; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValuePair) {
			listener.enterElementValuePair(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValuePair) {
			listener.exitElementValuePair(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValuePair) {
			return visitor.visitElementValuePair(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValueContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public elementValueArrayInitializer(): ElementValueArrayInitializerContext | undefined {
		return this.tryGetRuleContext(0, ElementValueArrayInitializerContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValue; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValue) {
			listener.enterElementValue(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValue) {
			listener.exitElementValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValue) {
			return visitor.visitElementValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ElementValueArrayInitializerContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public elementValue(): ElementValueContext[];
	public elementValue(i: number): ElementValueContext;
	public elementValue(i?: number): ElementValueContext | ElementValueContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ElementValueContext);
		} else {
			return this.getRuleContext(i, ElementValueContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_elementValueArrayInitializer; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterElementValueArrayInitializer) {
			listener.enterElementValueArrayInitializer(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitElementValueArrayInitializer) {
			listener.exitElementValueArrayInitializer(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitElementValueArrayInitializer) {
			return visitor.visitElementValueArrayInitializer(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeDeclarationContext extends ParserRuleContext {
	public AT(): TerminalNode { return this.getToken(ProcessingParser.AT, 0); }
	public INTERFACE(): TerminalNode { return this.getToken(ProcessingParser.INTERFACE, 0); }
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public annotationTypeBody(): AnnotationTypeBodyContext {
		return this.getRuleContext(0, AnnotationTypeBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeDeclaration) {
			listener.enterAnnotationTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeDeclaration) {
			listener.exitAnnotationTypeDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeDeclaration) {
			return visitor.visitAnnotationTypeDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeBodyContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public annotationTypeElementDeclaration(): AnnotationTypeElementDeclarationContext[];
	public annotationTypeElementDeclaration(i: number): AnnotationTypeElementDeclarationContext;
	public annotationTypeElementDeclaration(i?: number): AnnotationTypeElementDeclarationContext | AnnotationTypeElementDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationTypeElementDeclarationContext);
		} else {
			return this.getRuleContext(i, AnnotationTypeElementDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeBody) {
			listener.enterAnnotationTypeBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeBody) {
			listener.exitAnnotationTypeBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeBody) {
			return visitor.visitAnnotationTypeBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeElementDeclarationContext extends ParserRuleContext {
	public annotationTypeElementRest(): AnnotationTypeElementRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeElementRestContext);
	}
	public modifier(): ModifierContext[];
	public modifier(i: number): ModifierContext;
	public modifier(i?: number): ModifierContext | ModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ModifierContext);
		} else {
			return this.getRuleContext(i, ModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeElementDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeElementDeclaration) {
			listener.enterAnnotationTypeElementDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeElementDeclaration) {
			listener.exitAnnotationTypeElementDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeElementDeclaration) {
			return visitor.visitAnnotationTypeElementDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationTypeElementRestContext extends ParserRuleContext {
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public annotationMethodOrConstantRest(): AnnotationMethodOrConstantRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationMethodOrConstantRestContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public enumDeclaration(): EnumDeclarationContext | undefined {
		return this.tryGetRuleContext(0, EnumDeclarationContext);
	}
	public annotationTypeDeclaration(): AnnotationTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationTypeDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationTypeElementRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationTypeElementRest) {
			listener.enterAnnotationTypeElementRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationTypeElementRest) {
			listener.exitAnnotationTypeElementRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationTypeElementRest) {
			return visitor.visitAnnotationTypeElementRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationMethodOrConstantRestContext extends ParserRuleContext {
	public annotationMethodRest(): AnnotationMethodRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationMethodRestContext);
	}
	public annotationConstantRest(): AnnotationConstantRestContext | undefined {
		return this.tryGetRuleContext(0, AnnotationConstantRestContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationMethodOrConstantRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationMethodOrConstantRest) {
			listener.enterAnnotationMethodOrConstantRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationMethodOrConstantRest) {
			listener.exitAnnotationMethodOrConstantRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationMethodOrConstantRest) {
			return visitor.visitAnnotationMethodOrConstantRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationMethodRestContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public defaultValue(): DefaultValueContext | undefined {
		return this.tryGetRuleContext(0, DefaultValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationMethodRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationMethodRest) {
			listener.enterAnnotationMethodRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationMethodRest) {
			listener.exitAnnotationMethodRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationMethodRest) {
			return visitor.visitAnnotationMethodRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class AnnotationConstantRestContext extends ParserRuleContext {
	public variableDeclarators(): VariableDeclaratorsContext {
		return this.getRuleContext(0, VariableDeclaratorsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_annotationConstantRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterAnnotationConstantRest) {
			listener.enterAnnotationConstantRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitAnnotationConstantRest) {
			listener.exitAnnotationConstantRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitAnnotationConstantRest) {
			return visitor.visitAnnotationConstantRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class DefaultValueContext extends ParserRuleContext {
	public DEFAULT(): TerminalNode { return this.getToken(ProcessingParser.DEFAULT, 0); }
	public elementValue(): ElementValueContext {
		return this.getRuleContext(0, ElementValueContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_defaultValue; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterDefaultValue) {
			listener.enterDefaultValue(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitDefaultValue) {
			listener.exitDefaultValue(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitDefaultValue) {
			return visitor.visitDefaultValue(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockContext extends ParserRuleContext {
	public LBRACE(): TerminalNode { return this.getToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode { return this.getToken(ProcessingParser.RBRACE, 0); }
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_block; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterBlock) {
			listener.enterBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitBlock) {
			listener.exitBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitBlock) {
			return visitor.visitBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class BlockStatementContext extends ParserRuleContext {
	public localVariableDeclaration(): LocalVariableDeclarationContext | undefined {
		return this.tryGetRuleContext(0, LocalVariableDeclarationContext);
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public statement(): StatementContext | undefined {
		return this.tryGetRuleContext(0, StatementContext);
	}
	public localTypeDeclaration(): LocalTypeDeclarationContext | undefined {
		return this.tryGetRuleContext(0, LocalTypeDeclarationContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_blockStatement; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterBlockStatement) {
			listener.enterBlockStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitBlockStatement) {
			listener.exitBlockStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitBlockStatement) {
			return visitor.visitBlockStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalVariableDeclarationContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclarators(): VariableDeclaratorsContext {
		return this.getRuleContext(0, VariableDeclaratorsContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_localVariableDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLocalVariableDeclaration) {
			listener.enterLocalVariableDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLocalVariableDeclaration) {
			listener.exitLocalVariableDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLocalVariableDeclaration) {
			return visitor.visitLocalVariableDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LocalTypeDeclarationContext extends ParserRuleContext {
	public classDeclaration(): ClassDeclarationContext | undefined {
		return this.tryGetRuleContext(0, ClassDeclarationContext);
	}
	public interfaceDeclaration(): InterfaceDeclarationContext | undefined {
		return this.tryGetRuleContext(0, InterfaceDeclarationContext);
	}
	public classOrInterfaceModifier(): ClassOrInterfaceModifierContext[];
	public classOrInterfaceModifier(i: number): ClassOrInterfaceModifierContext;
	public classOrInterfaceModifier(i?: number): ClassOrInterfaceModifierContext | ClassOrInterfaceModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassOrInterfaceModifierContext);
		} else {
			return this.getRuleContext(i, ClassOrInterfaceModifierContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_localTypeDeclaration; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLocalTypeDeclaration) {
			listener.enterLocalTypeDeclaration(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLocalTypeDeclaration) {
			listener.exitLocalTypeDeclaration(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLocalTypeDeclaration) {
			return visitor.visitLocalTypeDeclaration(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StatementContext extends ParserRuleContext {
	public _blockLabel!: BlockContext;
	public _statementExpression!: ExpressionContext;
	public _identifierLabel!: Token;
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	public ASSERT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ASSERT, 0); }
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLON, 0); }
	public IF(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IF, 0); }
	public parExpression(): ParExpressionContext | undefined {
		return this.tryGetRuleContext(0, ParExpressionContext);
	}
	public statement(): StatementContext[];
	public statement(i: number): StatementContext;
	public statement(i?: number): StatementContext | StatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(StatementContext);
		} else {
			return this.getRuleContext(i, StatementContext);
		}
	}
	public ELSE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ELSE, 0); }
	public forLoop(): ForLoopContext | undefined {
		return this.tryGetRuleContext(0, ForLoopContext);
	}
	public WHILE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.WHILE, 0); }
	public DO(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DO, 0); }
	public TRY(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.TRY, 0); }
	public finallyBlock(): FinallyBlockContext | undefined {
		return this.tryGetRuleContext(0, FinallyBlockContext);
	}
	public catchClause(): CatchClauseContext[];
	public catchClause(i: number): CatchClauseContext;
	public catchClause(i?: number): CatchClauseContext | CatchClauseContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CatchClauseContext);
		} else {
			return this.getRuleContext(i, CatchClauseContext);
		}
	}
	public resourceSpecification(): ResourceSpecificationContext | undefined {
		return this.tryGetRuleContext(0, ResourceSpecificationContext);
	}
	public SWITCH(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SWITCH, 0); }
	public LBRACE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LBRACE, 0); }
	public RBRACE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RBRACE, 0); }
	public switchBlockStatementGroup(): SwitchBlockStatementGroupContext[];
	public switchBlockStatementGroup(i: number): SwitchBlockStatementGroupContext;
	public switchBlockStatementGroup(i?: number): SwitchBlockStatementGroupContext | SwitchBlockStatementGroupContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SwitchBlockStatementGroupContext);
		} else {
			return this.getRuleContext(i, SwitchBlockStatementGroupContext);
		}
	}
	public switchLabel(): SwitchLabelContext[];
	public switchLabel(i: number): SwitchLabelContext;
	public switchLabel(i?: number): SwitchLabelContext | SwitchLabelContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SwitchLabelContext);
		} else {
			return this.getRuleContext(i, SwitchLabelContext);
		}
	}
	public SYNCHRONIZED(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SYNCHRONIZED, 0); }
	public RETURN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RETURN, 0); }
	public THROW(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THROW, 0); }
	public BREAK(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BREAK, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public CONTINUE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CONTINUE, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_statement; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterStatement) {
			listener.enterStatement(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitStatement) {
			listener.exitStatement(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitStatement) {
			return visitor.visitStatement(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CatchClauseContext extends ParserRuleContext {
	public CATCH(): TerminalNode { return this.getToken(ProcessingParser.CATCH, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public catchType(): CatchTypeContext {
		return this.getRuleContext(0, CatchTypeContext);
	}
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_catchClause; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCatchClause) {
			listener.enterCatchClause(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCatchClause) {
			listener.exitCatchClause(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCatchClause) {
			return visitor.visitCatchClause(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CatchTypeContext extends ParserRuleContext {
	public qualifiedName(): QualifiedNameContext[];
	public qualifiedName(i: number): QualifiedNameContext;
	public qualifiedName(i?: number): QualifiedNameContext | QualifiedNameContext[] {
		if (i === undefined) {
			return this.getRuleContexts(QualifiedNameContext);
		} else {
			return this.getRuleContext(i, QualifiedNameContext);
		}
	}
	public BITOR(): TerminalNode[];
	public BITOR(i: number): TerminalNode;
	public BITOR(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.BITOR);
		} else {
			return this.getToken(ProcessingParser.BITOR, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_catchType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCatchType) {
			listener.enterCatchType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCatchType) {
			listener.exitCatchType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCatchType) {
			return visitor.visitCatchType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FinallyBlockContext extends ParserRuleContext {
	public FINALLY(): TerminalNode { return this.getToken(ProcessingParser.FINALLY, 0); }
	public block(): BlockContext {
		return this.getRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_finallyBlock; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFinallyBlock) {
			listener.enterFinallyBlock(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFinallyBlock) {
			listener.exitFinallyBlock(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFinallyBlock) {
			return visitor.visitFinallyBlock(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceSpecificationContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public resources(): ResourcesContext {
		return this.getRuleContext(0, ResourcesContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public SEMI(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SEMI, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_resourceSpecification; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterResourceSpecification) {
			listener.enterResourceSpecification(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitResourceSpecification) {
			listener.exitResourceSpecification(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitResourceSpecification) {
			return visitor.visitResourceSpecification(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourcesContext extends ParserRuleContext {
	public resource(): ResourceContext[];
	public resource(i: number): ResourceContext;
	public resource(i?: number): ResourceContext | ResourceContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ResourceContext);
		} else {
			return this.getRuleContext(i, ResourceContext);
		}
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.SEMI);
		} else {
			return this.getToken(ProcessingParser.SEMI, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_resources; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterResources) {
			listener.enterResources(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitResources) {
			listener.exitResources(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitResources) {
			return visitor.visitResources(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ResourceContext extends ParserRuleContext {
	public classOrInterfaceType(): ClassOrInterfaceTypeContext {
		return this.getRuleContext(0, ClassOrInterfaceTypeContext);
	}
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public ASSIGN(): TerminalNode { return this.getToken(ProcessingParser.ASSIGN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_resource; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterResource) {
			listener.enterResource(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitResource) {
			listener.exitResource(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitResource) {
			return visitor.visitResource(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchBlockStatementGroupContext extends ParserRuleContext {
	public switchLabel(): SwitchLabelContext[];
	public switchLabel(i: number): SwitchLabelContext;
	public switchLabel(i?: number): SwitchLabelContext | SwitchLabelContext[] {
		if (i === undefined) {
			return this.getRuleContexts(SwitchLabelContext);
		} else {
			return this.getRuleContext(i, SwitchLabelContext);
		}
	}
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_switchBlockStatementGroup; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterSwitchBlockStatementGroup) {
			listener.enterSwitchBlockStatementGroup(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitSwitchBlockStatementGroup) {
			listener.exitSwitchBlockStatementGroup(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitSwitchBlockStatementGroup) {
			return visitor.visitSwitchBlockStatementGroup(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SwitchLabelContext extends ParserRuleContext {
	public _enumConstantName!: Token;
	public _constantExpression!: ExpressionContext;
	public CASE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CASE, 0); }
	public COLON(): TerminalNode { return this.getToken(ProcessingParser.COLON, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public DEFAULT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DEFAULT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_switchLabel; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterSwitchLabel) {
			listener.enterSwitchLabel(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitSwitchLabel) {
			listener.exitSwitchLabel(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitSwitchLabel) {
			return visitor.visitSwitchLabel(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForLoopContext extends ParserRuleContext {
	public FOR(): TerminalNode { return this.getToken(ProcessingParser.FOR, 0); }
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public forControl(): ForControlContext {
		return this.getRuleContext(0, ForControlContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public statement(): StatementContext {
		return this.getRuleContext(0, StatementContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_forLoop; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterForLoop) {
			listener.enterForLoop(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitForLoop) {
			listener.exitForLoop(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitForLoop) {
			return visitor.visitForLoop(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForControlContext extends ParserRuleContext {
	public _forUpdate!: ExpressionListContext;
	public enhancedForControl(): EnhancedForControlContext | undefined {
		return this.tryGetRuleContext(0, EnhancedForControlContext);
	}
	public SEMI(): TerminalNode[];
	public SEMI(i: number): TerminalNode;
	public SEMI(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.SEMI);
		} else {
			return this.getToken(ProcessingParser.SEMI, i);
		}
	}
	public forInit(): ForInitContext | undefined {
		return this.tryGetRuleContext(0, ForInitContext);
	}
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_forControl; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterForControl) {
			listener.enterForControl(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitForControl) {
			listener.exitForControl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitForControl) {
			return visitor.visitForControl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ForInitContext extends ParserRuleContext {
	public localVariableDeclaration(): LocalVariableDeclarationContext | undefined {
		return this.tryGetRuleContext(0, LocalVariableDeclarationContext);
	}
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_forInit; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterForInit) {
			listener.enterForInit(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitForInit) {
			listener.exitForInit(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitForInit) {
			return visitor.visitForInit(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class EnhancedForControlContext extends ParserRuleContext {
	public typeType(): TypeTypeContext {
		return this.getRuleContext(0, TypeTypeContext);
	}
	public variableDeclaratorId(): VariableDeclaratorIdContext {
		return this.getRuleContext(0, VariableDeclaratorIdContext);
	}
	public COLON(): TerminalNode { return this.getToken(ProcessingParser.COLON, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public variableModifier(): VariableModifierContext[];
	public variableModifier(i: number): VariableModifierContext;
	public variableModifier(i?: number): VariableModifierContext | VariableModifierContext[] {
		if (i === undefined) {
			return this.getRuleContexts(VariableModifierContext);
		} else {
			return this.getRuleContext(i, VariableModifierContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_enhancedForControl; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterEnhancedForControl) {
			listener.enterEnhancedForControl(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitEnhancedForControl) {
			listener.exitEnhancedForControl(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitEnhancedForControl) {
			return visitor.visitEnhancedForControl(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ParExpressionContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public expression(): ExpressionContext {
		return this.getRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_parExpression; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterParExpression) {
			listener.enterParExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitParExpression) {
			listener.exitParExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitParExpression) {
			return visitor.visitParExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionListContext extends ParserRuleContext {
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_expressionList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExpressionList) {
			listener.enterExpressionList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExpressionList) {
			listener.exitExpressionList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExpressionList) {
			return visitor.visitExpressionList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExpressionContext extends ParserRuleContext {
	public _prefix!: Token;
	public _bop!: Token;
	public _postfix!: Token;
	public primary(): PrimaryContext | undefined {
		return this.tryGetRuleContext(0, PrimaryContext);
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public methodCall(): MethodCallContext | undefined {
		return this.tryGetRuleContext(0, MethodCallContext);
	}
	public THIS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THIS, 0); }
	public NEW(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NEW, 0); }
	public innerCreator(): InnerCreatorContext | undefined {
		return this.tryGetRuleContext(0, InnerCreatorContext);
	}
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	public superSuffix(): SuperSuffixContext | undefined {
		return this.tryGetRuleContext(0, SuperSuffixContext);
	}
	public explicitGenericInvocation(): ExplicitGenericInvocationContext | undefined {
		return this.tryGetRuleContext(0, ExplicitGenericInvocationContext);
	}
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	public LBRACK(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LBRACK, 0); }
	public RBRACK(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RBRACK, 0); }
	public creator(): CreatorContext | undefined {
		return this.tryGetRuleContext(0, CreatorContext);
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public typeType(): TypeTypeContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public INC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INC, 0); }
	public DEC(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DEC, 0); }
	public ADD(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ADD, 0); }
	public SUB(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUB, 0); }
	public TILDE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.TILDE, 0); }
	public BANG(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BANG, 0); }
	public MUL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MUL, 0); }
	public DIV(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DIV, 0); }
	public MOD(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MOD, 0); }
	public LT(): TerminalNode[];
	public LT(i: number): TerminalNode;
	public LT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LT);
		} else {
			return this.getToken(ProcessingParser.LT, i);
		}
	}
	public GT(): TerminalNode[];
	public GT(i: number): TerminalNode;
	public GT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.GT);
		} else {
			return this.getToken(ProcessingParser.GT, i);
		}
	}
	public LE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LE, 0); }
	public GE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.GE, 0); }
	public INSTANCEOF(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INSTANCEOF, 0); }
	public EQUAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.EQUAL, 0); }
	public NOTEQUAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NOTEQUAL, 0); }
	public BITAND(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BITAND, 0); }
	public CARET(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CARET, 0); }
	public BITOR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BITOR, 0); }
	public AND(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.AND, 0); }
	public OR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.OR, 0); }
	public COLON(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLON, 0); }
	public QUESTION(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.QUESTION, 0); }
	public ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ASSIGN, 0); }
	public ADD_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.ADD_ASSIGN, 0); }
	public SUB_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUB_ASSIGN, 0); }
	public MUL_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MUL_ASSIGN, 0); }
	public DIV_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DIV_ASSIGN, 0); }
	public AND_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.AND_ASSIGN, 0); }
	public OR_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.OR_ASSIGN, 0); }
	public XOR_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.XOR_ASSIGN, 0); }
	public RSHIFT_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RSHIFT_ASSIGN, 0); }
	public URSHIFT_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.URSHIFT_ASSIGN, 0); }
	public LSHIFT_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LSHIFT_ASSIGN, 0); }
	public MOD_ASSIGN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.MOD_ASSIGN, 0); }
	public lambdaExpression(): LambdaExpressionContext | undefined {
		return this.tryGetRuleContext(0, LambdaExpressionContext);
	}
	public COLONCOLON(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLONCOLON, 0); }
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	public classType(): ClassTypeContext | undefined {
		return this.tryGetRuleContext(0, ClassTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_expression; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExpression) {
			listener.enterExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExpression) {
			listener.exitExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExpression) {
			return visitor.visitExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaExpressionContext extends ParserRuleContext {
	public lambdaParameters(): LambdaParametersContext {
		return this.getRuleContext(0, LambdaParametersContext);
	}
	public ARROW(): TerminalNode { return this.getToken(ProcessingParser.ARROW, 0); }
	public lambdaBody(): LambdaBodyContext {
		return this.getRuleContext(0, LambdaBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lambdaExpression; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLambdaExpression) {
			listener.enterLambdaExpression(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLambdaExpression) {
			listener.exitLambdaExpression(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLambdaExpression) {
			return visitor.visitLambdaExpression(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaParametersContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.IDENTIFIER);
		} else {
			return this.getToken(ProcessingParser.IDENTIFIER, i);
		}
	}
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public formalParameterList(): FormalParameterListContext | undefined {
		return this.tryGetRuleContext(0, FormalParameterListContext);
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lambdaParameters; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLambdaParameters) {
			listener.enterLambdaParameters(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLambdaParameters) {
			listener.exitLambdaParameters(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLambdaParameters) {
			return visitor.visitLambdaParameters(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LambdaBodyContext extends ParserRuleContext {
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public block(): BlockContext | undefined {
		return this.tryGetRuleContext(0, BlockContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_lambdaBody; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLambdaBody) {
			listener.enterLambdaBody(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLambdaBody) {
			listener.exitLambdaBody(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLambdaBody) {
			return visitor.visitLambdaBody(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimaryContext extends ParserRuleContext {
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public expression(): ExpressionContext | undefined {
		return this.tryGetRuleContext(0, ExpressionContext);
	}
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public THIS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THIS, 0); }
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	public literal(): LiteralContext | undefined {
		return this.tryGetRuleContext(0, LiteralContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public typeTypeOrVoid(): TypeTypeOrVoidContext | undefined {
		return this.tryGetRuleContext(0, TypeTypeOrVoidContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public CLASS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CLASS, 0); }
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext | undefined {
		return this.tryGetRuleContext(0, ExplicitGenericInvocationSuffixContext);
	}
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_primary; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterPrimary) {
			listener.enterPrimary(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitPrimary) {
			listener.exitPrimary(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitPrimary) {
			return visitor.visitPrimary(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassTypeContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public classOrInterfaceType(): ClassOrInterfaceTypeContext | undefined {
		return this.tryGetRuleContext(0, ClassOrInterfaceTypeContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public annotation(): AnnotationContext[];
	public annotation(i: number): AnnotationContext;
	public annotation(i?: number): AnnotationContext | AnnotationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(AnnotationContext);
		} else {
			return this.getRuleContext(i, AnnotationContext);
		}
	}
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassType) {
			listener.enterClassType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassType) {
			listener.exitClassType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassType) {
			return visitor.visitClassType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreatorContext extends ParserRuleContext {
	public primitiveType(): PrimitiveTypeContext | undefined {
		return this.tryGetRuleContext(0, PrimitiveTypeContext);
	}
	public arrayCreatorRest(): ArrayCreatorRestContext | undefined {
		return this.tryGetRuleContext(0, ArrayCreatorRestContext);
	}
	public createdObjectName(): CreatedObjectNameContext | undefined {
		return this.tryGetRuleContext(0, CreatedObjectNameContext);
	}
	public classCreatorRest(): ClassCreatorRestContext | undefined {
		return this.tryGetRuleContext(0, ClassCreatorRestContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_creator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCreator) {
			listener.enterCreator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCreator) {
			listener.exitCreator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCreator) {
			return visitor.visitCreator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreatedObjectNameContext extends ParserRuleContext {
	public createdType(): CreatedTypeContext[];
	public createdType(i: number): CreatedTypeContext;
	public createdType(i?: number): CreatedTypeContext | CreatedTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(CreatedTypeContext);
		} else {
			return this.getRuleContext(i, CreatedTypeContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.DOT);
		} else {
			return this.getToken(ProcessingParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_createdObjectName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCreatedObjectName) {
			listener.enterCreatedObjectName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCreatedObjectName) {
			listener.exitCreatedObjectName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCreatedObjectName) {
			return visitor.visitCreatedObjectName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class CreatedTypeContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public typeArgumentsOrDiamond(): TypeArgumentsOrDiamondContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsOrDiamondContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_createdType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterCreatedType) {
			listener.enterCreatedType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitCreatedType) {
			listener.exitCreatedType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitCreatedType) {
			return visitor.visitCreatedType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class InnerCreatorContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode { return this.getToken(ProcessingParser.IDENTIFIER, 0); }
	public classCreatorRest(): ClassCreatorRestContext {
		return this.getRuleContext(0, ClassCreatorRestContext);
	}
	public nonWildcardTypeArgumentsOrDiamond(): NonWildcardTypeArgumentsOrDiamondContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsOrDiamondContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_innerCreator; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterInnerCreator) {
			listener.enterInnerCreator(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitInnerCreator) {
			listener.exitInnerCreator(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitInnerCreator) {
			return visitor.visitInnerCreator(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArrayCreatorRestContext extends ParserRuleContext {
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	public arrayInitializer(): ArrayInitializerContext | undefined {
		return this.tryGetRuleContext(0, ArrayInitializerContext);
	}
	public expression(): ExpressionContext[];
	public expression(i: number): ExpressionContext;
	public expression(i?: number): ExpressionContext | ExpressionContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ExpressionContext);
		} else {
			return this.getRuleContext(i, ExpressionContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_arrayCreatorRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterArrayCreatorRest) {
			listener.enterArrayCreatorRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitArrayCreatorRest) {
			listener.exitArrayCreatorRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitArrayCreatorRest) {
			return visitor.visitArrayCreatorRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ClassCreatorRestContext extends ParserRuleContext {
	public arguments(): ArgumentsContext {
		return this.getRuleContext(0, ArgumentsContext);
	}
	public classBody(): ClassBodyContext | undefined {
		return this.tryGetRuleContext(0, ClassBodyContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_classCreatorRest; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterClassCreatorRest) {
			listener.enterClassCreatorRest(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitClassCreatorRest) {
			listener.exitClassCreatorRest(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitClassCreatorRest) {
			return visitor.visitClassCreatorRest(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExplicitGenericInvocationContext extends ParserRuleContext {
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext {
		return this.getRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	public explicitGenericInvocationSuffix(): ExplicitGenericInvocationSuffixContext {
		return this.getRuleContext(0, ExplicitGenericInvocationSuffixContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_explicitGenericInvocation; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExplicitGenericInvocation) {
			listener.enterExplicitGenericInvocation(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExplicitGenericInvocation) {
			listener.exitExplicitGenericInvocation(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExplicitGenericInvocation) {
			return visitor.visitExplicitGenericInvocation(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentsOrDiamondContext extends ParserRuleContext {
	public LT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.GT, 0); }
	public typeArguments(): TypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, TypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeArgumentsOrDiamond; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeArgumentsOrDiamond) {
			listener.enterTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeArgumentsOrDiamond) {
			listener.exitTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeArgumentsOrDiamond) {
			return visitor.visitTypeArgumentsOrDiamond(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NonWildcardTypeArgumentsOrDiamondContext extends ParserRuleContext {
	public LT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LT, 0); }
	public GT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.GT, 0); }
	public nonWildcardTypeArguments(): NonWildcardTypeArgumentsContext | undefined {
		return this.tryGetRuleContext(0, NonWildcardTypeArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_nonWildcardTypeArgumentsOrDiamond; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterNonWildcardTypeArgumentsOrDiamond) {
			listener.enterNonWildcardTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitNonWildcardTypeArgumentsOrDiamond) {
			listener.exitNonWildcardTypeArgumentsOrDiamond(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitNonWildcardTypeArgumentsOrDiamond) {
			return visitor.visitNonWildcardTypeArgumentsOrDiamond(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class NonWildcardTypeArgumentsContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(ProcessingParser.LT, 0); }
	public typeList(): TypeListContext {
		return this.getRuleContext(0, TypeListContext);
	}
	public GT(): TerminalNode { return this.getToken(ProcessingParser.GT, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_nonWildcardTypeArguments; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterNonWildcardTypeArguments) {
			listener.enterNonWildcardTypeArguments(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitNonWildcardTypeArguments) {
			listener.exitNonWildcardTypeArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitNonWildcardTypeArguments) {
			return visitor.visitNonWildcardTypeArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeListContext extends ParserRuleContext {
	public typeType(): TypeTypeContext[];
	public typeType(i: number): TypeTypeContext;
	public typeType(i?: number): TypeTypeContext | TypeTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeTypeContext);
		} else {
			return this.getRuleContext(i, TypeTypeContext);
		}
	}
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeList; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeList) {
			listener.enterTypeList(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeList) {
			listener.exitTypeList(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeList) {
			return visitor.visitTypeList(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeTypeContext extends ParserRuleContext {
	public classOrInterfaceType(): ClassOrInterfaceTypeContext | undefined {
		return this.tryGetRuleContext(0, ClassOrInterfaceTypeContext);
	}
	public primitiveType(): PrimitiveTypeContext | undefined {
		return this.tryGetRuleContext(0, PrimitiveTypeContext);
	}
	public VAR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.VAR, 0); }
	public annotation(): AnnotationContext | undefined {
		return this.tryGetRuleContext(0, AnnotationContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeType) {
			listener.enterTypeType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeType) {
			listener.exitTypeType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeType) {
			return visitor.visitTypeType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class TypeArgumentsContext extends ParserRuleContext {
	public LT(): TerminalNode { return this.getToken(ProcessingParser.LT, 0); }
	public typeArgument(): TypeArgumentContext[];
	public typeArgument(i: number): TypeArgumentContext;
	public typeArgument(i?: number): TypeArgumentContext | TypeArgumentContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeArgumentContext);
		} else {
			return this.getRuleContext(i, TypeArgumentContext);
		}
	}
	public GT(): TerminalNode { return this.getToken(ProcessingParser.GT, 0); }
	public COMMA(): TerminalNode[];
	public COMMA(i: number): TerminalNode;
	public COMMA(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.COMMA);
		} else {
			return this.getToken(ProcessingParser.COMMA, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_typeArguments; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterTypeArguments) {
			listener.enterTypeArguments(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitTypeArguments) {
			listener.exitTypeArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitTypeArguments) {
			return visitor.visitTypeArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class SuperSuffixContext extends ParserRuleContext {
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	public DOT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOT, 0); }
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_superSuffix; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterSuperSuffix) {
			listener.enterSuperSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitSuperSuffix) {
			listener.exitSuperSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitSuperSuffix) {
			return visitor.visitSuperSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ExplicitGenericInvocationSuffixContext extends ParserRuleContext {
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	public superSuffix(): SuperSuffixContext | undefined {
		return this.tryGetRuleContext(0, SuperSuffixContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public arguments(): ArgumentsContext | undefined {
		return this.tryGetRuleContext(0, ArgumentsContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_explicitGenericInvocationSuffix; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterExplicitGenericInvocationSuffix) {
			listener.enterExplicitGenericInvocationSuffix(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitExplicitGenericInvocationSuffix) {
			listener.exitExplicitGenericInvocationSuffix(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitExplicitGenericInvocationSuffix) {
			return visitor.visitExplicitGenericInvocationSuffix(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ArgumentsContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_arguments; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterArguments) {
			listener.enterArguments(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitArguments) {
			listener.exitArguments(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitArguments) {
			return visitor.visitArguments(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class JavaProcessingSketchContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public packageDeclaration(): PackageDeclarationContext | undefined {
		return this.tryGetRuleContext(0, PackageDeclarationContext);
	}
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext[];
	public typeDeclaration(i: number): TypeDeclarationContext;
	public typeDeclaration(i?: number): TypeDeclarationContext | TypeDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeDeclarationContext);
		} else {
			return this.getRuleContext(i, TypeDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_javaProcessingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterJavaProcessingSketch) {
			listener.enterJavaProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitJavaProcessingSketch) {
			listener.exitJavaProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitJavaProcessingSketch) {
			return visitor.visitJavaProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class StaticProcessingSketchContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	public typeDeclaration(): TypeDeclarationContext[];
	public typeDeclaration(i: number): TypeDeclarationContext;
	public typeDeclaration(i?: number): TypeDeclarationContext | TypeDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(TypeDeclarationContext);
		} else {
			return this.getRuleContext(i, TypeDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_staticProcessingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterStaticProcessingSketch) {
			listener.enterStaticProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitStaticProcessingSketch) {
			listener.exitStaticProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitStaticProcessingSketch) {
			return visitor.visitStaticProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ActiveProcessingSketchContext extends ParserRuleContext {
	public EOF(): TerminalNode { return this.getToken(ProcessingParser.EOF, 0); }
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_activeProcessingSketch; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterActiveProcessingSketch) {
			listener.enterActiveProcessingSketch(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitActiveProcessingSketch) {
			listener.exitActiveProcessingSketch(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitActiveProcessingSketch) {
			return visitor.visitActiveProcessingSketch(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WarnMixedModesContext extends ParserRuleContext {
	public blockStatement(): BlockStatementContext[];
	public blockStatement(i: number): BlockStatementContext;
	public blockStatement(i?: number): BlockStatementContext | BlockStatementContext[] {
		if (i === undefined) {
			return this.getRuleContexts(BlockStatementContext);
		} else {
			return this.getRuleContext(i, BlockStatementContext);
		}
	}
	public classBodyDeclaration(): ClassBodyDeclarationContext[];
	public classBodyDeclaration(i: number): ClassBodyDeclarationContext;
	public classBodyDeclaration(i?: number): ClassBodyDeclarationContext | ClassBodyDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ClassBodyDeclarationContext);
		} else {
			return this.getRuleContext(i, ClassBodyDeclarationContext);
		}
	}
	public importDeclaration(): ImportDeclarationContext[];
	public importDeclaration(i: number): ImportDeclarationContext;
	public importDeclaration(i?: number): ImportDeclarationContext | ImportDeclarationContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ImportDeclarationContext);
		} else {
			return this.getRuleContext(i, ImportDeclarationContext);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_warnMixedModes; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterWarnMixedModes) {
			listener.enterWarnMixedModes(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitWarnMixedModes) {
			listener.exitWarnMixedModes(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitWarnMixedModes) {
			return visitor.visitWarnMixedModes(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class VariableDeclaratorIdContext extends ParserRuleContext {
	public warnTypeAsVariableName(): WarnTypeAsVariableNameContext | undefined {
		return this.tryGetRuleContext(0, WarnTypeAsVariableNameContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_variableDeclaratorId; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterVariableDeclaratorId) {
			listener.enterVariableDeclaratorId(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitVariableDeclaratorId) {
			listener.exitVariableDeclaratorId(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitVariableDeclaratorId) {
			return visitor.visitVariableDeclaratorId(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class WarnTypeAsVariableNameContext extends ParserRuleContext {
	public _primitiveType!: PrimitiveTypeContext;
	public primitiveType(): PrimitiveTypeContext {
		return this.getRuleContext(0, PrimitiveTypeContext);
	}
	public LBRACK(): TerminalNode[];
	public LBRACK(i: number): TerminalNode;
	public LBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.LBRACK);
		} else {
			return this.getToken(ProcessingParser.LBRACK, i);
		}
	}
	public RBRACK(): TerminalNode[];
	public RBRACK(i: number): TerminalNode;
	public RBRACK(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.RBRACK);
		} else {
			return this.getToken(ProcessingParser.RBRACK, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_warnTypeAsVariableName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterWarnTypeAsVariableName) {
			listener.enterWarnTypeAsVariableName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitWarnTypeAsVariableName) {
			listener.exitWarnTypeAsVariableName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitWarnTypeAsVariableName) {
			return visitor.visitWarnTypeAsVariableName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class MethodCallContext extends ParserRuleContext {
	public functionWithPrimitiveTypeName(): FunctionWithPrimitiveTypeNameContext | undefined {
		return this.tryGetRuleContext(0, FunctionWithPrimitiveTypeNameContext);
	}
	public IDENTIFIER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.IDENTIFIER, 0); }
	public LPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.RPAREN, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	public THIS(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.THIS, 0); }
	public SUPER(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SUPER, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_methodCall; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterMethodCall) {
			listener.enterMethodCall(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitMethodCall) {
			listener.exitMethodCall(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitMethodCall) {
			return visitor.visitMethodCall(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class FunctionWithPrimitiveTypeNameContext extends ParserRuleContext {
	public LPAREN(): TerminalNode { return this.getToken(ProcessingParser.LPAREN, 0); }
	public RPAREN(): TerminalNode { return this.getToken(ProcessingParser.RPAREN, 0); }
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BOOLEAN, 0); }
	public BYTE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BYTE, 0); }
	public CHAR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CHAR, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FLOAT, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INT, 0); }
	public COLOR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.COLOR, 0); }
	public expressionList(): ExpressionListContext | undefined {
		return this.tryGetRuleContext(0, ExpressionListContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_functionWithPrimitiveTypeName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterFunctionWithPrimitiveTypeName) {
			listener.enterFunctionWithPrimitiveTypeName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitFunctionWithPrimitiveTypeName) {
			listener.exitFunctionWithPrimitiveTypeName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitFunctionWithPrimitiveTypeName) {
			return visitor.visitFunctionWithPrimitiveTypeName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class PrimitiveTypeContext extends ParserRuleContext {
	public BOOLEAN(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BOOLEAN, 0); }
	public CHAR(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CHAR, 0); }
	public BYTE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BYTE, 0); }
	public SHORT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.SHORT, 0); }
	public INT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.INT, 0); }
	public LONG(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.LONG, 0); }
	public FLOAT(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.FLOAT, 0); }
	public DOUBLE(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.DOUBLE, 0); }
	public colorPrimitiveType(): ColorPrimitiveTypeContext | undefined {
		return this.tryGetRuleContext(0, ColorPrimitiveTypeContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_primitiveType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterPrimitiveType) {
			listener.enterPrimitiveType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitPrimitiveType) {
			listener.exitPrimitiveType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitPrimitiveType) {
			return visitor.visitPrimitiveType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class ColorPrimitiveTypeContext extends ParserRuleContext {
	public COLOR(): TerminalNode { return this.getToken(ProcessingParser.COLOR, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_colorPrimitiveType; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterColorPrimitiveType) {
			listener.enterColorPrimitiveType(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitColorPrimitiveType) {
			listener.exitColorPrimitiveType(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitColorPrimitiveType) {
			return visitor.visitColorPrimitiveType(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class QualifiedNameContext extends ParserRuleContext {
	public IDENTIFIER(): TerminalNode[];
	public IDENTIFIER(i: number): TerminalNode;
	public IDENTIFIER(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.IDENTIFIER);
		} else {
			return this.getToken(ProcessingParser.IDENTIFIER, i);
		}
	}
	public colorPrimitiveType(): ColorPrimitiveTypeContext[];
	public colorPrimitiveType(i: number): ColorPrimitiveTypeContext;
	public colorPrimitiveType(i?: number): ColorPrimitiveTypeContext | ColorPrimitiveTypeContext[] {
		if (i === undefined) {
			return this.getRuleContexts(ColorPrimitiveTypeContext);
		} else {
			return this.getRuleContext(i, ColorPrimitiveTypeContext);
		}
	}
	public DOT(): TerminalNode[];
	public DOT(i: number): TerminalNode;
	public DOT(i?: number): TerminalNode | TerminalNode[] {
		if (i === undefined) {
			return this.getTokens(ProcessingParser.DOT);
		} else {
			return this.getToken(ProcessingParser.DOT, i);
		}
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_qualifiedName; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterQualifiedName) {
			listener.enterQualifiedName(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitQualifiedName) {
			listener.exitQualifiedName(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitQualifiedName) {
			return visitor.visitQualifiedName(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class LiteralContext extends ParserRuleContext {
	public integerLiteral(): IntegerLiteralContext | undefined {
		return this.tryGetRuleContext(0, IntegerLiteralContext);
	}
	public floatLiteral(): FloatLiteralContext | undefined {
		return this.tryGetRuleContext(0, FloatLiteralContext);
	}
	public CHAR_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.CHAR_LITERAL, 0); }
	public stringLiteral(): StringLiteralContext | undefined {
		return this.tryGetRuleContext(0, StringLiteralContext);
	}
	public BOOL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.BOOL_LITERAL, 0); }
	public NULL_LITERAL(): TerminalNode | undefined { return this.tryGetToken(ProcessingParser.NULL_LITERAL, 0); }
	public hexColorLiteral(): HexColorLiteralContext | undefined {
		return this.tryGetRuleContext(0, HexColorLiteralContext);
	}
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_literal; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterLiteral) {
			listener.enterLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitLiteral) {
			listener.exitLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitLiteral) {
			return visitor.visitLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


export class HexColorLiteralContext extends ParserRuleContext {
	public HexColorLiteral(): TerminalNode { return this.getToken(ProcessingParser.HexColorLiteral, 0); }
	constructor(parent: ParserRuleContext | undefined, invokingState: number) {
		super(parent, invokingState);
	}
	// @Override
	public get ruleIndex(): number { return ProcessingParser.RULE_hexColorLiteral; }
	// @Override
	public enterRule(listener: ProcessingParserListener): void {
		if (listener.enterHexColorLiteral) {
			listener.enterHexColorLiteral(this);
		}
	}
	// @Override
	public exitRule(listener: ProcessingParserListener): void {
		if (listener.exitHexColorLiteral) {
			listener.exitHexColorLiteral(this);
		}
	}
	// @Override
	public accept<Result>(visitor: ProcessingParserVisitor<Result>): Result {
		if (visitor.visitHexColorLiteral) {
			return visitor.visitHexColorLiteral(this);
		} else {
			return visitor.visitChildren(this);
		}
	}
}


