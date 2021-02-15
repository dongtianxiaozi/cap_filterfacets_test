import { ILogger } from '@Logger/ILogger';
import { inject, injectable } from 'inversify';
import { ContextManager } from '@Application/ContextManager';
import { Transaction } from '@sap/cds/apis/services';
import { Query } from '@sap/cds/apis/cqn';

@injectable()
export class DBDatasource {
  private readonly logger: ILogger;

  private readonly contextManager: ContextManager;

  constructor(contextManager: ContextManager, @inject('Logger') logger: ILogger) {
    this.logger = logger;
    this.contextManager = contextManager;
  }

  async executeInTransaction<T>(sqlStatement: Query): Promise<T> {
    const tx: Transaction = this.contextManager.getCurrentTransaction();
    if (tx) {
      return tx.run(sqlStatement);
    } else {
      return this.execute(sqlStatement);
    }
  }

  async execute<T>(sqlStatement: Query): Promise<T> {
    return cds.run(sqlStatement);
  }
}
