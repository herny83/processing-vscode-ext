// Processing-prefixed symbol-table base.
// Standalone — no antlr4-c3 dependency. Pivots from extending antlr4-c3 SymbolTable
// to extending PScopedSymbol, since the codebase manages dependencies via
// PSymbolTable.dependencyTable / librarySymbolCollection rather than antlr4-c3's
// SymbolTable surface (addDependencies, addNewSymbolOfType, etc.).

import { PScopedSymbol } from "./PScopedSymbol";

export interface PSymbolTableOptions
{
	allowDuplicateSymbols?: boolean;
}

export class PSymbolTableBase extends PScopedSymbol
{
	public readonly options: PSymbolTableOptions;

	constructor(name: string, options: PSymbolTableOptions)
	{
		super(name);
		this.options = options;
	}
}