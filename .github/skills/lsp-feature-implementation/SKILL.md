---
name: lsp-feature-implementation
category: lsp
---

# LSP Feature Implementation Skill

## Purpose

Implement or improve LSP features for the Processing Language Server.

## Inputs

- Feature name: one of `completion`, `hover`, `definition`, `references`, `rename`, `documentSymbol`, `codeLens`, `signatureHelp`, `diagnostics`

## Procedure

1. **Read the feature file** and `server/src/server.ts` handler registration.
2. **Trace the data flow**: user action → server handler → feature function → symbol lookup → response.
3. **Verify symbol usage**: ensure only `server/src/symbols/` types are used, not legacy antlr-sym.
4. **Check edge cases**:
   - Multi-file sketches (multiple `.pde` files)
   - Processing core API symbols (from library introspection)
   - Nested scopes (inner classes, anonymous classes)
   - Generics (`ArrayList<PVector>`)
   - The `color` pseudo-primitive
5. **Implement or fix** the feature. Register in `server.ts` if new.
6. **Validate**: `npx tsc --noEmit`

## Feature Registration Pattern (server.ts)

```typescript
// In capabilities
completionProvider: { triggerCharacters: ['.'] },

// In handler
connection.onCompletion((params) =>
{
	return getCompletionItems(params, pdeContentMap);
});
```

## Priority Order

1. Diagnostics (linting/error reporting)
2. Completion
3. Hover
4. Go to Definition
5. Find References
6. Rename
7. Document Symbols (outline)
8. Code Lens
9. Signature Help
10. Compile & run sketch (debug integration)
