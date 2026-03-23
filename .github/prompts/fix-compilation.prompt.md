---
name: fix-compilation
description: "Diagnose and fix TypeScript compilation errors in a specific file or across the project."
---

# Fix Compilation Errors

Diagnose and fix TypeScript compilation errors.

## Steps

1. **Get error list**:
   - Root: `npx tsc --noEmit`
   - Server: `npx tsc -p server/tsconfig.json --noEmit`
   - Client: `npx tsc -p client/tsconfig.json --noEmit`
   - Debugger: `npx tsc -p debugger/tsconfig.json --noEmit`
   - Single file: `npx tsc -p <workspace>/tsconfig.json --noEmit 2>&1 | grep "<filename>"`
2. **Categorize errors** by root cause:
   - Missing imports (add the import)
   - Type mismatches (check the API surface of the target type)
   - Missing methods/properties (extend the type or fix the call)
   - Strict null checks (add null guards or `!` assertions)
   - Missing packages (`npm install`)
3. **Fix in dependency order**: Start with errors that unblock the most downstream fixes.
4. **After each batch of fixes**, re-run the type-check to track progress.
5. **Report**: Show before/after error count.

## Common Quick Fixes

- `Cannot find module 'X'` → Check package.json, run `npm install`
- `Property 'X' does not exist on type 'Y'` → Check if API changed, read the type definition
- `Type 'X' is not assignable to type 'Y'` → Check if types diverged, add cast or fix the type
- `Object is possibly 'undefined'` → Add null check or `!` assertion
