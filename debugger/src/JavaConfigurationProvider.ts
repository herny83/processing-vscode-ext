import * as vscode from "vscode";
import * as path from "path";
import * as fs from "fs";

export class ProcessingJavaDebugConfigProvider implements vscode.DebugConfigurationProvider {
  async resolveDebugConfiguration(
    _folder: vscode.WorkspaceFolder | undefined,
    config: vscode.DebugConfiguration
  ): Promise<vscode.DebugConfiguration | null | undefined> {
    // Only augment Java sessions
    if (config.type !== "java") {
      return config;
    }

    const enable = vscode.workspace.getConfiguration("processing.debug").get<boolean>("enableLibrarySourceLookup", true);
    if (!enable) {
      return config;
    }

    const extra = vscode.workspace.getConfiguration("processing.debug").get<string[]>("additionalSourcePaths", []) ?? [];

    const sourcePaths = await computeWorkspaceSourcePaths();
    const merged = Array.from(new Set([...(config.sourcePaths ?? []), ...sourcePaths, ...extra]));

    if (merged.length > 0) {
      config.sourcePaths = merged;
    }

    // Optional: make sure we don't accidentally skip user libs with step filters
    // Leave existing filters untouched; users can configure in settings if needed.

    return config;
  }
}

async function computeWorkspaceSourcePaths(): Promise<string[]> {
  const roots: string[] = [];
  const folders = vscode.workspace.workspaceFolders ?? [];
  for (const wf of folders) {
    const base = wf.uri.fsPath;

    // Common Java source roots
    const candidates = [
      base,
      path.join(base, "src"),
      path.join(base, "src", "main", "java"),
      path.join(base, "src", "test", "java"),
      path.join(base, "lib", "src"),
      path.join(base, "libraries", "src")
    ];

    for (const p of candidates) {
      if (!roots.includes(p) && fs.existsSync(p) && fs.statSync(p).isDirectory()) {
        // Heuristic: only keep if there are .java files under it (cheap check)
        try {
          const files = await vscode.workspace.findFiles(
            new vscode.RelativePattern(p, "**/*.java"),
            "**/{bin,out,build,target}/**",
            1
          );
          if (files.length > 0) {
            roots.push(p);
          }
        } catch {
          // ignore
        }
      }
    }
  }
  return roots;
}