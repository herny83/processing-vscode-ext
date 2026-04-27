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


## **Build/Compile Cleanliness Enforcement**

**Step 0 (before any phase/step):**
- Run `npx tsc --noEmit` and all per-workspace builds (see Validation below).
- If any errors are found, STOP and fix them before starting the step.
- Only proceed when all workspaces build with 0 errors.

**After each step:**
- Run the same build/compile checks again.
- If errors are found, STOP and fix them before marking the step complete or updating progress.

**This rule applies to every phase and step in this plan.**

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

> and rewriting visitor base classes. That's a v2 task. This phase does the safe mechanical part only.
> `grep -rn "from 'antlr4ts" server/src/ --include="*.ts" | grep -v grammer/ | grep -v node_modules`
> and collecting all unique imports.
> For each file visited, in the same commit:
> 1. Swap `antlr4ts` imports → `./antlr-types`.
> 2. Fix that file's strict-mode errors: `npx tsc -p server --noEmit --strict 2>&1 | grep <filename>`.
> 3. Delete dead branches that strict narrowing reveals (we hit one in `references.ts` already during prior work — keep an eye out).
> 4. Verify file is strict-clean before moving on.
>
> If a single combined commit per file gets too noisy (mainly for `definitionsMap.ts` and `symbols.ts`),
> split into two commits per file (import swap, then strict fix) — but **same PR/branch** so they're reviewed as a pair.

## Phase 2: Isolate antlr4-c3 and Tighten Server Type-Safety

> Four tracks. A + B run in parallel (disjoint file sets). C waits for A + B. D is the lock-in gate. See [PROGRESS.md](PROGRESS.md) for full per-step detail.

### Track A: antlr4-c3 Processing Symbol Wrappers

- 2.1.1 Translate BaseSymbol to new antlr-sym PBaseSymbol.ts and update all references
- 2.1.2 Translate ScopedSymbol to new antlr-sym PScopedSymbol.ts and update all references
- 2.1.3 Translate SymbolTable to new antlr-sym PSymbolTableBase.ts and update all references
- 2.1.4 Translate IScopedSymbol to new antlr-sym PIScopedSymbol.ts and update all references
- 2.1.5 Translate VariableSymbol to new antlr-sym PVariableSymbol.ts and update all references
- 2.1.6 Translate SymbolConstructor to new antlr-sym PSymbolConstructor.ts and update all references
- 2.1.7 Translate Type to new antlr-sym PTypeBase.ts and update all references
- 2.1.8 Translate TypeKind to new antlr-sym PTypeKindBase.ts and update all references
- 2.1.9 Translate ReferenceKind to new antlr-sym PReferenceKind.ts and update all references
- 2.1.10 Translate MethodFlags to new antlr-sym PMethodFlags.ts and update all references
- 2.1.11 Translate Modifier to new antlr-sym PModifier.ts and update all references
- 2.1.12 Translate INamespaceSymbol to new antlr-sym PINamespaceSymbol.ts and update all references

- 2.2 Verify no direct antlr4-c3 imports remain outside antlr-sym/ and generated grammar; LSP smoke test

### Track B: `server/src/antlr-sym/` strict cleanup (parallel with A)

- 2.3 Eliminate ~37 strict-mode errors in P-prefixed symbol wrappers (start with PType.ts, then PUtils.ts, then the rest)

### Track C: Remaining `server/src/` strict cleanup

- 2.4 Eliminate strict-mode errors in top-level server files not covered by 2.2–2.3 (server.ts, javaModules.ts, javaClassVisitor.ts, etc.)

### Track D: Lock-in

- 2.5 Enable `"strict": true` in server/tsconfig.json + full validation gate (build + bundle + dev-host smoke test)

**Action**: In `server/tsconfig.json`, add to `compilerOptions`:

```json
"strict": true
```

**Validation**:
- `npm run build:server` → 0 errors
- `npm run build` → all 5 tsc projects pass
- `npm run build:bundle` → both bundles produce successfully (`out/extension.js`, `server/out/server.js`)
- Extension loads in dev host (F5)
- LSP smoke test: open a `.pde`, verify diagnostics, completion, hover, goto-def, find-references still work

**Result**: Server is strict-clean, the `antlr4ts` surface is one file, and any future antlr4 migration becomes a true one-file change.

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
