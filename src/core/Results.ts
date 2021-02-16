export class Result<T> {
  public readonly data: T;
  public readonly type: string;
  public readonly message?: string;
  public readonly code?: number;

  protected constructor(data: T, message?: string, code?: number) {
    this.data = data;
    this.type = this.constructor.name;
    this.message = message;
    this.code = code;
  }
}
