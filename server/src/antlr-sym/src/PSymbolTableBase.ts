// Processing-prefixed wrapper for antlr4-c3 SymbolTable
// All Processing symbol system code should use this instead of antlr4-c3 directly

import { SymbolTable as Antlr4C3SymbolTable, SymbolTableOptions } from "antlr4-c3";

export class PSymbolTableBase extends Antlr4C3SymbolTable
{
	constructor(name: string, options: SymbolTableOptions)
	{
		super(name, options);
	}
}
