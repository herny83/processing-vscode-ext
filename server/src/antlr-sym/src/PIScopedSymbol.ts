import { PBaseSymbol } from "./PBaseSymbol";
import { PSymbolConstructor } from "./PSymbolConstructor";


// Processing-prefixed scoped-symbol interface.
export interface PIScopedSymbol extends PBaseSymbol
{
	directScopes: Promise<PIScopedSymbol[]>;
	children: PBaseSymbol[];
	firstChild: PBaseSymbol | undefined;
	lastChild: PBaseSymbol | undefined;

	clear(): void;
	addSymbol(symbol: PBaseSymbol): void;
	removeSymbol(symbol: PBaseSymbol): void;

	getNestedSymbolsOfType<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>): Promise<T[]>;
	getNestedSymbolsOfTypeSync<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>): T[];

	getAllNestedSymbols(name?: string): Promise<PBaseSymbol[]>;
	getAllNestedSymbolsSync(name?: string): PBaseSymbol[];

	getSymbolsOfType<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>): Promise<T[]>;
	getAllSymbols<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>, localOnly?: boolean): Promise<T[]>;
	getAllSymbolsSync<T extends PBaseSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>, localOnly?: boolean): T[];

	resolve(name: string, localOnly?: boolean): Promise<PBaseSymbol | undefined>;
	resolveSync(name: string, localOnly?: boolean): PBaseSymbol | undefined;

	symbolFromPath(path: string, separator: string): PBaseSymbol | undefined;
	indexOfChild(child: PBaseSymbol): number;
	nextSiblingOf(child: PBaseSymbol): PBaseSymbol | undefined;
	previousSiblingOf(child: PBaseSymbol): PBaseSymbol | undefined;
	nextOf(child: PBaseSymbol): PBaseSymbol | undefined;
}
