import { IUnitOfWork } from '@Core/IUnitOfWork';
import { Either, Left, Right } from '@Core/Either';
import { inject, injectable } from 'inversify';
import { ILogger } from '@Logger/ILogger';
import cls from 'cls-hooked';
import { Transaction } from '@sap/cds/apis/services';
import { UnexpectedError } from '@Results/GlobalResults';
import { Request } from '@sap/cds/apis/services';
import { IEnvironment } from '@Shared/IEnvironment';

/**
 * Clase para permitir realizar transacciones entre multiples Repositorios/Casos de Uso. Para ello, antes de lanzar el flujo
 * definido se conecta a la base de datos y genera una nueva transacción que se compartirá durante el flujo a través de
 * Continuation-Local Storage ( Hooked ).
 *
 * El Data Source debe estar adaptado para poder utilizar el EntityManager de TypeORM compartido a través de CLS.
 */
@injectable()
export abstract class UnitOfWork<T, FailedResult, SuccessResult>
  implements IUnitOfWork<T, Either<FailedResult | UnexpectedError, SuccessResult>> {
  private readonly _logger: ILogger;
  // private readonly provider: () => Promise<Either<any, Connection>>;
  // private readonly isolationLevel?: IsolationLevel;
  // private readonly mode?: 'master' | 'slave';

  protected constructor(@inject('Logger') logger: ILogger) {
    this._logger = logger;
  }

  protected get logger(): ILogger {
    return this._logger;
  }

  /**
   * Ejecuta la Unit-of-Work generando el contexto necesario para ejecutar el flujo de forma transaccional.
   *
   * @param request Evento de entrada para el Caso de Uso a ejecutar por la Unit-of-Work.
   */
  async execute(request: T): Promise<Either<FailedResult | UnexpectedError, SuccessResult>> {
    this.logger.v(`${this.constructor.name}`, () => `Preparing transaction.`);
    const currentTransaction = cls.getNamespace('Context').get('CurrentTransaction');
    const environment: IEnvironment = cls.getNamespace('Context').get('Environment');
    if (currentTransaction) {
      this.logger.w(`${this.constructor.name}`, () => `Existing transaction in use... Recycling current transaction`);
      const transaction: Transaction = currentTransaction.get('CurrentTransaction');
      if (transaction) {
        this.logger.v(`${this.constructor.name}`, () => `Recycling existing transaction.`);
        return this.executeInTransaction(request);
      }
    }
    try {
      this.logger.v(`${this.constructor.name}`, () => `Start transaction.`);
      const tx = cds.tx(environment.__REQUEST);
      tx.run(async (tx: Transaction) => {
        const result = await this.internalExecute(request, tx);
        if (result.isLeft()) return Left(result.leftValue());
        return Right(result.rightValue());
      });
    } catch (error) {
      this.logger.e(
        `${this.constructor.name}`,
        () => `Error on execute: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`
      );
    }
    return Left(new UnexpectedError());
  }

  /**
   * La ejecución del contenido de esta funcion se realizá una vez haya empezado la transacción. Utilizar el Case de Uso dentro
   * de esta funcion para asegurar su ejecución atómica.
   *
   * @param request
   */
  abstract executeInTransaction(request: T): Promise<Either<FailedResult, SuccessResult>>;

  /**
   * A partir del queryRunner conecta y gestiona la transacción contra la BBDD utilizando TypeORM.
   *
   * @param request
   * @param queryRunner
   */
  private async internalExecute(request: T, tx: Transaction): Promise<Either<FailedResult | UnexpectedError, SuccessResult>> {
    const currentTransaction = cls.getNamespace('Context');
    try {
      currentTransaction.set('CurrentTransaction', tx);
      const data = await this.executeInTransaction(request);
      currentTransaction.set('CurrentTransaction', null);
      if (data.leftValue()) {
        this.logger.v(`${this.constructor.name}`, () => `Rollback transaction.`);
        await tx.rollback();
      } else {
        this.logger.v(`${this.constructor.name}`, () => `Commit transaction.`);
        await tx.commit();
      }
      return data;
    } catch (error) {
      // since we have errors let's rollback changes we made
      this.logger.e(
        `${this.constructor.name}`,
        () => `Rollback transaction con error: ${JSON.stringify(error, Object.getOwnPropertyNames(error))}`
      );
    } finally {
      this.logger.v(`${this.constructor.name}`, () => `Release transaction.`);
      currentTransaction.set('CurrentTransaction', null);
    }
    return Left(new UnexpectedError());
  }
}
