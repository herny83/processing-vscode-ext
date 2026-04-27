import { PReferenceKind } from "./PReferenceKind";
import { PScopedSymbol } from "./PScopedSymbol";
import { IPType, PType, PTypeKind } from "./PType";

export class PComponentSymbol extends PScopedSymbol implements IPType
{
	readonly extends: PType | undefined;
	private generics: PType[] = [];
	
	
	// Required by IPType
	get arrayType(): PType | undefined { return undefined; }
	get extendType(): PType | undefined { return this.extends; }
	get implementTypes(): PType[] { return []; }
	get genericTypes(): PType[] { return this.generics; }
	get outerType(): PType | undefined { return undefined; }
	get typeKind() { return PTypeKind.Component; }
	get reference() { return PReferenceKind.Reference; } // Reference to PReferenceKind

	constructor(name: string, ext?:PType|undefined)
	{
		super(name);
		if(ext)
			this.extends=ext;
	}

	public setGenericTypes(genTypes:PType[]) : PComponentSymbol
	{
		this.generics = PType.createCloneArray(genTypes);
		return this;
	}
}