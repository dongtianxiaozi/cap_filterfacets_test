import { injectable } from 'inversify';
import { TestService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult, ReadResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';

@injectable()
export class PersonRepository {
  private readonly dbDatasource: DBDatasource;

  constructor(dbDatasource: DBDatasource) {
    this.dbDatasource = dbDatasource;
  }

  async getPersons(
    top?: number,
    limit?: number,
    select?: string[]
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<TestService.IPerson>>> {
    try {
      const result: TestService.IPerson[] = await this.dbDatasource.executeInTransaction({
        SELECT: {
          from: { ref: [TestService.Entity.Person] },
        },
      });

      return Right(new QueryResult(result));
    } catch (e) {
      return Left(new UnexpectedError());
    }
  }
  async getPersonById(id: string): Promise<Either<UnexpectedError | EmptyResult, ReadResult<TestService.IPerson>>> {
    try {
      const result: TestService.IPerson[] = await this.dbDatasource.execute({
        SELECT: {
          from: { ref: [TestService.Entity.Person] },
          where: [{ ref: ['ID'] }, '=', { val: id }],
        },
      });
      return Right(new QueryResult(result));
    } catch (e) {
      return Left(new UnexpectedError());
    }
  }
}
