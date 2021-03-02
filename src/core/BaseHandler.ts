import { ILogger } from '@Root/logger/ILogger';
import { ContextManager } from '@Root/application/ContextManager';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';

export abstract class BaseHandler {
  private readonly _logger: ILogger;
  public get logger(): ILogger {
    return this._logger;
  }
  private readonly contextManager: ContextManager;

  constructor() {
    this._logger = DIContainer.get('Logger');
    this.contextManager = DIContainer.get(ContextManager);
  }

  async runWithContext(request: Request, fn: () => Promise<any>) {
    return this.contextManager.startContextWithPromise(request, async () => {
      try {
        return await fn();
      } catch (e) {
        this.logger.e(`${this.constructor.name}`, () => `CODE: ${e.code} MESSAGE: ${e.message}`)
        request.reject();
      }
    });
  }
}
