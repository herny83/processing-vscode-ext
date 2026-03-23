# Processing VSCode Extension Code Style

- Use tabs for indentation (tab size: 4).
- No spaces for indentation.
- Braces are required for loops and function bodies, always on the next line.
- Single-line if statements inside blocks do NOT use braces.
- Multi-line if/else/for/while blocks use braces, next line style.
- No single-line blocks with braces.
- Each statement should be on its own line and indented.
- Comments are aligned with the block, not indented further.
- Variable declarations and assignments are indented with tabs, no space alignment.
- Closing braces are always on their own line, aligned with the block.
- Function parameters are on the same line unless too long.
- Minimal inline comments, prefer clarity in code.
- Maintain clarity and readability.
- Apply this style consistently across all files.

## Example

for (let i = 0; i < n; i++)
{
	if (x > 0)
		doSomething();
	else
	{
		doSomethingElse();
	}
}

if (x > 0)
	doSomething();

function foo()
{
	// Block comment
	let x = 0;
}
