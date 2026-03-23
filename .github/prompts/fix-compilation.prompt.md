---
name: fix-compilation
description: "Diagnose and fix TypeScript compilation errors in a specific file or across the project."
---

# Fix Compilation Errors

Diagnose and fix TypeScript compilation errors.

## Steps

1. **Get error list**: Run `npx tsc --noEmit 2>&1 | grep "<target_file>"` (or without grep for full project).
2. **Categorize errors** by root cause:
   - Missing imports (easy: add the import)
   - Type mismatches between old/new symbol system (migration needed)
   - Missing methods/properties on new symbols (need to extend the symbol)
   - Strict null checks (add null guards)
   - Missing packages (need `npm install`)
3. **Fix in dependency order**: Start with the errors that unblock the most downstream fixes.
4. **For migration errors**: Use the symbol mapping table:
   - `PTypeKind` → `TypeKind` (from `server/src/symbols/types/TypeKinds`)
   - `IPType` → `IType` (from `server/src/symbols/Type`)
   - `PInterfaceSymbol` → `InterfaceSymbol` (from `server/src/symbols/InterfaceSymbol`)
   - See `.github/prompts/symbol-migration.prompt.md` for the full table
5. **After each batch of fixes**, re-run `npx tsc --noEmit 2>&1 | grep "error TS" | wc -l` to track progress.
6. **Report**: Show before/after error count.

## Common Quick Fixes

- `Cannot find name 'TypeKind'` → Add `import { TypeKind } from '../symbols/types/TypeKinds';`
- `Cannot find name 'symb'` → Replace `symb.X` with direct import from `server/src/symbols/`
- `Property 'X' does not exist on type 'Y'` → Check if the property was renamed in the new symbol system
- `Type 'PType' is not assignable to type 'Type'` → Replace PType usage with Type/IType
