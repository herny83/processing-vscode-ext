import * as log from './syslogs'

class Measured
{
	name : string;
	startTime : number;
	endTime : number;
	childs : Measured[];

	constructor(name:string)
	{
		this.name = name;
		this.startTime = performance.now();
		this.endTime = -1;
		this.childs = [];
	}
	stop()
	{
		this.endTime = performance.now();
	}
	addChild(measure : Measured)
	{
		this.childs.push(measure);
	}
	print(prefix : string)
	{
		const elapsedTime = (this.endTime - this.startTime);
		log.write(`${prefix} '${this.name}' avg time: ${elapsedTime.toFixed(2)} ms`, log.severity.EVENT);
		this.printChilds(prefix);
	}
	printChilds(prefix : string)
	{
		for(let child of this.childs)
			child.print("##"+prefix);
	}
	clear()
	{
		this.childs = [];
	}
}

let measureStack : Measured[] = [];
let currentMeasure : Measured = new Measured("main");

export function measureBegin(name : string)
{
	const newMeasure = new Measured(name);
	// if(currentMeasure != null)
	// {
		currentMeasure.addChild(newMeasure);
		measureStack.push(currentMeasure);
	//}
	currentMeasure = newMeasure;
}

export function measureEnd(name : string)
{
	// if(currentMeasure == null)
	// {
	// 	log.write(`[ERROR] measureEnd name ${name} should be matched with a measureBegin`, log.severity.ERROR);
	// 	return;
	// }
	if(currentMeasure.name !== name)
	{
		log.write(`[ERROR] measureEnd name ('${name}') should match measureBegin name ('${currentMeasure.name}')`, log.severity.ERROR);
		return;
	}
	currentMeasure.stop();
	currentMeasure = measureStack.pop() ?? currentMeasure;
}

export function print()
{
	log.write(`EXECUTION MEASUREMENTS. Begin:`, log.severity.EVENT);
	currentMeasure.printChilds("");
	currentMeasure.clear();
	log.write(`EXECUTION MEASUREMENTS. End.`, log.severity.EVENT);

}