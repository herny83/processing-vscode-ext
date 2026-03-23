---
name: antlr4ts-migration
description: "Migrate a file's antlr4ts imports to use the centralized shim (server/src/antlr-types.ts)."
---

# antlr4ts Import Migration

Migrate a single file to import antlr4ts types from the centralized shim instead of directly from `antlr4ts`.

## Context

- `antlr4ts` (0.5.0-alpha.4) is abandoned since 2019. We're isolating it behind `server/src/antlr-types.ts`.
- This migration changes **only import paths**. No API calls, no symbol system changes, no logic changes.
- The shim re-exports the same types, so this is purely mechanical.

## Common Replacements

```typescript
// BEFORE:
import { ParserRuleContext, Token } from 'antlr4ts';
import { ParseTree, TerminalNode } from 'antlr4ts/tree';
import { PredictionMode } from 'antlr4ts/atn';
import * as ast from 'antlr4ts/tree';

// AFTER:
import { ParserRuleContext, Token } from './antlr-types';
import { ParseTree, TerminalNode } from './antlr-types';
import { PredictionMode } from './antlr-types';
import { ParseTree, TerminalNode, ErrorNode } from './antlr-types';
// (replace wildcard `ast.*` with explicit named imports)
```

For files in subdirectories (e.g., `grammer/ProcessingErrorListener.ts`):
```typescript
import { ANTLRErrorListener, Token } from '../antlr-types';
```

## Handling wildcard imports

Files using `import * as ast from 'antlr4ts/tree'` reference types as `ast.ParseTree`, `ast.TerminalNode`, etc. Replace with:
1. Named imports from `./antlr-types`
2. Remove all `ast.` prefixes from usage sites

## Procedure

1. **Read** the target file.
2. **Find all imports** from `antlr4ts` or `antlr4ts/*`.
3. **Replace** each import to use `./antlr-types` (or `../antlr-types` for nested files).
4. **If wildcard import**: find all `ast.TypeName` usages and replace with plain `TypeName`.
5. **Validate**: `npx tsc -p server/tsconfig.json --noEmit 2>&1 | grep "<filename>"`
6. **Report**: confirm 0 errors in the file.

## Rules

- Change ONLY import paths. Do NOT touch logic, types, or the symbol system.
- Do NOT modify `antlr-types.ts` itself unless a needed type is missing from it.
- Follow CODE_STYLE.md (tabs, Allman braces).
