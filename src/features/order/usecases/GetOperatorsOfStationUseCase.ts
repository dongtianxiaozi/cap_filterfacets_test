import { IUseCase } from '@Core/IUseCase';
import { OrderService } from '@Shared/Contract';
import { injectable, inject } from 'inversify';
import { Either, Left } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';
import { StationsRepository } from '../repository/StationsRepository';
import { QueryObject } from '@Root/core/QueryObject';

export interface GetOperatorsOfStationOfuserUseCaseParams {
	id?: string;
}

@injectable()
export class GetOperatorsOfStationUseCase
	implements
		IUseCase<
			GetOperatorsOfStationOfuserUseCaseParams,
			Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IOperators>>
		> {
	private readonly stationsRepository: StationsRepository;
	private readonly logger: ILogger;

	constructor(@inject('Logger') logger: ILogger, stationsRepository: StationsRepository) {
		this.logger = logger;
		this.stationsRepository = stationsRepository;
	}

	async execute(
		params: GetOperatorsOfStationOfuserUseCaseParams
	): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IOperators>>> {
		this.logger.i(
			GetOperatorsOfStationUseCase.name,
			() => `start get persons Use Case with params=${JSON.stringify(params)}`
		);
		if (params.id) {
			return this.stationsRepository.getOperatorsOfStation(params.id);
		} else {
			return Left(new EmptyResult());
		}
	}
}
