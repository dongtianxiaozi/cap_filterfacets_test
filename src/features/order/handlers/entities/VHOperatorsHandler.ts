import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { Handler, User, Data, Req, BeforeRead } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { ILogger } from '@Logger/ILogger';
import { ExecuteInContext } from '@Core/ExecuteInContext';
import { GetUserUseCase } from '@Features/order/usecases/GetUserUseCase';
import { EnvironmentManager } from '@Root/application/EnvironmentManager';
import { GetOperatorsOfStationUseCase } from '@Root/features/order/usecases/GetOperatorsOfStationUseCase';

@Handler(OrderService.SanitizedEntity.VH_Operators)
export class VHOperatorsHandler {
	private readonly logger: ILogger;
	private readonly environmentManager: EnvironmentManager;

	constructor() {
		this.logger = DIContainer.get('Logger');
		this.environmentManager = DIContainer.get(EnvironmentManager);
	}

	@BeforeRead()
	@ExecuteInContext()
	async before(@Req() req: Request, @Data() operators: OrderService.IOperators, @User() incommingUser: Promise<IUser>) {
		this.logger.i(VHOperatorsHandler.name, () => `@BeforeRead ${VHOperatorsHandler.name}: start`);
		const userUseCase: GetUserUseCase = DIContainer.get(GetUserUseCase);
		const resultUsers = await userUseCase.execute({
			id: (await incommingUser).username,
		});
		if (resultUsers.isRight()) {
			try {
				if (resultUsers.value.data.length === 1) {
					if (this.environmentManager.ROLE_VHOPERATORS.indexOf(resultUsers.value.data[0].toType.code) == -1) {
						const getOperatorsOfStationUseCase: GetOperatorsOfStationUseCase = DIContainer.get(
							GetOperatorsOfStationUseCase
						);
						const resultStations = await getOperatorsOfStationUseCase.execute({
							id: resultUsers.value.data[0].toStation_ID,
						});
						console.log(resultStations);
						if (resultStations.isLeft()) {
							req.error();
							return;
						}
						let where = [];
						if (resultStations.value.data.length == 0)
							req.query['SELECT'].where = [...[{ ref: ['_ID'] }, '=', { val: '' }]];
						else {
							resultStations.value.data.forEach((operator) => {
								if (where.length > 0) where = where.concat(['or']);
								where = where.concat([{ ref: ['_ID'] }, '=', { val: operator.ID }]);
							});
						}
						req.query['SELECT'].where =
							req.query['SELECT'].where !== undefined
								? [...req.query['SELECT'].where, 'and', '(', ...where, ')']
								: where;
					} else {
						req.query['SELECT'].where = [{ val: '1' }, '=', { val: '2' }];
					}
				} else {
					req.error();
				}
			} catch (e) {
				req.error();
			}
		} else {
			req.error();
		}
		this.logger.i(VHOperatorsHandler.name, () => `@BeforeRead ${VHOperatorsHandler.name}: end`);
	}
}
