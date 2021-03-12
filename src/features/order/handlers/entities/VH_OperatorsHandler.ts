import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { Handler, User, Data, Req, BeforeRead } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { ILogger } from '@Logger/ILogger';
import { ExecuteInContext } from '@Core/ExecuteInContext';
import { GetUserUseCase } from '@Features/order/usecases/GetUserUseCase';
import { EnvironmentManager } from '@Root/application/EnvironmentManager';

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
					if (this.environmentManager.ROLE_WORKSTATION_OF_PLANT.indexOf(resultUsers.value.data[0].toType.code) == -1) {
						// req.query['SELECT'].where =
						// 	req.query['SELECT'].where !== undefined
						// 		? [
						// 				...req.query['SELECT'].where,
						// 				...['and', { ref: ['toPlant_id'] }, '=', { val: resultUsers.value.data[0].toPlant_ID }],
						// 		  ]
						// 		: [...[{ ref: ['toPlant_id'] }, '=', { val: resultUsers.value.data[0].toPlant_ID }]];
					} else {
						req.query['SELECT'].where = [...[{ ref: ['_ID'] }, '=', { val: '' }]];
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
