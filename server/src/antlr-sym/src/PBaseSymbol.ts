// Root class of the Processing symbol hierarchy. Every symbol carries name,
// optional parse-tree context, modifiers, visibility, and parent linkage,
// plus name-based resolution that defers to the enclosing scope.
//
// `visibility` defaults to Public to match the codebase's "no access modifier
// declared = treated as public" convention (see SymbolTableVisitor.evaluateMemberVisibility).

import { ParseTree } from "antlr4ts/tree/ParseTree";
import { PModifier } from "./PModifier";
import { PMemberVisibility } from "./PMemberVisibility";
import type { PIScopedSymbol } from "./PIScopedSymbol";
import type { PSymbolConstructor } from "./PSymbolConstructor";

export class PBaseSymbol
{
	public name: string;
	public context?: ParseTree;
	public readonly modifiers: Set<PModifier> = new Set<PModifier>();
	public visibility: PMemberVisibility = PMemberVisibility.Public;

	private _parent: PIScopedSymbol | undefined;

	constructor(name: string = "")
	{
		this.name = name;
	}

	get parent(): PIScopedSymbol | undefined
	{
		return this._parent;
	}

	setParent(parent?: PIScopedSymbol): void
	{
		this._parent = parent;
	}

	removeFromParent(): void
	{
		this._parent?.removeSymbol(this);
		this._parent = undefined;
	}

	async resolve(name: string, localOnly: boolean = false): Promise<PBaseSymbol | undefined>
	{
		return this._parent?.resolve(name, localOnly);
	}

	resolveSync(name: string, localOnly: boolean = false): PBaseSymbol | undefined
	{
		return this._parent?.resolveSync(name, localOnly);
	}

	getParentOfType<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>): T | undefined
	{
		let run: PIScopedSymbol | undefined = this._parent;
		while (run)
		{
			if (run instanceof t)
				return run as unknown as T;
			run = run.parent;
		}
		return undefined;
	}

	qualifiedName(separator: string = ".", full: boolean = false, includeAnonymous: boolean = false): string
	{
		if (!includeAnonymous && this.name.length === 0)
			return "";

		let result = this.name.length === 0 ? "<anonymous>" : this.name;
		let run: PIScopedSymbol | undefined = this._parent;
		while (run)
		{
			if (includeAnonymous || run.name.length > 0)
				result = (run.name.length === 0 ? "<anonymous>" : run.name) + separator + result;

			if (!full || !run.parent)
				break;

			run = run.parent;
		}
		return result;
	}
}