---
name: file-migration
description: "Audit and migrate a single file: fix broken imports, replace deprecated symbols, update to new type system."
---

# File Migration

Migrate the specified file from legacy antlr4-c3 symbols to the new system in `server/src/symbols/`.

## Steps

1. **Read** the target file completely.
2. **Find all imports** from `antlr4-c3` or `server/src/antlr-sym/` and list them.
3. **For each deprecated reference**, find the replacement in `server/src/symbols/`:
   - `PTypeKind` → `TypeKind` (from `symbols/types/TypeKinds`)
   - `IPType` → `IType` (from `symbols/Type`)
   - `PType` → `Type` (from `symbols/Type`)
   - `symb.ReferenceKind` → `ReferenceKind` (from `symbols/types/TypeKinds`)
   - `psymb.PInterfaceSymbol` → `InterfaceSymbol` (from `symbols/InterfaceSymbol`)
   - `psymb.PMethodSymbol` → `MethodSymbol` (from `symbols/MethodSymbol`)
   - `psymb.PClassSymbol` → `ClassSymbol` (from `symbols/ClassSymbol`)
   - `PUtils.X()` → `SymbolUtils.X()` (from `symbols/SymbolUtils`) — create if missing
4. **Check for API differences**: the new symbols may have different method names (e.g., `extends` → `superClass`, `implements` → `interfaces`). Read the new symbol source to confirm.
5. **Apply changes** preserving semantics. Follow `CODE_STYLE.md` (tabs, Allman braces).
6. **Validate**: Run `npx tsc --noEmit 2>&1 | grep "<filename>" | wc -l` to check remaining errors in the file.

## References

- Migration guidelines: `.github/migration-planner-guidelines.md`
- New symbol system: `server/src/symbols/index.ts` (barrel exports)
- Code style: `CODE_STYLE.md`
