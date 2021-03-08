import { injectable, inject } from 'inversify';
import { OrderService, TestService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult, ReadResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';
// import { OrderService } from '@Root/OrderService';

@injectable()
export class ActivitiesRepository {
  private readonly dbDatasource: DBDatasource;
  private readonly logger: ILogger;

  constructor(@inject('Logger') logger: ILogger, dbDatasource: DBDatasource) {
    this.logger = logger;
    this.dbDatasource = dbDatasource;
  }

  /**
   *
   * @param id
   */
  async getUnitsOfActivity(
    id?: string
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IUnits>>> {
    this.logger.d(ActivitiesRepository.name, () => `get Units of Activity with: ID=${id}`);
    try {
      const resultActivities: OrderService.IActivities[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          from: { ref: [OrderService.Entity.Activities] },
          where:[ 
            { ref: ['ID']}, '=', {'val': id}
          ]
        }
        ,
      });
      if(resultActivities.length != 1)
        return Left(new UnexpectedError());

      const resultActivitiesPhases: OrderService.IUnits[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          from: { ref: [OrderService.Entity.Units] },
          where:[ 
            { ref: ['ID']}, '=', {'val': resultActivities[0].toUnit_ID}
          ]
        }
        ,
      });
      return Right(new QueryResult(resultActivitiesPhases));
    } catch (e) {
      this.logger.w(ActivitiesRepository.name, () => `error Units Unit of Activity: ${JSON.stringify(Object.getOwnPropertyNames(e))}`);
      return Left(new UnexpectedError());
    }
  }

  /**
   *
   * @param id
   */
  async getActivityPhasesWithId(
    id?: string
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IActivityPhases>>> {
    this.logger.d(ActivitiesRepository.name, () => `get Activity_Phase with: ID=${id}`);
    try {
      const resultActivityPhases: OrderService.IActivityPhases[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          from: { ref: [OrderService.Entity.ActivityPhases] },
          where:[ 
            { ref: ['ID']}, '=', {'val': id}
          ]
        }
        ,
      });
      return Right(new QueryResult(resultActivityPhases));
    } catch (e) {
      this.logger.w(ActivitiesRepository.name, () => `error getting Activity_Phase: ${JSON.stringify(Object.getOwnPropertyNames(e))}`);
      return Left(new UnexpectedError());
    }
  }


}
