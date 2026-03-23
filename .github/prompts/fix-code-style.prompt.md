---
name: fix-code-style
description: "Enforce the project's TypeScript code style on the current file or selected code: tabs, Allman braces, single-line ifs, import style."
---

# Fix Code Style

Apply the project's code style rules to the current file or selection. Do NOT change logic, only formatting.

## Rules to Enforce

### Indentation
- **Tabs only** (width 4). Convert any spaces used for indentation to tabs.
- Nested blocks increase by one tab level.

### Braces — Allman (next-line) style
- Opening brace `{` goes on its **own line**, aligned with the statement that owns it.
- Applies to: functions, methods, classes, interfaces, enums, for, while, do, switch, try/catch/finally, if/else (when braced).

**Wrong:**
```typescript
function foo() {
	doSomething();
}

if (x > 0) {
	doSomething();
}
```

**Right:**
```typescript
function foo()
{
	doSomething();
}

if (x > 0)
{
	doSomething();
}
```

### Single-line if/else — no braces
- If the body is a single statement, do NOT use braces. Indent the body on the next line.
- Exception: if the `else` branch is multi-line, the `if` branch also gets braces.

**Wrong:**
```typescript
if (x > 0) {
	doSomething();
}

if (x > 0) doSomething();
```

**Right:**
```typescript
if (x > 0)
	doSomething();
```

### Multi-line if/else — braces required, next-line style

**Wrong:**
```typescript
if (x > 0) {
	doSomething();
	doMore();
} else {
	doOther();
}
```

**Right:**
```typescript
if (x > 0)
{
	doSomething();
	doMore();
}
else
{
	doOther();
}
```

### No single-line braced blocks
**Wrong:** `if (x > 0) { doSomething(); }`
**Right:**
```typescript
if (x > 0)
	doSomething();
```

### Comments
- Aligned with the block level, not indented further.
- Minimal inline comments.

### Imports
- Explicit named imports, no `import *` in new code.
- One import per line if multiple modules.

## Procedure

1. Read the file or selection.
2. Apply all rules above. Only change formatting — never change logic, variable names, or add/remove code.
3. If the file uses `import *` from `antlr4-c3`, flag it but do NOT change it here (that's a migration task, not a style fix).
