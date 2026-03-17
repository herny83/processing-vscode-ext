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

## License
MIT
