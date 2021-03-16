import { IUseCase } from '@Core/IUseCase';
import { OrderService } from '@Shared/Contract';
import { injectable, inject } from 'inversify';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { UndefinedParameterFound, EmptyResult, TooManyResults, QueryResultObject } from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';
import { UsersRepository } from '../repository/UsersRepository';

export interface GetUserUseCaseParams {
	id?: string;
}

@injectable()
export class GetUserUseCase
	implements
		IUseCase<
			GetUserUseCaseParams,
			Either<
				UnexpectedError | EmptyResult | TooManyResults | UndefinedParameterFound<string>,
				QueryResultObject<OrderService.IUsers>
			>
		> {
	private readonly usersRepository: UsersRepository;
	private readonly logger: ILogger;

	constructor(@inject('Logger') logger: ILogger, usersRepository: UsersRepository) {
		this.logger = logger;
		this.usersRepository = usersRepository;
	}

	async execute(
		params: GetUserUseCaseParams
	): Promise<
		Either<
			UnexpectedError | EmptyResult | TooManyResults | UndefinedParameterFound<string>,
			QueryResultObject<OrderService.IUsers>
		>
	> {
		this.logger.i(GetUserUseCase.name, () => `start get persons Use Case with params=${JSON.stringify(params)}`);
		if (params.id) {
			const resultUsers = await this.usersRepository.getUser(params.id);
			switch (resultUsers.value.constructor) {
				case QueryResultObject:
					return Right(new QueryResultObject(resultUsers.value.data));
				case EmptyResult:
					return Left(new EmptyResult());
				case TooManyResults:
					return Left(new TooManyResults());
			}
		} else {
			return Left(new UndefinedParameterFound(`Paramater 'id' is: ${params.id})`));
		}
	}
}
