import { PINamespaceSymbol } from "./PINamespaceSymbol";
import { PComponentSymbol } from "./PComponentSymbol"


export class PNamespaceSymbol extends PComponentSymbol  implements PINamespaceSymbol
{
	readonly inline: boolean;
    readonly attributes: string[];
    
	static delimiter : string = ".";
    constructor(name: string, inline: boolean=false, attributes: string[]=[])
	{
        super(name);
		this.inline = inline;
		this.attributes = attributes;
    }

	public containsName(fullname:string) : boolean
	{
		return fullname?.startsWith(this.name);
	}

	public consumeName(fullname:string|undefined) : string | undefined
	{
		if(!fullname)
			return undefined;
		return fullname.substring(this.name.length+1);
	}
}