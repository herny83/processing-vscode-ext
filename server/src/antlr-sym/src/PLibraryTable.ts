import { PSymbolConstructor } from "./PSymbolConstructor";
import { PSymbolTableBase } from "./PSymbolTableBase";
import { PScopedSymbol } from "./PScopedSymbol";
import { PBaseSymbol } from "./PBaseSymbol";
import { PNamespaceSymbol } from "./PNamespaceSymbol"
import { PComponentSymbol } from "./PComponentSymbol"
import { PUtils } from "./PUtils"

export class PLibraryTable extends PSymbolTableBase
{
	constructor(name: string, options: ConstructorParameters<typeof PSymbolTableBase>[1])
	{
		super(name, options);
	}

	getOrCreateFor(symbolPath:string, delimiter:string="/", lastToo:boolean=false, createNamespace:boolean=true, at?:PScopedSymbol|undefined) : PScopedSymbol
	{
		const parts = symbolPath.split(delimiter);
        let i = 0;
		let currentParent : PScopedSymbol = at ? at : this;

		let lastsRemoved = (lastToo?0:1);
		while (i < parts.length - lastsRemoved) 
		{
			let component = PUtils.resolveChildSymbolSync(currentParent, PComponentSymbol, parts[i]);
			if(component == undefined)
			{
				if(createNamespace)
                	component = new PNamespaceSymbol(parts[i]);
				else
					component = new PComponentSymbol(parts[i]);
				currentParent.addSymbol(component);
			}
            currentParent = component;
            ++i;
       	}
        return currentParent;
	}

	resolveComponent<T extends PComponentSymbol, Args extends unknown[]>(t: PSymbolConstructor<T, Args>, name:string) : T | undefined
	{
		if(name.indexOf('.')>=0)
		{
			let nameParts : string [] = name.split(".");
			let callContext = PUtils.resolveChildSymbolSync(this, PComponentSymbol, nameParts[0] );
			let partIndex = 1;
			while(callContext && partIndex < nameParts.length)
			{
				callContext = PUtils.resolveChildSymbolSync(callContext, PComponentSymbol, nameParts[partIndex]);
				partIndex++;
			}
			return (callContext instanceof t) ? (callContext as T) : undefined;
		}
		else
		{
			return PUtils.resolveChildSymbolSync<T, Args>(this, t, name);
		}
	}

	removeSymbolAndCleanUp(symbol: PBaseSymbol): void 
	{
		const savedParent = symbol.parent;
		if(savedParent)
			savedParent.removeSymbol(symbol);
		if (savedParent instanceof PNamespaceSymbol && savedParent.children.length == 0)
			this.removeSymbolAndCleanUp(savedParent);
	}
}