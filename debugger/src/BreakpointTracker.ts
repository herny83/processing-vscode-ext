import * as vscode from 'vscode';
import * as sketch from "./sketch";
import * as utils from "./utility";

export class BreakpointTrackerFactory implements vscode.DebugAdapterTrackerFactory {
    public createDebugAdapterTracker(_session: vscode.DebugSession): vscode.ProviderResult<vscode.DebugAdapterTracker> {
        return new BreakpointTracker();
    }
}

// Here we intercept the messages between client and debug adapter to convert pde to java breakpoints and viceversa.
export class BreakpointTracker implements vscode.DebugAdapterTracker 
{
    breakpointIdsToConvert : number [] = [];
    seqToConvert : number [] = [];

    onWillReceiveMessage(message: any): void 
    {
        // if(message.command === 'breakpointLocations' || message.command === 'setBreakpoints')
        //     console.log("onWillReceiveMessage: "+JSON.stringify(message));
        if (message.type === 'request' && message.command === 'initialize')
        {
            this.breakpointIdsToConvert = [];
            this.seqToConvert = [];
        }
        if (message.type === 'request' && message.command === 'breakpointLocations' && message.arguments) 
        { 
            const breakpointInfo = message.arguments;
            if (breakpointInfo.source && breakpointInfo.source.path && breakpointInfo.source.path.endsWith('.pde')) 
            {
                this.seqToConvert.push(message.seq);
                const location : sketch.Location = sketch.convertPdeLineToJavaLine(breakpointInfo.source.path, breakpointInfo.line);
                breakpointInfo.line = location.line;
                breakpointInfo.source.path = location.file;
            }
        }
        if (message.type === 'request' && message.command === 'setBreakpoints' && message.arguments) 
        {
            const breakpointInfo = message.arguments;
            if (breakpointInfo.source && breakpointInfo.source.path && breakpointInfo.source.path.endsWith('.pde'))  
            {
                this.seqToConvert.push(message.seq);
                for( let i=0; breakpointInfo.breakpoints && i < breakpointInfo.breakpoints.length; i++ )
                {
                    breakpointInfo.breakpoints[i].line = sketch.convertPdeLineToJavaLine(breakpointInfo.source.path, breakpointInfo.breakpoints[i].line).line;
                }
                for( let i=0; breakpointInfo.lines && i < breakpointInfo.lines.length; i++ )
                {
                    breakpointInfo.lines[i] = sketch.convertPdeLineToJavaLine(breakpointInfo.source.path, breakpointInfo.lines[i]).line;
                }
                breakpointInfo.source.path = sketch.getMainJavaFile();
             }
        }
    }

    onDidSendMessage(message: any): void 
    {
        // if(message.command === 'breakpointLocations' || message.command === 'setBreakpoints')
        //     console.log("onDidSendMessage: "+JSON.stringify(message));   
        if (message.type === 'response' && message.command === 'setBreakpoints' && message.body) 
        {
            const seqIndex : number = this.seqToConvert.indexOf(message.request_seq);
            if(seqIndex >= 0 )
            {
                this.seqToConvert.splice(seqIndex, 1);
                const breakpointInfo = message.body;
                for( let i=0; breakpointInfo.breakpoints && i < breakpointInfo.breakpoints.length; i++ )
                {
                    if( !this.breakpointIdsToConvert.includes(breakpointInfo.breakpoints[i].id) )
                        this.breakpointIdsToConvert.push(breakpointInfo.breakpoints[i].id);
                    breakpointInfo.breakpoints[i].line = sketch.convertJavaLineToPdeLine(breakpointInfo.breakpoints[i].line).line;
                }
            }
        }
        else if (message.type === 'response' && message.command === 'breakpointLocations' && message.body) 
        {
            const seqIndex : number = this.seqToConvert.indexOf(message.request_seq);
            if(seqIndex >= 0 )
            {
                this.seqToConvert.splice(seqIndex, 1);
                const breakpointInfo = message.body;
                for( let i=0; breakpointInfo.breakpoints && i < breakpointInfo.breakpoints.length; i++ )
                {
                    const loc : sketch.Location = sketch.convertJavaLineToPdeLine(breakpointInfo.breakpoints[i].line);
                    breakpointInfo.breakpoints[i].line = loc.line;
                }
            }
        }
        else if (message.type === 'response' && message.command === 'stackTrace' && message.body) 
        {
            const stacktraceBody = message.body;
            if(stacktraceBody.totalFrames && stacktraceBody.totalFrames > 0)
            {
                const stackFrames = stacktraceBody.stackFrames;
                for( let i=0; stackFrames && i < stackFrames.length; i++ )
                {
                    if(stackFrames[i].source && stackFrames[i].source.name && stackFrames[i].source.name == sketch.getMainJavaName())
                    {
                        const pdeLocation : sketch.Location = sketch.convertJavaLineToPdeLine(stackFrames[i].line);
                        stackFrames[i].line = pdeLocation.line;
                    }
                }
            }
        }
    }
}