import { PBaseSymbol } from "./PBaseSymbol";
import { PComponentSymbol } from "./PComponentSymbol"
import { PType } from "./PType"

// A generic type parameter (e.g. `T` in `List<T>`). Modeled as a component so
// it carries its own scope and can hold the formal-bound types it must satisfy.
export class PGenericParamSymbol extends PComponentSymbol
{
	readonly formalTypes : PType[] = [];

	constructor(name: string, fTypes: PType[])
	{
		super(name, undefined);
		this.formalTypes = fTypes;
	}
}