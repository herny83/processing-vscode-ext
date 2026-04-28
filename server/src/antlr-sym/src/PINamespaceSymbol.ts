// Processing-prefixed wrapper for antlr4-c3 INamespaceSymbol
// All Processing symbol system code should use this instead of antlr4-c3 directly

import { INamespaceSymbol as Antlr4C3INamespaceSymbol } from "antlr4-c3";

export interface PINamespaceSymbol extends Antlr4C3INamespaceSymbol {}
