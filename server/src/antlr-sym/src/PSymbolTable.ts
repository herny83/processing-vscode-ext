import * as symb from "antlr4-c3";
import { PNamespaceSymbol } from "./PNamespaceSymbol"
import { PComponentSymbol } from "./PComponentSymbol"
import { PLibraryTable } from './PLibraryTable';
import { PUtils } from './PUtils';
import { IPType } from './PType';

export class PSymbolTable extends symb.SymbolTable 
{
	public dependencyTable : PLibraryTable = new PLibraryTable("", { allowDuplicateSymbols: true});
	public librarySymbolCollection : Map<string, symb.BaseSymbol[]> = new Map<string, symb.BaseSymbol[]>();
	protected defaultImported : Set<symb.BaseSymbol> = new Set<symb.BaseSymbol>();
	public importTable : Map<string, symb.BaseSymbol> = new Map<string, symb.BaseSymbol>();
	public importStatics : symb.BaseSymbol [] = [];

	constructor(name: string, options: symb.SymbolTableOptions)
	{
		super(name, options);
	}

	public clear()
	{
		this.dependencyTable = new PLibraryTable("", { allowDuplicateSymbols: true});
		this.importStatics = [];
		this.importTable.clear();
		this.defaultImported.clear();
		this.librarySymbolCollection.clear();
		super.clear();
	}

	public registerLibrarySymbols(libName: string, symbol: symb.BaseSymbol)
	{
		if (!this.librarySymbolCollection.has(libName))
			this.librarySymbolCollection.set(libName, []);
		this.librarySymbolCollection.get(libName)!.push(symbol);
	}

	public unregisterLibrarySymbols(libName: string)
	{
		let symbols = this.librarySymbolCollection.get(libName);
		if(!symbols)
			return;
		for (let symbol of symbols)
			this.dependencyTable.removeSymbolAndCleanUp(symbol);
		this.librarySymbolCollection.delete(libName);
		this.importStatics = [];
		this.importTable.clear();
	}

	public resolveImportTableComponent<T extends symb.BaseSymbol, Args extends unknown[]>(t:  symb.SymbolConstructor<T, Args>, importPath : string) : T | undefined
	{
		let result = this.importTable.get(importPath) as T | undefined;
		if(result)
			return result;

		for(const staticImport of this.importStatics)
		{
			let resolved = staticImport.name === importPath ? staticImport as T : undefined;
			if(resolved)
				return resolved;
		}
	}

	public addDefaultImport(importPath: string) 
	{ 
		let result : PComponentSymbol | undefined = this.dependencyTable.resolveComponent(PComponentSymbol, importPath);
		if(result)
		{
			let components = PUtils.getAllMatchsSync(result.children, PComponentSymbol, undefined);
			for(let component of components)
				this.defaultImported.add(component);
		}
	}

	public clearImportTable()
	{
		this.importStatics = [];
		this.importTable.clear();
		for(const symb of this.dependencyTable.children)
			this.importTable.set(symb.name, symb);
		for (const symb of this.defaultImported)
			this.importTable.set(symb.name, symb);
		for (const [libName, symbols] of this.librarySymbolCollection)
		{
			for (const symb of symbols)
			{
				if(!this.importTable.has(symb.name))
					this.importTable.set(symb.name, symb);
			}
		}
	}

	public addToImportTable(imports : symb.BaseSymbol[], staticImports: symb.BaseSymbol[])
	{
		for (const symb of imports)
			this.importTable.set(symb.name, symb);

		for (const imp of staticImports)
		{
			if(this.importStatics.includes(imp)==false)
				this.importStatics.push(imp);
		}
	}

	public getFullPath(ptype: IPType, checkAliasToo:boolean=true) : string
	{
		if(ptype instanceof symb.BaseSymbol)
			return ptype.qualifiedName(".", true, false);
		if(ptype.outerType)
			return this.getFullPath(ptype.outerType, false) + '.' + ptype.name;
		else if(checkAliasToo)
			return this.ensureIsFullPath(ptype.name);
		return ptype.name;
	}

	public ensureIsFullPath(name: string) : string
	{
		let dotIndex = name.indexOf(PNamespaceSymbol.delimiter);
		if(dotIndex>=0)
		{
			let firstPart = name.substring(0, dotIndex);
			const symbol = this.importTable.get(firstPart);
			if(symbol instanceof PNamespaceSymbol || symbol instanceof PComponentSymbol)
				return symbol.qualifiedName(".", true, false) + name.substring(dotIndex);
		}
		return name;
	}

    resolveSync(name:string, localOnly = false) : symb.BaseSymbol | undefined
	{
		let result = super.resolveSync(name, localOnly);

		if(!result)
		{
			let fullName = this.ensureIsFullPath(name)
			if(!fullName)
				fullName = name;

			result = this.dependencyTable.symbolFromPath(fullName, ".");
		}
		return result;
    }
}