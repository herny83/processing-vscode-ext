import * as psymb from "./antlr-sym"
import * as fs from 'fs';
import * as path from "path";
import { ClassReader } from "@xmcl/asm"
import { JavaClassVisitor } from "./javaClassVisitor"
//import * as admZip from "adm-zip";
const AdmZip = require('adm-zip');

let libsSketchCode : Map<string, string> = new Map<string, string>();

export function clearAllModulesAtSketchCode()
{
	libsSketchCode.clear();
}

export function registerModuleAtSketchCode(fullpath:string, hash:string)
{
	libsSketchCode.set(fullpath, hash);
}

export function getModuleHashAtSketchCode(fullpath:string) : string | undefined
{
	return libsSketchCode.get(fullpath);
}

export function unregisterModuleAtSketchCode(fullpath:string)
{
	libsSketchCode.delete(fullpath);
}

export function getAllModulesAtSketchCode() : string[]
{
	return Array.from(libsSketchCode.keys());
}

export function hasModuleAtSketchCode(fullpath:string) : boolean
{
	return libsSketchCode.has(fullpath);
}

export function resolveJarFilesAtDirectory(directoryPath: string) : string[]
{
	let result : string[] = [];
	try
	{
		let fileNames = fs.readdirSync(directoryPath);
		for(let fileName of fileNames)
		{
			if (fileName.endsWith('.jar') )
			{
				const fullPath = path.join(directoryPath, fileName);
				result.push(fullPath);
			}
		}
	}
	catch(ex)
	{
	}
	return result;
}

/**
 * Loads a JAR file and extracts Java class symbols into the provided library table.
 * 
 * @param {string} filename - The path to the JAR file.
 * @param {psymb.PSymbolTable} mainTable - The main table to populate with class symbols.
 * @returns {boolean} - Returns true if the operation was successful, false otherwise.
 */
export function loadJarFile(filename:string, mainTable : psymb.PSymbolTable) : boolean
{
	let result : boolean = true;
	try 
	{
        // Create an instance of AdmZip
        const zip = new AdmZip(filename);

        // Get the entries (files and directories) in the zip archive
        const zipEntries = zip.getEntries();
        // Process each entry in the zip archive
        for (const entry of zipEntries) 
		{
            if (entry.isDirectory)
                continue;
            if(!entry.name || entry.name.length == 0)
                continue;

			if (!entry.name.endsWith('.class') )
				continue;
			if (entry.entryName.startsWith('META-INF/'))
				continue;
			
			let fullName = entry.entryName;
			fullName = fullName.substring(0, fullName.length-6);

			let packageEndIndex = fullName.lastIndexOf('/');

			let packageName = fullName.substring(0, packageEndIndex);
			packageName = packageName.replace(/\//g, psymb.PNamespaceSymbol.delimiter);

			let classFileName = fullName.substring(packageEndIndex+1);
			let className : string = classFileName.substring(classFileName.indexOf('$')+1);
			
			const fileContent : Buffer = entry.getData(); 
			const visitor = new JavaClassVisitor(mainTable, filename, className);
			try {
				const byteArray = new Uint8Array(fileContent.buffer, fileContent.byteOffset, fileContent.byteLength);
				new ClassReader(byteArray).accept(visitor);
			} catch (error) {
				console.error(`Error reading Java Jar class symbol: ${error} (${className})`);
				result = false;
			}
		}
		
    } catch (error) {
        console.error(`Error reading zip file: ${error} for ${filename}`);
		result = false;
    }
	return result;
}

export function loadJavaSymbolsFromFile(filename:string, mainTable : psymb.PSymbolTable)
{
	let filePath = filename;
	let classMap : Map<string, Buffer> = new Map<string, Buffer>();
	let className : string;

	try {
        // Create an instance of AdmZip
        const zip = new AdmZip(filePath);

        // Get the entries (files and directories) in the zip archive
        const zipEntries = zip.getEntries();

        // Process each entry in the zip archive
        for (const entry of zipEntries) 
		{
            if (entry.isDirectory)
                continue;
            if(!entry.name || entry.name.length == 0)
                continue;

            let versionMarker = entry.entryName.indexOf('/');
            let moduleMarker = entry.entryName.indexOf('/', versionMarker+1);
            let classMarker = entry.entryName.lastIndexOf('/');

            let moduleName = entry.entryName.substring(versionMarker+1, moduleMarker);
            let packageName = entry.entryName.substring(moduleMarker+1, classMarker);
            let className = entry.entryName.substring(classMarker+1);
 
			packageName = packageName.replace(/\//g, psymb.PNamespaceSymbol.delimiter);
			const fileContent : Buffer = entry.getData();//.toString('utf-8');
			let fullname = `${packageName}.${className}`;
			classMap.set(fullname, fileContent);
		}
		let i:number=0;
		for(let [key, buffer] of classMap)
		{
			let fullName = key;
			if(key.endsWith(".sig"))
				fullName = fullName.substring(0, fullName.length-4);
			let classFileName = fullName.substring(fullName.lastIndexOf('.')+1);
			className = classFileName.substring(classFileName.indexOf('$')+1);

			const visitor = new JavaClassVisitor(mainTable, filePath, className);
			try
			{
				const byteArray = new Uint8Array(buffer.buffer, buffer.byteOffset, buffer.byteLength);
				new ClassReader(byteArray).accept(visitor);
			} catch (error) {
				console.error(`Error reading Java class symbol: ${error.stack} (${className})`);
			}
			i++;
		}
		console.log(`found ${i} elements`);
		
    } catch (error) {
        console.error(`Error reading java symbol file: ${error} for ${filename} (${className})`);
    }
}
