import { PBaseSymbol } from "./PBaseSymbol";
import { PType } from "./PType"

export class PThrowsSymbol extends PBaseSymbol 
{
	readonly type : PType;

	constructor(name: string, extTypes: PType)
	{
		super(name);
		this.type = extTypes;
	}
}