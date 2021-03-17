import { injectable, inject } from 'inversify';
import { OrderService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { AddedFilter, EmptyResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';
import { predicate } from '@sap/cds/apis/cqn';

@injectable()
export class OperatorsRepository {
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
	async setFilterOfOperators(
		operators: Array<OrderService.IOperators>
	): Promise<Either<UnexpectedError | EmptyResult, AddedFilter<predicate>>> {
		this.logger.d(OperatorsRepository.name, () => `set Filter of Operators:  ${operators}`);
		try {
			let where = [];
			if (operators.length === 0) where = [{ ref: ['_ID'] }, '=', { val: '' }];
			else {
				operators.forEach((operator) => {
					if (where.length > 0) where = where.concat(['or']);
					where = where.concat([{ ref: ['_ID'] }, '=', { val: operator.ID }]);
				});
			}
			this.dbDatasource.appendFilter(where);
			return Right(new AddedFilter(where));
		} catch (e) {
			this.logger.w(
				OperatorsRepository.name,
				() => `error getting stations: ${JSON.stringify(Object.getOwnPropertyNames(e))}`
			);
			return Left(new UnexpectedError());
		}
	}
}
