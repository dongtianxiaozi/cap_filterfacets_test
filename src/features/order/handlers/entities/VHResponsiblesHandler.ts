import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { Handler, User, Data, Req, BeforeRead } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { ILogger } from '@Logger/ILogger';
import { ExecuteInContext } from '@Core/ExecuteInContext';
import { GetUserUseCase } from '@Features/order/usecases/GetUserUseCase';
import { EnvironmentManager } from '@Root/application/EnvironmentManager';

@Handler(OrderService.SanitizedEntity.VH_Responsibles)
export class VHResponsiblesHandler {
	private readonly logger: ILogger;
	private readonly environmentManager: EnvironmentManager;

	constructor() {
		this.logger = DIContainer.get('Logger');
		this.environmentManager = DIContainer.get(EnvironmentManager);
	}

	@BeforeRead()
	@ExecuteInContext()
	async before(
		@Req() req: Request,
		@Data() responsibles: OrderService.IResponsibles,
		@User() incommingUser: Promise<IUser>
	) {
		this.logger.i(VHResponsiblesHandler.name, () => `@BeforeRead ${VHResponsiblesHandler.name}: start`);
		const userUseCase: GetUserUseCase = DIContainer.get(GetUserUseCase);
		const resultUsers = await userUseCase.execute({
			id: (await incommingUser).username,
		});
		if (resultUsers.isRight()) {
			try {
				if (resultUsers.value.data) {
					const user: OrderService.IUsers = resultUsers.value.data as OrderService.IUsers;
					if (this.environmentManager.ROLE_WORKSTATION_OF_PLANT.indexOf(user.toType.code) >= 0) {
						req.query['SELECT'].where =
							req.query['SELECT'].where !== undefined
								? [...req.query['SELECT'].where, ...['and', { ref: ['toPlant_id'] }, '=', { val: user.toPlant_ID }]]
								: [...[{ ref: ['toPlant_id'] }, '=', { val: user.toPlant_ID }]];
					}
				} else req.error();
			} catch (e) {
				req.error();
			}
		} else {
			req.error();
		}
		this.logger.i(VHResponsiblesHandler.name, () => `@BeforeRead ${VHResponsiblesHandler.name}: end`);
	}
}
