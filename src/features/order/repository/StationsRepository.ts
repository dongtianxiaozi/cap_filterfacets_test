import { injectable, inject } from 'inversify';
import { OrderService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';

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
						{ ref: ['toOperator'], expand: [{ ref: ['ID'] }, { ref: ['code'] }] },
						{ ref: ['toOperators'], expand: [{ ref: ['toOperator'], expand: [{ ref: ['ID'] }, { ref: ['code'] }] }] },
					],
					from: { ref: [OrderService.Entity.Stations] },
					where: [{ ref: ['ID'] }, '=', { val: ID }],
				},
			});
			if (resultStations.length !== 1) return Left(new UnexpectedError());
			const operators: Array<OrderService.IOperators> = [];
			if (resultStations[0].toOperator != null) {
				operators.push(resultStations[0].toOperator);
			} else if (resultStations[0].toOperators != null) {
				resultStations[0].toOperators.forEach((operator) => {
					operators.push(operator.toOperator);
				});
			}
			return Right(new QueryResult(operators));
		} catch (e) {
			this.logger.w(
				StationsRepository.name,
				() => `error getting stations: ${JSON.stringify(Object.getOwnPropertyNames(e))}`
			);
			return Left(new UnexpectedError());
		}
	}
}
