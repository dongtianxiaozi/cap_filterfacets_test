import { injectable, inject } from 'inversify';
import { OrderService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';
import { QueryObject } from '@Root/core/QueryObject';

@injectable()
export class StationsRepository {
	private readonly dbDatasource: DBDatasource;
	private readonly logger: ILogger;

	constructor(@inject('Logger') logger: ILogger, dbDatasource: DBDatasource) {
		this.logger = logger;
		this.dbDatasource = dbDatasource;
	}

	/**
	 *
	 * @param id
	 */
	async getOperatorsOfStation(
		ID: string
	): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IOperators>>> {
		this.logger.d(StationsRepository.name, () => `get Operators of Stations with ID:  ${ID}`); // , { ref: ['toOperators'], expand: [{ ref: ['ID'] }] }
		try {
			const resultStations: OrderService.IStations[] = await this.dbDatasource.executeOrThrow({
				SELECT: {
					columns: [
						{ ref: ['code'] },
						{ ref: ['toOperator_ID'] },
						{ ref: ['toOperators'], expand: [{ ref: ['toOperator_ID'] }] },
					],
					from: { ref: [OrderService.Entity.Stations] },
					where: [{ ref: ['ID'] }, '=', { val: ID }],
				},
			});
			let operators: Array<OrderService.IOperators>;
			// if (resultStations.length === 1) {
			// 	if (resultStations[0].toOperator_ID !== undefined) {
			// 		const resultStationsOperators: OrderService.IStations_Operators[] = await this.dbDatasource.executeOrThrow({
			// 			SELECT: {
			// 				columns: [{ ref: ['toOperator_ID'], as: 'ID' }],
			// 				from: { ref: [OrderService.Entity.Stations_Operators] },
			// 				where: [{ ref: ['toStation_ID'] }, '=', { val: resultStations[0].ID }],
			// 			},
			// 		});
			// 		if (resultStationsOperators.length > 0) {
			// 			resultStations[0].toOperators = resultStationsOperators;
			// 		}
			// 	}
			// 	else{
			// 		operators.push({ID:resultStations[0].toOperator_ID})
			// 	}
			// }
			return Left(new UnexpectedError());
			// return Right(new QueryResult([]));
		} catch (e) {
			this.logger.w(
				StationsRepository.name,
				() => `error getting stations: ${JSON.stringify(Object.getOwnPropertyNames(e))}`
			);
			return Left(new UnexpectedError());
		}
	}
}
