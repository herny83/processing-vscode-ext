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



**Date**: March 24, 2026
**Completed**: 1.5 — Bundling setup (esbuild), validated .vsix size and output
**Next step**: 2.1 — Create antlr4ts shim (server/src/antlr-types.ts)
**Error count**: 0 (all workspaces compile)
**Notes**: Bundling with esbuild set up, all entry points bundle, .vsix size 4.36MB, ready for antlr4ts isolation.

---


## Phase 1: Finish Unification & Cleanup

- [x] **1.1** Commit current structural changes (src/extension.ts, unified package.json, debugger updates) — 2026-03-23: All structural changes committed, tree clean
- [x] **1.2** Verify extension loads in dev host (LSP + debugger both activate) — 2026-03-23: Extension loads, LSP and debugger activate, type errors resolved
- [x] **1.3** Remove debugger's stale vscode-languageclient@6.0.0-next.9 (inline Range conversion) — 2026-03-24: Removed dependency, inlined Range conversion, validated build
- [x] **1.4** Clean up unused dependencies — 2026-03-24: Removed unused server deps, verified client/debugger clean
- [x] **1.5** Bundling setup (esbuild) — 2026-03-24: Bundling with esbuild set up, all entry points bundle, .vsix size 4.36MB

## Phase 2: Isolate antlr4ts

- [ ] **2.1** Create antlr4ts shim (server/src/antlr-types.ts)
- [ ] **2.2** Update LIGHT consumer files (7 files: lens, DocumentSymbols, definition, hover, rename, references, sketch)
- [ ] **2.3** Update MEDIUM consumer files (astutils, completion)
- [ ] **2.4** Update CRITICAL consumer files (symbols, definitionsMap, parser, ProcessingErrorListener)
- [ ] **2.5** Verify no direct antlr4ts imports remain outside shim + generated grammar

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
