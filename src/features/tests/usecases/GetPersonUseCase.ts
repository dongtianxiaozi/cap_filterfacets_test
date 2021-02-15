import { IUseCase } from '@Core/IUseCase';
import { TestService } from '@Shared/Contract';
import { PersonRepository } from '../repository/PersonRepository';
import { injectable } from 'inversify';
import { Either } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';

export interface GetPersonsUseCaseParams {
  id?: string;
  top?: number;
  limit?: number;
  select?: string[];
}

@injectable()
export class GetPersonsUseCase
  implements IUseCase<GetPersonsUseCaseParams, Either<UnexpectedError | EmptyResult, QueryResult<TestService.IPerson>>> {
  private readonly personRepository: PersonRepository;

  constructor(personRepository: PersonRepository) {
    this.personRepository = personRepository;
  }

  async execute(
    params: GetPersonsUseCaseParams
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<TestService.IPerson>>> {
    if (params.id) {
      return this.personRepository.getPersonById(params.id);
    } else {
      return this.personRepository.getPersons(params.top, params.limit, params.select);
    }
  }
}
