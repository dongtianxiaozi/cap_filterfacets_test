import { IUseCase } from '@Core/IUseCase';
import { OrderService } from '@Shared/Contract';
import { injectable, inject } from 'inversify';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { AddedFilter, EmptyResult, QueryResult } from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';
import { StationsRepository } from '../repository/StationsRepository';
import { QueryObject } from '@Root/core/QueryObject';
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
			Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IOperators>>
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
	): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IOperators>>> {
		this.logger.i(
			GetOperatorsOfStationUseCase.name,
			() => `start get persons Use Case with params=${JSON.stringify(params)}`
		);
		const userUseCase: GetUserUseCase = DIContainer.get(GetUserUseCase);
		const resultUsers = await userUseCase.execute({
			id: params.userId,
		});
		if (resultUsers.isLeft()) return Left(new UnexpectedError());
		if (resultUsers.isRight()) {
			try {
				if (resultUsers.value.data.length != 1) return Left(new UnexpectedError());
				if (resultUsers.value.data[0].toStation_ID) {
					const resultOperatorsID = await this.stationsRepository.getOperatorsOfStation(
						resultUsers.value.data[0].toStation_ID
					);
					if (resultOperatorsID.isLeft()) return Left(new UnexpectedError());
					const resultSetFilter = await this.operatorsRepository.setFilterOfOperators(resultOperatorsID.value.data);
					if (resultSetFilter.isLeft()) return Left(new UnexpectedError());
					else return Right(new QueryResult(resultOperatorsID.value.data));
				} else {
					return Left(new EmptyResult());
				}
			} catch (e) {
				//TODO: add left
			}
		}
	}
}
