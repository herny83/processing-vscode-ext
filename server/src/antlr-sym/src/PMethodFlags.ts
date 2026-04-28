// Processing-prefixed wrapper for antlr4-c3 MethodFlags
export enum PMethodFlags {
	None = 0,
	Virtual = 1,           // Overridable (default for instance methods)
	Abstract = 2,          // Declared abstract
	Final = 4,             // Cannot be overridden
	Static = 8,            // Static method
	Synchronized = 16,     // Synchronized method
	Native = 32,           // Native method
	Strictfp = 64          // Strict floating-point
}