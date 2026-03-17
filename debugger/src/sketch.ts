// Stub: Converts a PDE line to a Java line. Replace with real logic as needed.
export function convertPdeLineToJavaLine(file: string, line: number): Location {
	return new Location(file.replace(/\.pde$/, '.java'), line);
}

// Stub: Converts a Java line to a PDE line. Replace with real logic as needed.
export function convertJavaLineToPdeLine(line: number): Location {
	// This stub assumes a 1:1 mapping for demonstration.
	return new Location('MainSketch.pde', line);
}
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

// ...existing code...
