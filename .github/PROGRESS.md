# Progress Tracker

> **Copilot**: Read this file at the start of every session. Update it after completing each step.
> See [PLAN.md](PLAN.md) for full details on each step.

## How to Update

After completing a step:
1. Change `[ ]` to `[x]`
2. Add a one-line note with date and what was done
3. Update the "Last Session" section at the top

---


## Last Session

**Date**: March 22, 2026
**Completed**: 1.3 — Fixed PThrowsSymbol.ts and PEnumMemberSymbol.ts: type property and SymbolKind
**Next step**: 1.4 — Fix PUtils.ts — replace antlr4-c3 imports, unify CallContext
**Error count**: ~997
**Notes**: Step 1.3 verified, both files compile clean

---

## Phase 1: Compilation

- [x] **1.1** Fix new symbol system errors (ClassSymbol, InterfaceSymbol, EnumSymbol, LibraryTable)  # 2026-03-22: All errors fixed, verified clean
- [x] **1.2** Fix PType.ts — add missing TypeKind/PrimitiveKind/ReferenceKind/IType imports  # 2026-03-22: All errors fixed, verified clean
- [x] **1.3** Fix PThrowsSymbol.ts and PEnumMemberSymbol.ts — type: PType vs Type conflict  # 2026-03-22: All errors fixed, verified clean
- [ ] **1.4** Fix PUtils.ts — replace antlr4-c3 imports, unify CallContext
- [ ] **1.5** Fix PSymbolTable.ts — stop extending antlr4-c3 SymbolTable
- [ ] **1.6** Fix antlr-sym/index.ts exports
- [ ] **1.7** Fix astutils.ts
- [ ] **1.8** Fix DocumentSymbols.ts
- [ ] **1.9** Fix javaClassVisitor.ts — remove antlr4-c3 import, replace PInterfaceSymbol/PTypeKind
- [ ] **1.10** Fix javaModules.ts
- [ ] **1.11** Fix symbols.ts (SymbolTableVisitor)
- [ ] **1.12** Fix sketch.ts — remove antlr4-c3 import, replace deprecated types
- [ ] **1.13** Fix definitionsMap.ts (390 errors) — biggest migration task
- [ ] **1.14** Fix LSP feature files (completion, hover, references, rename, definition, lens)
- [ ] **1.15** Fix server.ts
- [ ] **1.16** Fix remaining server files (settings, codeRefactoring, perfo)
- [ ] **1.17** Fix debugger errors — install missing deps, fix null checks
- [ ] **1.18** Cleanup antlr-sym — remove empty files, evaluate full removal
- [ ] **1.19** Final validation — 0 errors, vsix builds, extension loads

## Phase 2: LSP Features

- [ ] **2.1** Diagnostics / Linting
- [ ] **2.2** Code Completion
- [ ] **2.3** Hover
- [ ] **2.4** Go to Definition
- [ ] **2.5** Find References
- [ ] **2.6** Rename
- [ ] **2.7** Document Symbols (Outline)
- [ ] **2.8** Signature Help
- [ ] **2.9** Code Lens
- [ ] **2.10** Re-enable Preprocessing

## Phase 3: Debugger

- [ ] **3.1** Debug adapter setup
- [ ] **3.2** Launch configuration
- [ ] **3.3** Breakpoint mapping
- [ ] **3.4** Inline values
- [ ] **3.5** Hot code replacement
- [ ] **3.6** Compile and run (no debugger)

## Phase 4: Polish

- [ ] **4.1** Test infrastructure
- [ ] **4.2** Bundling
- [ ] **4.3** CI/CD
- [ ] **4.4** Marketplace metadata
- [ ] **4.5** Final validation
