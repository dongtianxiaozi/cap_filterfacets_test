import { injectable, inject } from 'inversify';
import { OrderService } from '@Shared/Contract';
import { Either, Left, Right } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, QueryResultObject, TooManyResults } from '@Results/CrudResults';
import { DBDatasource } from '@Persistence/DBDatasource';
import { ILogger } from '@Logger/ILogger';

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
	async getUser(id?: string): Promise<Either<UnexpectedError, EmptyResult | QueryResultObject<OrderService.IUsers>>> {
		this.logger.d(UsersRepository.name, () => `get User with: ID=${id}`);
		try {
			const resultUsers: OrderService.IUsers[] = await this.dbDatasource.executeOrThrow({
				SELECT: {
					from: { ref: [OrderService.Entity.Users] },
					where: [{ ref: ['code'] }, '=', { val: id }],
				},
			});
			switch (resultUsers.length) {
				case 0: {
					return Left(new EmptyResult());
				}
				case 1: {
					const resultRoles: OrderService.IRoles[] = await this.dbDatasource.executeOrThrow({
						SELECT: {
							from: { ref: [OrderService.Entity.Roles] },
							where: [{ ref: ['ID'] }, '=', { val: resultUsers[0].toType_ID }],
						},
					});
					if (resultRoles.length === 1) {
						resultUsers[0].toType = resultRoles[0];
					}
					const resultPlants: OrderService.IPlants[] = await this.dbDatasource.executeOrThrow({
						SELECT: {
							from: { ref: [OrderService.Entity.Plants] },
							where: [{ ref: ['ID'] }, '=', { val: resultUsers[0].toPlant_ID }],
						},
					});
					if (resultPlants.length === 1) {
						resultUsers[0].toPlant = resultPlants[0];
					}
					return Right(new QueryResultObject(resultUsers[0]));
				}
				default: {
					return Left(new TooManyResults());
				}
			}
		} catch (e) {
			this.logger.w(
				UsersRepository.name,
				() => `error getting persons: ${JSON.stringify(Object.getOwnPropertyNames(e))}`
			);
			return Left(new UnexpectedError());
		}
	}
}
