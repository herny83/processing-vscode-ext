# Changelog

All notable changes to this project will be documented in this file.

Versions follow the plan steps: step X.Y → v0.X.Y0 (e.g., step 1.3 → v0.1.30, step 2.1 → v0.2.10). The trailing zero leaves room for intermediate commits (v0.1.31, v0.1.32, etc.). Phase 6.4 (final validation) → v1.0.0.


## [0.1.50] — Bundling setup (esbuild)

- Added esbuild bundling for all entry points (root, client, server, debugger)
- Bundles output to out/ directories, .vsix size validated (4.36MB)
- Ready for antlr4ts isolation (Phase 2)

## [Unreleased]

## [0.0.1] — Initial Commit

- Project initialization
- LSP server with ANTLR4-based parser for Processing (.pde) files
- Code completion (via antlr4-c3 CodeCompletionCore)
- Hover, go to definition, find references, rename
- Document symbols, signature help
- Debug adapter with breakpoint mapping (PDE→Java)
- Syntax highlighting (TextMate grammar)
- Snippets and language configuration
- Icon theme for Processing files
