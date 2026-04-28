// Symbols that own a child scope. Implements PIScopedSymbol with full child
// management (add/remove, name lookup, nested traversal, sibling navigation).
//
// The duplicate-name guard found in classic symbol-table implementations is
// intentionally omitted: the codebase always permits duplicates (overloaded
// methods, library re-imports), so a uniqueness check would only add cost
// without ever firing.

import { PBaseSymbol } from "./PBaseSymbol";
import { PIScopedSymbol } from "./PIScopedSymbol";
import { PSymbolConstructor } from "./PSymbolConstructor";

export class PScopedSymbol extends PBaseSymbol implements PIScopedSymbol
{
	private _children: PBaseSymbol[] = [];

	constructor(name: string = "")
	{
		super(name);
	}

	get directScopes(): Promise<PIScopedSymbol[]>
	{
		return this.getSymbolsOfType(PScopedSymbol);
	}

	get children(): PBaseSymbol[]
	{
		return this._children;
	}

	get firstChild(): PBaseSymbol | undefined
	{
		return this._children.length > 0 ? this._children[0] : undefined;
	}

	get lastChild(): PBaseSymbol | undefined
	{
		return this._children.length > 0 ? this._children[this._children.length - 1] : undefined;
	}

	clear(): void
	{
		this._children = [];
	}

	addSymbol(symbol: PBaseSymbol): void
	{
		symbol.removeFromParent();
		this._children.push(symbol);
		symbol.setParent(this);
	}

	removeSymbol(symbol: PBaseSymbol): void
	{
		const index = this._children.indexOf(symbol);
		if (index > -1)
		{
			this._children.splice(index, 1);
			symbol.setParent(undefined);
		}
	}

	async getNestedSymbolsOfType<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>): Promise<T[]>
	{
		const result: T[] = [];
		const childPromises: Promise<T[]>[] = [];
		for (const child of this._children)
		{
			if (child instanceof t)
				result.push(child as T);
			if (child instanceof PScopedSymbol)
				childPromises.push(child.getNestedSymbolsOfType(t));
		}
		const childSymbols = await Promise.all(childPromises);
		for (const entry of childSymbols)
			result.push(...entry);
		return result;
	}

	getNestedSymbolsOfTypeSync<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>): T[]
	{
		const result: T[] = [];
		for (const child of this._children)
		{
			if (child instanceof t)
				result.push(child as T);
			if (child instanceof PScopedSymbol)
				result.push(...child.getNestedSymbolsOfTypeSync(t));
		}
		return result;
	}

	async getAllNestedSymbols(name?: string): Promise<PBaseSymbol[]>
	{
		const result: PBaseSymbol[] = [];
		const childPromises: Promise<PBaseSymbol[]>[] = [];
		for (const child of this._children)
		{
			if (!name || child.name === name)
				result.push(child);
			if (child instanceof PScopedSymbol)
				childPromises.push(child.getAllNestedSymbols(name));
		}
		const childSymbols = await Promise.all(childPromises);
		for (const entry of childSymbols)
			result.push(...entry);
		return result;
	}

	getAllNestedSymbolsSync(name?: string): PBaseSymbol[]
	{
		const result: PBaseSymbol[] = [];
		for (const child of this._children)
		{
			if (!name || child.name === name)
				result.push(child);
			if (child instanceof PScopedSymbol)
				result.push(...child.getAllNestedSymbolsSync(name));
		}
		return result;
	}

	getSymbolsOfType<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>): Promise<T[]>
	{
		return new Promise((resolve) =>
		{
			const result: T[] = [];
			for (const child of this._children)
			{
				if (child instanceof t)
					result.push(child as T);
			}
			resolve(result);
		});
	}

	async getAllSymbols<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>, localOnly: boolean = false): Promise<T[]>
	{
		const result: T[] = [];
		// Special handling for namespaces: they group symbols in this scope.
		for (const child of this._children)
		{
			if (child instanceof t)
				result.push(child as T);
			if (this.isNamespace(child))
				result.push(...await (child as PScopedSymbol).getAllSymbols(t, true));
		}
		if (!localOnly && this.parent)
			result.push(...await this.parent.getAllSymbols(t, true));
		return result;
	}

	getAllSymbolsSync<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>, localOnly: boolean = false): T[]
	{
		const result: T[] = [];
		for (const child of this._children)
		{
			if (child instanceof t)
				result.push(child as T);
			if (this.isNamespace(child))
				result.push(...(child as PScopedSymbol).getAllSymbolsSync(t, true));
		}
		if (!localOnly && this.parent)
			result.push(...this.parent.getAllSymbolsSync(t, true));
		return result;
	}

	async resolve(name: string, localOnly: boolean = false): Promise<PBaseSymbol | undefined>
	{
		for (const child of this._children)
		{
			if (child.name === name)
				return child;
		}
		if (!localOnly && this.parent)
			return this.parent.resolve(name, false);
		return undefined;
	}

	resolveSync(name: string, localOnly: boolean = false): PBaseSymbol | undefined
	{
		for (const child of this._children)
		{
			if (child.name === name)
				return child;
		}
		if (!localOnly && this.parent)
			return this.parent.resolveSync(name, false);
		return undefined;
	}

	symbolFromPath(path: string, separator: string = "."): PBaseSymbol | undefined
	{
		const elements = path.split(separator);
		let index = 0;
		if (elements[0] === this.name || elements[0].length === 0)
			++index;

		let result: PBaseSymbol = this;
		while (index < elements.length)
		{
			if (!(result instanceof PScopedSymbol))
				return undefined;
			const child = result.children.find(c => c.name === elements[index]);
			if (!child)
				return undefined;
			result = child;
			++index;
		}
		return result;
	}

	indexOfChild(child: PBaseSymbol): number
	{
		return this._children.indexOf(child);
	}

	nextSiblingOf(child: PBaseSymbol): PBaseSymbol | undefined
	{
		const index = this.indexOfChild(child);
		if (index === -1 || index >= this._children.length - 1)
			return undefined;
		return this._children[index + 1];
	}

	previousSiblingOf(child: PBaseSymbol): PBaseSymbol | undefined
	{
		const index = this.indexOfChild(child);
		if (index < 1)
			return undefined;
		return this._children[index - 1];
	}

	nextOf(child: PBaseSymbol): PBaseSymbol | undefined
	{
		if (!child.parent)
			return undefined;
		if (child.parent !== this)
			return child.parent.nextOf(child);
		if (child instanceof PScopedSymbol && child.children.length > 0)
			return child.children[0];
		const sibling = this.nextSiblingOf(child);
		if (sibling)
			return sibling;
		return this.parent ? this.parent.nextOf(this) : undefined;
	}

	private isNamespace(candidate: PBaseSymbol): boolean
	{
		return (candidate as { inline?: unknown }).inline !== undefined
			&& (candidate as { attributes?: unknown }).attributes !== undefined;
	}
}