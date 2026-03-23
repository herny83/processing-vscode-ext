---
name: symbol-migration
description: "Migrate a specific deprecated symbol class (PType, PUtils, etc.) to the new architecture in server/src/symbols/."
---

# Symbol Migration

Migrate a deprecated symbol class from `server/src/antlr-sym/` to `server/src/symbols/`.

## Steps

1. **Read** the deprecated symbol file in `server/src/antlr-sym/src/`.
2. **Read** the replacement in `server/src/symbols/` (if it exists).
3. **Search** for all usages of the deprecated symbol across the codebase:
   ```
   grep -rn "DeprecatedName" server/src/ --include="*.ts"
   ```
4. **Compare APIs**: List methods/properties in the old symbol vs the new one. Identify gaps.
5. **Fill gaps**: If the new symbol is missing functionality that consumers need, add it to the appropriate file in `server/src/symbols/`.
6. **Present plan**: Show the user:
   - Which files reference the deprecated symbol
   - What changes each file needs
   - Any new methods/properties to add to the new symbol system
7. **Wait for approval** before making changes.
8. **Execute**: Update all consumer files, then update or remove the deprecated file.
9. **Validate**: Run `npx tsc --noEmit 2>&1 | grep "error TS" | wc -l` and report the error count change.

## Common Mappings

| Deprecated (antlr-sym) | Replacement (symbols/) |
|------------------------|----------------------|
| `PType` | `Type` / `IType` |
| `PTypeKind` | `TypeKind` |
| `IPType` | `IType` |
| `PUtils` | `SymbolUtils` |
| `PUtils.CallContext` | `CallContext` |
| `PSymbolTable` | `SymbolTable` |
| `PClassSymbol` | `ClassSymbol` |
| `PInterfaceSymbol` | `InterfaceSymbol` |
| `PMethodSymbol` | `MethodSymbol` |
| `PEnumSymbol` | `EnumSymbol` |
| `PComponentSymbol` | `ComponentSymbol` |
| `symb.ReferenceKind` | `ReferenceKind` |
| `symb.Modifier` | `Modifier` |

## References

- `.github/migration-planner-guidelines.md`
- `server/src/symbols/index.ts` (all exports)
- `CODE_STYLE.md`
