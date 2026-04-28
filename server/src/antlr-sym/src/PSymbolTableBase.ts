// Top-level scope holder — sits at the root of a symbol tree.
//
// Dependencies and library imports are tracked separately via
// PSymbolTable.dependencyTable / librarySymbolCollection rather than as
// children of this scope, so the table surface here is intentionally minimal:
// just options storage and the inherited PScopedSymbol behavior. No
// addNewSymbolOf*, addDependency, or symbolWithContext helpers — add them
// only when a real consumer needs them.

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