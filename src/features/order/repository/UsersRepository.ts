import { injectable, inject } from 'inversify';
import { OrderService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResult } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';
import { SELECT_one } from '@sap/cds/apis/ql';

@injectable()
export class UsersRepository {
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
	async getUser(id?: string): Promise<Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IUsers>>> {
		this.logger.d(UsersRepository.name, () => `get Responsible with: ID=${id}`);
		try {
			const resultUsers: OrderService.IUsers[] = await this.dbDatasource.executeOrThrow({
				SELECT: {
					from: { ref: [OrderService.Entity.Users] },
					where: [{ ref: ['code'] }, '=', { val: id }],
					// columns: [
					// 	{ ref: ['toType'], expand: [{ val: ['*'] }, { ref: ['code'] }], as: 'ID' },
					// 	// { ref: ['toType'], expand: [{ val:  }] },
					// ],
				},
			});
			if (resultUsers.length == 1) {
				const resultRoles: OrderService.IRoles[] = await this.dbDatasource.executeOrThrow({
					SELECT: {
						from: { ref: [OrderService.Entity.Roles] },
						where: [{ ref: ['ID'] }, '=', { val: resultUsers[0].toType_ID }],
					},
				});
				if (resultRoles.length == 1) {
					resultUsers[0].toType = resultRoles[0];
				}
			}

			return Right(new QueryResult(resultUsers));
		} catch (e) {
			this.logger.w(
				UsersRepository.name,
				() => `error getting persons: ${JSON.stringify(Object.getOwnPropertyNames(e))}`
			);
			return Left(new UnexpectedError());
		}
	}
}
