# Migration Map: Old → New Symbol System

> **Copilot: Use this as your primary lookup when replacing deprecated code.**
> If a replacement is marked ❌ MISSING, follow the "Never Delete Logic" rule in copilot-instructions.md.

---

## 1. Type/Enum Renames (direct find-and-replace)

| Old | New | Import From |
|-----|-----|-------------|
| `PTypeKind` | `TypeKind` | `symbols/types/TypeKinds` |
| `PPrimitiveKind` | `PrimitiveKind` | `symbols/types/TypeKinds` |
| `IPType` | `IType` | `symbols/types/TypeKinds` |
| `PType` (as type annotation) | `Type` or `IType` | `symbols/Type` or `symbols/types/TypeKinds` |
| `symb.ReferenceKind` | `ReferenceKind` | `symbols/types/TypeKinds` |
| `symb.Modifier` | `Modifier` | `symbols/Modifier` |
| `import * as symb from 'antlr4-c3'` | Remove — import individual types from `symbols/` |
| `import { ISymbolTableOptions } from 'antlr4-c3/lib/src/types.js'` | Remove — not needed |

---

## 2. Symbol Class Renames

| Old | New | Import From |
|-----|-----|-------------|
| `PClassSymbol` | `ClassSymbol` | `symbols/ClassSymbol` |
| `PInterfaceSymbol` | `InterfaceSymbol` | `symbols/InterfaceSymbol` |
| `PMethodSymbol` | `MethodSymbol` | `symbols/MethodSymbol` |
| `PEnumSymbol` | `EnumSymbol` | `symbols/EnumSymbol` |
| `PComponentSymbol` | `ComponentSymbol` | `symbols/ComponentSymbol` |
| `PSymbolTable` | `SymbolTable` | `symbols/SymbolTable` |
| `psymb.PInterfaceSymbol` | `InterfaceSymbol` | `symbols/InterfaceSymbol` |

---

## 3. PType Properties → Type/IType Properties

| PType Property | Type/IType Equivalent | Notes |
|---------------|----------------------|-------|
| `.typeKind` | `.typeKind` | Same — both use `TypeKind` enum |
| `.name` | `.name` | Same |
| `.reference` | `.reference` | Same — both use `ReferenceKind` enum |
| `.primitiveKind` | `.primitiveKind` | Same — both use `PrimitiveKind` enum |
| `.genericTypes` (PType[]) | `.genericTypes` (IType[]) | Same name, different element type |
| `.outerType` (PType) | `.outerType` (IType) | Same name, different type |
| `.extendType` (PType) | `.extendType` (IType) on `Type`, `.superClass` on `IType` | ⚠️ `IType` uses `superClass`, `Type` class has `extendType` |
| `.implementTypes` (PType[]) | `.interfaces` (IType[]) on `IType` | ⚠️ Name changed |
| `.arrayType` (PType) | `.arrayType` (IType) on `IType`, `.elementType` on `ArrayType` | `IType` has `arrayType`; `ArrayType` class uses `elementType` |
| `.isFullPath` | ❌ MISSING | Not on IType/Type — add if needed or compute inline: `name.indexOf('.') >= 0` |

---

## 4. PType Static Factory Methods → Type Equivalents

| PType Method | Type Equivalent | Notes |
|-------------|----------------|-------|
| `PType.createClassType(name)` | `Type.clazz(name)` | ✅ Direct |
| `PType.createPrimitiveType(kind)` | `Type.primitive(kind)` | ✅ Direct |
| `PType.createInterfaceType(name)` | `new Type(name, TypeKind.Interface)` | No factory on Type |
| `PType.createEnumType(name)` | `new Type(name, TypeKind.Enum)` | No factory — PType also set `.extendType` to enum base class |
| `PType.createNamespaceType(name)` | `new Type(name, TypeKind.Namespace)` | No factory on Type |
| `PType.createGenericType(name)` | `new Type(name, TypeKind.Generic)` | No factory on Type |
| `PType.createGenericDeclType(name)` | `new Type(name, TypeKind.GenericDecl)` | No factory on Type |
| `PType.createComponentType(name)` | `new Type(name, TypeKind.Component)` | No factory on Type |
| `PType.createStringType()` | `new Type('java.lang.String', TypeKind.Class)` | Or use `TypeUtils.defaultStringClass` |
| `PType.createObjectType()` | `new Type('java.lang.Object', TypeKind.Class)` | Or use `TypeUtils.defaultObjectClass` |
| `PType.createClassClassType()` | `new Type('java.lang.Class', TypeKind.Class)` | Or use `TypeUtils.defaultClassClass` |
| `PType.createAppletClassType()` | `new Type('processing.core.PApplet', TypeKind.Class)` | Also set `.extendType` to Object |
| `PType.createNullType()` | `new Type('null', TypeKind.Null)` | Or use `TypeUtils.defaultNullName` |
| `PType.createVoidType()` | `new Type('void', TypeKind.Void, { reference: ReferenceKind.Irrelevant })` | |
| `PType.createUnknownType()` | `new Type('', TypeKind.Unknown)` | |
| `PType.createArrayType(base)` | `new Type('Array', TypeKind.Array, { arrayType: base })` | Or use `new ArrayType(base)` |
| `PType.createEnumBaseClass(name)` | `new Type('java.lang.Enum', TypeKind.Class, { genericTypes: [Type.clazz(name)] })` | |
| `PType.createFromIType(itype)` | ❌ MISSING | Creates PType from IType — with migration complete this should not be needed |
| `PType.createClone(pt)` | ❌ MISSING | Deep clone — add `Type.clone()` or `new Type(pt.name, pt.typeKind, { ...pt })` |
| `PType.createCloneArray(arr)` | ❌ MISSING | `arr.map(t => new Type(t.name, t.typeKind, { ...t }))` |

---

## 5. PType Static Utility Methods → TypeUtils / Inline

| PType Method | Replacement | Location |
|-------------|-------------|----------|
| `PType.getPrimitiveTypeName(kind)` | `primitiveKindNames[kind]` | `TypeUtils.primitiveKindNames` |
| `PType.isDefaultObjectPath(path)` | `isDefaultObjectPath(path)` | `TypeUtils.isDefaultObjectPath()` |
| `PType.isDefaultStringPath(path)` | `isDefaultStringPath(path)` | `TypeUtils.isDefaultStringPath()` |
| `PType.isComponentType(type)` | `isComponentType(type)` | `TypeUtils.isComponentType()` |
| `PType.isNullableType(type)` | `isNullableType(type)` | `TypeUtils.isNullableType()` |
| `PType.isCasteableToObjectType(type)` | `isCasteableToObjectType(type)` | `TypeUtils.isCasteableToObjectType()` |
| `PType.checkIsAnyTypeKind(type, kinds)` | `checkIsAnyTypeKind(type, kinds)` | `TypeUtils.checkIsAnyTypeKind()` |
| `PType.canClassBeBoxedOrAutoboxed(cls, prim)` | ❌ MISSING in TypeUtils | Keep in PType or migrate to TypeUtils |
| `PType.getBoxedPrimitiveType(primKind)` | ❌ MISSING in TypeUtils | Keep in PType or migrate to TypeUtils |
| `PType.setAsPrimitiveType(target, kind)` | Mutate target directly: `target.typeKind = TypeKind.Primitive; target.name = primitiveKindNames[kind]; target.primitiveKind = kind;` | Inline |
| `PType.setAsVoidType(target)` | `target.typeKind = TypeKind.Void; target.name = "void";` | Inline |
| `PType.setAsArrayType(target, arr)` | `target.typeKind = TypeKind.Array; target.name = "Array"; target.arrayType = arr;` | Inline |

---

## 6. PType Instance Methods → Type Equivalents

| PType Method | Type Equivalent | Notes |
|-------------|----------------|-------|
| `.getFullName()` | ❌ MISSING | Builds name including outerType chain. Add to Type or inline. |
| `.hasGenericParams()` | `.genericTypes.length > 0` | Inline check |
| `.setOutter(outer)` | `.outerType = outer` | Direct assignment (no fluent API on Type) |
| `.setReference(ref)` | `.reference = ref` | Direct assignment |
| `.setExtend(ext)` | `.extendType = ext` | Direct assignment on Type; `.superClass = ext` on IType |
| `.setGenericTypes(gens)` | `.genericTypes = gens` | Direct assignment (PType cloned, Type does not) |
| `.setImplementTypes(impls)` | `.interfaces = impls` | ⚠️ Property renamed |
| `.setPrimitive(kind)` | `.primitiveKind = kind` | Direct assignment |
| `.setArrayType(arr)` | `.arrayType = arr` | Direct assignment |
| `.reset(kind, name)` | ❌ MISSING | Mutates in place — create new Type instead |

---

## 7. PUtils Methods → SymbolUtils / New System

| PUtils Method | Replacement | Location | Status |
|--------------|-------------|----------|--------|
| `PUtils.resolveChildSymbolSync(ctx, t, name)` | `SymbolUtils.resolveChildSymbolSync(ctx, t, name)` | `SymbolUtils` | ✅ Same API |
| `PUtils.getAllDirectChildrenMatchSync(ctx, t, name)` | ❌ MISSING in SymbolUtils | Needs migration | Uses `getAllMatchsSync` on `ctx.children` |
| `PUtils.getAllMatchsSync(list, t, name)` | ❌ MISSING in SymbolUtils | Needs migration | Filters list by type + optional name |
| `PUtils.getAllSymbolsSync(ctx, t, name, local, overrides)` | ❌ MISSING in SymbolUtils | Needs migration | Complex: walks inheritance, PSymbolTable imports |
| `PUtils.resolveSymbolSync(ctx, t, name, localOnly)` | ❌ MISSING in SymbolUtils | Needs migration | Complex: handles dot-paths, inheritance, imports |
| `PUtils.resolveComponentSync(ctx, t, name)` | `SymbolUtils.resolveComponentSync(ctx, t, name)` | `SymbolUtils` | ⚠️ Exists but simpler (no inheritance/import walking) |
| `PUtils.resolveComponentSyncFromPType(ctx, t, ptype)` | ❌ MISSING in SymbolUtils | Needs migration | Resolves via outer type chain |
| `PUtils.resolveSymbolSyncFromPType(ctx, t, ptype)` | ❌ MISSING in SymbolUtils | Needs migration | Delegates to resolveComponentSyncFromPType |
| `PUtils.resolveSymbolFromTypeSync(scope, type)` | ❌ MISSING in SymbolUtils | Needs migration | Maps type → symbol |
| `PUtils.resolveTypeNameReference(scope, name)` | ❌ MISSING in SymbolUtils | Needs migration | Tries Class, Interface, Namespace |
| `PUtils.resolveGenericParamSymbol(ctx, ptype)` | ❌ MISSING in SymbolUtils | Needs migration | Walks parent scopes for generic |
| `PUtils.resolveGenericParamSymbolByName(ctx, name)` | ❌ MISSING in SymbolUtils | Needs migration | Walks parent scopes |
| `PUtils.resolveVariableDeclaration(name, symb)` | ❌ MISSING in SymbolUtils | Needs migration | Uses `resolveSync` if available |
| `PUtils.getFirstParentMatch(t, ctx)` | `Symbol.getEnclosing(kind)` | `Symbol` | ⚠️ Similar but uses `SymbolKind` not constructor |
| `PUtils.extractSignature(symbol)` | `SymbolUtils.extractSignature(symbol)` | `SymbolUtils` | ✅ Already migrated |
| `PUtils.extractMethodName(sig)` | `MethodSymbol.extractMethodName(sig)` | `MethodSymbol` | ✅ Already migrated |
| `PUtils.convertToSignature(method)` | `MethodSymbol.convertToSignature(method)` | `MethodSymbol` | ⚠️ Exists but simplified |
| `PUtils.convertPTypeToSignature(type)` | ❌ MISSING | Needs migration to SymbolUtils or TypeUtils |
| `PUtils.convertPrimitiveToSignature(kind)` | ❌ MISSING | Needs migration |
| `PUtils.convertComponentToSignature(type)` | ❌ MISSING | Needs migration |
| `PUtils.convertSymbolTypeToString(type, full)` | ❌ MISSING | Needs migration to TypeUtils |
| `PUtils.ComponentSymbolToPType(comp)` | ❌ MISSING | Creates Type from ComponentSymbol — migrate to TypeUtils |
| `PUtils.cloneTypeAsInstance(type)` | `new Type(type.name, type.typeKind, { ...type, reference: ReferenceKind.Instance })` | Inline |
| `PUtils.hasModifier(mods, find)` | `modifiers.has(find)` | Inline — MethodSymbol uses `Set<Modifier>` now |
| `PUtils.addIfNotRepeated(results, candidates)` | ❌ MISSING | Simple: push if not already in array by name |
| `PUtils.compareSymbolName(symbol, name, full)` | ❌ MISSING | Compares name, strips method signature if needed |
| `PUtils.getClassName(fullname)` | ❌ MISSING | `fullname.substring(fullname.lastIndexOf('.') + 1)` — inline |
| `PUtils.checkComparableTypes(l, r, scope)` | ❌ MISSING | Complex type comparison — migrate to TypeUtils |
| `PUtils.tryDefineCallGenerics(caller)` | ❌ MISSING in new CallContext | PUtils version populates generics map |
| `PUtils.tryDefineCallGenericsFromParamTypeList(caller, types)` | ❌ MISSING | Complex generic inference |

---

## 8. ClassSymbol Property Differences

| Old (via PType/antlr4-c3) | New (ClassSymbol) | Notes |
|---------------------------|-------------------|-------|
| `.extends` (Type) | `.superClass` (ClassSymbol) | ⚠️ Different type: was IType, now ClassSymbol |
| `.implements` (Type[]) | `.implements` (Type[]) | ✅ Same name on ClassSymbol |
| `.implementTypes` | `.implementTypes` (getter/setter) | ✅ Alias for `.implements` |

---

## 9. CallContext Differences

| PUtils.CallContext | symbols/CallContext | Notes |
|-------------------|---------------------|-------|
| `.type: Type` | `.type?: IType` | Optional in new, uses IType |
| `.symbol: ISymbol` | `.symbol?: ISymbol` | Optional in new |
| `.outter: CallContext` | `.outter?: CallContext` | Optional in new |
| `.generics: Map<string, Type>` | `.generics: Map<string, IType>` | Uses IType |
| `constructor(type, symbol)` auto-calls `tryDefineCallGenerics` | `constructor(type?, symbol?)` does NOT auto-call | ⚠️ Callers must call `tryDefineCallGenerics` manually if needed |

---

## 10. Constants (already migrated to TypeUtils)

| Old Location | New Location | Notes |
|-------------|-------------|-------|
| `PType.primitiveKindNames` / local in PType.ts | `TypeUtils.primitiveKindNames` | ✅ Exported |
| `PType.primitiveWrapperNames` / local in PType.ts | `TypeUtils.primitiveWrapperNames` | ✅ Exported |
| `PType.nullableTypes` / local in PType.ts | `TypeUtils.nullableTypes` | ✅ Exported |
| `PType.casteableToObjectTypes` / local in PType.ts | `TypeUtils.casteableToObjectTypes` | ✅ Exported |
| `PType.componentTypes` / local in PType.ts | `TypeUtils.componentTypes` | ✅ Exported |
| `defaultPAppletClassName` | `TypeUtils.defaultPAppletClassName` | ✅ Exported |
| `defaultStringClass` | `TypeUtils.defaultStringClass` | ✅ Exported |
| `defaultObjectClass` | `TypeUtils.defaultObjectClass` | ✅ Exported |
| `defaultClassClass` | `TypeUtils.defaultClassClass` | ✅ Exported |
| `defaultEnumBaseClass` | `TypeUtils.defaultEnumBaseClass` | ✅ Exported |
| `defaultNullName` | `TypeUtils.defaultNullName` | ✅ Exported |
