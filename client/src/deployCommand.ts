import * as vscode from "vscode";
import * as proc from "child_process";
import * as path from "path";
import * as fs from "fs";
import { getProcessingExecutableName } from "./extension";

let currentSketchPath = "";
let currentOutputPath = "";
let exportEnded = false;

export async function exportSketch(processingPath: string, sketchPath:string, outputRelativePath: string, processingVersion?: string)
{
   console.log(`[ProcessingDebug] Exporting sketch from ${sketchPath}`);
    if (!sketchPath) {
        vscode.window.showErrorMessage("Cannot find a valid Processing sketch in the workspace.");
        return;
    }
    currentSketchPath = sketchPath;
    currentOutputPath = path.join(sketchPath, outputRelativePath);

    if (!processingPath) {
        vscode.window.showErrorMessage("Processing path is not configured. Please set 'processing.path' in your settings.");
        return;
    }

    const execName = getProcessingExecutableName(processingVersion);
    let processingFullPath = path.join(processingPath, execName);

    let exportCmd = `"${processingFullPath}"`;
    exportCmd += " --force";
    exportCmd += ` --sketch="${currentSketchPath}"`;
    exportCmd += ` --output="${currentOutputPath}"`;
    exportCmd += " --variant=windows-amd64";
    exportCmd += " --export";

    let options : vscode.ProgressOptions = {
        location: vscode.ProgressLocation.Notification,
        title: "Processing Sketch",
        cancellable: false
    };

    console.log(`[ProcessingDebug] Export command: ${exportCmd}`);
    exportEnded = false;
    await vscode.window.withProgress(options, async (progress) => {
        progress.report({ message: "Exporting application..." });
        proc.exec(exportCmd, resolveSketchOutputBuild);
        // Wait until exportEnded becomes true before closing progress
        await WaitUntilExportEnded();
    });
}

export async function WaitUntilExportEnded(): Promise<void> {
    await new Promise<void>((resolve) => {
        const interval = setInterval(() => {
            if (exportEnded) {
                clearInterval(interval);
                resolve();
            }
        }, 100);
    });
}

function resolveSketchOutputBuild(error: proc.ExecException, stdout: string, stderr: string)
{
    exportEnded = true;
    if (error) {
        vscode.window.showErrorMessage(`Export failed: ${stderr || error.message}`);
        return;
    }
    if(stderr && stderr.trim() !== '')
        console.error(stderr);
    console.log(stdout);
    vscode.window.showInformationMessage('Processing Sketch: Exporting completed!');
}



