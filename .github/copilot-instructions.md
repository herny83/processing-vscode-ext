# Copilot Instructions for Processing VS Code Extension

## Project Overview

This is a VS Code extension providing **Language Server Protocol (LSP)** support and **Debug Adapter Protocol (DAP)** support for the [Processing](https://processing.org) language. Processing files use the `.pde` extension and are Java-like with sketch-specific semantics (global `setup()`, `draw()`, event callbacks, `color` type, etc.).

## Architecture

Monorepo with 4 npm workspaces:

| Workspace | Entry Point | Purpose |
|-----------|------------|---------|
| `client/` | `client/src/extension.ts` | VS Code extension host: LSP client, debug adapter registration |
| `server/` | `server/src/server.ts` | LSP server: completion, hover, goto-def, references, rename, symbols, diagnostics |
| `debugger/` | `debugger/src/adapter.ts` | Debug adapter: breakpoint mapping, PDE-to-Java line conversion, HCR |
| `shared/` | `shared/src/index.ts` | Shared types and utilities |

Other key directories:
- `server/src/symbols/` — **New** custom symbol/type system (the canonical one)
- `server/src/antlr-sym/` — **Legacy** bridge layer being migrated away from antlr4-c3
- `server/src/grammer/` — ANTLR4-generated parser (ProcessingLexer, ProcessingParser)
- `server/grammar/` — ANTLR4 grammar source files (.g4)
- `assets/` — TextMate grammar, language config, snippets, icons

## Current State: Symbol System Migration

The project is migrating from `antlr4-c3` symbols to a custom system in `server/src/symbols/`. The new system is designed but the bridge layer (`server/src/antlr-sym/`) and consumer files are not fully updated, causing ~997 TypeScript compilation errors.

**New symbol system** (`server/src/symbols/`):
- Base: `Symbol` (ISymbol), `ComponentSymbol`, `Type` (IType)
- Symbols: `ClassSymbol`, `InterfaceSymbol`, `EnumSymbol`, `MethodSymbol`, `FieldSymbol`, `VariableSymbol`, `ParameterSymbol`, `ConstructorSymbol`, `NamespaceSymbol`, `GenericParamSymbol`, etc.
- Types: `TypeKind`, `PrimitiveKind`, `ReferenceKind` (in `types/TypeKinds.ts`), `ArrayType`
- Utils: `SymbolUtils`, `TypeUtils`, `CallContext`
- Containers: `SymbolTable`, `LibraryTable`, `SketchSymbol`

**Legacy bridge** (`server/src/antlr-sym/`):
- `PType`, `PUtils`, `PSymbolTable` — still partially used but full of errors
- `PTypedSymbol`, `PThrowsSymbol`, `PEnumMemberSymbol` — shim wrappers
- Several empty placeholder files that need completing or removing

**High-error consumer files** (descending by error count):
- `server/src/definitionsMap.ts` (390 errors) — UsageVisitor, reference maps
- `server/src/javaClassVisitor.ts` (61) — Java library introspection
- `server/src/symbols.ts` (59) — SymbolTableVisitor, AST-to-symbol extraction
- `server/src/sketch.ts` (38) — PdeContentInfo, sketch management
- `server/src/astutils.ts` (33) — AST utilities

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
npx tsc --noEmit      # Type-check without emitting
npx vsce package       # Package as .vsix
```

## Key Patterns

- LSP features are registered in `server/src/server.ts` and implemented in separate files (`completion.ts`, `hover.ts`, `definition.ts`, `references.ts`, `rename.ts`, `DocumentSymbols.ts`, `lens.ts`)
- Symbol extraction: `server/src/symbols.ts` (SymbolTableVisitor) walks ANTLR parse tree
- Reference resolution: `server/src/definitionsMap.ts` (UsageVisitor) builds usage maps
- Sketch state: `server/src/sketch.ts` (PdeContentInfo) manages per-file state
- Java introspection: `server/src/javaClassVisitor.ts` reads .class files for library symbols
- Debugger line mapping: `debugger/src/sketch.ts` converts PDE lines to Java lines and back

## Master Plan, Progress & Migration Map

All work follows the phased plan in [PLAN.md](PLAN.md). Progress is tracked in [PROGRESS.md](PROGRESS.md).

**When migrating code, always consult [MIGRATION-MAP.md](MIGRATION-MAP.md)** — it has the complete old→new mapping for every type, property, method, factory, and utility. If a replacement is marked ❌ MISSING, follow the "Never Delete Logic" decision process below.

- **At session start**: Read `PROGRESS.md` to know where to resume.
- **After completing a step**: Update `PROGRESS.md` (check off item, update "Last Session" section, record error count).
- **Use `/continue-plan`** to automatically resume from where the last session left off.
- **Never skip steps** — they are ordered by dependency.

## Rules for Copilot

1. **Never import from `antlr4-c3`** in new code. Use `server/src/symbols/` types instead.
2. When migrating, always check all usages across the codebase before changing a type or removing code.
3. When implementing LSP features, follow the existing pattern in `server/src/server.ts` for registration.
4. Follow the migration guidelines in `.github/migration-planner-guidelines.md`.
5. For ambiguous architectural decisions, present options and wait for user approval.
6. Validate changes compile: `npx tsc --noEmit` after significant changes.
7. Processing-specific: remember that `.pde` files have implicit class wrapping, global scope for `setup()`/`draw()`, and the `color` pseudo-primitive type.
8. **Always read `PROGRESS.md`** before starting work to know the current state.
9. **Always update `PROGRESS.md`** after completing a step.

## CRITICAL: Never Delete Logic Without a Working Replacement

**NEVER** replace working code with a comment, stub, empty body, `// TODO`, or `undefined`. Deleting functional logic is worse than leaving a type error. Follow this decision process when migrating a function, method, or symbol reference that has no obvious replacement:

### Decision Process

1. **Is there a direct equivalent in `server/src/symbols/`?**
   - YES → Use it. Done.
   - NO → Go to step 2.

2. **Audit what's needed**: Read the old implementation. Understand what it does, what it returns, and who calls it. Then ask: **Is creating the replacement simple?** (Simple = a single function/method with clear behavior, no cascading changes across many files.)
   - YES, it's simple → **Create the full replacement** in the appropriate file in `server/src/symbols/`. The replacement must:
     - Have a complete implementation (not a stub, not just a signature)
     - Reproduce the same behavior as the old code
     - Use only new symbol system types
     - Then update the call site to use it
   - NO, it's complex → Go to step 3.

3. **Leave it as-is.** Keep the old code, even if it causes a type error. Add a single-line comment explaining why:
   ```typescript
   // MIGRATION-PENDING: requires [brief reason, e.g., "PUtils.resolveGeneric equivalent in SymbolUtils"]
   ```
   Do NOT remove the code. Do NOT replace it with a TODO. The error stays until a dedicated migration step handles it properly.

### What counts as "too complex"

- Requires creating multiple new classes or methods
- Requires changes across 3+ files to make consistent
- Depends on other unmigrated code (e.g., needs PType methods that haven't been ported to Type yet)
- Would change the behavior or semantics of the calling code

### Forbidden patterns

```typescript
// NEVER DO THIS:
// TODO: migrate this function
// const result = undefined; // was: PUtils.resolveType(...)
// (removed deprecated call)
```

```typescript
// DO THIS INSTEAD — keep the old code with a migration note:
// MIGRATION-PENDING: requires SymbolUtils.resolveType equivalent
const result = PUtils.resolveType(symbol, context); // still uses legacy
```

## Editing Strategy for Large Files

These rules prevent edit drift and context overflow when modifying files with many changes.

### 1. Batch by pattern, not by line

When a file has many instances of the same change (e.g., 40x `PTypeKind` → `TypeKind`), do NOT edit them one by one. Instead:
- **Fix imports first** (top of file) — add/remove/change import statements.
- **Then do bulk renames** — use find-and-replace or regex-based replacement for repeated patterns (e.g., replace all `PTypeKind` → `TypeKind` in one pass).
- **Then fix remaining unique errors** individually.

### 2. Work bottom-to-top within a file

When making multiple distinct edits to one file, always apply them from the **bottom of the file upward**. Edits that add or remove lines shift line numbers for everything below them. By starting at the bottom, earlier edits don't affect the line numbers of content you haven't touched yet.

### 3. Re-read after large edit batches

After applying a batch of changes (especially bulk renames), **re-read the file** before making further edits. This resets your understanding of the file's current state and prevents targeting stale content.

### 4. Split huge files into sub-tasks

For files with 100+ errors (especially `definitionsMap.ts` with 390):
- **Do not** attempt to fix the entire file in one pass.
- Split into sub-tasks by error category:
  1. Import fixes (add missing, remove broken)
  2. Type renames (PTypeKind → TypeKind, IPType → IType, etc.)
  3. Method/property name updates (old API → new API)
  4. Structural changes (different call patterns, new parameters)
- Complete and validate each sub-task before moving to the next.
- Run `npx tsc --noEmit 2>&1 | grep "<filename>" | wc -l` between sub-tasks to track progress.

### 5. Never hold the whole file in context

For files over ~300 lines, do NOT try to read the entire file at once. Instead:
- Read the import section first (~top 30 lines).
- Then read only the section you're editing (use line ranges).
- Move to the next section after completing the current one.
