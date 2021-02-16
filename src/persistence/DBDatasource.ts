import { ILogger } from '@Logger/ILogger';
import { inject, injectable } from 'inversify';
import { ContextManager } from '@Application/ContextManager';
import { Transaction } from '@sap/cds/apis/services';
import { Query } from '@sap/cds/apis/cqn';
import { IEnvironment } from '@Shared/IEnvironment';

@injectable()
export class DBDatasource {
  private readonly contextManager: ContextManager;
  private readonly logger: ILogger;

  constructor(contextManager: ContextManager, @inject('Logger') logger: ILogger) {
    this.logger = logger;
    this.contextManager = contextManager;
  }

  async executeInTransaction<T>(sqlStatement: Query): Promise<T> {
    this.logger.v(DBDatasource.name, () => `trying to execute in tx: ${JSON.stringify(sqlStatement)}`);
    const tx: Transaction = this.contextManager.getCurrentTransaction();
    if (tx) {
      this.logger.v(DBDatasource.name, () => `executing in current tx.`);
      return tx.run(sqlStatement);
    } else {
      this.logger.v(DBDatasource.name, () => `cannot execute in current tx. It isn't active.`);
      return this.execute(sqlStatement);
    }
  }

  private async execute<T>(sqlStatement: Query): Promise<T> {
    this.logger.v(DBDatasource.name, () => `executing statemant: ${JSON.stringify(sqlStatement)}`);
    const environment: IEnvironment = this.contextManager.getEnvironment();
    const tx = cds.tx(environment.__REQUEST);
    return tx.run(sqlStatement);
  }
}
