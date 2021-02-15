import { injectable } from 'inversify';
import { TestService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult, ReadResult } from '@Results/CrudResults';

@injectable()
export class PersonRepository {
  async getPersons(
    top?: number,
    limit?: number,
    select?: string[]
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<TestService.IPerson>>> {
    try {
      const result: TestService.IPerson[] = await SELECT.from(TestService.Entity.Person).columns(...select);
      return Right(new QueryResult(result));
    } catch (e) {
      return Left(new UnexpectedError());
    }
  }
  async getPersonById(id: string): Promise<Either<UnexpectedError | EmptyResult, ReadResult<TestService.IPerson>>> {
    try {
      const result: TestService.IPerson[] = await SELECT.one.from(TestService.Entity.Person).where({
        ID: id,
      });
      return Right(new QueryResult(result));
    } catch (e) {
      return Left(new UnexpectedError());
    }
  }
}
