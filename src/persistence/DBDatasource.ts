import { Either, Right, Left } from '@Core/Either';
import { ILogger } from '@Logger/ILogger';
import { inject, injectable } from 'inversify';
import { UnexpectedError } from '@Results/GlobalResults';
import { QueryResult, EmptyResult } from '@Results/CrudResults';

@injectable()
export class DBDatasource {
  private readonly logger: ILogger;

  constructor(@inject('Logger') logger: ILogger) {
    this.logger = logger;
  }

  async findWithPredicate<T>(entity: string, predicate?: object): Promise<Either<UnexpectedError | EmptyResult, QueryResult<T>>> {
    try {
      const result = await SELECT.from(entity);
      return Right(new QueryResult(result));
    } catch (e) {
      return Left(new UnexpectedError());
    }
  }
}
