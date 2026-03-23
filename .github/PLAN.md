# Processing Extension — Master Plan

> **This is the source of truth for all work on this project.**
> Copilot agents and prompts reference this file.
> Progress is tracked in [PROGRESS.md](PROGRESS.md).

---

## Phase 1: Compilation — Get to Zero TypeScript Errors

**Goal**: `npx tsc --noEmit` exits with 0 errors.
**Current state**: ~997 errors across server and debugger.

Migration must follow dependency order: fix foundations first, then consumers.

### 1.1 Fix new symbol system's own errors (5 errors)

Small type issues in the new symbol classes themselves. These must be clean before anything can depend on them.

**Files:**
- `server/src/symbols/ClassSymbol.ts` (1 error)
- `server/src/symbols/InterfaceSymbol.ts` (1 error)
- `server/src/symbols/EnumSymbol.ts` (1 error)
- `server/src/symbols/LibraryTable.ts` (2 errors)

**Acceptance**: `npx tsc --noEmit 2>&1 | grep "server/src/symbols/" | grep "error TS" | wc -l` → 0

---

### 1.2 Fix PType.ts (70 errors)

The core bridge type. Missing imports for `TypeKind`, `PrimitiveKind`, `ReferenceKind`, `IType`, `IPType` that were removed from antlr4-c3 but never imported from the new system.

**File:** `server/src/antlr-sym/src/PType.ts`

**Root causes:**
- `TypeKind` not imported → add `import { TypeKind, PrimitiveKind, ReferenceKind } from '../../symbols/types/TypeKinds';`
- `IType` not imported → add `import { IType } from '../../symbols/Type';`
- `IPType` undefined → define as interface or alias to `IType` with PType-specific extensions
- `PPrimitiveKind` undefined → alias or replace with `PrimitiveKind`

**Acceptance**: `npx tsc --noEmit 2>&1 | grep "PType.ts" | grep "error TS" | wc -l` → 0

---

### 1.3 Fix PThrowsSymbol.ts and PEnumMemberSymbol.ts (4 errors)

Type conflicts: `type: PType` not assignable to base class `type: Type`. Also `"throws"` not assignable to `SymbolKind`.

**Files:**
- `server/src/antlr-sym/src/PThrowsSymbol.ts` (2 errors)
- `server/src/antlr-sym/src/PEnumMemberSymbol.ts` (2 errors)

**Approach:** Either make PType extend/implement Type properly, or change these to use `Type` directly. Depends on 1.2.

**Acceptance**: 0 errors in both files.

---

### 1.4 Fix PUtils.ts (45 errors)

Large utility class. Still imports `ReferenceKind, Modifier` from `antlr4-c3`. Has its own `CallContext` that conflicts with `symbols/CallContext`.

**File:** `server/src/antlr-sym/src/PUtils.ts`

**Root causes:**
- `import { ReferenceKind, Modifier } from "antlr4-c3"` → replace with `import { ReferenceKind } from '../../symbols/types/TypeKinds'; import { Modifier } from '../../symbols/Modifier';`
- `CallContext` class here duplicates `symbols/CallContext` → unify or redirect
- References to `PMethodSymbol` (deleted) → use `MethodSymbol`
- Type mismatches between `PType` and `IType` → depends on 1.2 resolution

**Acceptance**: 0 errors in PUtils.ts.

---

### 1.5 Fix PSymbolTable.ts (8 errors)

Extends `symb.SymbolTable` from antlr4-c3. Duplicate `ComponentSymbol` imports. Calls non-existent methods (`qualifiedName()`, `symbolFromPath()`).

**File:** `server/src/antlr-sym/src/PSymbolTable.ts`

**Root causes:**
- `extends symb.SymbolTable` → extend new `SymbolTable` from `symbols/SymbolTable`
- Remove `import { ISymbolTableOptions } from "antlr4-c3/lib/src/types.js"`
- Duplicate `ComponentSymbol` import → consolidate
- `qualifiedName()` doesn't exist on new symbols → add to `ComponentSymbol` or use `name` + parent chain
- `symbolFromPath()` doesn't exist on `LibraryTable` → add method or replace with `SymbolUtils.findSymbol()`

**Acceptance**: 0 errors in PSymbolTable.ts.

---

### 1.6 Fix antlr-sym/index.ts exports

Barrel file needs to export only what still exists, with correct types.

**File:** `server/src/antlr-sym/index.ts`

**Acceptance**: 0 errors. All exports resolve.

---

### 1.7 Fix astutils.ts (33 errors)

Utilities used by most consumer files. Depends only on `symbols/`.

**File:** `server/src/astutils.ts`

**Dependencies:** Only imports from `symbols/` (Symbol, Type, TypeKinds, GenericParamSymbol, CallContext, SymbolUtils, ArrayType). Should be fixable after Phase 1.1.

**Likely issues:** Type mismatches due to `PType` vs `Type`, method signatures not matching new symbol API.

**Acceptance**: 0 errors in astutils.ts.

---

### 1.8 Fix DocumentSymbols.ts (5 errors)

No local imports except grammer/. Should be straightforward.

**File:** `server/src/DocumentSymbols.ts`

**Acceptance**: 0 errors.

---

### 1.9 Fix javaClassVisitor.ts (61 errors)

Java library introspection. Imports from both `symbols/` and `antlr-sym`. References deleted `PInterfaceSymbol`, undefined `PTypeKind`, `symb.ReferenceKind`.

**File:** `server/src/javaClassVisitor.ts`

**Dependencies:** `symbols/*`, `antlr-sym`

**Key changes:**
- `import * as symb from 'antlr4-c3'` → remove, replace `symb.ReferenceKind` with direct import
- `psymb.PInterfaceSymbol` → `InterfaceSymbol`
- `psymb.PTypeKind` → `TypeKind`
- All PType usages → Type/IType

**Acceptance**: 0 errors.

---

### 1.10 Fix javaModules.ts (4 errors)

**File:** `server/src/javaModules.ts`
**Dependencies:** `antlr-sym`, `javaClassVisitor` (do after 1.9)

**Acceptance**: 0 errors.

---

### 1.11 Fix symbols.ts — SymbolTableVisitor (59 errors)

The AST visitor that builds the symbol tree. Core to everything.

**File:** `server/src/symbols.ts`

**Dependencies:** `sketch`, `astutils`, `symbols/*`, `syslogs`

**Key changes:** Type mismatches between old and new symbol APIs. Method signatures, generic handling, scope creation.

**Acceptance**: 0 errors.

---

### 1.12 Fix sketch.ts (38 errors)

PdeContentInfo — manages per-file state. Central hub that connects parsing → symbols → LSP features.

**File:** `server/src/sketch.ts`

**Dependencies:** `parser`, `definitionsMap`, `javaModules`, `astutils`, `syslogs`, `settings`

**Key changes:**
- `import * as symb from 'antlr4-c3'` → remove
- `psymb.PInterfaceSymbol` → `InterfaceSymbol`
- `psymb.PTypeKind` → `TypeKind`
- `IPType` → `IType`

**Acceptance**: 0 errors.

---

### 1.13 Fix definitionsMap.ts — UsageVisitor (390 errors)

The largest error source. Builds reference/usage maps. Heavily uses deprecated types.

**File:** `server/src/definitionsMap.ts`

**Dependencies:** `sketch`, `symbols/*`, `astutils`

> **WARNING: This is the biggest file. Follow the "Editing Strategy for Large Files" in copilot-instructions.md.**
> Do NOT attempt all 390 errors in one pass. Split into sub-tasks:

**Sub-task A — Imports**: Fix the import section at the top. Remove antlr4-c3 imports, add imports from `symbols/`. Validate.

**Sub-task B — Type renames (bulk)**: Replace all instances of:
- `PTypeKind` → `TypeKind` (~40 occurrences)
- `IPType` → `IType`
- `PType` → `Type` (where used as a type annotation)
Use find-and-replace, not line-by-line edits. Validate.

**Sub-task C — Method/property renames**: Fix calls to methods that changed names in the new symbol system (e.g., `extends` → `superClass`, `implements` → `interfaces`). Read sections of the file in chunks, fix, re-read. Validate.

**Sub-task D — Structural changes**: Fix any remaining errors that require logic changes (different call patterns, new parameters, type narrowing). Validate.

**Acceptance**: `npx tsc --noEmit 2>&1 | grep "definitionsMap.ts" | grep "error TS" | wc -l` → 0

---

### 1.14 Fix LSP feature files

All depend on `sketch`, `astutils`, and `symbols/`. Do after 1.7, 1.12, 1.13.

**Files and error counts:**
- `server/src/completion.ts` (21 errors)
- `server/src/hover.ts` (17 errors)
- `server/src/references.ts` (17 errors)
- `server/src/rename.ts` (18 errors)
- `server/src/definition.ts` (included in above if errors exist)
- `server/src/lens.ts` (if errors exist)

**Common issues:** Imports from `antlr-sym`, PType/PTypeKind usage, method name mismatches.

**Acceptance**: 0 errors across all feature files.

---

### 1.15 Fix server.ts (10 errors)

**File:** `server/src/server.ts`

**Dependencies:** All feature files, sketch, settings, DocumentSymbols. Do last in server.

**Acceptance**: 0 errors.

---

### 1.16 Fix remaining server files

**Files:**
- `server/src/settings.ts` (4 errors)
- `server/src/codeRefactoring.ts` (2 errors)
- `server/src/perfo.ts` (1 error)

**Acceptance**: 0 errors.

---

### 1.17 Fix debugger errors (30 errors)

Separate from server migration. Mostly missing packages and strict null checks.

**Files and issues:**
- `debugger/src/adapter.ts` (2) — missing `vscode-debugadapter`, `vscode-debugprotocol` packages
- `debugger/src/launchCommand.ts` (3) — missing `@types/lodash`, `string | undefined` issues
- `debugger/src/ProcessingConfigurationProvider.ts` (2) — missing `@types/lodash`, type narrowing
- `debugger/src/ProcessingDebugAdapterDescriptorFactory.ts` (1) — `unknown` to `Error` cast
- `debugger/src/ProcessingInlineValueProvider.ts` (4) — `possibly undefined` null checks
- `debugger/src/processPicker.ts` (5) — `string | undefined`, callback type
- `debugger/src/processTree.ts` (3) — `string | undefined`
- `debugger/src/progressImpl.ts` (2) — uninitialized properties

**Steps:**
1. `npm install --save-dev @types/lodash` and add `vscode-debugadapter` `vscode-debugprotocol` to dependencies
2. Fix strict null checks (add `!` assertions or proper guards)
3. Fix type narrowing issues

**Acceptance**: 0 errors across all debugger files.

---

### 1.18 Cleanup antlr-sym

After all consumers are migrated, clean up the bridge layer.

- Delete empty files: `PParameterSymbol.ts`, `PGenericParamSymbol.ts`, `PLibraryTable.ts`, `PNamespaceSymbol.ts`
- Evaluate if `PType`, `PUtils`, `PSymbolTable` can be fully removed or still serve as thin adapters
- Goal: minimize antlr-sym to only what's genuinely needed, or remove entirely

**Acceptance**: No file in `antlr-sym/` imports from `antlr4-c3`. Ideally the directory is deleted.

---

### 1.19 Final validation

- `npx tsc --noEmit` → 0 errors
- `npx vsce package` → builds .vsix successfully
- Extension loads in VS Code Extension Development Host (F5)

---

## Phase 2: LSP Features — Audit and Complete

**Goal**: All LSP features work correctly with the new symbol system.
**Prerequisite**: Phase 1 complete (compiles).

### 2.1 Diagnostics / Linting

**File:** Error reporting via `ProcessingErrorListener.ts` + `ProcessingErrorStrategy.ts`

**Tasks:**
- Verify ANTLR parse errors are reported as VS Code diagnostics
- Verify error ranges map correctly to PDE file positions
- Test with intentional syntax errors in a `.pde` file
- Add semantic error reporting (e.g., undefined variable, type mismatch) if not present

---

### 2.2 Code Completion

**File:** `server/src/completion.ts`

**Tasks:**
- Verify `antlr4-c3` CodeCompletionCore still works with new symbol system
- Test dot-completion after objects (e.g., `myPVector.`)
- Test global function completion (Processing API: `ellipse`, `rect`, etc.)
- Test type completion in declarations
- Verify trigger character `.` works

---

### 2.3 Hover

**File:** `server/src/hover.ts`

**Tasks:**
- Verify hover shows type information for variables, methods, classes
- Test hover on Processing API functions (should show Processing-style signatures)
- Test hover on user-defined symbols
- Verify markdown formatting is correct

---

### 2.4 Go to Definition

**File:** `server/src/definition.ts`

**Tasks:**
- Test navigation to user-defined classes, methods, variables
- Test cross-file navigation (multiple `.pde` files)
- Test navigation to Processing library source (if available)
- Verify correct range highlighting at target

---

### 2.5 Find References

**File:** `server/src/references.ts`

**Tasks:**
- Test finding all usages of a variable, method, class
- Test cross-file references
- Test that method overrides are included
- Test that constructor references include class name references

---

### 2.6 Rename

**File:** `server/src/rename.ts`

**Tasks:**
- Test renaming a variable (local scope)
- Test renaming a method (updates all call sites)
- Test renaming a class (updates constructors, type references, file references)
- Test cross-file rename
- Verify no renames of Processing API symbols (should be rejected or warned)

---

### 2.7 Document Symbols (Outline)

**File:** `server/src/DocumentSymbols.ts`

**Tasks:**
- Verify outline shows classes, methods, fields, enums
- Test hierarchical nesting (methods inside classes)
- Test with multiple `.pde` files
- Verify symbol kinds are correct (SymbolKind mapping)

---

### 2.8 Signature Help

**Registered in:** `server/src/server.ts`

**Tasks:**
- Verify parameter hints appear when typing `(`
- Test with overloaded methods
- Test with Processing API functions (e.g., `ellipse(x, y, w, h)`)
- Verify active parameter highlighting

---

### 2.9 Code Lens

**File:** `server/src/lens.ts` (currently disabled — returns null)

**Tasks:**
- Decide whether to re-enable (reference counts above methods/classes)
- If yes, implement using the new symbol system's reference data
- If no, remove the dead code

---

### 2.10 Re-enable Preprocessing

**File:** `server/src/preprocessing.ts` (currently commented out)

**Tasks:**
- Evaluate if preprocessing is needed for correct symbol extraction
- If yes, re-implement PDE-to-Java transformation
- If no, document why and remove

---

## Phase 3: Debugger — End-to-End Workflow

**Goal**: Debug a Processing sketch from VS Code: set breakpoints, step through, inspect variables.
**Prerequisite**: Phase 1 complete.

### 3.1 Debug adapter setup

**Tasks:**
- Verify `debugger/src/adapter.ts` implements the Debug Adapter Protocol session
- Verify `ProcessingDebugAdapterDescriptorFactory` connects to the Java debugger
- Test that `startDebugSession()` LSP command returns a valid debug port

---

### 3.2 Launch configuration

**Tasks:**
- Verify `ProcessingConfigurationProvider` resolves `.pde` files correctly
- Test that `processing.path` setting is used to find the Processing installation
- Test launch with default config (just opening a `.pde` file and pressing F5)

---

### 3.3 Breakpoint mapping

**Tasks:**
- Verify `BreakpointTracker` converts PDE line numbers to Java line numbers
- Test setting breakpoints in `.pde` files
- Verify breakpoints hit at correct locations
- Test breakpoints across multiple `.pde` files

---

### 3.4 Inline values

**Tasks:**
- Verify `ProcessingInlineValueProvider` shows variable values during debugging
- Test with primitive types, objects, arrays
- Verify PDE-to-Java line conversion for inline values

---

### 3.5 Hot code replacement

**Tasks:**
- Test auto and manual HCR modes
- Verify `processing.debug.settings.hotCodeReplace` setting works
- Test error handling when HCR fails

---

### 3.6 Compile and run (no debugger)

**Tasks:**
- Implement or verify `processing.runSketch` command
- Test that it compiles and launches the sketch without debug adapter
- Test error reporting from compilation

---

## Phase 4: Polish — Testing, Bundling, Publishing

**Goal**: Production-ready extension on VS Code Marketplace.
**Prerequisite**: Phases 1-3 complete.

### 4.1 Test infrastructure

**Tasks:**
- Set up Mocha + Chai in each workspace
- Write unit tests for new symbol system (server/src/symbols/)
- Write unit tests for type resolution (astutils, definitionsMap)
- Write integration tests for LSP features (completion, hover, etc.)
- Add test scripts to package.json
- Target: >70% coverage on symbol system

---

### 4.2 Bundling

**Tasks:**
- Add esbuild or webpack for extension bundling
- Configure to produce single .js files per workspace
- Verify .vsix size is reasonable (<10MB)
- Update `.vscodeignore` to exclude source files

---

### 4.3 CI/CD

**Tasks:**
- Add GitHub Actions workflow for build + test on PR
- Add workflow for publishing to VS Code Marketplace on tag/release
- Add workflow for packaging .vsix as release artifact

---

### 4.4 Marketplace metadata

**Tasks:**
- Add extension icon to package.json
- Write comprehensive README with screenshots
- Add keywords, categories for discoverability
- Fill in repository, bugs URLs
- Update CHANGELOG.md

---

### 4.5 Final validation

**Tasks:**
- Install extension from .vsix in clean VS Code
- Test all features end-to-end with a real Processing sketch
- Test on Windows, macOS, Linux if possible
- Verify no runtime errors in Extension Host output
