import * as vscode from "vscode";
import * as proc from "child_process";
import * as path from "path";
import * as fs from "fs";
import { getProcessingExecutableName } from "./extension";
import { isPathValid } from "./extension";

let currentSketchPath = "";
let currentOutputPath = "";
let exportEnded = false;

/**
 * Returns whether the Processing CLI requires the `cli` subcommand (4.5+).
 * Old versions used `processing-java` directly; new versions use `processing cli`.
 */
function needsCliSubcommand(processingPath: string, processingVersion?: string): boolean
{
    if (processingVersion)
    {
        const parts = processingVersion.split('.').map(Number);
        if (parts[0] > 4 || (parts[0] === 4 && (parts[1] || 0) >= 5))
            return true;
    }
    // Fallback: if processing-java doesn't exist, assume new CLI
    const ext = process.platform === 'win32' ? '.exe' : '';
    return !isPathValid(path.join(processingPath, 'processing-java' + ext));
}

export async function exportSketch(processingPath: string, sketchPath:string, outputRelativePath: string, processingVersion?: string)
{
   console.log(`[ProcessingDebug] Exporting sketch from ${sketchPath} using Processing v${processingVersion || '<unknown>'}`);
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
    const useCli = needsCliSubcommand(processingPath, processingVersion);

    // Remove trailing path separators to avoid \"escaping issues in shell commands
    const safeSketcthPath = currentSketchPath.replace(/[\\/]+$/, '');
    const safeOutputPath =  currentOutputPath.replace(/[\\/]+$/, '');

    let exportCmd = `"${processingFullPath}"`;
    if (useCli)
        exportCmd += " cli";
    exportCmd += " --force";
    exportCmd += ` --sketch="${safeSketcthPath}"`;
    exportCmd += ` --output="${safeOutputPath}"`;
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
        proc.exec(exportCmd, (error, stdout, stderr) => {
            resolveSketchOutputBuild(error, stdout, stderr);
        });
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

/**
 * Get the total size of all files in a directory (recursively).
 * Returns 0 if the directory doesn't exist yet.
 */
function getDirTotalSize(dirPath: string): number {
    if (!fs.existsSync(dirPath)) return 0;
    let total = 0;
    const entries = fs.readdirSync(dirPath, { withFileTypes: true });
    for (const entry of entries) {
        const fullPath = path.join(dirPath, entry.name);
        if (entry.isDirectory()) {
            total += getDirTotalSize(fullPath);
        } else {
            total += fs.statSync(fullPath).size;
        }
    }
    return total;
}

/**
 * Wait for the output directory to exist, contain files, and stabilize
 * (no size changes for `stableMs` milliseconds).
 */
function waitForOutputStable(outputPath: string, stableMs = 2000, timeoutMs = 120000): Promise<void> {
    return new Promise<void>((resolve, reject) => {
        let lastSize = -1;
        let stableSince = 0;
        const start = Date.now();

        const interval = setInterval(() => {
            const elapsed = Date.now() - start;
            if (elapsed > timeoutMs) {
                clearInterval(interval);
                reject(new Error('Export timed out waiting for output files to stabilize.'));
                return;
            }

            const size = getDirTotalSize(outputPath);
            if (size > 0 && size === lastSize) {
                if (stableSince === 0) stableSince = Date.now();
                if (Date.now() - stableSince >= stableMs) {
                    clearInterval(interval);
                    resolve();
                    return;
                }
            } else {
                stableSince = 0;
            }
            lastSize = size;
        }, 500);
    });
}

async function resolveSketchOutputBuild(error: proc.ExecException | null, stdout: string, stderr: string)
{
    if (error) {
        exportEnded = true;
        vscode.window.showErrorMessage(`Export failed: ${stderr || error.message}`);
        return;
    }
    if(stderr && stderr.trim() !== '')
        console.error(stderr);
    console.log(stdout);

    // Processing 4.5+ spawns a separate process for the actual export,
    // so the launcher exits before files are fully written.
    // Poll the output directory until files appear and stabilize.
    try {
        await waitForOutputStable(currentOutputPath);
        vscode.window.showInformationMessage('Processing Sketch: Exporting completed!');
    } catch (e: any) {
        vscode.window.showErrorMessage(`Export may have failed: ${e.message}`);
    } finally {
        exportEnded = true;
    }
}



