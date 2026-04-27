// Processing-prefixed wrapper for antlr4-c3 IScopedSymbol
// All Processing symbol system code should use this instead of antlr4-c3 directly

import { IScopedSymbol as Antlr4C3IScopedSymbol } from "antlr4-c3";

export interface PIScopedSymbol extends Antlr4C3IScopedSymbol {}
