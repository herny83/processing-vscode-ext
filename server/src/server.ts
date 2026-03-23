import {
	CodeLens,
	CodeLensParams,
	CompletionItem,
	CompletionParams,
	CompletionContext,
	TextDocumentPositionParams,
	Definition,
	DidChangeConfigurationNotification,
	FileChangeType,
	Hover,
	InitializeParams,
	Location,
	ReferenceParams,
	RenameParams,
	WorkspaceEdit,
	createConnection,
	ProposedFeatures,
	DocumentSymbolParams,
	DocumentSymbol,
	TextDocuments,
	TextDocumentSyncKind,
	SignatureHelp,
	SignatureHelpParams,
	SignatureHelpContext,
	InitializeResult,
	WorkDoneProgress,
} from 'vscode-languageserver/node';
import { DidChangeWatchedFilesNotification, WatchKind } from 'vscode-languageserver-protocol';
import { TextDocument } from 'vscode-languageserver-textdocument';
import { DocumentSymbols } from "./DocumentSymbols";

import * as completion from './completion';
import * as definition from './definition';
import * as hover from './hover';
import * as reference from './references';
import * as rename from './rename';
import * as log from './syslogs';
import * as sketch from './sketch';
import * as path from 'path';
import * as parseUtils from './astutils';
import * as settings from './settings';

export let connection = createConnection(ProposedFeatures.all);
//const processingSketch = new ProcessingSketch();

let documents: TextDocuments<TextDocument> = new TextDocuments(TextDocument);

let hasConfigurationCapability: boolean = false;
let hasWorkspaceFolderCapability: boolean = false;
//let workspaceUri: string | undefined = undefined;

export let hasDiagnosticRelatedInformationCapability: boolean = false;


connection.onInitialize((params: InitializeParams) => {
	//console.log("params.workDoneToken: "+params.workDoneToken);
	params.workDoneToken = progressToken;
	let capabilities = params.capabilities;
	let initOptions = params.initializationOptions;

	hasConfigurationCapability = !!(
		capabilities.workspace && !!capabilities.workspace.configuration
	);
	hasWorkspaceFolderCapability = !!(
		capabilities.workspace && !!capabilities.workspace.workspaceFolders
	);
	hasDiagnosticRelatedInformationCapability = !!(
		capabilities.textDocument &&
		capabilities.textDocument.publishDiagnostics &&
		capabilities.textDocument.publishDiagnostics.relatedInformation
	);
	
	if(initOptions)
	{
		busyFeedbackBegin("test");
		const processingPath: string | undefined = initOptions.processingPath;
		const processingVersion: string | undefined = initOptions.processingVersion;
		console.log(`processingPath: ${processingPath}`);
		console.log(`processingVersion: ${processingVersion}`);
		sketch.setProcessingPath(processingPath, processingVersion);
	}

	const result: InitializeResult = 
	  {
		capabilities: {
			textDocumentSync: TextDocumentSyncKind.Incremental,
			// Tell the client that this server supports code completion.
			completionProvider: {
				resolveProvider: true,
				triggerCharacters: ['.']
			},
			signatureHelpProvider: {
				triggerCharacters: ['(']
			},
		  	hoverProvider: true,
			definitionProvider: true,
			codeLensProvider: {
				resolveProvider: true
			},
			referencesProvider: { 
				workDoneProgress: true 
			},
			renameProvider: true,
			documentSymbolProvider: true
		}
	  };
	  if (hasWorkspaceFolderCapability) {
		result.capabilities.workspace = {
		  workspaceFolders: {
			supported: true
		  }
		};
	  }
	  return result;
});

connection.onInitialized(async () => {
    log.write(`Server initialized`, log.severity.SUCCES)
    if (hasConfigurationCapability) 
	{
        connection.client.register(DidChangeConfigurationNotification.type, undefined);
        await updateConfig(); // <-- Fetch config at startup
    }

	connection.client.register(DidChangeWatchedFilesNotification.type, {
		watchers: [
		  {
			globPattern: '**/*.pde', 
			kind: WatchKind.Change | WatchKind.Create | WatchKind.Delete,
		  },
		],
	  });

	if (hasWorkspaceFolderCapability) {
		connection.workspace.onDidChangeWorkspaceFolders(_event => {
			log.write('Workspace folder change event received.', log.severity.EVENT);
		});
	}
	const sketchPath = sketch.getSketchPath();
	settings.initialize(sketchPath);
});


connection.onNotification('processing/reloadSketch', () => {
    sketch.forceReloadSketch();
});

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// Settings Section
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
connection.onDidChangeConfiguration(change => {
	log.write(`Config change event occured`, log.severity.EVENT);
	updateConfig();
});

// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
// DidOpen/DidClose/DidChange Document
// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------

//export let latestChangesInTextDoc: TextDocument

documents.onDidOpen(async (event: { document: TextDocument; }) => {
    // Ensure the file has a .pde extension
    if (!event.document.uri.endsWith('.pde'))
        return;

	if (sketch.isProcessingReady()==false || sketch.isSketchInitialized())
		return;
    
	const sketchPath = sketch.getSketchPath();
    const filePath = parseUtils.getPathFromUri(event.document.uri); // Get the file path
    const folderPath = path.dirname(filePath); // Get the folder containing the file
    const folderName = path.basename(folderPath); // Get the folder name
    const mainSketchFile = path.join(folderPath, `${folderName}.pde`); // Construct the main sketch file path

	if(sketchPath !== '' && folderPath === sketchPath)
		return;

    try {
        // Check if the main sketch file exists
        if (sketch.isPathValid(mainSketchFile)) {
            log.write(`Valid sketch detected at: ${folderPath}`, log.severity.EVENT);
            await sketch.prepareSketch(folderPath); // Initialize the sketch
			await sketch.tryRecompile(false);

        } else {
            log.write(`Invalid sketch: No main sketch file (${folderName}.pde) found in ${folderPath}`, log.severity.ERROR);
        }
    } catch (error) {
        log.write(`Error while validating sketch: ${error.message}`, log.severity.ERROR);
    }
});

documents.onDidClose((e: { document: { uri: string; }; }) => {
});


documents.onDidChangeContent(async (change: { document: TextDocument; }) => 
{

	const pdeName : string = path.basename(parseUtils.getPathFromUri(change.document.uri));
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo)
		return;
	const content = change.document.getText();
	let newMd5 = sketch.buildMD5Hash(content);
	if(pdeInfo.md5hash === newMd5)
		return;

	pdeInfo.md5hash = newMd5;
	pdeInfo.newContent = content;
	log.write(`Content changed for `+pdeName+". version: "+change.document.version, log.severity.EVENT);
	sketch.markSourceChanging();
	sketch.tryRecompile(true);
});


// -----------------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------------
connection.onDidChangeWatchedFiles(_change => 
{
	let forceRebuildReferences : boolean = false;
	log.write('Files in workspace have changed', log.severity.EVENT);

	for (let i = 0; i < _change.changes.length; i++) 
	{
		const change = _change.changes[i];
		// Check if the change is within the sketch folder
		if (!sketch.isPathInSketchFolder(change.uri))
			continue;

		switch (change.type) {
		  case FileChangeType.Created:
			sketch.addPdeToSketch(change.uri)
			sketch.tryRecompile(true);
			forceRebuildReferences = true;
			break;
		  case FileChangeType.Deleted:
			sketch.removePdeFromSketch(change.uri)
			sketch.tryRecompile(true);
			forceRebuildReferences = true;
			break;
		  case FileChangeType.Changed:
			sketch.UpdatePdeFromSketch(change.uri);
			sketch.tryRecompile(true);
			break;
		  default:
			// do nothing
			break;
		}
	}
	if(forceRebuildReferences)
		sketch.rebuild(true, true);
});

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// SYMBOL DEFINITION & REFERENCES
// ================================================================================================

// Implementation for `goto definition` goes here
connection.onDefinition( async (params: TextDocumentPositionParams): Promise<Definition | null> => {
		const pdeName : string = path.basename(parseUtils.getPathFromUri(params.textDocument.uri));
		let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
		if(!pdeInfo || !pdeInfo.syntaxTokens)
			return null;

		await waitForPdeRebuild(pdeInfo);	
		
		return definition.scheduleLookUpDefinition(pdeInfo, params.position.line+1, params.position.character);
	}
)

// Implementation for finding references
connection.onReferences( async (params: ReferenceParams): Promise<Location[] | null> => {
		// _referenceParams.position.line, _referenceParams.position.character -> lineNumber, column from the arguments sent along with the command in the code lens
		const pdeName : string = path.basename(parseUtils.getPathFromUri(params.textDocument.uri));
		let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
		if(!pdeInfo || !pdeInfo.syntaxTokens)
			return null;

		await waitForPdeRebuild(pdeInfo);

		return reference.scheduleLookUpReference(pdeInfo, params.position.line+1, params.position.character)
	}
)

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// CODE LENS
// ================================================================================================

// Refresh codeLens for every change in the input stream
// Implementation of `code-lens` goes here
connection.onCodeLens( (_codeLensParams: CodeLensParams): CodeLens[] | null => {
		//return lens.scheduleLookUpLens(_codeLensParams)
		return null
	}
)

// Implementation for Renaming References - WIP
connection.onRenameRequest( async (params: RenameParams): Promise<WorkspaceEdit | null> => {
		// _referenceParams.position.line, _referenceParams.position.character -> lineNumber, column from the arguments sent along with the command in the code lens
		const pdeName : string = path.basename(parseUtils.getPathFromUri(params.textDocument.uri));
		let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
		if(!pdeInfo || !pdeInfo.syntaxTokens)
			return null;

		await waitForCodeRebuild();

	
		let result = rename.scheduleLookUpRename(pdeInfo, params.position.line+1, params.position.character, params.newName);
		sketch.tryRecompile(true);
		return result;
	}
)

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// CODE COMPLETION
// ================================================================================================

// Perform auto-completion -> Deligated tp `completion.ts`
connection.onCompletion( async (params: CompletionParams): Promise<CompletionItem[]> => 
{
	if(sketch.isRecompiling())
		return;

	const pdeName : string = path.basename(parseUtils.getPathFromUri(params.textDocument.uri));
	const line : number = params.position.line;
	const posInLine : number = params.position.character;
	const context : CompletionContext | undefined = params.context;

	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return [];

	await waitForPdeRebuild(pdeInfo);

	log.write(`Completion Requested for: ${pdeName} at line: ${line+1}, posInLine: ${posInLine}`, log.severity.EVENT);
	return await completion.collectCandidates(pdeInfo, line+1, posInLine, context);
});

// Completion Resolved suspended for now -> TODO: Refactoring required with real data points
connection.onCompletionResolve( async (item: CompletionItem): Promise<CompletionItem> => 
{
	return completion.fillCompletionItemDetails(item);
});


connection.onSignatureHelp( async (params : SignatureHelpParams) : Promise<SignatureHelp | null> =>
{
	const pdeName : string = path.basename(parseUtils.getPathFromUri(params.textDocument.uri));
	const line : number = params.position.line;
	const posInLine : number = params.position.character;
	const context : SignatureHelpContext | undefined = params.context;

	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo || !pdeInfo.syntaxTokens)
		return null;

	return completion.collectSignatureHelp(pdeInfo, line+1, posInLine, context);
});


// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================


// Implementation for Hover request
connection.onHover( async(params: TextDocumentPositionParams): Promise<Hover | null> => 
{
	const pdeName : string = path.basename(parseUtils.getPathFromUri(params.textDocument.uri));
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo)
		return null;

	await waitForPdeRebuild(pdeInfo);

	return hover.scheduleHoverInfo(pdeInfo, params.position.line+1, params.position.character);
});

// ================================================================================================
// ================================================================================================
// ================================================================================================
// ================================================================================================
// When the client requests document symbols
connection.onDocumentSymbol(async (params: DocumentSymbolParams) => 
{
	const pdeName : string = path.basename(parseUtils.getPathFromUri(params.textDocument.uri));
	let pdeInfo : sketch.PdeContentInfo | undefined = sketch.getPdeContentInfo(pdeName);
	if(!pdeInfo)
		return null;

	await waitForPdeRebuild(pdeInfo);

	let tokens = pdeInfo.syntaxTokens;
	if(!tokens)
		return null;

	log.write("Preparing to show document symbols for: "+pdeName, log.severity.BEHAVIOR);
	let result: DocumentSymbol [] = [];
	DocumentSymbols.generateSymbolsFrom(tokens, 0, result);
	return result;
});



documents.listen(connection);
connection.listen();

async function waitForCodeRebuild() : Promise<void> 
{
	while( sketch.isRecompiling() ) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}
}

async function waitForPdeRebuild(pdeInfo: sketch.PdeContentInfo) : Promise<void> 
{
	while( pdeInfo.isBeingRebuilt() ) {
		await new Promise(resolve => setTimeout(resolve, 100));
	}
}

async function updateConfig() : Promise<void> {
    // Get user/global config for processing.path
    const userConfig : any = await connection.workspace.getConfiguration("processing");
    let newProcessingPath: string = "";
    if(userConfig) {
        newProcessingPath = userConfig.path;
        sketch.checkOnProcessingPathChanged(newProcessingPath);
    }
}


const progressToken : string = "lsp-init-token";

export async function busyFeedbackBegin(msg : string="")
{
	await connection.sendProgress(WorkDoneProgress.type, progressToken, { kind: 'begin', title: 'Processing', message: msg || 'Initializing...', percentage: 0 });
}

export async function busyFeedbackReport(msg : string="", percentage: number = 0)
{
	await connection.sendProgress(WorkDoneProgress.type, progressToken, { kind: 'report', message: msg, percentage });
}

export async function busyFeedbackEnd()
{
	await connection.sendProgress(WorkDoneProgress.type, progressToken, { kind: 'end', message: 'Ready' });
}

