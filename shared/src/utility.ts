// Shared utility types and error classes (environment-agnostic)

export enum LogMsgType {
    EXCEPTION = "exception",
    USAGEDATA = "usageData",
    USAGEERROR = "usageError",
    ACTIVATEEXTENSION = "activateExtension",
}

export class UserError extends Error {
    public context: ITroubleshootingMessage;
    constructor(context: ITroubleshootingMessage) {
        super(context.message);
        this.context = context;
    }
}

export class JavaExtensionNotEnabledError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export class OperationCancelledError extends Error {
    constructor(message: string) {
        super(message);
    }
}

export interface ILoggingMessage {
    type?: LogMsgType;
    message: string;
    stack?: string;
    bypassLog?: boolean;
}

export interface ITroubleshootingMessage extends ILoggingMessage {
    anchor?: string;
}

// VS Code-specific utilities should be placed in utility.vscode.ts
// Node.js-specific utilities should be placed in utility.node.ts
