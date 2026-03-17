// Entry point for the VS Code extension (client)
import { workspace, ExtensionContext, window, debug } from 'vscode';
import {
  LanguageClient,
  LanguageClientOptions,
  ServerOptions,
  TransportKind
} from 'vscode-languageclient/node';

let client: LanguageClient;

export function activate(context: ExtensionContext) {
  // LSP Server setup
  const serverModule = context.asAbsolutePath('server/out/server.js');
  const serverOptions: ServerOptions = {
    run: { module: serverModule, transport: TransportKind.ipc },
    debug: { module: serverModule, transport: TransportKind.ipc, options: { execArgv: ['--nolazy', '--inspect=6009'] } }
  };
  const clientOptions: LanguageClientOptions = {
    documentSelector: [{ scheme: 'file', language: 'processing' }],
    synchronize: {
      fileEvents: workspace.createFileSystemWatcher('**/*.pde')
    }
  };
  client = new LanguageClient(
    'processingLanguageServer',
    'Processing Language Server',
    serverOptions,
    clientOptions
  );
  context.subscriptions.push(client);

  // Debug Adapter setup (register debug adapter descriptor factory)
  // Register the Processing debug adapter descriptor factory
  try {
    // Dynamically import to avoid breaking activation if debugger is missing
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const { ProcessingDebugAdapterDescriptorFactory } = require('../../debugger/src/ProcessingDebugAdapterDescriptorFactory');
    context.subscriptions.push(
      debug.registerDebugAdapterDescriptorFactory('processing', new ProcessingDebugAdapterDescriptorFactory())
    );
  } catch (err) {
    window.showWarningMessage('Processing debugger integration could not be loaded: ' + err);
  }

  // Show activation message
  window.showInformationMessage('Processing-ext extension activated!');
}

export function deactivate(): Promise<void> | undefined {
  if (!client) {
    return undefined;
  }
  return client.stop();
}
