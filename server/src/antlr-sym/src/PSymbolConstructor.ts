// Processing-prefixed symbol constructor type.
import { PBaseSymbol } from "./PBaseSymbol";

export type PSymbolConstructor<T extends PBaseSymbol, Args extends unknown[]> = new (...args: Args) => T;
