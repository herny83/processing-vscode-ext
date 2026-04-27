// Processing-prefixed wrapper for antlr4-c3 ScopedSymbol
// All Processing symbol system code should use this instead of antlr4-c3 directly

import { ScopedSymbol as Antlr4C3ScopedSymbol } from "antlr4-c3";

export class PScopedSymbol extends Antlr4C3ScopedSymbol {}
