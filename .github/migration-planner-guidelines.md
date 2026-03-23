# Migration-Planner Guidelines for Symbol System Migration

## Goal

Remove all dependencies on `antlr4-c3` symbol types. The canonical symbol/type system lives in `server/src/symbols/`. The bridge layer in `server/src/antlr-sym/` should shrink to zero.

## Core Principles

- **Audit first**: Before migrating or removing any code, search for all usages across the codebase.
- **Migrate before removing**: Only remove a deprecated file/class after all references point to the replacement.
- **Fill gaps**: If the new system lacks something consumers need, add it to `server/src/symbols/` — don't keep the old code alive as a workaround.
- **Validate continuously**: Run `npx tsc --noEmit 2>&1 | grep "error TS" | wc -l` before and after each migration step.
- **Code style**: All changes must follow `CODE_STYLE.md` (tabs, Allman braces).
- **NEVER delete working logic**: If no replacement exists, follow the decision process in `copilot-instructions.md` under "Never Delete Logic Without a Working Replacement". Either create a full replacement (if simple) or leave the old code as-is with a `// MIGRATION-PENDING:` comment. Never replace code with TODOs, stubs, `undefined`, or empty bodies.

## Detailed Migration Map

**Always consult [MIGRATION-MAP.md](MIGRATION-MAP.md)** for the complete property-level, method-level, and factory-method mapping between old and new systems. It covers PType→Type properties, PUtils→SymbolUtils methods, factory methods, CallContext differences, and marks what is ❌ MISSING.

## Symbol Mapping Reference (quick lookup)

| Deprecated | Replacement | Location |
|-----------|-------------|----------|
| `PType` | `Type` / `IType` | `symbols/Type.ts` |
| `PTypeKind` | `TypeKind` | `symbols/types/TypeKinds.ts` |
| `PPrimitiveKind` | `PrimitiveKind` | `symbols/types/TypeKinds.ts` |
| `IPType` | `IType` | `symbols/Type.ts` |
| `PUtils` | `SymbolUtils` | `symbols/SymbolUtils.ts` |
| `PUtils.CallContext` | `CallContext` | `symbols/CallContext.ts` |
| `PSymbolTable` | `SymbolTable` | `symbols/SymbolTable.ts` |
| `PClassSymbol` | `ClassSymbol` | `symbols/ClassSymbol.ts` |
| `PInterfaceSymbol` | `InterfaceSymbol` | `symbols/InterfaceSymbol.ts` |
| `PMethodSymbol` | `MethodSymbol` | `symbols/MethodSymbol.ts` |
| `PEnumSymbol` | `EnumSymbol` | `symbols/EnumSymbol.ts` |
| `PComponentSymbol` | `ComponentSymbol` | `symbols/ComponentSymbol.ts` |
| `symb.ReferenceKind` | `ReferenceKind` | `symbols/types/TypeKinds.ts` |
| `symb.Modifier` | `Modifier` | `symbols/Modifier.ts` |

## Migration Order (dependency-aware)

1. **Foundation** — Fix `PType.ts`: add missing imports for `TypeKind`, `PrimitiveKind`, `ReferenceKind`, `IType` from `symbols/types/TypeKinds` and `symbols/Type`. This unblocks everything else.
2. **Utilities** — Migrate `PUtils.ts`: replace `antlr4-c3` imports, move useful functions to `SymbolUtils.ts`.
3. **Symbol Table** — Migrate `PSymbolTable.ts`: stop extending `symb.SymbolTable` from antlr4-c3, extend new `SymbolTable` instead.
4. **Consumer files** (by error count): `definitionsMap.ts` → `javaClassVisitor.ts` → `symbols.ts` → `sketch.ts` → `astutils.ts` → feature files.
5. **Cleanup** — Remove empty placeholder files, delete antlr-sym files that are fully migrated.

## Workflow Per Step

1. **Audit**: Search for all usages of the target across `server/src/`.
2. **Analyze**: For each usage, determine what the old code does and what the new equivalent is.
3. **Plan**: Write out the changes needed (file, line, old → new).
4. **Approve**: Present the plan to the user. Wait for approval.
5. **Execute**: Apply changes. Run type-check after each file.
6. **Report**: Show error count change (before → after).
