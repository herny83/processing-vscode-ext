# Copilot Instructions for Processing VS Code Extension

## Project Overview

This is a VS Code extension providing **Language Server Protocol (LSP)** support and **Debug Adapter Protocol (DAP)** support for the [Processing](https://processing.org) language. Processing files use the `.pde` extension and are Java-like with sketch-specific semantics (global `setup()`, `draw()`, event callbacks, `color` type, etc.).

Target compatibility: **Processing v4.0 through latest**.

## Architecture

Monorepo with 4 npm workspaces + a thin root orchestrator:

| Component | Entry Point | Purpose |
|-----------|------------|---------|
| `src/` | `src/extension.ts` | Root entry point: loads client + debugger modules |
| `client/` | `client/src/extension.ts` | VS Code extension host: LSP client, Processing path detection, commands |
| `server/` | `server/src/server.ts` | LSP server: completion, hover, goto-def, references, rename, symbols, diagnostics |
| `debugger/` | `debugger/src/extension.ts` | Debug adapter: breakpoint mapping, PDE-to-Java line conversion, HCR |
| `shared/` | `shared/src/index.ts` | Shared types and utilities |

Other key directories:
- `server/src/antlr-sym/` — Processing-specific symbol types (P-prefixed wrappers over antlr4-c3)
- `server/src/grammer/` — ANTLR4-generated parser (ProcessingLexer, ProcessingParser)
- `server/grammar/` — ANTLR4 grammar source files (.g4)
- `assets/` — TextMate grammar, language config, snippets, icons

## Current State

**Compilation**: All 4 workspaces compile with 0 TypeScript errors.

**Dependencies under review**:
- `antlr4ts` (0.5.0-alpha.4) — **abandoned** (2019). Used by generated parser and antlr4-c3. Planned migration to `antlr4` JS runtime.
- `antlr4-c3` (3.0.1) — Provides `CodeCompletionCore` and symbol base classes. Will be kept but needs to work with `antlr4` instead of `antlr4ts`.
- `antlr4` (4.13.2) — Maintained JS runtime. Currently installed but unused. Will replace `antlr4ts`.

**Symbol system**: The server uses antlr4-c3's symbol system (`BaseSymbol`, `ScopedSymbol`, `SymbolTable`) with Processing-specific wrappers in `server/src/antlr-sym/` (`PClassSymbol`, `PType`, `PUtils`, `PSymbolTable`, etc.). This works and will be kept for v1.

## Code Style (strict — apply to ALL generated code)

- **Indentation**: Tabs only (width 4). Never spaces.
- **Braces**: Next-line (Allman) style for ALL blocks (functions, loops, classes, if/else).
- **Single-line if**: No braces. `if (x > 0)\n\tdoSomething();`
- **Multi-line if/else**: Braces required, next-line style.
- **No single-line braced blocks**: Never `if (x) { doSomething(); }`.
- **Comments**: Aligned with block level. Minimal inline comments.
- **Imports**: Explicit, no wildcard `import *` for new code.

Example:
```typescript
for (let i = 0; i < n; i++)
{
	if (x > 0)
		doSomething();
	else
	{
		doSomethingElse();
		doMore();
	}
}

function foo(): void
{
	// Block comment
	let x = 0;
}
```

## Build & Validation

```bash
npm run build          # Build all workspaces
npm run compile        # TypeScript compile (root)
npx tsc --noEmit      # Type-check root (just src/extension.ts)
npx tsc -p server/tsconfig.json --noEmit    # Type-check server
npx tsc -p client/tsconfig.json --noEmit    # Type-check client
npx tsc -p debugger/tsconfig.json --noEmit  # Type-check debugger
npx vsce package       # Package as .vsix
```

## Key Patterns

- **LSP features** are registered in `server/src/server.ts` and implemented in separate files (`completion.ts`, `hover.ts`, `definition.ts`, `references.ts`, `rename.ts`, `DocumentSymbols.ts`, `lens.ts`)
- **Symbol extraction**: `server/src/symbols.ts` (`SymbolTableVisitor`) walks ANTLR parse tree
- **Reference resolution**: `server/src/definitionsMap.ts` (`UsageVisitor`) builds usage maps
- **Sketch state**: `server/src/sketch.ts` (`PdeContentInfo`) manages per-file state
- **Java introspection**: `server/src/javaClassVisitor.ts` reads .class files for library symbols
- **Code completion**: `server/src/completion.ts` uses `antlr4-c3` `CodeCompletionCore` for intelligent suggestions
- **Debugger line mapping**: `debugger/src/sketch.ts` converts PDE lines to Java lines and back
- **Processing path detection**: `client/src/extension.ts` resolves Processing installation per platform

## Master Plan & Progress

All work follows the phased plan in [PLAN.md](PLAN.md). Progress is tracked in [PROGRESS.md](PROGRESS.md).

- **At session start**: Read `PROGRESS.md` to know where to resume.
- **After completing a step**: Update `PROGRESS.md` (check off item, update "Last Session" section).
- **Use `/continue-plan`** to automatically resume from where the last session left off.
- **Never skip steps** — they are ordered by dependency.

## Rules for Copilot

1. **All workspaces must compile.** Run `npx tsc --noEmit` (and per-workspace if needed) after significant changes.
2. When modifying LSP features, follow the existing pattern in `server/src/server.ts` for registration.
3. For ambiguous architectural decisions, present options and wait for user approval.
4. Processing-specific: remember that `.pde` files have implicit class wrapping, global scope for `setup()`/`draw()`, and the `color` pseudo-primitive type.
5. **Always read `PROGRESS.md`** before starting work to know the current state.
6. **Always update `PROGRESS.md`** after completing a step.
7. When working on Phase 2 (antlr4ts → antlr4): change only import paths and API calls. Do NOT restructure the symbol system.
8. Prefer minimal, focused changes. Don't refactor adjacent code unless explicitly asked.
9. **After completing a plan step**, update `CHANGELOG.md`:
   - Add the entry under a new `## [0.X.Y0]` heading (where X.Y = phase.step, e.g., step 2.3 → `[0.2.30]`). The trailing zero leaves room for intermediate commits (v0.2.31, v0.2.32, etc.).
   - Use past tense, list what changed from the user's perspective.
   - Keep entries concise (1-3 bullet points per step).
   - Phase 6.4 (final validation) becomes `[1.0.0]` — the first published release.
   - Also bump `version` in the root `package.json` to match.

## Editing Strategy for Large Files

### 1. Batch by pattern, not by line

When a file has many instances of the same change, do NOT edit them one by one:
- **Fix imports first** (top of file).
- **Then do bulk renames** — use find-and-replace for repeated patterns in one pass.
- **Then fix remaining unique issues** individually.

### 2. Work bottom-to-top within a file

Apply edits from the **bottom of the file upward** to avoid shifting line numbers.

### 3. Re-read after large edit batches

After applying a batch of changes, **re-read the file** before making further edits.

### 4. Split huge files into sub-tasks

For files with many changes (especially `definitionsMap.ts` at ~2000 lines):
- Split into sub-tasks by category (imports, type renames, API changes, structural changes).
- Complete and validate each sub-task before the next.
