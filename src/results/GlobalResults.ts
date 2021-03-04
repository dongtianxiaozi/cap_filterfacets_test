import { Result } from '@Core/Results';

export class UnexpectedError extends Result<undefined> {
  constructor() {
    super(undefined);
  }
}

export class Timeout extends Result<undefined> {
  constructor(messageError?: string) {
    super(undefined, messageError);
  }
}

export class ConnectionErr extends Result<undefined> {
  constructor(messageError?: string) {
    super(undefined, messageError);
  }
}

export class Unauthorized extends Result<undefined> {
  constructor() {
    super(undefined);
  }
}

export class SyntaxErr extends Result<undefined> {
  constructor(messageError?: string) {
    super(undefined, messageError);
  }
}
