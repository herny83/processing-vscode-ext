// Processing-prefixed wrapper for antlr4-c3 SymbolConstructor
// All Processing symbol system code should use this instead of antlr4-c3 directly
import { SymbolConstructor as Antlr4C3SymbolConstructor } from "antlr4-c3";
import { PBaseSymbol } from "./PBaseSymbol";

export type PSymbolConstructor<T extends PBaseSymbol, Args extends unknown[]> = Antlr4C3SymbolConstructor<T, Args>;
