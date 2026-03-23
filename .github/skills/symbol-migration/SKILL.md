---
name: symbol-migration
category: refactoring
---

# Symbol Migration Skill

## Purpose

Migrate deprecated antlr4-c3 symbols to the new Processing symbol architecture in `server/src/symbols/`.

## Inputs

- Target: a deprecated symbol class name (e.g., `PType`, `PUtils`) or a consumer file (e.g., `definitionsMap.ts`)

## Procedure

1. **Read the deprecated source** in `server/src/antlr-sym/src/`.
2. **Read the replacement** in `server/src/symbols/`.
3. **Search all usages**: `grep -rn "TargetName" server/src/ --include="*.ts"`
4. **For each usage site**:
   a. Read the surrounding code to understand intent.
   b. Replace the deprecated reference with the new equivalent.
   c. If the new symbol lacks a needed method, add it to the appropriate file in `server/src/symbols/`.
5. **Update or remove** the deprecated file once all references are migrated.
6. **Validate**: `npx tsc --noEmit 2>&1 | grep "error TS" | wc -l`

## Symbol Mapping

| Old | New | Import From |
|-----|-----|-------------|
| `PType` | `Type` | `symbols/Type` |
| `PTypeKind` | `TypeKind` | `symbols/types/TypeKinds` |
| `IPType` | `IType` | `symbols/Type` |
| `PUtils` | `SymbolUtils` | `symbols/SymbolUtils` |
| `PUtils.CallContext` | `CallContext` | `symbols/CallContext` |
| `PSymbolTable` | `SymbolTable` | `symbols/SymbolTable` |
| `symb.ReferenceKind` | `ReferenceKind` | `symbols/types/TypeKinds` |
| `symb.Modifier` | `Modifier` | `symbols/Modifier` |

## Constraints

- Follow `CODE_STYLE.md` strictly (tabs, Allman braces).
- Never leave dead imports after migration.
- Preserve semantic behavior — the migrated code must do the same thing.
- For ambiguous cases, pause and present options for user approval.
