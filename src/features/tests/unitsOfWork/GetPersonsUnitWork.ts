import { UnitOfWork } from '@Core/UnitOfWork';
import { QueryResult } from '@Results/CrudResults';
import { UnexpectedError } from '@Results/GlobalResults';
import { Either } from '@Core/Either';
import { inject, injectable, interfaces } from 'inversify';
import { ILogger } from '@Logger/ILogger';
import { IUseCase } from '@Core/IUseCase';
import { GetPersonsUseCase, GetPersonsUseCaseParams } from '../usecases/GetPersonUseCase';

@injectable()
export class GetPersonsUnitWork extends UnitOfWork<GetPersonsUseCaseParams, UnexpectedError, QueryResult<any>> {
  private readonly useCaseResolver: (service: interfaces.ServiceIdentifier<IUseCase<any, any>>) => IUseCase<any, any>;

  constructor(
    @inject('Logger') logger: ILogger,
    @inject('Factory<IUseCase>')
    useCaseResolver: (service: interfaces.ServiceIdentifier<IUseCase<any, any>>) => IUseCase<any, any>
  ) {
    super(logger);
    this.useCaseResolver = useCaseResolver;
  }

  executeInTransaction(request: GetPersonsUseCaseParams): Promise<Either<UnexpectedError, QueryResult<any>>> {
    return this.useCaseResolver(GetPersonsUseCase).execute(request);
  }
}
