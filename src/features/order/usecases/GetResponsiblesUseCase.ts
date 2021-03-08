import { IUseCase } from '@Core/IUseCase';
import { OrderService, TestService } from '@Shared/Contract';
import { injectable, inject } from 'inversify';
import { Either, Left } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';
import { ResponsiblesRepository } from '../repository/ResponsiblesRepository';
// import { OrderService } from '@Root/OrderService';

export interface GetResponsiblesUseCaseParams {
  id?: string;
  plantid?: string;
}

@injectable()
export class GetResponsiblesUseCase
  implements IUseCase<GetResponsiblesUseCaseParams, Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IResponsibles>>> {
  private readonly responsiblesRepository: ResponsiblesRepository;
  private readonly logger: ILogger;

  constructor(@inject('Logger') logger: ILogger, responsiblesRepository: ResponsiblesRepository) {
    this.logger = logger;
    this.responsiblesRepository = responsiblesRepository;
  }

  async execute(
    params: GetResponsiblesUseCaseParams
  ): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IResponsibles>>> {
    this.logger.i(GetResponsiblesUseCase.name, () => `start get persons Use Case with params=${JSON.stringify(params)}`);
    if (params.id && params.plantid) {
      // let result = this.userRepository.getUserWithRole(params, rol)
      return this.responsiblesRepository.getResponsible(params.id, params.plantid);
    } else {
      return Left( new EmptyResult() );
    }
  }
}
