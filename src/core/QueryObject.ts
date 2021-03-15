export class QueryObject {
	public readonly filter?: Map<string, any>;
	public readonly limit?: number;

	public constructor(filter?: Map<string, any>, limit?: number) {
		this.filter = filter;
		this.limit = limit;
	}
}
