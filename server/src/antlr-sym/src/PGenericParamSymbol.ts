// import { BaseSymbol } from "antlr4-c3";
import { PBaseSymbol } from "./PBaseSymbol";
import { PComponentSymbol } from "./PComponentSymbol"
import { PType } from "./PType"

export class PGenericParamSymbol extends PComponentSymbol // BaseSymbol
{
	readonly formalTypes : PType[] = [];

	constructor(name: string, fTypes: PType[])
	{
		super(name, undefined);
		this.formalTypes = fTypes;
	}
}