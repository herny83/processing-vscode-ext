import * as parser from './parser'
import { IDiagnosticReporter } from "./grammer/ProcessingErrorListener";
import { ProcessingSketchContext } from "./grammer/ProcessingParser";
import { SymbolTableVisitor } from './symbols';
import * as server from './server'
import { ParseTree, TerminalNode } from 'antlr4ts/tree'
import { ParserRuleContext } from 'antlr4ts';
import * as symb from 'antlr4-c3'
import * as dm from './definitionsMap'
import * as lsp from 'vscode-languageserver'
import * as psymb from './antlr-sym';
import * as javaModules from './javaModules'
import * as parseUtils from './astutils'
import * as fs from 'fs';
import * as log from './syslogs'
import * as crypto from 'crypto';
import * as path from "path";
import * as settings from './settings'

const pathM = require('path')

let processingPath : string = '';
let processingVersion : string = '';

let sketchPath : string = '';
let sketchName : string = '';
let sketchInitialized = false;
let hasSketchCodeLibraries = false;
let codeFolderWatcher : fs.FSWatcher | null = null;
let codeFolderContentWatcher : fs.FSWatcher | null = null;
let processingInitialized = false;
let logPdeChanges : boolean = false;
let recompiling : boolean = false;
let lastChangeTime : number;
const timeToRecompileAfterChange : number = 1200; // in milliseconds

let codeFolderChangeDebounceTimer: NodeJS.Timeout | null = null;


let dirtyPdeCount = 0;
let processedSketchTokens : ProcessingSketchContext

let symbolTableVisitor : SymbolTableVisitor;
let mainSymbolTable : psymb.PSymbolTable = new psymb.PSymbolTable("", { allowDuplicateSymbols: true });
let mainClass : psymb.PClassSymbol;
let pdeMap  = new Map<string, PdeContentInfo>();

export interface UnresolvedType
{
	type: psymb.PType;
	scope : symb.IScopedSymbol;
}

export class PdeContentInfo implements IDiagnosticReporter
{
	public name : string = "";
	public rawContent : string = "";
	public newContent : string | null = null;
	public md5hash : string = "";
	public syntaxTokens : ParserRuleContext | null = null;

	public importedSymbols : symb.BaseSymbol[] = [];
	public importedStaticSymbols : symb.BaseSymbol[] = [];

	public symbols : symb.BaseSymbol [] = [];
	public unresolvedTypes : UnresolvedType[] | null = null; 
	
	public dirty : boolean = false;
	public requireDeclarationsRebuild : boolean = false;
	public requireReferencesRebuild : boolean = false;
	public diagnosticsChanged : boolean = false;

	public diagnostics : lsp.Diagnostic[] = [];

	public symbolDiagnostics : lsp.Diagnostic[] = [];
	public refDiagnostics : lsp.Diagnostic[] = [];
	public generalDiagnostics : lsp.Diagnostic[] = [];

	private definitionDict : Map<TerminalNode, string> = new Map<TerminalNode, string>();
	private callContextDict : Map<TerminalNode, psymb.CallContext> = new Map<TerminalNode, psymb.CallContext>();
	private contextTypeDict : Map<ParseTree, psymb.IPType> = new Map<ParseTree, psymb.IPType>();
	private usageMap : Map<string, lsp.Range[]> = new Map<string, lsp.Range[]>();
	private usageMapSuperThis : Map<string, lsp.Range[]> = new Map<string, lsp.Range[]>();
	private implementations : Map<string, string[]> = new Map<string, string[]>();

	static createPdeContentInfo(pdeName: string, newContent: string): PdeContentInfo 
	{
		let result = new PdeContentInfo();
		result.name = pdeName;
		result.rawContent = newContent;
		return result;
	}

	public isBeingRebuilt() : boolean
	{
		return(this.dirty || this.requireDeclarationsRebuild || this.requireReferencesRebuild );
	}

	public markForRecompile()
	{
		this.dirty = true;
	}

	public tryImportStatic(importPath: string, allMembers: boolean) : string | undefined
	{
		let enclosingPath = allMembers ? importPath : importPath.substring(0, importPath.lastIndexOf(psymb.PNamespaceSymbol.delimiter));
		let staticSymbolName = allMembers ? undefined : importPath.substring(importPath.lastIndexOf(psymb.PNamespaceSymbol.delimiter)+1);
		
		let result : psymb.PComponentSymbol | undefined = mainSymbolTable.dependencyTable.resolveComponent(psymb.PComponentSymbol, enclosingPath);
		if(!result)
			return "Unable to find any static import symbol for "+importPath+(allMembers?".*":"");
		let components = psymb.PUtils.getAllMatchsSync(result.children, symb.BaseSymbol, staticSymbolName);
		if(components.length == 0)
			return "Unable to find any static import symbol for "+importPath+(allMembers?".*":"");
		for(let comp of components)
		{
			if( !(comp instanceof psymb.PFieldSymbol) && 
			   	!(comp instanceof psymb.PMethodSymbol) )
				continue;
			if(comp.modifiers.has(symb.Modifier.Static))
				this.importedStaticSymbols.push(comp);
		}
	}

	public tryImport(importPath: string, allMembers: boolean) : string | undefined
	{
		let result : psymb.PComponentSymbol | undefined = mainSymbolTable.dependencyTable.resolveComponent(psymb.PComponentSymbol, importPath);
		if(allMembers)
		{
			if(result)
			{
				let symbols = psymb.PUtils.getAllMatchsSync(result.children, psymb.PComponentSymbol, undefined);
				this.importedSymbols.push(...symbols);
			}
			else
				return "Unable to find any import symbol for "+importPath+".*";
		}
		else
		{
			if(result)
				this.importedSymbols.push(result);
			else
				return "Unable to find import symbol for "+importPath;

		}
	}

	public addUnresolvedType(type: psymb.PType, scope: symb.IScopedSymbol)
	{
		if(!this.unresolvedTypes)
			this.unresolvedTypes = [];
		this.unresolvedTypes.push({ type: type, scope: scope });
	}

	public tryRebuildSymbolDeclarations()
	{
		if(this.dirty)
			this.buildDeclarationSymbols();
	}

	public buildDeclarationSymbols() 
	{
		this.requireDeclarationsRebuild = true;
		this.dirty = false;
		this.diagnosticsChanged = true;

		this.definitionDict.clear();
		this.contextTypeDict.clear();
		this.usageMap.clear();
		this.usageMapSuperThis.clear();
		this.implementations.clear();
		this.symbolDiagnostics = [];
		this.diagnostics = this.symbolDiagnostics;
		this.importedSymbols = [];
		this.importedStaticSymbols = [];

		this.removeSymbolsFromMainClass();

		if(logPdeChanges)
			log.write(`building <${this.name}> declaration symbols.`, log.severity.EVENT);

		try
		{
			this.syntaxTokens = parser.parse(this.rawContent, this) as ParserRuleContext;
		
			symbolTableVisitor.visitPdeLinked(this);
			this.requireReferencesRebuild = true;
		}
		catch(e)
		{
			console.error("Unable to parse pde file.\n"+e.stack);
		}
		finally
		{
			this.requireDeclarationsRebuild = false;
			markAsRebuildCompleted(this);
		}
	}

	public tryRebuildSymbolReferences(forced:boolean = false)
	{
		if(this.requireReferencesRebuild || forced)
			this.buildSymbolReferences();
	}

	buildSymbolReferences() 
	{
		this.diagnosticsChanged = true;
		this.refDiagnostics = [];
		this.diagnostics = this.refDiagnostics;
		this.definitionDict.clear();
		this.contextTypeDict.clear();
		this.usageMap.clear();
		this.usageMapSuperThis.clear();
		this.implementations.clear();

		if(logPdeChanges)
			log.write(`Fixing unresolved types for<${this.name}> .`, log.severity.EVENT);

		if(this.unresolvedTypes)
		{
			for(let unresolved of this.unresolvedTypes)
				this.tryFixComponentType(unresolved.type, unresolved.scope);
			this.unresolvedTypes = null;
		}

		if(logPdeChanges)
			log.write(`building <${this.name}> references.`, log.severity.EVENT);

		if(this.syntaxTokens)
			new dm.UsageVisitor(mainSymbolTable, mainClass, this).visit(this.syntaxTokens);

		//log.write(`<${this.name}> errors: ${this.diagnostics.length}`, log.severity.EVENT);
		
		this.requireReferencesRebuild = false;

		markAsRebuildCompleted(this);
	}

	public trySendDiagnostics()
	{
		if(!this.diagnosticsChanged)
			return;
		this.diagnostics = [];
		this.diagnostics.push(...this.symbolDiagnostics);
		this.diagnostics.push(...this.refDiagnostics);
		let fileUri = parseUtils.getUriFromPath(path.join(sketchPath, this.name));
		server.connection.sendDiagnostics({uri: fileUri, diagnostics: this.diagnostics});
		this.diagnosticsChanged = false;
		this.diagnostics = [];
	}

	public clearDiagnostics()
	{
		let fileUri = parseUtils.getUriFromPath(path.join(sketchPath, this.name));
		server.connection.sendDiagnostics({uri: fileUri, diagnostics: []});
	}

	public removeSymbolsFromMainClass()
	{
		while(this.symbols.length > 0)
		{
			let s : symb.BaseSymbol | undefined = this.symbols.pop();
			if(s)
				mainClass.removeSymbol(s);
		}
	}

	public getUsageReferencesFor( decl : symb.BaseSymbol, all:boolean=false ) : lsp.Range[] | undefined
	{
		return this.getUsageReferencesForQualifiedName(decl.qualifiedName('.', true, false), all);
	}

	public getUsageReferencesForQualifiedName( declName : string, all:boolean=false ) : lsp.Range[] | undefined
	{
		if(all)
		{
			let result : lsp.Range[] = [];
			let used : lsp.Range[] | undefined = this.usageMap.get(declName);
			if(used)
				result.push(...used);
			used = this.usageMapSuperThis.get(declName);
			if(used)
				result.push(...used);
			return result;
		}
		return this.usageMap.get(declName);
	}

	public getImplementationsForQualifiedName( declName : string ) : string[] | undefined
	{
		return this.implementations.get(declName);
	}

	public findNodeSymbolDefinition( node : TerminalNode )  : symb.BaseSymbol | undefined
	{
		let qualifiedName = this.definitionDict.get(node);
		return psymb.PUtils.resolveSymbolSync(mainSymbolTable, symb.BaseSymbol, qualifiedName);
		//return mainSymbolTable.resolveSync(qualifiedName);
	}

	public findSymbol( qualifiedName : string )  : symb.BaseSymbol | undefined
	{
		return psymb.PUtils.resolveSymbolSync(mainSymbolTable, symb.BaseSymbol, qualifiedName);
	}

	public findSymbolFromPType( symbolType : psymb.IPType ) : symb.BaseSymbol | undefined
	{
		return psymb.PUtils.resolveSymbolSyncFromPType(mainSymbolTable, symb.BaseSymbol, symbolType);
	}

	public findNodeSymbolDefinitionName( node : TerminalNode )  : string | undefined
	{
		return this.definitionDict.get(node);
	}
	
	public findNodeCallContext( node : TerminalNode )  : psymb.CallContext | undefined
	{
		return this.callContextDict.get(node);
	}
	
	public findNodeContextTypeDefinition(node : ParseTree ) : psymb.IPType | undefined
	{
		return this.contextTypeDict.get(node);
	}

	public registerDefinition(node: TerminalNode, declaredSymbol : symb.BaseSymbol | undefined, isInstance:boolean=true) : symb.BaseSymbol | undefined
	{
		if(declaredSymbol !== undefined)
		{
			let qualifiedName : string = psymb.PUtils.extractSignature( declaredSymbol );// + (isInstance?"":"#");
			this.registerDefinitionName(node, qualifiedName, isInstance);
		}
		else
			this.notifyDiagnostic(`Unable to register definition for ${node.text}`, node);

		return declaredSymbol;
	}

	public registerImplementation(objectPath : string, implementedBy : string)
	{
		let lst = this.implementations.get(objectPath);
		if(lst === undefined)
			this.implementations.set(objectPath, lst = []);
		lst.push(implementedBy);
	}

	public registerDefinitionName(node: TerminalNode, qualifiedName : string, isInstance:boolean=true)
	{
		this.definitionDict.set(node, qualifiedName);
		let idText = node.text;
		if(idText != "this" && idText != "super" )
		{
			let lst = this.usageMap.get(qualifiedName);
			if(lst === undefined)
				this.usageMap.set(qualifiedName, lst = []);
			lst.push(parseUtils.calcRangeFromParseTree(node));
		}
		else
		{
			let lst = this.usageMapSuperThis.get(qualifiedName);
			if(lst === undefined)
				this.usageMapSuperThis.set(qualifiedName, lst = []);
			lst.push(parseUtils.calcRangeFromParseTree(node));
		}
	}

	public tryRegisterCallContext(node: TerminalNode, callContext : psymb.CallContext | undefined)
	{
		if(!callContext)
			return;
		this.callContextDict.set(node, callContext);
	}

	public registerContextType(node: ParseTree | undefined, ctxType : psymb.IPType | undefined)
	{
		if(!ctxType)
			return;
		if(!node)
			return;
		this.contextTypeDict.set(node, ctxType);
	}

	public notifyDiagnostic(msg:string, node?:ParseTree|undefined, severity:lsp.DiagnosticSeverity=lsp.DiagnosticSeverity.Error )
	{
		this.notifyDiagnosticRange(msg, parseUtils.calcRangeFromParseTree(node), severity);
	}

	public notifyDiagnosticRange(msg:string, rg:lsp.Range, severity:lsp.DiagnosticSeverity=lsp.DiagnosticSeverity.Error )
	{
		let diagnostic: lsp.Diagnostic = {
			severity: severity,
			range: rg,
			message: msg,
			source: this.name
	   }
	   this.diagnostics.push(diagnostic);
	}

	public tryFixComponentType( type: psymb.PType, scope : symb.IScopedSymbol, callerScope ?: symb.IScopedSymbol | undefined )
		{
			if(type == undefined)
				return;
			if(type.name=="?")
				return;
	
			let typeSymbol : psymb.PComponentSymbol | undefined;
	
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
					typeSymbol = psymb.PUtils.resolveComponentSyncFromPType(scope, psymb.PComponentSymbol, type);
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
						console.error(`Unable to fix component type: ${type.name} at ... ${this.name}`);
				}
			}
			else if(type.typeKind == psymb.PTypeKind.Array)
				this.tryFixComponentType(type.arrayType, scope);
			
			for(let i:number=0; i < type.genericTypes.length; i++ )
				this.tryFixComponentType(type.genericTypes[i], scope);
	
	
			if(!type.isFullPath && type.outerType == undefined)
			{
				if(!typeSymbol)
					typeSymbol = psymb.PUtils.resolveComponentSyncFromPType(scope, psymb.PComponentSymbol, type);
	
				if(typeSymbol)
				{
					type.name = typeSymbol.name;
					if( typeSymbol.parent && typeSymbol.parent instanceof psymb.PComponentSymbol)
						type.setOutter(psymb.PUtils.ComponentSymbolToPType(typeSymbol.parent));
					type.isFullPath = true;
				}
			}
		}
}

export function getRootContext() { return processedSketchTokens; }
export function getSymbolTable() { return symbolTableVisitor.symbolTable; }
export function getMainClass() { return mainClass; }
export function getSketchPath() : string
{
	if (!sketchInitialized)
		return '';
	return sketchPath;
}
export function getSketchMainFilename() : string { return sketchName + '.pde'; }

export async function prepareSketch(sketchFolder : string)
{
	await initialize(sketchFolder+'/');
}

export async function setProcessingPath(path: string, version?: string)
{
	processingPath = path;
	processingVersion = version || '';
	await tryInitializeProcessing();
}

/**
 * Returns the base resource directory for Processing.
 * Processing 4.5+ moved core/library and java under app/resources/.
 * On macOS, the old layout uses Processing.app/Contents/Java/.
 *
 * To add support for a new layout, add a candidate here and the
 * rest of the path resolution (core/library, JDK symbols) will
 * follow automatically.
 */
function getResourceBase(): string
{
	const candidates: string[] = [];

	if (process.platform === 'darwin')
	{
		candidates.push(
			processingPath + "Processing.app/Contents/Resources/",
			processingPath + "Processing.app/Contents/Java/",
		);
	}

	// Windows/Linux (and fallback for any platform)
	candidates.push(
		processingPath + "app/resources/",
		processingPath,
	);

	for (const candidate of candidates)
	{
		if (isPathValid(candidate + "core/library"))
			return candidate;
	}
	return processingPath;
}

export function isProcessingReady() : boolean
{
	return processingInitialized;
}

export async function checkOnProcessingPathChanged(newProcessingPath : string)
{
	if(processingPath == newProcessingPath)
		return;

	await setProcessingPath(newProcessingPath);
	await tryInitializeWorkspaceSketch();
	tryRecompile(false);
}


export function forceReloadSketch()
{
	log.write("Forcing sketch reload...", log.severity.EVENT);
	removeAllSketchCodeLibraries([]);
	rebuildSketchCodeFolderChanges();
}

/**
 * Initializes a sketch. 
 * Determens the sketch folder based on the parameter
 * 
 * @param textDocument  .pde file(tab) in the sketch directory.
 * @returns Creation succes state
 */
export async function initialize(workspacePath: string)
{
	sketchPath = workspacePath;
	sketchName = path.basename(sketchPath);

	// Now we can prepare the workspace sketch
	await tryInitializeWorkspaceSketch();
	return true;
}

function checkForCodeFolderCreationDeletion(eventType: fs.WatchEventType, filename: string) 
{
	if (filename !== 'code')
		return;
	//console.error("Code folder created or deleted: "+eventType+" for "+filename);
	scheduleHandleCodeFolderChanges();
}

function checkForCodeFolderChanges(eventType: fs.WatchEventType, filename: string) 
{
	if (filename.endsWith('.jar')==false)
		return;

	if(eventType === 'rename' || eventType === 'change')
		scheduleHandleCodeFolderChanges();
	else
		console.error("Unhandled change event in code folder: "+eventType+" for "+filename);
}

function scheduleHandleCodeFolderChanges(delay: number = 1200) 
{
    if (codeFolderChangeDebounceTimer)
        clearTimeout(codeFolderChangeDebounceTimer);
    
    codeFolderChangeDebounceTimer = setTimeout(rebuildSketchCodeFolderChanges, delay);
}

function rebuildSketchCodeFolderChanges()
{
	const sketchCodePath = path.join(sketchPath, 'code/');
	if (fs.existsSync(sketchCodePath)) 
	{
		let fileNames = fs.readdirSync(sketchCodePath);
		handleCodeFolderChangesFor(sketchCodePath, fileNames);
	}
	else
	{
		//console.error("Code folder doesn't exist anymore...");
		handleCodeFolderChangesFor(sketchCodePath, []);
	}
	codeFolderChangeDebounceTimer = null;
}

function handleCodeFolderChangesFor(sketchCodePath:string, fileNames: string[])
{
	for(const filename of fileNames)
	{
		if (filename.endsWith('.jar')==false)
			continue;
		const fullFilePath = path.join(sketchCodePath, filename);
		const fileExists = fileNames.indexOf(filename) >= 0;
		const wasLoaded = javaModules.hasModuleAtSketchCode(fullFilePath);
		if(fileExists && wasLoaded==false)
		{
			// Didn't exist before, we need to add the jar
			if( javaModules.loadJarFile(fullFilePath, mainSymbolTable) )
			{
				let jarContent = fs.readFileSync(fullFilePath, 'utf-8');
				let jarMd5 = buildMD5Hash(jarContent);
				javaModules.registerModuleAtSketchCode(fullFilePath, jarMd5);
				markAsRequireRebuildAll();
				tryRecompile(false);
			}
		}
		else if(fileExists==false && wasLoaded)
		{
			mainSymbolTable.unregisterLibrarySymbols(fullFilePath);
			javaModules.unregisterModuleAtSketchCode(fullFilePath);
			markAsRequireRebuildAll();
			tryRecompile(false);
		}
		else if(fileExists && wasLoaded)
		{
			let jarContent = fs.readFileSync(fullFilePath, 'utf-8');
			let jarNewMd5 = buildMD5Hash(jarContent);
			let oldMd5 = javaModules.getModuleHashAtSketchCode(fullFilePath);
			if(jarNewMd5!=oldMd5)
			{
				//console.error("Jar in Code Folder changed: "+filename);
				mainSymbolTable.unregisterLibrarySymbols(fullFilePath);
				javaModules.unregisterModuleAtSketchCode(fullFilePath);
				if( javaModules.loadJarFile(fullFilePath, mainSymbolTable) )
				{
					
					javaModules.registerModuleAtSketchCode(fullFilePath, jarNewMd5);
					markAsRequireRebuildAll();
					tryRecompile(false);
				}
			}
		}
	}

	// Checks if any registered jar module dependency was removed
	let removedAmount = removeAllSketchCodeLibraries(fileNames);
	if(removedAmount > 0)
	{
		markAsRequireRebuildAll();
		tryRecompile(false);
	}
}

function removeAllSketchCodeLibraries(fileNames: string[]) : number
{
	let removedAmount = 0;
	const allModules = javaModules.getAllModulesAtSketchCode();
	for(const moduleFullPath of allModules)
	{
		const filename = pathM.basename(moduleFullPath);
		const fileStillExists = fileNames.includes(filename);
		if(fileStillExists)
			continue;

		removedAmount++;
		try
		{
			mainSymbolTable.unregisterLibrarySymbols(moduleFullPath);
			javaModules.unregisterModuleAtSketchCode(moduleFullPath);
		}
		catch(err)
		{
			console.error("Error removing '"+filename+"' module: ", err);
		}
	}
	return removedAmount;
}

async function tryInitializeProcessing()
{
	processingInitialized = false;
	if(!isPathValid(processingPath))
	{
		console.error(`Unable to locate processing at the given path ('${processingPath}'). \nMake sure to setup the correct configuration in the Processing extension settings`);
		return;
	}

	const resourceBase = getResourceBase();
	let javaSymbolsFilename = getProcessingJDKSymbols(processingPath, resourceBase);
	let processingCoreDirectory = resourceBase + "core/library/";
	console.log(`platform: ${process.platform}, resourceBase: ${resourceBase}`);
	console.log(`javaSymbolsFilename: ${javaSymbolsFilename}`);
	if(!isPathValid(javaSymbolsFilename))
		return;

	console.log(`processingCoreDirectory: ${processingCoreDirectory}`);
	if(!isPathValid(processingCoreDirectory))
		return;

	await server.busyFeedbackReport("Loading JDK symbols...", 5);
	console.log(`loading symbols...`);
	mainSymbolTable.clear();
	javaModules.loadJavaSymbolsFromFile(javaSymbolsFilename, mainSymbolTable);

	await server.busyFeedbackReport("Loading core libraries...", 15);
	const coreJarFiles : string[] = javaModules.resolveJarFilesAtDirectory(processingCoreDirectory);
	for(const jarFile of coreJarFiles)
		javaModules.loadJarFile(jarFile, mainSymbolTable);

	// Adding all the processing library import aliases
	mainSymbolTable.addDefaultImport("java.util");
	mainSymbolTable.addDefaultImport("java.io");
	mainSymbolTable.addDefaultImport("java.lang");
	mainSymbolTable.addDefaultImport("processing.core");
	mainSymbolTable.addDefaultImport("processing.data");
	mainSymbolTable.addDefaultImport("processing.event");
	mainSymbolTable.addDefaultImport("processing.opengl");
	processingInitialized = true;
}

async function tryInitializeWorkspaceSketch()
{
	sketchInitialized = false;
	if(!processingInitialized)
	{
		log.write("Unable to initialize sketch since processing wasn't correctly initialized", log.severity.ERROR);
		return;
	}
	const mainSketchFilename = getSketchMainFilename();;
	if (!isPathValid(path.join(sketchPath, mainSketchFilename)))
	{
		log.write('Unable to initialize sketch. The main sketch file must have the same name as the sketch folder.', log.severity.ERROR);
		return;
	}
	if (!isPathValid(sketchPath))
	{

		log.write('Unable to initialize sketch. Seems that the sketch folder is not valid.', log.severity.ERROR);
		return;
	}

	// Loading custom libraries required by the user specific project
	await server.busyFeedbackReport("Loading sketch libraries...", 30);
	tryInitializeSketchCodeLibraries();

	await tryInitializeSketchPDEFiles();

	sketchInitialized = true
}

function tryInitializeSketchCodeLibraries() 
{
	if(codeFolderWatcher)
	{
		log.write("Sketch Code Libraries: Stop watching for changes...", log.severity.INFO);
		codeFolderWatcher.close();
		codeFolderWatcher = null;
	}
	const codeDirectoryPath: string = path.join(sketchPath, "code");
	hasSketchCodeLibraries = isPathValid(codeDirectoryPath);
	if(hasSketchCodeLibraries)
	{
		log.write("Sketch Code Libraries: Initializing...", log.severity.EVENT);
		const filenames = javaModules.resolveJarFilesAtDirectory(codeDirectoryPath);
		for(const fullPath of filenames)
		{
			if( javaModules.loadJarFile(fullPath, mainSymbolTable) )
			{
				let jarContent = fs.readFileSync(fullPath, 'utf-8');
				let jarMd5 = buildMD5Hash(jarContent);
				javaModules.registerModuleAtSketchCode(fullPath, jarMd5);
			}
		}
		if(!codeFolderContentWatcher)
			codeFolderContentWatcher = fs.watch(codeDirectoryPath, checkForCodeFolderChanges);
	}
	else
	{
		log.write("Sketch Code Libraries: Not Found...", log.severity.EVENT);
		if(codeFolderContentWatcher)
		{
			codeFolderContentWatcher.close();
			codeFolderContentWatcher = null;
		}
	}
	log.write("Sketch Code Libraries: Start watching for changes...", log.severity.INFO);
	codeFolderWatcher = fs.watch(sketchPath, checkForCodeFolderCreationDeletion);
}

async function tryInitializeSketchPDEFiles()
{
	log.write("Sketch PDEs: Initializing...", log.severity.EVENT);
	const mainSketchFilename = getSketchMainFilename();
	mainClass = new psymb.PClassSymbol(sketchName, psymb.PType.createAppletClassType());
	mainSymbolTable.addSymbol(mainClass);

	symbolTableVisitor = new SymbolTableVisitor(mainSymbolTable, mainClass);
	pdeMap  = new Map<string, PdeContentInfo>();

	const pdeFiles = [mainSketchFilename];
	const fileNames = fs.readdirSync(sketchPath);
	for (const fileName of fileNames)
	{
		if (fileName.endsWith('.pde') && fileName !== mainSketchFilename)
			pdeFiles.push(fileName);
	}

	for (let i = 0; i < pdeFiles.length; i++)
	{
		const pct = 40 + Math.round((i / pdeFiles.length) * 10); // 40% to 50%
		await server.busyFeedbackReport(`Parsing ${pdeFiles[i]}...`, pct);
		tryAddPdeFile(pdeFiles[i]);
	}
	log.write(`Sketch PDEs: ${pdeMap.size} found.`, log.severity.INFO);
}



export function isPathValid(directoryPath: string): boolean 
{
	try {
	  const stat = fs.statSync(directoryPath);
	  return stat != null;
	} catch (error) {
	  // If an error occurs, it means the directory doesn't exist or there was an issue accessing it.
	  return false;
	}
}

export function isSketchInitialized() : boolean
{
	return sketchInitialized;
}

export function markSourceChanging()
{
	lastChangeTime = performance.now();
}

export async function waitWhileSourceChanging() : Promise<void>
{
	while( (performance.now() - lastChangeTime) < timeToRecompileAfterChange )
		await new Promise(resolve => setTimeout(resolve, 100));
}

export function isRecompiling() : boolean
{
	return recompiling;
}

export async function tryRecompile(logOn:boolean)
{
	if(recompiling || !sketchInitialized)
		return;

	recompiling = true;

	await waitWhileSourceChanging();

	logPdeChanges = logOn;
	await rebuild();
	// An additional recompile in case changes were made while we compile large amount of files...
	if(dirtyPdeCount > 0)
		await rebuild();
	
	recompiling = false;
}

export async function rebuild(referencesOnly:boolean = false, forced:boolean = false)
{
	await server.busyFeedbackBegin();
	if(!referencesOnly)
	{
		const startTime = performance.now();
		markAsRequireRebuildAllNewContent();
		log.write("Rebuilding definitions...", log.severity.EVENT);
		await server.busyFeedbackReport("Rebuilding definitions...", 50);
		for (let pdeInfo of getAllPdeInfos())
			pdeInfo.tryRebuildSymbolDeclarations();
		const endTime = performance.now();
		log.write("Rebuilding definitions... DONE ("+(endTime-startTime)+" ms)", log.severity.EVENT);
	}

	await server.busyFeedbackReport("Rebuilding import tables...", 65);
	const startTimeImport = performance.now();
	mainSymbolTable.clearImportTable();
	for (let pdeInfo of getAllPdeInfos())
		mainSymbolTable.addToImportTable(pdeInfo.importedSymbols, pdeInfo.importedStaticSymbols);
	const endTimeImport = performance.now();
	log.write("Rebuilding Import tables... DONE ("+(endTimeImport-startTimeImport)+" ms)", log.severity.EVENT);

	await server.busyFeedbackReport("Rebuilding references...", 80);
	const startTime = performance.now();
	log.write("Rebuilding references...", log.severity.EVENT);
	for (let pdeInfo of getAllPdeInfos())
		pdeInfo.tryRebuildSymbolReferences(forced);
	const endTime = performance.now();
	log.write("Rebuilding references... DONE ("+(endTime-startTime)+" ms)", log.severity.EVENT);

	await new Promise(resolve => setTimeout(resolve, 200));
	log.write("Sending diagnostics...", log.severity.EVENT);

	await server.busyFeedbackReport("Sending diagnostics...", 95);
	for (let pdeInfo of getAllPdeInfos())
		pdeInfo.trySendDiagnostics();
	log.write("Rebuild definitions & references ENDED", log.severity.EVENT);
	await server.busyFeedbackEnd();
}

export function isPathInSketchFolder(uri: string) : boolean
{
	if (!sketchInitialized || !sketchPath)
		return false;

	const fileRawPath = parseUtils.getPathFromUri(uri);
	const normalizedUriPath = path.dirname(path.resolve(fileRawPath));
	const normalizedSketchPath = path.resolve(sketchPath);

	return normalizedUriPath === normalizedSketchPath;
}

/**
 * Appends the name and content of a .pde file (tab)
 * to the content map of the sketch
 * 
 * @param uri Location to the file that needs adding
 */
 export function addPdeToSketch(uri: string) 
 {
	if (!sketchInitialized)
		return;

	let fileName = pathM.basename(uri)
	if (fileName.endsWith('.pde')) 
		tryAddPdeFile(fileName);
}

/**
 * Deletes the name and content of a .pde file (tab)
 * from the sketch content map
 * 
 * @param uri Location to the file that needs removing
 */
export function removePdeFromSketch(uri: string) 
{
	if (!sketchInitialized)
		return;

		
	let fileName = pathM.basename(uri)
	if (fileName.endsWith('.pde') && pdeMap.has(fileName))
	{
		const pdeName : string = pathM.basename(parseUtils.getPathFromUri(uri));
		let pde : PdeContentInfo = getPdeContentInfo(pdeName);
		pde.removeSymbolsFromMainClass();
		pde.clearDiagnostics();
		pdeMap.delete(fileName);
	}
}

/**
 * Appends the name and content of a .pde file (tab)
 * to the content map of the sketch
 * 
 * @param uri Location to the file that needs adding
 */
export function UpdatePdeFromSketch(uri: string) 
{
   if (!sketchInitialized)
	   return;

   let fileName = pathM.basename(uri)
   if (fileName.endsWith('.pde')) 
	   tryUpdatePdeFile(fileName);
}

export function getAllPdeInfos() : IterableIterator<PdeContentInfo>
{
	return pdeMap.values();
}

/**
 * Provides all the names of the files used by the sketch
 * 
 * @returns sketch file names
 */
 export function getFileNames() : string[] | undefined
 {
	if (!sketchInitialized)
		return;

	let fileNames : string[] = new Array;

	for (let [fileName, fileContents] of pdeMap)
		fileNames.push(fileName)

	return fileNames
}

export function getUriFromPdeName(pdeName : string) : lsp.DocumentUri
{
	return parseUtils.getUriFromPath(path.join(sketchPath, pdeName));
}

export function getPdeContentInfo(pdeName : string ) : PdeContentInfo | undefined
{
	return pdeMap.get(pdeName);
}

export function updatePdeContent(pdeName : string, newContent : string) : PdeContentInfo | undefined
{
	if (!sketchInitialized)
		return undefined;

	let pdeInfo : PdeContentInfo | undefined = pdeMap.get(pdeName);
	let newMd5 = buildMD5Hash(newContent);
	if(pdeInfo)
	{
		if(newMd5 == pdeInfo.md5hash)
			return undefined;
		pdeInfo.rawContent = newContent;
		pdeInfo.md5hash = newMd5;
	}
	else
	{
		pdeInfo = PdeContentInfo.createPdeContentInfo(pdeName, newContent);
		pdeInfo.md5hash = newMd5;
		pdeMap.set(pdeName, pdeInfo);
	}
	console.log("content changed for: "+pdeName + " | "+pdeInfo.md5hash);
	markAsRequireRebuild(pdeInfo);
	return pdeInfo;
}

export function buildMD5Hash(content: string) : string
{
	const hash = crypto.createHash('md5');
	hash.update(content);
	return hash.digest('hex');
}

function tryAddPdeFile(pdeFilename : string)
{
	let fileContent = fs.readFileSync(path.join(sketchPath, pdeFilename), 'utf-8');
	addPdeContent(pdeFilename, fileContent);
}

function tryUpdatePdeFile(pdeFilename : string)
{
	let fileContent = fs.readFileSync(path.join(sketchPath, pdeFilename), 'utf-8');
	let	linesCount : number = fileContent.split(/\r?\n/).length;
	updatePdeContent(pdeFilename, fileContent);
}

function addPdeContent(pdeName : string, newContent : string) : PdeContentInfo
{
	//log.write(`loading ${pdeName} content.`, log.severity.EVENT);
	//let	linesCount : number = newContent.split(/\r?\n/).length;

	let result : PdeContentInfo = PdeContentInfo.createPdeContentInfo(pdeName, newContent);
	result.md5hash = buildMD5Hash(newContent);
	pdeMap.set(pdeName, result);
	markAsRequireRebuild(result);
	return result;
}

function markAsRequireRebuildAll()
{
	for (let pdeInfo of getAllPdeInfos())
		pdeInfo.markForRecompile();
}

function markAsRequireRebuildAllNewContent()
{
	for (let pdeInfo of getAllPdeInfos())
	{
		if(pdeInfo.newContent !== null)
		{
			pdeInfo.rawContent = pdeInfo.newContent;
			pdeInfo.newContent = null;
			pdeInfo.markForRecompile();
		}
	}
}

function markAsRequireRebuild(pdeInfo: PdeContentInfo)
{
	if(pdeInfo.dirty)
		return;
	pdeInfo.markForRecompile();
	dirtyPdeCount++;
}

function markAsRebuildCompleted(pdeInfo: PdeContentInfo)
{
	if(pdeInfo.requireDeclarationsRebuild || pdeInfo.requireReferencesRebuild)
		return;
	dirtyPdeCount--;
}

function getProcessingJDKSymbols(processingPath: string, resourceBase: string) : string
{
	if(process.platform=='darwin')
	{
		// Try PlugIns dir for the .app bundle layout
		const pluginsPath = processingPath + "Processing.app/Contents/PlugIns/";
		const ctSym = findJdkCtSym(pluginsPath);
		if (ctSym) return ctSym;
	}

	// Processing 4.5+: jdk/ under resourceBase
	// Older: java/ at the root
	const candidates = [
		resourceBase + "jdk/lib/ct.sym",
		processingPath + "java/lib/ct.sym",
	];
	for (const candidate of candidates)
	{
		if (isPathValid(candidate))
			return candidate;
	}
	return "";
}

/** Scans a directory for a jdk-* folder and returns its ct.sym path. */
function findJdkCtSym(jdkParentDir: string): string | undefined
{
	if (!isPathValid(jdkParentDir))
		return undefined;
	try
	{
		for (const entry of fs.readdirSync(jdkParentDir))
		{
			if (!entry.startsWith("jdk-"))
				continue;
			const itemPath = jdkParentDir + entry;
			if (fs.lstatSync(itemPath).isDirectory())
			{
				// macOS .app bundles nest another Contents/Home inside the JDK
				const macCtSym = itemPath + "/Contents/Home/lib/ct.sym";
				if (isPathValid(macCtSym))
					return macCtSym;
				// Standard JDK layout
				const stdCtSym = itemPath + "/lib/ct.sym";
				if (isPathValid(stdCtSym))
					return stdCtSym;
			}
		}
	}
	catch (e) { /* directory not readable */ }
	return undefined;
}

export function resolveJavaFromLibraries(javaPath: string): string | undefined 
{
	const projectSettings = settings.getLastCached();
	const librarySourcePaths = projectSettings['processing.librarySourcePaths'] || [];

	for (const srcPath of librarySourcePaths) 
	{
		const fullPath = path.join(sketchPath, srcPath, javaPath);
		if (fs.existsSync(fullPath))
			return fullPath;
	}
	return undefined;
}