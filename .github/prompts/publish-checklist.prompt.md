---
name: publish-checklist
description: "Pre-publish validation checklist. Runs through compilation, packaging, installation, and feature testing."
---

# Publish Checklist

Run through all validation steps before publishing the extension.

## 1. Compilation

```bash
npx tsc --noEmit
npx tsc -p client/tsconfig.json --noEmit
npx tsc -p server/tsconfig.json --noEmit
npx tsc -p debugger/tsconfig.json --noEmit
```

All must exit with 0 errors.

## 2. Package

```bash
npx vsce package
```

- [ ] Builds .vsix successfully
- [ ] .vsix size is reasonable (< 10MB with bundling, < 30MB without)
- [ ] No warnings about missing files or wrong paths

## 3. Install in clean profile

```bash
code --profile-temp --install-extension processing-0.X.Y.vsix
```

This launches VS Code with a temporary empty profile (no other extensions, no settings). Verify:

- [ ] Extension appears in Extensions panel
- [ ] No errors in Help → Toggle Developer Tools → Console
- [ ] No errors in Output → Extension Host

## 4. LSP Features (open a .pde file from test/fixtures/)

- [ ] Syntax highlighting works
- [ ] Diagnostics appear for syntax errors
- [ ] Completion triggers on typing and after `.`
- [ ] Hover shows type info
- [ ] Go to definition works (Ctrl+click)
- [ ] Find references works
- [ ] Rename works
- [ ] Outline panel shows symbols
- [ ] Signature help appears on `(`

## 5. Debugger (requires Processing 4.x installed)

- [ ] Debug dropdown shows "Processing Debugger"
- [ ] F5 compiles and launches the sketch
- [ ] Breakpoints hit
- [ ] Variables panel shows values
- [ ] "Run Processing Sketch" command works without debugger

## 6. Marketplace Metadata

- [ ] `package.json` has correct version, publisher, repository URL
- [ ] README.md has description, features, screenshots
- [ ] CHANGELOG.md is up to date
- [ ] Extension icon is set

## 7. Publish

```bash
npx vsce publish
```

Or upload .vsix manually at https://marketplace.visualstudio.com/manage
