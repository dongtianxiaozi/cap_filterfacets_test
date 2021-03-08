import { injectable, inject } from 'inversify';
import { OrderService, TestService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult, ReadResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';
// import { OrderService } from '@Root/OrderService';

@injectable()
export class ResponsiblesRepository {
  private readonly dbDatasource: DBDatasource;
  private readonly logger: ILogger;

  constructor(@inject('Logger') logger: ILogger, dbDatasource: DBDatasource) {
    this.logger = logger;
    this.dbDatasource = dbDatasource;
  }

  /**
   *
   * @param top
   * @param limit
   * @param select
   */
  async getResponsible(
    id?: string,
    plantId?: string
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IResponsibles>>> {
    this.logger.d(ResponsiblesRepository.name, () => `get Responsible with: ID=${id}, PlantID=${plantId}`);
    try {
      const result: OrderService.IResponsibles[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          from: { ref: [OrderService.Entity.Responsibles] },
          where:[ 
            { ref: ['ID']}, '=', {'val': id}, 'and',
            { ref: ['toPlant_ID']}, '=', {'val': plantId}
          ]
        }
        ,
      });
      return Right(new QueryResult(result));
    } catch (e) {
      this.logger.w(ResponsiblesRepository.name, () => `error getting persons: ${JSON.stringify(Object.getOwnPropertyNames(e))}`);
      return Left(new UnexpectedError());
    }
  }


}
