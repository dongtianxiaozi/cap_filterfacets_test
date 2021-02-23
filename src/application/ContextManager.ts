import cls from 'cls-hooked';
import { IEnvironment } from '../shared/IEnvironment';
import { Transaction } from '@sap/cds/apis/services';
import { injectable } from 'inversify';

@injectable()
export class ContextManager {
  private static readonly CONTEXT: string = 'Context';
  private static readonly ENVIRONMENT: string = 'Environment';
  private static readonly CURRRENT_TRANSACTION: string = 'CurrentTransaction';

  initContext() {
    if (cls.getNamespace(ContextManager.CONTEXT)) throw Error('Namespace in use.');
    cls.createNamespace(ContextManager.CONTEXT);
  }

  startContext(fn: () => void) {
    this.getContext().run(fn);
  }

  private getContext(): cls.Namespace {
    const context = cls.getNamespace(ContextManager.CONTEXT);
    if (!context) throw Error('Please, start context before get any property');
    return context;
  }

  getEnvironment(): IEnvironment {
    return this.getContext().get(ContextManager.ENVIRONMENT);
  }

  setEnvironment(environment: IEnvironment) {
    this.getContext().set(ContextManager.ENVIRONMENT, environment);
  }

  getCurrentTransaction(): Transaction {
    return this.getContext().get(ContextManager.CURRRENT_TRANSACTION);
  }

  setCurrentTransaction(tx: Transaction) {
    this.getContext().set(ContextManager.CURRRENT_TRANSACTION, tx);
  }
}
