import { injectable, inject } from 'inversify';
import { TestService } from '../../../shared/Contract';
import { Either, Left, Right } from '../../../core/Either';
import { UnexpectedError } from '../../../results/GlobalResults';
import { EmptyResult, QueryResult, ReadResult } from '../../../results/CrudResults';
import { DBDatasource } from '../../../persistence/DBDatasource';
import { ILogger } from '../../../logger/ILogger';

@injectable()
export class PersonRepository {
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
  async getPersons(
    top?: number,
    limit?: number,
    select?: string[]
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<TestService.IPerson>>> {
    this.logger.d(PersonRepository.name, () => `get persons with: top=${top}, limit=${limit}, select=${select}`);
    try {
      const result: TestService.IPerson[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          from: { ref: [TestService.Entity.Person] },
        },
      });
      return Right(new QueryResult(result));
    } catch (e) {
      this.logger.w(PersonRepository.name, () => `error getting persons: ${JSON.stringify(Object.getOwnPropertyNames(e))}`);
      return Left(new UnexpectedError());
    }
  }

  /**
   * 
   * @param id 
   */
  async getPersonById(id: string): Promise<Either<UnexpectedError | EmptyResult, ReadResult<TestService.IPerson>>> {
    this.logger.d(PersonRepository.name, () => `get persons by ID=${id}`);
    try {
      const result: TestService.IPerson[] = await this.dbDatasource.executeOrThrow({
        SELECT: {
          from: { ref: [TestService.Entity.Person] },
          where: [{ ref: ['ID'] }, '=', { val: id }],
        },
      });
      return Right(new QueryResult(result));
    } catch (e) {
      this.logger.w(PersonRepository.name, () => `error getting persons: ${JSON.stringify(Object.getOwnPropertyNames(e))}`);
      return Left(new UnexpectedError());
    }
  }
}
