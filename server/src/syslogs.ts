import * as fs from 'fs';
import * as path from 'path';

// Resolve log path relative to the extension root (two levels up from server/out/)
const extensionRoot = path.resolve(__dirname, '..', '..');
const logDir = path.join(extensionRoot, 'logs');
const logPath = path.join(logDir, 'syslogs.log');

export enum severity {
	NONE,
	INFO,
	BEHAVIOR,
	EVENT,
	SUCCES,
	WARNING,
	ERROR
}

type errorWithMessage = {
	message: string
}

function ensureLogDir() {
	if (!fs.existsSync(logDir)) {
		fs.mkdirSync(logDir, { recursive: true });
	}
}

export async function writeLog(logContents: String) {
	let datetime = new Date()
	try {
		ensureLogDir();
		fs.appendFileSync(logPath, `${datetime.toISOString().slice(0,22)} -> ${logContents}\n`)
	} catch {
		// Silently ignore file write errors
	}
}

export async function write(message: string | unknown, logLevel : severity = severity.NONE) {
	let datetime = new Date().toISOString().slice(0,22)
	let _message;

	if (typeof message === 'string') {
		_message = message
	}
	else {
		_message = getErrorMessage(message)
	}

	let logLevelString = ''
	let logEntry = ''
	if (logLevel > 0) {
		logLevelString = `[${severityToString(logLevel)}]`
		logEntry = `${datetime} - ${logLevelString} ${_message}`
	}
	else {
		logEntry = `${datetime} - ${_message}`
	}

	try {
		ensureLogDir();
		fs.appendFileSync(logPath, logEntry + '\n');
	} catch {
		// Silently ignore file write errors
	}

	if (logLevel == 3 || logLevel == 4 ) {
		console.log(`${logEntry}`)
	}
	else if (logLevel == 5) {
		console.warn(`${logEntry}`)
	}
	else if (logLevel == 6) {
		console.error(`${logEntry}`)
	}
}

function severityToString(logLevel : severity) : string {
	switch (logLevel) {
		case severity.NONE:
			return ""

		case severity.INFO:
			return "INFO"

		case severity.BEHAVIOR:
			return "BEHAVOIR"

		case severity.EVENT:
			return "EVENT"

		case severity.SUCCES:
			return "SUCCES"

		case severity.WARNING:
			return "WARNING"

		case severity.ERROR:
			return "ERROR"

		default:
			return ""
	}
}

function getErrorMessage(error: unknown) {
	return extractMessage(error).message
}

function extractMessage(maybeError: unknown) : errorWithMessage{
	if (isErrorWithMessage(maybeError)) return maybeError

	try {
		return new Error(JSON.stringify(maybeError))
	} catch {
		// fallback in case there's an error stringifying the maybeError
		// like with circular references for example.
		return new Error(String(maybeError))
	}
}

function isErrorWithMessage(error: unknown): error is errorWithMessage {
	return (
	  typeof error === 'object' &&
	  error !== null &&
	  'message' in error &&
	  typeof (error as Record<string, unknown>).message === 'string'
	)
  }
