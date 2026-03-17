// Entry point for the Processing debug adapter

import { DebugSession, InitializedEvent, TerminatedEvent, StoppedEvent, OutputEvent } from 'vscode-debugadapter';
import { DebugProtocol } from 'vscode-debugprotocol';

class ProcessingDebugSession extends DebugSession {
  public constructor() {
    super();
    // TODO: Initialize debug session state
  }

  // TODO: Implement required debug protocol methods
}

DebugSession.run(ProcessingDebugSession);