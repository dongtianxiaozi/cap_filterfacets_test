import { injectable, inject } from 'inversify';
import { OrderService, TestService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult, ReadResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';
// import { OrderService } from '@Root/OrderService';

@injectable()
export class WorkCentesActivitiesRepository {
  private readonly dbDatasource: DBDatasource;
  private readonly logger: ILogger;

  constructor(@inject('Logger') logger: ILogger, dbDatasource: DBDatasource) {
    this.logger = logger;
    this.dbDatasource = dbDatasource;
  }

  /**
   *
   * @param phases
   */
  async getGrantedTypesWithPhase(
    phases?: Array<string>
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IGrantedTypes>>> {
    this.logger.d(WorkCentesActivitiesRepository.name, () => `get GrantedTypes with phases=${phases} in WorkCenters_Activities`);
    try {

      let _where = [];
      phases.forEach(element => {
        if(_where.length!=0)
          _where.push( "or" )
        _where.push( { ref: ['code']}, '=', {'val': element} );
      });

      const resultActivitiesPhases: OrderService.IActivityPhases[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          from: { ref: [OrderService.Entity.ActivityPhases] },
          where: _where
        }
        ,
      });
      if(resultActivitiesPhases.length == 0)
        return Right(new QueryResult([]));

      _where = [];
      resultActivitiesPhases.forEach(element => {
        if(_where.length!=0)
          _where.push( "or" )
        _where.push( { ref: ['toPhase_ID']}, '=', {'val': element.ID} );
      });
      const resultWorkCentersActivities: OrderService.IWorkCenters_Activities[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          distinct: true,
          from: { ref: [OrderService.Entity.WorkCenters_Activities] },
          where: _where,
          columns:[
            {ref:["toGrantedType_ID"]},
          ]
        }
        ,
      });

      if(resultWorkCentersActivities.length == 0)
        return Right(new QueryResult([]));

      _where = [];
      resultWorkCentersActivities.forEach(element => {
        if(_where.length!=0)
          _where.push( "or" )
        _where.push( { ref: ['ID']}, '=', {'val': element.toGrantedType_ID} );
      });

      const resultGrantedTypes: OrderService.IGrantedTypes[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          distinct: true,
          from: { ref: [OrderService.Entity.GrantedTypes] },
          where: _where,
        }
        ,
      });

      return Right(new QueryResult(resultGrantedTypes));
    } catch (e) {
      this.logger.w(WorkCentesActivitiesRepository.name, () => `error get GrantedTypes with phases: ${JSON.stringify(Object.getOwnPropertyNames(e))}`);
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
    this.logger.d(WorkCentesActivitiesRepository.name, () => `get Activity_Phase with: ID=${id}`);
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
      this.logger.w(WorkCentesActivitiesRepository.name, () => `error getting Activity_Phase: ${JSON.stringify(Object.getOwnPropertyNames(e))}`);
      return Left(new UnexpectedError());
    }
  }


}
