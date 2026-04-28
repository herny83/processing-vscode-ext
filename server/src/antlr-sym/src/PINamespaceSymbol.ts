// Contract for namespace-like scope holders. Adds inline/attributes metadata
// on top of the scope contract so consumers can flatten namespace children
// into the enclosing scope's lookup space.

import { PIScopedSymbol } from "./PIScopedSymbol";

export interface PINamespaceSymbol extends PIScopedSymbol
{
	readonly inline: boolean;
	readonly attributes: string[];
}
