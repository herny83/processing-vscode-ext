// Processing-prefixed namespace-symbol interface.
// Standalone — no antlr4-c3 dependency. Mirrors the antlr4-c3 INamespaceSymbol shape.

import { PIScopedSymbol } from "./PIScopedSymbol";

export interface PINamespaceSymbol extends PIScopedSymbol
{
	readonly inline: boolean;
	readonly attributes: string[];
}
