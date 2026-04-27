import { PBaseSymbol } from "./PBaseSymbol";
import { PType, PTypeKind } from "./PType"

/** A symbol with an attached type (variables, fields etc.). */
export class PTypedSymbol extends PBaseSymbol 
{
    type: PType | undefined;
    constructor(name: string, type?: PType)
	{
		super(name);
		this.type=type;
	}
}
