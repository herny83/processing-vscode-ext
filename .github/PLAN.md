# Processing Extension — v1 Master Plan

> **This is the source of truth for all work on this project.**
> Copilot agents and prompts reference this file.
> Progress is tracked in [PROGRESS.md](PROGRESS.md).

**Goal**: A clean, optimized extension ready for VS Code Marketplace, supporting Processing v4.0+.

> **Just-in-time detailing**: Phases 1-2 are fully detailed. Phases 3-6 are outlined with goals and
> high-level steps. Before starting each of those phases, the first step is always to expand it into
> concrete sub-steps with specific files, actions, and validation — the same way Phases 1-2 are written.
> This avoids planning work that may shift as earlier phases change the codebase.

---

## Phase 1: Finish Unification & Cleanup

**Goal**: Single entry point activating both client (LSP) and debugger. All workspaces compile. Dependencies cleaned up. Extension loads in dev host.

### 1.1 Commit current structural changes

The following changes are in progress and need to be finalized and committed:

- `src/extension.ts` — new unified entry point (loads client + debugger)
- `package.json` — merged extension manifest (languages, debuggers, commands, settings)
- `tsconfig.json` — compiles only `src/` (the thin orchestrator)
- `debugger/server/com.microsoft.java.debug.plugin-0.53.2.jar` — updated JAR
- `debugger/` changes — ProcessingConfigurationProvider, sketch.ts, extension.ts fixes
- `client/src/deployCommand.ts` — export sketch via Processing CLI
- `client/src/extension.ts` — minor client update

**Validation**:
- `npx tsc --noEmit` → 0 errors (root)
- `npx tsc -p client/tsconfig.json --noEmit` → 0 errors
- `npx tsc -p server/tsconfig.json --noEmit` → 0 errors
- `npx tsc -p debugger/tsconfig.json --noEmit` → 0 errors

---

### 1.2 Verify extension loads in dev host

- Press F5 in VS Code, open a `.pde` file
- Confirm LSP client starts (check Output → Processing Language Server)
- Confirm debugger registers (check Debug dropdown for "Processing" config)
- Fix any runtime activation errors

---

### 1.3 Remove debugger's stale vscode-languageclient@6.0.0-next.9

The debugger depends on `vscode-languageclient@6.0.0-next.9` (a 2019 prerelease) while the client uses `^9.0.1`. The debugger uses it at runtime in **one file only**:

**File:** `debugger/src/ProcessingInlineValueProvider.ts` (lines 3, 5, 11-12)

**What it uses:**
- `vscode-languageclient/lib/codeConverter` → `CodeConverter.createConverter()` → `codeConverter.asRange(vscodeRange)` — converts `vscode.Range` → `server.Range`
- `vscode-languageclient/lib/protocolConverter` → `ProtocolConverter.createConverter()` → `protoConverter.asRange(serverRange)` — converts `server.Range` → `vscode.Range`

**Action:** Replace both converters with inline mapping. A `vscode.Range` and `server.Range` (from `vscode-languageserver-types`) have the same shape (`{ start: { line, character }, end: { line, character } }`), so conversion is trivial:

```typescript
// vscode.Range → server.Range
const serverRange: server.Range = {
	start: { line: vscodeRange.start.line, character: vscodeRange.start.character },
	end: { line: vscodeRange.end.line, character: vscodeRange.end.character }
};

// server.Range → vscode.Range
const vscodeRange = new vscode.Range(
	serverRange.start.line, serverRange.start.character,
	serverRange.end.line, serverRange.end.character
);
```

Then:
- Remove `import * as CodeConverter from "vscode-languageclient/lib/codeConverter"`
- Remove `import * as ProtocolConverter from "vscode-languageclient/lib/protocolConverter"`
- Remove `vscode-languageclient` from `debugger/package.json` dependencies
- Keep `vscode-languageserver-types` (still used for `server.Range` type in `languageServerPlugin.ts`)

**Validation:**
- `npx tsc -p debugger/tsconfig.json --noEmit` → 0 errors
- Extension loads, set a breakpoint, verify inline values still appear during debug

---

### 1.4 Clean up unused dependencies

**Read:** `package.json` (root), `server/package.json`, `debugger/package.json`, `client/package.json`

**Actions:**
- `antlr4` was removed from server (unused — antlr4ts comes through antlr4-c3) ✅ already done
- `antlr4ts-cli` in root devDependencies — keep for now (may be needed if grammar needs regeneration in Phase 3)
- Remove any other dead devDependencies
- Run `npm install` to sync lockfile

**Validation**: `npm ls --all 2>&1 | grep -E "extraneous|missing"` → empty

---

### 1.5 Bundling setup (esbuild)

Set up bundling early to catch packaging issues before they compound.

**Actions:**
- `npm install -D esbuild` in root
- Create `esbuild.mjs` (or `scripts/build.js`) with build configs for:
  - `src/extension.ts` → `out/extension.js` (root entry)
  - `client/src/extension.ts` → `client/out/extension.js`
  - `server/src/server.ts` → `server/out/server.js`
  - `debugger/src/extension.ts` → `debugger/out/extension.js`
- Set `external: ['vscode']` for client/debugger/root bundles
- Set `platform: 'node'`, `format: 'cjs'`, `bundle: true`, `sourcemap: true`
- Add `"build:bundle"` script to root `package.json`
- Update `.vscodeignore` if needed

**Validation:**
- `npm run build:bundle` → produces bundled .js files
- `npx vsce package` → .vsix file
- .vsix size < 15MB (before optimization; < 10MB is the target by Phase 6)
- Extension loads from bundled output in dev host (F5)

---

## Phase 2: Isolate antlr4ts (Reduce Dependency Surface)

**Goal**: Centralize all `antlr4ts` imports behind a single shim file. This doesn't remove antlr4ts yet, but isolates it so that a future full migration (parser regeneration + API swap) only needs to change one file. **Zero runtime risk.**

> **Why not full removal?** Full removal requires regenerating the ANTLR parser (risky, needs Java tooling setup)
> and rewriting visitor base classes. That's a v2 task. This phase does the safe mechanical part only.

### 2.1 Create antlr4ts shim

**Create:** `server/src/antlr-types.ts`

This file is the **single point of contact** between the codebase and antlr4ts. All consumer files will import from here instead of from `antlr4ts` directly.

**Contents** — re-export every type used across the 13 consumer files:

```typescript
// server/src/antlr-types.ts
// Centralized re-exports from antlr4ts.
// When migrating to antlr4 JS runtime, only this file needs to change.

export { ParserRuleContext, CommonTokenStream, Token, CharStreams, BailErrorStrategy } from 'antlr4ts';
export { PredictionMode } from 'antlr4ts/atn';
export { ParseTree, TerminalNode, AbstractParseTreeVisitor, ErrorNode } from 'antlr4ts/tree';
export type { ParseTreeListener } from 'antlr4ts/tree/ParseTreeListener';
export type { ParseTreeVisitor } from 'antlr4ts/tree/ParseTreeVisitor';
export { ANTLRErrorListener, RecognitionException, Recognizer } from 'antlr4ts';
```

> **Note:** Verify the exact list by running:
> `grep -rn "from 'antlr4ts" server/src/ --include="*.ts" | grep -v grammer/ | grep -v node_modules`
> and collecting all unique imports.

**Validation:** `npx tsc -p server/tsconfig.json --noEmit` → 0 errors (shim just re-exports, nothing breaks).

---

### 2.2 Update LIGHT consumer files

These files use antlr4ts types only for annotations, `instanceof` checks, or simple property access. Updating them is mechanical: change the import path, nothing else.

**Files** (process in this order):
1. `server/src/lens.ts` — remove commented-out import entirely
2. `server/src/DocumentSymbols.ts` — `ParserRuleContext`, `Token`, `ParseTree`
3. `server/src/definition.ts` — `import * as ast from 'antlr4ts/tree'` → named imports from `./antlr-types`
4. `server/src/hover.ts` — `import * as ast from 'antlr4ts/tree'` → named imports from `./antlr-types`
5. `server/src/rename.ts` — `import * as ast from 'antlr4ts/tree'` → named imports from `./antlr-types`
6. `server/src/references.ts` — `ParserRuleContext`, `import * as ast` → named imports from `./antlr-types`
7. `server/src/sketch.ts` — `ParseTree`, `TerminalNode`, `ParserRuleContext`

**For files using `import * as ast from 'antlr4ts/tree'`**: replace with explicit named imports:
```typescript
// Before:
import * as ast from 'antlr4ts/tree';
// used as: ast.ParseTree, ast.TerminalNode

// After:
import { ParseTree, TerminalNode } from './antlr-types';
```

**Validation after each file:** `npx tsc -p server/tsconfig.json --noEmit 2>&1 | grep "<filename>"` → 0 errors.

---

### 2.3 Update MEDIUM consumer files

These files use antlr4ts types for `instanceof` checks and `Token` property reads. Same mechanical import replacement, but read the file first to confirm no API calls need changing.

**Files:**
1. `server/src/astutils.ts` — `ParseTree`, `TerminalNode`, `ParserRuleContext`, `Token` (29 Token property accesses — all go through `.symbol.line`, `.symbol.type`, etc. which are interface properties, not API calls)
2. `server/src/completion.ts` — `ParserRuleContext`, `Token`, `ParseTree`, `TerminalNode`

**Validation:** `npx tsc -p server/tsconfig.json --noEmit` → 0 errors.

---

### 2.4 Update CRITICAL consumer files

These files extend antlr4ts classes or implement interfaces. The shim re-exports the same classes, so this is still just an import path change — but verify compilation carefully.

**Files:**
1. `server/src/symbols.ts` — `extends AbstractParseTreeVisitor<void>` (import from `./antlr-types`)
2. `server/src/definitionsMap.ts` — `extends AbstractParseTreeVisitor<T>`, uses `ErrorNode`, `TerminalNode`, `Token`
3. `server/src/parser.ts` — `CharStreams`, `CommonTokenStream`, `BailErrorStrategy`, `PredictionMode`, `ParserRuleContext`, `ParseTree`
4. `server/src/grammer/ProcessingErrorListener.ts` — `implements ANTLRErrorListener<Token>` (import from `../antlr-types`)

**Validation after each file:** `npx tsc -p server/tsconfig.json --noEmit 2>&1 | grep "<filename>"` → 0 errors.

**Validation after all:** `npx tsc -p server/tsconfig.json --noEmit` → 0 errors total.

---

### 2.5 Verify no direct antlr4ts imports remain

```bash
grep -rn "from 'antlr4ts" server/src/ --include="*.ts" | grep -v "grammer/" | grep -v "antlr-types.ts"
```

Should return 0 results (only `antlr-types.ts` and generated grammar files import from antlr4ts directly).

**Also verify:** Extension loads, LSP features work (completion, hover, goto def — quick smoke test).

---

## Phase 3: Processing v4.0+ Compatibility

**Goal**: Grammar, stdlib definitions, and runtime support work with Processing 4.0 through latest.

> **Expand before starting**: The first task when beginning this phase is to research Processing 4.x
> changes and turn these high-level steps into concrete sub-steps with specific files, actions, and
> validation — the same way Phase 2 is written. Commit the expanded plan before executing.

### 3.1 Research Processing 4.x language changes

**Read:**
- Processing 4.x release notes / changelog (https://processing.org — check revisions page)
- `server/grammar/ProcessingParser.g4` — current grammar rules
- `server/grammar/ProcessingLexer.g4` — current keywords and tokens
- `server/src/grammer/terms/processingStandards.ts` — current built-in function/type list

**Actions:**
- Document any new syntax, removed features, or changed keywords in Processing 4.x vs 3.x
- Document any Java 17+ features that affect .pde parsing (records, sealed classes, text blocks, etc.)
- Check if Processing 4.x changed the sketch compilation pipeline (affects debugger)

**Deliverable**: A list of concrete grammar/stdlib changes needed (may be empty if Processing 4.x is syntax-compatible). Update this phase's steps based on findings.

---

### 3.2 Update grammar if needed

If 3.1 found differences:
- Modify `.g4` grammar files
- Regenerate parser (use `antlr4ts-cli` for now; full antlr4 JS migration is deferred to v2)
- Test parsing with Processing 4.x example sketches from `test/fixtures/`

---

### 3.3 Update standard library definitions

- `server/src/grammer/terms/processingStandards.ts` — built-in Processing functions/types
- Check against Processing 4.x API reference for new/removed/changed functions
- Update `javaClassVisitor.ts` and `javaModules.ts` if Processing 4.x JARs have a different structure

---

### 3.4 Test Processing path detection

**Read:** `client/src/extension.ts` — the `findProcessingPath()` / path resolution logic.

**Actions:**
- Verify it finds Processing 4.x installations on Windows, macOS, Linux
- Processing 4.x may have changed its directory layout — check where `core.jar`, `processing-java`, and libraries live
- Test with the user's local Processing 4.x installation

---

## Phase 4: LSP Feature Audit

**Goal**: All LSP features work correctly at runtime with real Processing sketches.

> **Expand before starting**: Same as Phase 3 — expand into concrete sub-steps first.

> **Prerequisite: Test fixtures**
> Before starting this phase, create `test/fixtures/` with sample sketches that exercise each feature.
> These sketches serve as the "test harness" for manual and future automated testing.

### 4.0 Create test fixtures

Create `test/fixtures/` with these sample sketches:

**`test/fixtures/basic-sketch/basic.pde`** — exercises core LSP features:
```processing
// Global variables (hover, references, rename)
int x = 100;
float speed = 2.5;
color bg = #FF5522;

void setup() {
  size(800, 600);
  frameRate(60);
}

void draw() {
  background(bg);
  ellipse(x, height/2, 50, 50);
  x += speed;
  if (x > width)
    x = 0;
}

void mousePressed() {
  speed = random(1, 5);
}
```

**`test/fixtures/multi-file-sketch/main.pde`** + **`Ball.pde`** — exercises cross-file features:
```processing
// main.pde
Ball myBall;

void setup() {
  size(400, 400);
  myBall = new Ball(width/2, height/2);
}

void draw() {
  background(0);
  myBall.update();
  myBall.display();
}
```
```processing
// Ball.pde
class Ball {
  PVector pos;
  PVector vel;

  Ball(float x, float y) {
    pos = new PVector(x, y);
    vel = PVector.random2D().mult(3);
  }

  void update() {
    pos.add(vel);
    if (pos.x < 0 || pos.x > width) vel.x *= -1;
    if (pos.y < 0 || pos.y > height) vel.y *= -1;
  }

  void display() {
    fill(255);
    ellipse(pos.x, pos.y, 20, 20);
  }
}
```

**`test/fixtures/syntax-errors/errors.pde`** — exercises diagnostics:
```processing
void setup() {
  size(400, 400)    // missing semicolon
  int x = "hello";  // type mismatch
  unknownFunc();     // undefined function
}
```

**`test/fixtures/generics-sketch/generics.pde`** — exercises generics and complex types:
```processing
ArrayList<PVector> points = new ArrayList<PVector>();
HashMap<String, Integer> scores = new HashMap<String, Integer>();

void setup() {
  size(400, 400);
  points.add(new PVector(100, 200));
  scores.put("player1", 10);
}

void draw() {
  background(0);
  for (PVector p : points) {
    ellipse(p.x, p.y, 10, 10);
  }
}
```

**Validation**: Files exist and parse without crashing the LSP server (open each in dev host, check no errors in Extension Host output).

---

### 4.1 Diagnostics

**Read:** `server/src/grammer/ProcessingErrorListener.ts`, `server/src/grammer/ProcessingErrorStrategy.ts`

**Test with:** `test/fixtures/syntax-errors/errors.pde`

**Check:**
- [ ] Parse errors appear as VS Code diagnostics (red squiggles)
- [ ] Error ranges highlight the correct token, not the whole line
- [ ] Error messages are meaningful (not just "syntax error")
- [ ] Valid files (`basic.pde`, `generics.pde`) produce zero diagnostics

---

### 4.2 Code Completion

**Read:** `server/src/completion.ts`

**Test with:** `test/fixtures/basic-sketch/basic.pde` and `test/fixtures/multi-file-sketch/`

**Check:**
- [ ] Typing `elli` in `draw()` suggests `ellipse`
- [ ] Typing `myBall.` in `main.pde` suggests `update`, `display`, `pos`, `vel`
- [ ] Typing `PVector.` suggests static methods (`random2D`, `add`, etc.)
- [ ] Typing `int` / `float` / `color` in a declaration context suggests types
- [ ] Completion inside `setup()` suggests Processing API functions (`size`, `frameRate`, etc.)

---

### 4.3 Hover

**Read:** `server/src/hover.ts`

**Test with:** `test/fixtures/basic-sketch/basic.pde`

**Check:**
- [ ] Hovering `x` shows `int x`
- [ ] Hovering `ellipse` shows its Processing signature with parameters
- [ ] Hovering `setup` shows `void setup()`
- [ ] Hovering `speed` shows `float speed`
- [ ] Hovering `bg` shows `color bg` (or `int bg` — document which)

---

### 4.4 Go to Definition

**Test with:** `test/fixtures/multi-file-sketch/`

**Check:**
- [ ] Ctrl+click on `myBall` in `main.pde` → jumps to declaration in `main.pde`
- [ ] Ctrl+click on `Ball` (constructor) in `main.pde` → jumps to `Ball` class in `Ball.pde`
- [ ] Ctrl+click on `update()` call in `main.pde` → jumps to `update()` method in `Ball.pde`
- [ ] Ctrl+click on `pos` in `Ball.pde` → jumps to the field declaration

---

### 4.5 Find References & Rename

**Test with:** `test/fixtures/multi-file-sketch/`

**Check:**
- [ ] Right-click → Find All References on `Ball` → shows class definition + constructor call + type annotation
- [ ] Right-click → Find All References on `update` → shows definition in Ball.pde + call in main.pde
- [ ] Rename `myBall` → updates both declaration and all usages in `main.pde`
- [ ] Rename `Ball` class → updates class name in `Ball.pde` + constructor + type reference in `main.pde`

---

### 4.6 Document Symbols & Signature Help

**Test with:** `test/fixtures/multi-file-sketch/Ball.pde`

**Check:**
- [ ] Outline panel shows: `Ball` (class) → `pos` (field), `vel` (field), `Ball(float, float)` (constructor), `update()` (method), `display()` (method)
- [ ] Typing `ellipse(` triggers signature help showing `ellipse(x: float, y: float, w: float, h: float)`
- [ ] Typing `new PVector(` shows constructor parameters
- [ ] Active parameter highlights as you type commas

---

## Phase 5: Debugger Validation

**Goal**: End-to-end debug workflow with Processing 4.x.

> **Expand before starting**: Same approach — expand into concrete steps first.

> **Prerequisite**: A working Processing 4.x installation on the dev machine, configured via
> `processing.path` setting or auto-detected. The test fixtures from Phase 4 are reused here.

### 5.0 Verify debugger prerequisites

**Read:** `debugger/src/ProcessingConfigurationProvider.ts`, `debugger/src/sketch.ts`

**Check:**
- [ ] Processing 4.x is installed and `processing.path` resolves correctly
- [ ] `processing-java` CLI (or equivalent in v4.x) is accessible
- [ ] Java debug plugin JAR (`com.microsoft.java.debug.plugin-0.53.2.jar`) is present in `debugger/server/`
- [ ] Red Hat Java extension is installed (required dependency for debug adapter)

---

### 5.1 Launch configuration

**Test with:** `test/fixtures/basic-sketch/basic.pde`

**Check:**
- [ ] Open `basic.pde`, press F5 → debug configuration auto-resolves
- [ ] Debug dropdown shows "Processing Debugger" option
- [ ] Sketch compiles via Processing CLI (check Debug Console output)
- [ ] Sketch window opens and runs (ball bouncing)

---

### 5.2 Breakpoints and stepping

**Test with:** `test/fixtures/basic-sketch/basic.pde`

**Check:**
- [ ] Set breakpoint on `x += speed;` line → red dot appears
- [ ] Run debug → execution pauses at breakpoint
- [ ] Variables panel shows `x`, `speed`, `bg` with correct values
- [ ] Step Over (F10) advances one line
- [ ] Continue (F5) resumes to next breakpoint hit

---

### 5.3 Run without debugger

**Test with:** `test/fixtures/basic-sketch/basic.pde`

**Check:**
- [ ] Command palette → "Processing: Run Sketch" → compiles and launches without debug adapter
- [ ] Intentionally break `basic.pde` (add syntax error) → Run Sketch → error appears in Output panel
- [ ] Fix the error → Run Sketch → works again

---

### 5.4 Inline values & HCR

**Test with:** `test/fixtures/basic-sketch/basic.pde`

**Check:**
- [ ] During debug pause, inline values show next to variables (`x = 100`, `speed = 2.5`)
- [ ] If `processing.debug.settings.hotCodeReplace` is `auto`: modify a value while paused → verify HCR applies (or document if not supported in Processing 4.x)

---

## Phase 6: Polish & Publish

**Goal**: Production-ready .vsix on VS Code Marketplace.

> **Expand before starting**: Same approach — expand into concrete steps first.
> Use `/publish-checklist` for final validation.

### 6.1 Optimize bundle

- Review esbuild output from step 1.5
- Tree-shake unused code
- Target .vsix size < 10MB
- Verify `.vscodeignore` excludes all non-essential files

---

### 6.2 Marketplace metadata

- Extension icon (already in assets/)
- Comprehensive README with screenshots/GIFs
- Keywords, categories for discoverability
- Repository, bugs, homepage URLs
- CHANGELOG.md up to date

---

### 6.3 CI/CD

- GitHub Actions: build + type-check on PR
- GitHub Actions: publish to Marketplace on tag/release
- Package .vsix as release artifact

---

### 6.4 Final validation

Run `/publish-checklist` prompt, which covers:
- Install from .vsix in clean VS Code profile (`code --profile-temp`)
- Run through all Phase 4 and Phase 5 checks
- Test on Windows (primary), macOS and Linux if possible
- Verify no runtime errors in Extension Host output
- `npx vsce package` → success
