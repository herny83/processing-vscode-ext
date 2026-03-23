import * as utility from './utility';
import * as vscode from 'vscode'
import * as path from "path";
import * as fs from 'fs';
import { IProgressReporter } from "./progressAPI";

export interface BuildParams {
	readonly mainClass: string;
	readonly projectName?: string;
	readonly filePath?: string;
	readonly isFullBuild: boolean;
}

class PdeInfo
{
	public name : string = "";
	public javaOffset : number = 0;
	public linesCount : number = 0;
	public hash : string = ""; // Add this line
}

export class Location
{
	public file : string = "";
	public line : number = 0;
	constructor(f : string, l : number) 
	{
		this.file = f;
		this.line = l;
	}
	public name() : string { return path.basename(this.file); }
}

let sketchPath : string;
let sketchName : string;
let sketchHash : string = "";
let lastJavaHash : string = "";
let compiledHash : string = "";
let mainJavaFile : string;
let pdeMap = new Map<string, PdeInfo>();
let lastJavaOffsetPosition : number = 0;

export function getSketchName() { return sketchName; }
export function getSketchPath() { return sketchPath; }
export function getMainJavaFile() : string { return mainJavaFile; }
export function getMainJavaName() : string { return path.basename(mainJavaFile); }
export function isMainJavaFile(file : string) : boolean { return mainJavaFile == file; }

export async function prepareSketchInfo()
{
	//console.log("preparePreprocessJavaFileInfo:");
	pdeMap.clear();

	// let javaFileContent = fs.readFileSync(mainJavaFile, 'utf-8');
	// mainJavaHash = sha256(javaFileContent);
	// lastJavaOffsetPosition = countLinesUntilMatch(javaFileContent, sketchName+" extends PApplet")+1;
	lastJavaOffsetPosition = 0;
	if (!utility.isPathValid(sketchPath))
	{
		console.error('Unable to initialize sketch. Seems that the sketch folder is not valid.');
		return;
	}
	let mainSketchFilename = sketchName + '.pde';
	if (!utility.isPathValid(sketchPath + path.sep + mainSketchFilename)) 
	{
		console.error('Unable to initialize sketch. The main sketch file must have the same name as the sketch folder.');
		return;
	}
	tryAddPdeInfo(mainSketchFilename);
	
	let fileNames = fs.readdirSync(sketchPath);
	fileNames.sort();
	for (let fileName of fileNames) 
	{
		if (fileName.endsWith('.pde') && fileName !== mainSketchFilename)
			tryAddPdeInfo(fileName);
	}

	// Generate global hash from all individual hashes (sorted by filename)
	const allHashes = Array.from(pdeMap.entries())
		.sort(([aName], [bName]) => aName.localeCompare(bName))
		.map(([, info]) => info.hash)
		.join('');
	sketchHash = utility.sha256(allHashes);
	console.log('Global PDE hash:', sketchHash);
}

export async function prepareJavaWorkspaceInfo()
{
	let javaFileContent = fs.readFileSync(mainJavaFile, 'utf-8');
	lastJavaHash = utility.sha256(javaFileContent);
	let javaOffsetPosition : number = countLinesUntilMatch(javaFileContent, sketchName+" extends PApplet")+1;
	// Fix javaOffset for each PdeInfo in pdeMap by adding javaOffsetPosition
	for (const pdeInfo of pdeMap.values()) {
		pdeInfo.javaOffset += javaOffsetPosition;
	}

}

/** macOS always has Processing at /Applications/ */
const MACOS_PROCESSING_PATH = '/Applications/';

/**
 * Returns the Processing installation path.
 * On macOS this is always /Applications/ (Processing.app lives there).
 * On Windows/Linux, reads from the processing.path setting (configured by the client).
 */
export function getProcessingPath() : string
{
	if (process.platform === 'darwin')
		return MACOS_PROCESSING_PATH;
	const processingConfig = vscode.workspace.getConfiguration("processing");
	if(processingConfig && processingConfig.path)
		return ensureTrailingSlash(processingConfig.path);
	return "";
}

/**
 * Returns the base directory where core/library lives.
 * To support a new layout, add a candidate here.
 */
function getResourceBase() : string
{
	const processingPath = getProcessingPath();
	const candidates: string[] = [];

	if (process.platform === 'darwin')
	{
		candidates.push(
			processingPath + "Processing.app/Contents/Resources/",
			processingPath + "Processing.app/Contents/Java/",
		);
	}
	candidates.push(
		processingPath + "app/resources/",
		processingPath,
	);

	for (const candidate of candidates)
	{
		if (utility.isPathValid(path.join(candidate, "core", "library")))
			return candidate;
	}
	return processingPath;
}

/**
 * Returns the Java home directory bundled with Processing.
 * To support a new JDK location, add a candidate here.
 */
export function getProcessingJavaHome() : string
{
	const processingPath = getProcessingPath();
	const resourceBase = getResourceBase();
	const candidates: string[] = [];

	if (process.platform === 'darwin')
	{
		// macOS: JDK is inside PlugIns as jdk-*
		const darwinJdk = findDarwinJdkHome(processingPath);
		if (darwinJdk)
			candidates.push(darwinJdk);
	}
	candidates.push(
		path.join(resourceBase, "jdk"),      // 4.5+ Windows/Linux
		path.join(processingPath, "java"),    // old Windows/Linux
	);

	for (const candidate of candidates)
	{
		if (utility.isPathValid(path.join(candidate, "bin")))
			return candidate;
	}
	return "";
}

/** Scans for the JDK home inside a macOS Processing.app bundle. */
function findDarwinJdkHome(processingPath: string) : string | undefined
{
	const pluginsDirs = [
		processingPath + "Processing.app/Contents/PlugIns/",
		processingPath + "Processing.app/Contents/Resources/PlugIns/",
	];
	for (const pluginsDir of pluginsDirs)
	{
		if (!utility.isPathValid(pluginsDir))
			continue;
		try
		{
			for (const entry of fs.readdirSync(pluginsDir))
			{
				if (!entry.startsWith("jdk-"))
					continue;
				// macOS JDK bundles nest Contents/Home inside
				const macHome = path.join(pluginsDir, entry, "Contents", "Home");
				if (utility.isPathValid(path.join(macHome, "bin")))
					return macHome;
				// Standard layout fallback
				const stdHome = path.join(pluginsDir, entry);
				if (utility.isPathValid(path.join(stdHome, "bin")))
					return stdHome;
			}
		}
		catch (_) { /* not readable */ }
	}
	return undefined;
}

export function getProcessingJavaExecutable() : string
{
	const javaHome = getProcessingJavaHome();
	const execName = process.platform === "win32" ? "java.exe" : "java";
	return path.join(javaHome, "bin", execName);
}

/** Returns the path to core/library/ where Processing core jars live. */
export function getProcessingJavaModules() : string
{
	return ensureTrailingSlash(path.join(getResourceBase(), "core", "library"));
}

/**
 * Returns the native library path for -Djava.library.path.
 * Older versions had platform subfolders (e.g. windows-amd64/);
 * newer versions bundle natives inside jars, so the core/library
 * dir itself is sufficient.
 */
export function getProcessingJavaLibraries() : string
{
	const coreLibrary = getProcessingJavaModules();

	// Check for platform-specific subfolder (old layout)
	const platformFolder = getNativePlatformFolder();
	if (platformFolder)
	{
		const nativePath = path.join(coreLibrary, platformFolder);
		if (utility.isPathValid(nativePath))
			return ensureTrailingSlash(nativePath);
	}

	// 4.5+: no native subfolders, jars contain the natives
	return coreLibrary;
}

function getNativePlatformFolder() : string
{
	const archMap: Record<string, string> = {
		x64: "amd64",
		arm64: "aarch64",
	};
	const platformMap: Record<string, string> = {
		win32: "windows",
		darwin: "macos",
		linux: "linux",
	};
	const plat = platformMap[process.platform];
	const arch = archMap[process.arch];
	if (plat && arch)
		return `${plat}-${arch}`;
	return "";
}

/**
 * Finds the Processing CLI executable for building sketches.
 * 4.5+ renamed processing-java to processing.
 */
function getProcessingCliExecutable() : string
{
	const processingPath = getProcessingPath();
	const ext = process.platform === "win32" ? ".exe" : "";

	// Try new name first (4.5+), then old name
	const candidates = [
		path.join(processingPath, "processing" + ext),
		path.join(processingPath, "processing-java" + ext),
	];

	if (process.platform === "darwin")
	{
		candidates.unshift(
			path.join(processingPath, "Processing.app", "Contents", "MacOS", "processing" + ext),
			path.join(processingPath, "Processing.app", "Contents", "MacOS", "processing-java" + ext),
		);
	}

	for (const candidate of candidates)
	{
		if (utility.isPathValid(candidate))
			return candidate;
	}
	// Fallback: return new name and let it fail with a clear error
	return candidates[0];
}

function ensureTrailingSlash(p: string) : string
{
	if (p.endsWith(path.sep) || p.endsWith('/'))
		return p;
	return p + path.sep;
}

export function initializeSketch(sketchDir : string)
{
	sketchPath = sketchDir;
	sketchName = path.basename(sketchPath);
	mainJavaFile = sketchPath+path.sep+"build"+path.sep+"source"+path.sep+sketchName+".java";
}

export function fillWithAllClassPaths(classPaths : string [])
{
	const outPath = sketchPath + path.sep + "build";
	if(!classPaths.includes(outPath))
		classPaths.push(outPath);

	fillWithProcessingCorePaths(classPaths);
	fillWithProjectCodePaths(classPaths);
}

export function fillWithProcessingCorePaths(classPaths : string [])
{
	const processingCorePath = getProcessingJavaModules();
	try
	{
		let fileNames = fs.readdirSync(processingCorePath);
		for (let fileName of fileNames) 
		{
			const fileFullPath = processingCorePath+fileName;

			if (fileName.endsWith('.jar') && !classPaths.includes(fileFullPath))
				classPaths.push(fileFullPath);
		}
	} catch(_)
	{
	}
}

export function fillWithProjectCodePaths(classPaths : string [])
{
	const projectCodePath = sketchPath+path.sep+"code"+path.sep;
	try
	{
		let projectCodeFileNames = fs.readdirSync(projectCodePath);
		for (let fileName of projectCodeFileNames) 
		{
			const fileFullPath = projectCodePath+fileName;

			if (fileName.endsWith('.jar') && !classPaths.includes(fileFullPath))
				classPaths.push(fileFullPath);
		}
	}
	catch(_)
	{
		
	}
}



export function convertPdeLineToJavaLine( pdeFilePath : string, pdeLine : number) : Location
{
	let pdeName : string = path.basename(pdeFilePath);
	let pdeInfo : PdeInfo | undefined = pdeMap.get(pdeName);
	if(!pdeInfo)
		return new Location(pdeFilePath, pdeLine); 
	return new Location(mainJavaFile, pdeLine + pdeInfo.javaOffset - 1);
}

export function convertJavaLineToPdeLine( javaLine : number ) : Location
{
	for (let [fileName, pdeInfo] of pdeMap) 
	{
		const pdeFirstLine = pdeInfo.javaOffset;
		const pdeLastLine = pdeInfo.javaOffset + pdeInfo.linesCount;
		if(javaLine >= pdeFirstLine && javaLine < pdeLastLine)
			return new Location(sketchPath+path.sep+fileName, javaLine - pdeFirstLine + 1);
	}
	return new Location(mainJavaFile, javaLine);
}

function tryAddPdeInfo(filename : string)
{
	let fileContent = "";
	try {
		fileContent = fs.readFileSync(sketchPath+path.sep+filename, 'utf-8');
	} catch (_) {
		fileContent = "";
	}

	let pdeInfo : PdeInfo = new PdeInfo();
	pdeInfo.name = filename;
	pdeInfo.javaOffset = lastJavaOffsetPosition+1;
	pdeInfo.linesCount = getContentLinesCount(fileContent);
	pdeInfo.hash = utility.sha256(fileContent);
	pdeMap.set(filename, pdeInfo);
	//console.log(" - "+pdeInfo.name+  " [ "+pdeInfo.javaOffset+ " : "+(pdeInfo.javaOffset+pdeInfo.linesCount)+" ] ");
	lastJavaOffsetPosition = lastJavaOffsetPosition + pdeInfo.linesCount;
}

function countLinesUntilMatch(fileContents: string, matchString: string): number {
	let linesCount = 0;
	let currentIndex = 0;
	let eolIndex = 0;
  
	while ((eolIndex = fileContents.indexOf('\n', currentIndex)) !== -1) {
		linesCount++;
		const currentLine = fileContents.substring(currentIndex, eolIndex); // Extract the current line
	
		if (currentLine.includes(matchString)) {
		  return linesCount;
		}
	
		currentIndex = eolIndex + 1; // Move to the character after the newline
	}
	// Handle the last line separately
	const lastLine = fileContents.substring(currentIndex);
	if (lastLine.includes(matchString))
		return linesCount;

	if (lastLine.length > 0) // Count the last line if it exists
		linesCount++;
		
	return linesCount;
}

function getContentLinesCount(fileContent : string) : number
{
	let lineCount = 0;
	fileContent.split(/\r?\n/).forEach((_line) => {
		lineCount ++
	})
	if( fileContent[fileContent.length-1] == '\n' )
		lineCount--;
	return lineCount;
}

export async function buildProcessing(_params: BuildParams | undefined, progressReporter: IProgressReporter): Promise<boolean> 
{
	const processingPath = getProcessingPath();
	if (!processingPath)
	{
		vscode.window.showErrorMessage(
			"Processing path is not configured. Please set 'processing.path' in your settings or use the Auto-Detect feature."
		);
		return false;
	}

	const commandStr = getProcessingCliExecutable();
	console.info("sketchPath: " + sketchPath);
	console.info("Processing CLI: " + commandStr);
	const argsStr = [
		"--force",
		"--sketch="+sketchPath,
		"--output="+sketchPath+path.sep+"build",
		"--build"
	];

	// Define task options
	const taskDefinition = {
		type: "shell",
		label: "buildSketch",
		// command: commandStr,
		// args: argsStr
	};

	// Create a task
	const task = new vscode.Task(
		taskDefinition,
		vscode.TaskScope.Workspace,
		taskDefinition.label,
		"vscode-processing-debug",
		new vscode.ShellExecution(commandStr, argsStr),
		[]
	);

	let buildResult: boolean = false;
	let currentJavaHash : string = "";

	try
	{
		let javaFileContent = fs.readFileSync(mainJavaFile, 'utf-8');
		currentJavaHash = utility.sha256(javaFileContent);
	}
	catch (_error) {
		currentJavaHash = ""; // Means no java file yet
	}

	const hasSketchNoChanges = compiledHash !== "" && sketchHash !== "" && compiledHash === sketchHash;
	const hasJavaNoChanges = lastJavaHash !== "" && currentJavaHash !== "" && lastJavaHash === currentJavaHash;

	if(hasSketchNoChanges && hasJavaNoChanges)
	{
		progressReporter.report("Processing To java... (cached)");
		console.log('Sketch already compiled, using cached result.');
		buildResult = true; // Use cached result
		// No need to execute the task again
	}
	else
	{
		progressReporter.report("Processing To java...");
		const execution : vscode.TaskExecution = await vscode.tasks.executeTask(task);
		buildResult = await waitForTaskCompletion(execution);
	}

	if(buildResult && compiledHash !== sketchHash)
	{
		compiledHash = sketchHash; // Update the compiled hash after a successful build
		console.log('Sketch compiled successfully, updated compiled hash:', compiledHash);
	}
	return buildResult;
}

// Wait for task completion using a Promise
async function waitForTaskCompletion(execution: vscode.TaskExecution): Promise<boolean> {
	return new Promise((resolve) => {
		const disposable = vscode.tasks.onDidEndTaskProcess((event) => {
			if (event.execution === execution) {
				if (event.exitCode === 0) {
					console.log('Processing Build successful');
					resolve(true);
				} else {
					console.error('Processing Build failed with exit code:', event.exitCode);
					resolve(false);
				}
				disposable.dispose();
			}
		});
	});
}