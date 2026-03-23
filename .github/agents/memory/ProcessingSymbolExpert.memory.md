# Processing Symbol Architecture Memory

## Processing Language Model

Processing `.pde` files have an implicit class wrapper extending `processing.core.PApplet`. The symbol system must model this correctly.

**Sketch structure:**
- `setup()`, `draw()` — lifecycle entry points (methods of implicit PApplet subclass)
- Event callbacks: `mousePressed()`, `mouseReleased()`, `mouseMoved()`, `mouseDragged()`, `mouseClicked()`, `mouseWheel()`, `keyPressed()`, `keyReleased()`, `keyTyped()`
- Top-level variables → fields of the implicit class
- Top-level functions → methods of the implicit class
- Multiple `.pde` files → concatenated into one class (order matters: main tab first)

**Processing-specific types:**
- `color` — pseudo-primitive (backed by `int`, but with distinct semantics for HSB/RGB)
- Core classes: `PVector`, `PImage`, `PFont`, `PGraphics`, `PShape`, `PApplet`, `JSONObject`, `JSONArray`, `Table`, `TableRow`, `XML`
- Type converter functions: `int()`, `float()`, `char()`, `byte()`, `boolean()`, `str()`, `hex()`, `unhex()`, `binary()`, `unbinary()`

**Scope rules:**
- Global scope = implicit PApplet subclass body
- No package declaration in `.pde` files
- Default imports: `processing.core.*`, `processing.data.*`, `processing.event.*`, `processing.opengl.*`, `java.lang.*`, etc.
- Inner classes supported (class declarations inside .pde)
- Static mode: code outside any function runs as if inside `setup()`

## Symbol System File Map (server/src/symbols/)

| File | Class | Models |
|------|-------|--------|
| `Symbol.ts` | `Symbol`, `ISymbol` | Base for all symbols, SymbolKind enum |
| `ComponentSymbol.ts` | `ComponentSymbol` | Scoped symbol with generics support |
| `ClassSymbol.ts` | `ClassSymbol` | Classes (extends ComponentSymbol) |
| `InterfaceSymbol.ts` | `InterfaceSymbol` | Interfaces |
| `EnumSymbol.ts` | `EnumSymbol` | Enums |
| `MethodSymbol.ts` | `MethodSymbol` | Methods/functions |
| `ConstructorSymbol.ts` | `ConstructorSymbol` | Constructors (extends MethodSymbol) |
| `FieldSymbol.ts` | `FieldSymbol` | Class fields |
| `VariableSymbol.ts` | `VariableSymbol` | Local variables |
| `ParameterSymbol.ts` | `ParameterSymbol` | Method parameters |
| `Type.ts` | `Type`, `IType` | Type representation |
| `ArrayType.ts` | `ArrayType` | Array types (extends Type) |
| `types/TypeKinds.ts` | `TypeKind`, `PrimitiveKind`, `ReferenceKind` | Type system enums |
| `SymbolTable.ts` | `SymbolTable` | Scope container (extends ComponentSymbol) |
| `LibraryTable.ts` | `LibraryTable` | Library symbol container |
| `SketchSymbol.ts` | `SketchSymbol` | Processing sketch root (extends SymbolTable) |
| `SymbolUtils.ts` | `SymbolUtils` | Symbol lookup/traversal utilities |
| `TypeUtils.ts` | `TypeUtils` | Type helper constants |
| `CallContext.ts` | `CallContext` | Generic/type resolution context |
| `Modifier.ts` | `Modifier` | Static, Final, Abstract, etc. |
| `MemberVisibility.ts` | `MemberVisibility` | Public, Protected, Private, Package |

## Known Gaps

- `color` type is listed in `PrimitiveKind` but may need special resolution logic for HSB/RGB contexts
- Type converter functions (`int()`, `float()`, etc.) need to be modeled as built-in methods
- Static mode (code outside functions) needs special handling in SketchSymbol
- Default Processing imports are not yet auto-injected during symbol table construction
