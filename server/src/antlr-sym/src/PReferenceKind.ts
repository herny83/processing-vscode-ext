// How a type is being referenced at a given site: as a value instance, by
// reference (Java/JS object handle), by pointer (C++-style), or irrelevant
// when the distinction doesn't apply.
enum PReferenceKind {
	Irrelevant = 0,
	Pointer = 1,
	Reference = 2,
	Instance = 3
}

export { PReferenceKind };
