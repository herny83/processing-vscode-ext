---
name: fix-mapped-references
description: "Fix only the errors that have a known mapping in MIGRATION-MAP.md. Skip anything without a clear ✅ or ⚠️ replacement."
---

# Fix Mapped References

Fix **only** errors that have a direct or near-direct replacement in [MIGRATION-MAP.md](../MIGRATION-MAP.md). Leave everything else untouched — even if it has errors.

## What to fix

Only these categories of changes are allowed:

### A. Import replacements
- `import * as symb from 'antlr4-c3'` → Remove. Add specific imports from `symbols/`.
- `import { ISymbolTableOptions } from 'antlr4-c3/lib/src/types.js'` → Remove.
- `import { ReferenceKind, Modifier } from 'antlr4-c3'` → `import { ReferenceKind } from '../symbols/types/TypeKinds'; import { Modifier } from '../symbols/Modifier';`

### B. Type/enum renames (find-and-replace safe)
- `PTypeKind` → `TypeKind` (add import from `symbols/types/TypeKinds`)
- `PPrimitiveKind` → `PrimitiveKind` (add import from `symbols/types/TypeKinds`)
- `IPType` → `IType` (add import from `symbols/types/TypeKinds`)
- `symb.ReferenceKind` → `ReferenceKind` (add import from `symbols/types/TypeKinds`)
- `symb.Modifier` → `Modifier` (add import from `symbols/Modifier`)

### C. Symbol class renames
- `psymb.PInterfaceSymbol` → `InterfaceSymbol` (add import from `symbols/InterfaceSymbol`)
- `psymb.PClassSymbol` → `ClassSymbol` (add import from `symbols/ClassSymbol`)
- `psymb.PMethodSymbol` → `MethodSymbol` (add import from `symbols/MethodSymbol`)
- `psymb.PEnumSymbol` → `EnumSymbol` (add import from `symbols/EnumSymbol`)
- `psymb.PComponentSymbol` → `ComponentSymbol` (add import from `symbols/ComponentSymbol`)

### D. Factory methods with direct equivalents
- `PType.createClassType(name)` → `Type.clazz(name)` (import `Type` from `symbols/Type`)
- `PType.createPrimitiveType(kind)` → `Type.primitive(kind)`
- `PType.isDefaultObjectPath(path)` → `isDefaultObjectPath(path)` (import from `symbols/TypeUtils`)
- `PType.isDefaultStringPath(path)` → `isDefaultStringPath(path)` (import from `symbols/TypeUtils`)
- `PType.isComponentType(type)` → `isComponentType(type)` (import from `symbols/TypeUtils`)
- `PType.isNullableType(type)` → `isNullableType(type)` (import from `symbols/TypeUtils`)
- `PType.isCasteableToObjectType(type)` → `isCasteableToObjectType(type)` (import from `symbols/TypeUtils`)
- `PType.checkIsAnyTypeKind(type, kinds)` → `checkIsAnyTypeKind(type, kinds)` (import from `symbols/TypeUtils`)
- `PType.getPrimitiveTypeName(kind)` → `primitiveKindNames[kind]` (import from `symbols/TypeUtils`)

### E. Utility method renames with direct equivalents
- `PUtils.resolveChildSymbolSync(ctx, t, name)` → `SymbolUtils.resolveChildSymbolSync(ctx, t, name)`
- `PUtils.extractSignature(symbol)` → `SymbolUtils.extractSignature(symbol)`
- `PUtils.extractMethodName(sig)` → `MethodSymbol.extractMethodName(sig)`
- `PUtils.hasModifier(mods, find)` → `mods.has(find)` (MethodSymbol.modifiers is a Set now)
- `PUtils.cloneTypeAsInstance(type)` → `new Type(type.name, type.typeKind, { ...type, reference: ReferenceKind.Instance })`
- `PUtils.getClassName(full)` → `full.substring(full.lastIndexOf('.') + 1)` (inline)

### F. Simple inline property renames
- `.hasGenericParams()` → `.genericTypes.length > 0`
- `.implementTypes` (on PType) → `.interfaces` (on IType)

## What NOT to fix

- Anything marked ❌ MISSING in MIGRATION-MAP.md — leave as-is
- `PUtils.resolveSymbolSync`, `PUtils.getAllSymbolsSync`, `PUtils.resolveComponentSyncFromPType` and other complex resolution methods — leave as-is
- `PUtils.convertToSignature`, `PUtils.convertPTypeToSignature`, `PUtils.convertSymbolTypeToString` — leave as-is
- `PType.canClassBeBoxedOrAutoboxed`, `PType.getBoxedPrimitiveType` — leave as-is
- `PType.createFromIType`, `PType.createClone`, `PType.createCloneArray` — leave as-is
- `PType.getFullName()`, `PType.reset()` — leave as-is
- Any structural change that alters logic or control flow
- Any error you are not 100% confident has a correct mapped replacement

If in doubt, **leave it**. A type error is better than broken logic.

## Procedure

1. **Read** the target file.
2. **Read** MIGRATION-MAP.md sections 1-6 for reference.
3. **Fix imports first** (top of file):
   - Remove antlr4-c3 imports
   - Add needed imports from `symbols/`
   - Remove imports of deleted symbols (PInterfaceSymbol, etc.) and add new ones
4. **Apply bulk renames** (sections B and C above) — use find-and-replace patterns.
5. **Apply factory method replacements** (section D) — only the ones listed above.
6. **Apply utility method replacements** (section E) — only the ones listed above.
7. **Apply inline property renames** (section F).
8. **Do NOT touch** anything else. If an error remains because the replacement is ❌ MISSING, leave it.
9. **Validate**: `npx tsc --noEmit 2>&1 | grep "<filename>" | grep "error TS" | wc -l`
10. **Report**: "Fixed X errors, Y errors remain (unmapped)."

## Editing rules

- Follow the "Editing Strategy for Large Files" in copilot-instructions.md.
- Work bottom-to-top for individual edits (except imports which go first).
- Re-read the file after bulk renames before making further changes.
- Follow CODE_STYLE.md (tabs, Allman braces).
