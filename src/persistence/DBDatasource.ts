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

  async executeOrThrow<T>(sqlStatement: Query): Promise<T> {
    this.logger.v(DBDatasource.name, () => `trying to execute in tx: ${JSON.stringify(sqlStatement)}`);
    const tx: Transaction = this.contextManager.getCurrentTransaction();
    try {
      if (tx) {
        this.logger.v(DBDatasource.name, () => `executing in current tx.`);
        const data = await tx.run(sqlStatement);
        this.logger.v(DBDatasource.name, () => `commting in current tx.`);
        // tx.commit();
        return data;
      } else {
        this.logger.v(DBDatasource.name, () => `cannot execute in current tx. It isn't active.`);
        return await this.execute(sqlStatement);
      }
    } catch (e) {
      if (tx) {
        this.logger.v(DBDatasource.name, () => `rollback in current tx.`);
        await tx.rollback();
      }
      throw e;
    }
  }

  private async execute<T>(sqlStatement: Query): Promise<T> {
    this.logger.v(DBDatasource.name, () => `executing statemant: ${JSON.stringify(sqlStatement)}`);
    const environment: IEnvironment = this.contextManager.getEnvironment();
    let tx: Transaction;
    try {
      this.logger.v(DBDatasource.name, () => `executing in new tx.`);
      tx = cds.transaction(environment.__REQUEST);
      const data = await tx.run(sqlStatement);
      this.logger.v(DBDatasource.name, () => `commting in new tx.`);
      // tx.commit();
      return data;
    } catch (e) {
      if (tx) {
        this.logger.v(DBDatasource.name, () => `rollback in new tx.`);
        await tx.rollback();
      }
      throw e;
    }
  }
}
