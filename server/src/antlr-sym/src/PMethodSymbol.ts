import { MethodFlags } from "antlr4-c3";
import { PScopedSymbol } from "./PScopedSymbol";
import { PType } from "./PType"
import { PVariableSymbol } from "./PVariableSymbol"
import { PParameterSymbol } from "./PParameterSymbol"

export { MethodFlags };

/** A function which belongs to a class or other outer container structure. */
export class PMethodSymbol extends PScopedSymbol
{
    methodFlags: MethodFlags = MethodFlags.None;

	returnType: PType | undefined;

    constructor(name: string, returnType?: PType) {
		super(name);
		this.returnType = returnType;
	}

	getVariables(localOnly:boolean = true) : Promise<PVariableSymbol[]> {
        return this.getSymbolsOfType(PVariableSymbol);
    }
    getParameters(localOnly:boolean = true): Promise<PParameterSymbol[]> {
        return this.getSymbolsOfType(PParameterSymbol);
    }
}