import { IUseCase } from '@Core/IUseCase';
import { OrderService } from '@Shared/Contract';
import { injectable, inject } from 'inversify';
import { Either, Left } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';
import { UsersRepository } from '../repository/UsersRepository';

export interface GetUserUseCaseParams {
	id?: string;
}

@injectable()
export class GetUserUseCase
	implements IUseCase<GetUserUseCaseParams, Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IUsers>>> {
	private readonly usersRepository: UsersRepository;
	private readonly logger: ILogger;

	constructor(@inject('Logger') logger: ILogger, usersRepository: UsersRepository) {
		this.logger = logger;
		this.usersRepository = usersRepository;
	}

	async execute(
		params: GetUserUseCaseParams
	): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IUsers>>> {
		this.logger.i(GetUserUseCase.name, () => `start get persons Use Case with params=${JSON.stringify(params)}`);
		if (params.id) {
			return this.usersRepository.getUser(params.id);
		} else {
			return Left(new EmptyResult());
		}
	}
}
