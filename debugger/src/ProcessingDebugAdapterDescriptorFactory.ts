// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT license.

import * as vscode from "vscode";
import * as ls from "./languageServerPlugin";
import { convertErrorToMessage, showErrorMessageWithTroubleshooting, LogMsgType } from "./utility";
import { DebugAdapterDescriptor, DebugAdapterExecutable, DebugAdapterServer, DebugSession } from "vscode";

export class ProcessingDebugAdapterDescriptorFactory implements vscode.DebugAdapterDescriptorFactory 
{
    // Implement Processing-specific debug adapter logic here
    public async createDebugAdapterDescriptor(_session: DebugSession,
                                              _executable: DebugAdapterExecutable): Promise<DebugAdapterDescriptor | undefined> {
        let error: Error| undefined;
        console.log("[ProcessingDebug] Creating debugger adapter factory");
        try {
            const debugServerPort = <number> (await ls.startDebugSession());
            if (debugServerPort) {
                return new DebugAdapterServer(debugServerPort);
            } else {
                // Information for diagnostic:
                // tslint:disable-next-line:no-console
                console.log("Cannot find a port for debugging session");
            }
        } catch (err) {
            error = err instanceof Error ? err : new Error(String(err));
        }

        const message = error ? convertErrorToMessage(error) : {
            type: LogMsgType.EXCEPTION,
            message: "Failed to start debug server.",
        };
        showErrorMessageWithTroubleshooting(message);
        return undefined;
    }
}
