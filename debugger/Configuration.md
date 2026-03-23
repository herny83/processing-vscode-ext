# Processing Debug Configuration

## Table of Contents
* [Auto-generate launch.json](#auto-generate-launchjson)
* [Modify launch.json](#modify-launchjson)
  * [Main](#main)
    * mainClass
    * projectName
  * [Arguments](#arguments)
    * args
    * vmArgs
  * [Environment](#environment)
    * console
    * env
  * [Attach to a debuggee](#attach-to-a-debuggee)
    * hostName
    * port
* [Modify settings.json (User Settings)](#modify-settingsjson-user-settings)
  * processing.debug.settings.console
  * processing.debug.settings.forceBuildBeforeLaunch
  * processing.debug.settings.onBuildFailureProceed
  * processing.debug.settings.hotCodeReplace
  * processing.debug.settings.enableRunDebugCodeLens
* [FAQ](#faq)

---

## Auto-generate launch.json

When you use the Run or Debug actions for a `.pde` file, the extension automatically generates a suitable debug configuration for your sketch. This configuration sets up the main class, project name, and classpaths required to launch the Processing sketch in debug mode.

## Modify launch.json

You can manually edit `.vscode/launch.json` to customize your debug sessions. The most important fields are:

### Main

- `mainClass`: The entry point for your sketch. This should be the fully qualified class name generated from your `.pde` files.
- `projectName`: The Processing project name. This is required for advanced features like watch/evaluate and is auto-detected for most sketches.

Example:
```json
{
  "type": "processing",
  "name": "Debug Processing Sketch",
  "request": "launch",
  "mainClass": "MainSketchName",
  "projectName": "jdt.ls-java-project"
}
```

### Arguments

- `args`: Program arguments passed to your sketch's `main(String[] args)` method.
- `vmArgs`: JVM arguments for customizing the Java runtime (e.g., memory settings).

### Environment

- `console`: Choose between `integratedTerminal`, `internalConsole`, or `externalTerminal` for program output and input.
- `env`: Key-value pairs for environment variables.

### Attach to a debuggee

You can attach the debugger to a running Java process (e.g., a Processing sketch started externally) by specifying the host and port:

```json
{
  "type": "processing",
  "name": "Attach to Processing Sketch",
  "request": "attach",
  "hostName": "localhost",
  "port": 5005
}
```

---

## Modify settings.json (User Settings)

- `processing.debug.settings.console`: Default console for launching sketches.
- `processing.debug.settings.forceBuildBeforeLaunch`: Force build before launching.
- `processing.debug.settings.onBuildFailureProceed`: Proceed even if build fails.
- `processing.debug.settings.hotCodeReplace`: Enable hot code replace (`manual`, `auto`, `never`).
- `processing.debug.settings.enableRunDebugCodeLens`: Show Run/Debug buttons above main entry points.

---

## FAQ

### 1. How do I debug a Processing sketch?
Use the Run or Debug actions in the editor or context menu for your `.pde` file. The extension will build and launch your sketch with the debugger attached.

### 2. Why do I need a projectName?
The project name helps the debugger resolve classes and enables features like watch/evaluate. It is usually auto-detected, but you can set it manually in your launch configuration if needed.

### 3. Can I pass arguments or change JVM settings?
Yes, use the `args` and `vmArgs` fields in your launch configuration.

### 4. What if my sketch fails to build?
Check the Problems panel for errors. You can control build behavior with `processing.debug.settings.forceBuildBeforeLaunch` and `processing.debug.settings.onBuildFailureProceed`.

### 5. How do I attach to an external Processing sketch?
Start your sketch with Java debug options (e.g., `-agentlib:jdwp=transport=dt_socket,server=y,suspend=y,address=5005`) and use an attach configuration in launch.json.

---

For more details, see the README or open an issue on GitHub.
