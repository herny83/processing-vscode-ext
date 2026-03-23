# Processing Debugger for VS Code

## Overview
A lightweight debugger for [Processing](https://processing.org/) sketches in Visual Studio Code.  
This extension allows you to build, run, and debug Processing code with features such as breakpoints, variable inspection, inline values, watch expressions, and integration with the Red Hat Java extension.

## Features

- Build and preprocess `.pde` files to `.java` and `.class` before debugging
- Automatic detection of main sketch class for debug launch
- Breakpoint mapping between `.pde` and generated `.java` files
- Inline values provider for Processing variables during debug sessions
- Watch and evaluate expressions in the debug panel
- Integration with Red Hat Java extension for project and classpath resolution
- Context menu and editor title actions for running and debugging Processing sketches
- Progress reporting and output channel logging for build and debug operations

## Requirements

- [Processing](https://processing.org/download/) installed and available on your system
- JDK (version 1.8.0 or later)
- Visual Studio Code (version 1.19.0 or later)
- [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java)

## Installation

1. Install [Processing](https://processing.org/download/) and ensure the `processing-java` command line tool is available.
2. Install [Language Support for Java by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.java) in VS Code.
3. Install this extension and make sure to set the processing location in settings (`processing.path`)

## Usage

- Open a folder containing your Processing sketch (`.pde` files).
- Use the Run or Debug actions from the editor title or context menu to build and launch your sketch in debug mode.
- Set breakpoints in your `.pde` files; they will be mapped to the generated Java code.
- Inspect variables, use inline values, and add watch expressions during your debug session.

## Debug Configuration

The extension auto-generates a suitable debug configuration for your sketch.  
You can customize `.vscode/launch.json` for advanced scenarios.

Example:
```json
{
  "type": "processing",
  "name": "Debug Processing Sketch",
  "request": "launch",
  "mainClass": "sketch.MainSketch",
  "projectName": "MySketchProject",
  "args": [],
  "vmArgs": [],
  "console": "integratedTerminal"
}
```

For more details on configuration options, see [Configuration.md](./Configuration.md).

## Troubleshooting

- Ensure your Processing path is set in VS Code settings if not auto-detected.
- Check the Problems panel for build or compile errors.
- If the debugger fails to launch, verify that the Java extension is activated and your sketch builds successfully.
- For issues with breakpoints, watch expressions, or inline values, ensure your sketch is recognized as a Java project and the `projectName` is set in your debug configuration.

## Feedback and Contributing

If you encounter issues or have feature requests, please open an issue on the project repository.  
Contributions are welcome!

## License

This extension is licensed under [MIT License](https://github.com/Microsoft/vscode-java-debug/blob/master/LICENSE.txt).
