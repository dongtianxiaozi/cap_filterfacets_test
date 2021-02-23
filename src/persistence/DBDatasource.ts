import { ILogger } from '../logger/ILogger';
import { inject, injectable } from 'inversify';
import { ContextManager } from '../application/ContextManager';
import { Transaction } from '@sap/cds/apis/services';
import { Query } from '@sap/cds/apis/cqn';
import { IEnvironment } from '../shared/IEnvironment';

@injectable()
export class DBDatasource {
  private readonly contextManager: ContextManager;
  private readonly logger: ILogger;

  constructor(contextManager: ContextManager, @inject('Logger') logger: ILogger) {
    this.logger = logger;
    this.contextManager = contextManager;
  }

  async executeOrThrow<T>(sqlStatement: Query): Promise<T> {
    this.logger.v(DBDatasource.name, () => `trying to execute in tx: ${JSON.stringify(sqlStatement)}`);
    const tx: Transaction = this.contextManager.getCurrentTransaction();
    try {
      if (tx) {
        this.logger.v(DBDatasource.name, () => `executing in current tx.`);
        return tx.run(sqlStatement);
      } else {
        this.logger.v(DBDatasource.name, () => `cannot execute in current tx. It isn't active.`);
        return this.execute(sqlStatement);
      }
    } catch (e) {
      throw e;
    }
  }

  private async execute<T>(sqlStatement: Query): Promise<T> {
    this.logger.v(DBDatasource.name, () => `executing statemant: ${JSON.stringify(sqlStatement)}`);
    const environment: IEnvironment = this.contextManager.getEnvironment();
    let tx: Transaction;
    try {
      tx = cds.tx(environment.__REQUEST);
      const data = tx.run(sqlStatement);
      tx.commit();
      return data;
    } catch (e) {
      if (tx) tx.rollback();
      throw e;
    }
  }
}
