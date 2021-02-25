import { IUseCase } from '@Core/IUseCase';
import { TestService } from '@Shared/Contract';
import { PersonRepository } from '../repository/PersonRepository';
import { injectable, inject } from 'inversify';
import { Either } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';

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
  private readonly logger: ILogger;

  constructor(@inject('Logger') logger: ILogger, personRepository: PersonRepository) {
    this.logger = logger;
    this.personRepository = personRepository;
  }

  async execute(
    params: GetPersonsUseCaseParams
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<TestService.IPerson>>> {
    this.logger.i(PersonRepository.name, () => `start get persons Use Case with params=${JSON.stringify(params)}`);
    if (params.id) {
      return this.personRepository.getPersonById(params.id);
    } else {
      return this.personRepository.getPersons(params.top, params.limit, params.select);
    }
  }
}
