import { injectable, inject } from 'inversify';
import { TestService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult, ReadResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';

@injectable()
export class PersonRepository {
  private readonly dbDatasource: DBDatasource;
  private readonly logger: ILogger;

  constructor(@inject('Logger') logger: ILogger, dbDatasource: DBDatasource) {
    this.logger = logger;
    this.dbDatasource = dbDatasource;
  }

  async getPersons(
    top?: number,
    limit?: number,
    select?: string[]
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<TestService.IPerson>>> {
    this.logger.d(PersonRepository.name, () => `get persons with: top=${top}, limit=${limit}, select=${select}`);
    try {
      const result: TestService.IPerson[] = await this.dbDatasource.executeInTransaction({
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
  async getPersonById(id: string): Promise<Either<UnexpectedError | EmptyResult, ReadResult<TestService.IPerson>>> {
    this.logger.d(PersonRepository.name, () => `get persons by ID=${id}`);
    try {
      const result: TestService.IPerson[] = await this.dbDatasource.execute({
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
