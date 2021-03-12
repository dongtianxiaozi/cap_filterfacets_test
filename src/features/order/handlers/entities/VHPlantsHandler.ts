import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { Handler, User, Data, Req, BeforeRead } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { ILogger } from '@Logger/ILogger';
import { ExecuteInContext } from '@Core/ExecuteInContext';
import { GetUserUseCase } from '@Features/order/usecases/GetUserUseCase';
import { EnvironmentManager } from '@Root/application/EnvironmentManager';

@Handler(OrderService.SanitizedEntity.VH_Plants)
export class VHPlantsHandler {
	private readonly logger: ILogger;
	private readonly environmentManager: EnvironmentManager;

	constructor() {
		this.logger = DIContainer.get('Logger');
		this.environmentManager = DIContainer.get(EnvironmentManager);
	}

	@BeforeRead()
	@ExecuteInContext()
	async before(@Req() req: Request, @Data() plants: OrderService.IPlants, @User() incommingUser: Promise<IUser>) {
		this.logger.i(VHPlantsHandler.name, () => `@BeforeRead ${VHPlantsHandler.name}: start`);
		const userUseCase: GetUserUseCase = DIContainer.get(GetUserUseCase);
		const resultUsers = await userUseCase.execute({
			id: (await incommingUser).username,
		});
		if (resultUsers.isRight()) {
			try {
				if (resultUsers.value.data.length === 1) {
					if (this.environmentManager.ROLE_WORKSTATION_OF_PLANT.indexOf(resultUsers.value.data[0].toType.code) >= 0) {
						req.query['SELECT'].where =
							req.query['SELECT'].where !== undefined
								? [
										...req.query['SELECT'].where,
										...['and', { ref: ['_ID'] }, '=', { val: resultUsers.value.data[0].toPlant_ID }],
								  ]
								: [...[{ ref: ['_ID'] }, '=', { val: resultUsers.value.data[0].toPlant_ID }]];
					}
				} else req.error();
			} catch (e) {
				req.error();
			}
		} else {
			req.error();
		}
		this.logger.i(VHPlantsHandler.name, () => `@BeforeRead ${VHPlantsHandler.name}: end`);
	}
}
