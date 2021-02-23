import { Result } from '../core/Results';

export class CreatedResult<T> extends Result<T> {
  constructor(value: T) {
    super(value);
  }
}
export class ModifiedResult<T> extends Result<T> {
  constructor(value: T) {
    super(value);
  }
}
export class QueryResult<T> extends Result<T[]> {
  constructor(value: T[]) {
    super(value);
  }
}
export class ReadResult<T> extends Result<T[]> {
  constructor(value: T[]) {
    super(value);
  }
}
export class DeletedResult extends Result<number> {
  constructor(total: number) {
    super(total);
  }
}
export class EmptyResult extends Result<undefined> {
  constructor() {
    super(undefined);
  }
}
export class EntityNotFoundResult extends Result<undefined> {
  constructor() {
    super(undefined);
  }
}
