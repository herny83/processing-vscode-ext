---
name: lsp-feature-implementation
description: "Implement or audit an LSP feature: completion, hover, goto-def, references, rename, symbols, diagnostics, code lens."
---

# LSP Feature Implementation

Implement or audit an LSP feature for the Processing Language Server.

## Architecture

LSP features follow this pattern:
1. **Registration** in `server/src/server.ts` (capability + handler)
2. **Implementation** in a dedicated file (e.g., `completion.ts`, `hover.ts`)
3. **Symbol lookup** via `PdeContentInfo` methods in `server/src/sketch.ts`
4. **Type resolution** via `server/src/definitionsMap.ts` (UsageVisitor)

## Feature Files

| Feature | File | Server Handler |
|---------|------|---------------|
| Completion | `server/src/completion.ts` | `onCompletion` |
| Hover | `server/src/hover.ts` | `onHover` |
| Go to Definition | `server/src/definition.ts` | `onDefinition` |
| Find References | `server/src/references.ts` | `onReferences` |
| Rename | `server/src/rename.ts` | `onRenameRequest` |
| Document Symbols | `server/src/DocumentSymbols.ts` | `onDocumentSymbol` |
| Code Lens | `server/src/lens.ts` | `onCodeLens` (currently disabled) |
| Signature Help | registered in `server.ts` | `onSignatureHelp` |
| Diagnostics | `server/src/grammer/ProcessingErrorListener.ts` | via document change |

## Steps

1. **Identify** which feature to implement or audit.
2. **Read** the current implementation file and the server.ts registration.
3. **Check** that it uses the new symbol system (`server/src/symbols/`), not legacy antlr-sym types.
4. **Test mentally**: trace through a user action (e.g., "hover over `ellipse`") and verify the code path produces the right result.
5. **Identify gaps**: missing edge cases, wrong types, incomplete results.
6. **Implement** fixes following CODE_STYLE.md.
7. **Validate**: `npx tsc --noEmit` to ensure it compiles.

## Processing-Specific Considerations

- Completion should include Processing API functions (`ellipse`, `rect`, `fill`, `stroke`, etc.)
- Hover should show Processing-style signatures, not raw Java signatures
- Go-to-definition for Processing core functions should navigate to library source or show documentation
- References must work across multiple `.pde` files in a sketch
- Rename must update all `.pde` files in the sketch
- Document symbols should show the sketch's implicit class structure
