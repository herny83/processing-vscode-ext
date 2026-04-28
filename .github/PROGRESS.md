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

**Date**: April 27, 2026
**Completed**:
- 2.1.12: PINamespaceSymbol wrapper created and migrated (0 errors)
- Quick-win decoupling: PSymbolConstructor, PIScopedSymbol, PINamespaceSymbol now standalone (no antlr4-c3 imports).
- PSymbolTableBase pivoted to extend PScopedSymbol with inlined `PSymbolTableOptions`. Antlr4C3 SymbolTable inheritance dropped — codebase managed its own dependencies via `PSymbolTable.dependencyTable`, so the SymbolTable surface (`addDependencies`, `addNewSymbolOfType`, `symbolWithContext`, etc.) was unused. `allowDuplicateSymbols` is preserved as a stored option but is a no-op for the addSymbol path the codebase actually uses.

**Next step**: 2.2 — Verify no direct antlr4-c3 imports remain outside antlr-sym/ and generated grammar; LSP smoke test
**Error count**: 0 baseline build across all 5 tsc projects
**Notes**: Remaining antlr4-c3 imports inside antlr-sym/ are 3 active: PBaseSymbol (class extension), PScopedSymbol (class extension), PUtils (one `Modifier` reference, gated on PModifier activation at call sites). PModifier and PMemberVisibility files exist as dormant standalone enums. PBaseSymbol/PScopedSymbol must be migrated together as a pair — they need the BaseSymbol/ScopedSymbol runtime reimplemented (~650 LOC of antlr4-c3 behavior), separate dedicated step.

---


## Phase 1: Finish Unification & Cleanup

- [x] **1.1** Commit current structural changes (src/extension.ts, unified package.json, debugger updates) — 2026-03-23: All structural changes committed, tree clean
- [x] **1.2** Verify extension loads in dev host (LSP + debugger both activate) — 2026-03-23: Extension loads, LSP and debugger activate, type errors resolved
- [x] **1.3** Remove debugger's stale vscode-languageclient@6.0.0-next.9 (inline Range conversion) — 2026-03-24: Removed dependency, inlined Range conversion, validated build
- [x] **1.4** Clean up unused dependencies — 2026-03-24: Removed unused server deps, verified client/debugger clean
- [x] **1.5** Bundling setup (esbuild) — 2026-03-24: Bundling with esbuild set up, all entry points bundle, .vsix size 4.36MB

## Interim: Infrastructure cleanups (post-1.5, pre-2.1)

Work that came up between Phase 1 completion and starting Phase 2. Not part of any numbered phase but material to the v1 publish track.

- [x] **Module-resolution migration** — 2026-04-26 (d7f76f7): `moduleResolution: node` → `bundler` and `module: commonjs` → `esnext` across all 6 tsconfigs. Fixed `this`-binding crashes in `scheduleLookUpReference`/`scheduleLookUpRename`. Removed dead `program` field from `debuggers` contribution.
- [x] **Strict mode on client + debugger** — 2026-04-26 (ed4f717): Fixed 10 strict-mode errors (2 client + 8 debugger). Enabled `"strict": true` in both tsconfigs.
- [x] **Copilot review + wrap-up tooling** — 2026-04-26 (a91aad1, d45fe97): Added `code-reviewer` agent (pinned `model: GPT-4.1`, namespaced tools, behavioral rules over "be thorough" framing), plus `review-changes` and `wrap-up` slash-command wrappers. Wrap-up enforces file-by-file `git add`.
- [x] **Phase 2 plan expansion** — 2026-04-26: Restructured PLAN.md Phase 2 with 4 tracks (A: isolation + consumer strict, B: antlr-sym strict, C: remaining server strict, D: lock-in). Added 2.6, 2.7, 2.8.


## Phase 2: Isolate antlr4-c3 and Tighten Server Type-Safety

> Four tracks. A + B run in parallel (disjoint file sets). C waits for A + B. D is the lock-in gate. See [PLAN.md](PLAN.md) for full per-step detail.


### Track A: antlr4-c3 Processing Symbol Wrappers

- [x] **2.1.1** Translate BaseSymbol to new antlr-sym PBaseSymbol.ts and update all references — 2026-04-26: All references updated to use PBaseSymbol wrapper (thin subclass of antlr4-c3 BaseSymbol), imports fixed, no errors
- [x] **2.1.2** Translate ScopedSymbol to new antlr-sym PScopedSymbol.ts and update all references — 2026-04-27: All references updated to use PScopedSymbol wrapper, imports and types fixed, no errors
- [x] **2.1.3** Translate SymbolTable to new antlr-sym PSymbolTableBase.ts and update all references
- [x] **2.1.4** Translate IScopedSymbol to new antlr-sym PIScopedSymbol.ts and update all references — 2026-04-27: Created PIScopedSymbol wrapper, updated all references and imports, validated 0 errors
- [x] **2.1.5** Translate VariableSymbol to new antlr-sym PVariableSymbol.ts and update all references — 2026-04-27: Created PVariableSymbol wrapper, updated all references, validated all builds (0 errors)
- [x] **2.1.6** Translate SymbolConstructor to new antlr-sym PSymbolConstructor.ts and update all references — 2026-04-27: Created PSymbolConstructor wrapper, updated all references, fixed type constraints, validated all builds (0 errors)
- [x] **2.1.7** Translate Type to new antlr-sym PType (reused existing PType, added baseTypes property to match interface, no new wrapper needed) — 2026-04-27: Confirmed PType fulfills Type interface, added baseTypes, validated all builds (0 errors)
- [x] **2.1.8** Translate TypeKind to new antlr-sym PTypeKind.ts and update all references
- [x] **2.1.9** Translate ReferenceKind to new antlr-sym PReferenceKind.ts and update all references
- [x] **2.1.10** Translate MethodFlags to new antlr-sym PMethodFlags.ts and update all references — 2026-04-27: Now includes all Java method-level modifiers (Virtual, Abstract, Final, Static, Synchronized, Native, Strictfp) for full Processing/Java compatibility. All references migrated, build validated.
- [x] **2.1.11** Translate Modifier to new antlr-sym PModifier.ts and update all references — 2026-04-27: Completed migration to PModifier, updated all references, validated build (0 errors)
- [x] **2.1.12** Translate INamespaceSymbol to new antlr-sym PINamespaceSymbol.ts and update all references — 2026-04-27: Created PINamespaceSymbol thin wrapper interface (extends antlr4-c3 INamespaceSymbol), swapped the only reference in PNamespaceSymbol.ts, added export to index.ts, validated all builds (0 errors)

- [ ] **2.2** Verify no direct antlr4-c3 imports remain outside antlr-sym/ and generated grammar; LSP smoke test

### Track B: `server/src/antlr-sym/` strict cleanup (parallel with A)

- [ ] **2.3** Eliminate ~37 strict-mode errors in P-prefixed symbol wrappers (start with PType.ts, then PUtils.ts, then the rest)

### Track C: Remaining `server/src/` strict cleanup

- [ ] **2.4** Eliminate strict-mode errors in top-level server files not covered by 2.2–2.3 (server.ts, javaModules.ts, javaClassVisitor.ts, etc.)

### Track D: Lock-in

- [ ] **2.5** Enable `"strict": true` in server/tsconfig.json + full validation gate (build + bundle + dev-host smoke test)

## Phase 3: Processing v4.0+

> Expand into concrete sub-steps before starting (see PLAN.md).

- [ ] **3.1** Research Processing 4.x language changes
- [ ] **3.2** Update grammar if needed
- [ ] **3.3** Update standard library definitions
- [ ] **3.4** Test Processing path detection for v4.x

## Phase 4: LSP Feature Audit

> Expand into concrete sub-steps before starting (see PLAN.md).

- [ ] **4.0** Create test fixtures (sample .pde sketches)
- [ ] **4.1** Diagnostics
- [ ] **4.2** Code Completion
- [ ] **4.3** Hover
- [ ] **4.4** Go to Definition
- [ ] **4.5** Find References & Rename
- [ ] **4.6** Document Symbols & Signature Help

## Phase 5: Debugger Validation

> Expand into concrete sub-steps before starting (see PLAN.md).

- [ ] **5.0** Verify debugger prerequisites
- [ ] **5.1** Launch configuration
- [ ] **5.2** Breakpoints and stepping
- [ ] **5.3** Run without debugger
- [ ] **5.4** Inline values & HCR

## Phase 6: Polish & Publish

> Expand into concrete sub-steps before starting (see PLAN.md).

- [ ] **6.1** Optimize bundle
- [ ] **6.2** Marketplace metadata
- [ ] **6.3** CI/CD (GitHub Actions)
- [ ] **6.4** Final validation (use `/publish-checklist`)
