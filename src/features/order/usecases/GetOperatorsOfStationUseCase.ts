import { IUseCase } from '@Core/IUseCase';
import { OrderService } from '@Shared/Contract';
import { injectable, inject } from 'inversify';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import {
	QueryResultObject,
	EmptyResult,
	QueryResult,
	TooManyResults,
	UndefinedParameterFound,
} from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';
import { StationsRepository } from '../repository/StationsRepository';
import { DIContainer } from '@Root/application/DIContainer';
import { GetUserUseCase } from './GetUserUseCase';
import { OperatorsRepository } from '../repository/OperatorsRepository';

export interface GetOperatorsOfStationOfuserUseCaseParams {
	userId?: string;
}

@injectable()
export class GetOperatorsOfStationUseCase
	implements
		IUseCase<
			GetOperatorsOfStationOfuserUseCaseParams,
			Either<UnexpectedError | EmptyResult | UndefinedParameterFound<string>, QueryResult<OrderService.IOperators>>
		> {
	private readonly stationsRepository: StationsRepository;
	private readonly operatorsRepository: OperatorsRepository;
	private readonly logger: ILogger;

	constructor(
		@inject('Logger') logger: ILogger,
		operatorsRepository: OperatorsRepository,
		stationsRepository: StationsRepository
	) {
		this.logger = logger;
		this.operatorsRepository = operatorsRepository;
		this.stationsRepository = stationsRepository;
	}

	async execute(
		params: GetOperatorsOfStationOfuserUseCaseParams
	): Promise<
		Either<UnexpectedError | EmptyResult | UndefinedParameterFound<string>, QueryResult<OrderService.IOperators>>
	> {
		this.logger.i(
			GetOperatorsOfStationUseCase.name,
			() => `start get persons Use Case with params=${JSON.stringify(params)}`
		);
		const userUseCase: GetUserUseCase = DIContainer.get(GetUserUseCase);
		const resultUsers = await userUseCase.execute({
			id: params.userId,
		});
		switch (resultUsers.value.constructor) {
			case EmptyResult:
				return Left(new EmptyResult());
			case TooManyResults:
				return Left(new TooManyResults());
			case UndefinedParameterFound:
				return Left(new UndefinedParameterFound(resultUsers.value.data as string));
			case QueryResultObject:
				try {
					const user: OrderService.IUsers = resultUsers.value.data as OrderService.IUsers;
					if (user.toStation_ID) {
						const resultOperatorsID = await this.stationsRepository.getOperatorsOfStation(user.toStation_ID);
						if (resultOperatorsID.isLeft()) return Left(new UnexpectedError());
						const resultSetFilter = await this.operatorsRepository.setFilterOfOperators(resultOperatorsID.value.data);
						if (resultSetFilter.isLeft()) return Left(new UnexpectedError());
						else return Right(new QueryResult(resultOperatorsID.value.data));
					} else {
						return Left(new UndefinedParameterFound(`Parameter userId not found`));
					}
				} catch (e) {
					return Left(new UnexpectedError());
				}
			default:
				return Left(new UnexpectedError());
		}
	}
}
