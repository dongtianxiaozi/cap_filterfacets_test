import { UnitOfWork } from '../../../core/UnitOfWork';
import { QueryResult } from '../../../results/CrudResults';
import { UnexpectedError } from '../../../results/GlobalResults';
import { Either } from '../../../core/Either';
import { inject, injectable, interfaces } from 'inversify';
import { ILogger } from '../../../logger/ILogger';
import { IUseCase } from '../../../core/IUseCase';
import { GetPersonsUseCase, GetPersonsUseCaseParams } from '../usecases/GetPersonUseCase';
import { ContextManager } from '../../../application/ContextManager';

@injectable()
export class GetPersonsUnitWork extends UnitOfWork<GetPersonsUseCaseParams, UnexpectedError, QueryResult<any>> {
  private readonly useCaseResolver: (service: interfaces.ServiceIdentifier<IUseCase<any, any>>) => IUseCase<any, any>;

  constructor(
    @inject('Logger') logger: ILogger,
    contextManager: ContextManager,
    @inject('Factory<IUseCase>')
    useCaseResolver: (service: interfaces.ServiceIdentifier<IUseCase<any, any>>) => IUseCase<any, any>
  ) {
    super(logger, contextManager);
    this.useCaseResolver = useCaseResolver;
  }

  executeInTransaction(request: GetPersonsUseCaseParams): Promise<Either<UnexpectedError, QueryResult<any>>> {
    return this.useCaseResolver(GetPersonsUseCase).execute(request);
  }
}
