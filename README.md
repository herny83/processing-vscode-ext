# Processing VS Code Extension (processing-ext)

Unified VS Code extension for Processing language support, combining all features from previous language (LSP) and debugging extensions in one package.

## Features

### Language Support (LSP)
- Syntax highlighting for .pde files
- Code completion (intelligent suggestions)
- Hover information (documentation, types)
- Go to definition
- Find references
- Rename symbol
- Code actions (quick fixes, refactorings)
- Diagnostics (error/warning reporting)
- Document symbols and outline view
- Signature help (function/method parameters)
- Snippets for common Processing patterns
- Custom icon theme for Processing files
- Export sketch as executable
- Configuration for Processing path, launcher, max problems, trace options

### Debugging
- Build/preprocess .pde files to .java/.class before debugging
- Automatic detection of main sketch class
- Breakpoint mapping between .pde and generated .java files
- Inline values provider for Processing variables
- Watch and evaluate expressions during debug
- Variable inspection and call stack view
- Integration with Red Hat Java extension for classpath/project resolution
- Context menu/editor actions for running/debugging sketches
- Progress reporting and output channel logging
- Custom debug configuration provider
- Troubleshooting and error reporting tools

### General
- Unified configuration and user experience
- Modular, maintainable codebase
- Open source (MIT License)

## Project Structure
- Modular monorepo: client/, server/, debug/, shared/, assets/, test/, scripts/

## Getting Started
Instructions will be added as the project evolves.

## AI-Assisted Development

This project includes configuration for GitHub Copilot (and compatible AI assistants) to help contributors work effectively. All configuration lives in `.github/`.

### Copilot Instructions

`.github/copilot-instructions.md` is loaded automatically by Copilot in VS Code. It contains the project architecture, code style rules, build commands, and key patterns. You don't need to do anything — Copilot reads it on its own.

### Prompts

Prompts are reusable task templates you invoke from the Copilot Chat panel. Type `#` in the chat input to browse them, or reference them directly:

| Prompt | What it does |
|--------|-------------|
| `continue-plan` | Reads PROGRESS.md, picks up the next step from the master plan, executes it |
| `fix-compilation` | Diagnoses and fixes TypeScript compilation errors |
| `antlr4ts-migration` | Migrates a file's imports from antlr4ts to antlr4 |
| `lsp-feature-implementation` | Implements or audits an LSP feature (completion, hover, etc.) |
| `fix-code-style` | Fixes code style violations (tabs, Allman braces) |
| `onboarding` | Scans the project and generates context for a new contributor |

### Agents

Agents are specialized personas you can invoke with `@` in Copilot Chat:

| Agent | What it does |
|-------|-------------|
| `@typescript-expert` | Reviews code for type safety, strict typing, compilation errors |
| `@ProcessingSymbolExpert` | Reviews symbol architecture against Processing language semantics |
| `@onboarding-agent` | Analyzes the project and suggests Copilot customizations |

### Skills

Skills are multi-step procedures agents can use. They are not invoked directly — agents call them when relevant:

| Skill | What it does |
|-------|-------------|
| `lsp-feature-implementation` | Step-by-step procedure for implementing LSP features |

### Master Plan & Progress

- `.github/PLAN.md` — The full phased plan (v1 roadmap)
- `.github/PROGRESS.md` — Checklist tracking what's done and what's next

Use `continue-plan` to automatically resume from where the last session left off.

## License
MIT
