import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { Handler, User, Data, Req, BeforeRead } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { ILogger } from '@Logger/ILogger';
import { ExecuteInContext } from '@Core/ExecuteInContext';
import { GetOperatorsOfStationUseCase } from '@Root/features/order/usecases/GetOperatorsOfStationUseCase';

@Handler(OrderService.SanitizedEntity.VH_Operators)
export class VHOperatorsHandler {
	private readonly logger: ILogger;

	constructor() {
		this.logger = DIContainer.get('Logger');
	}

	@BeforeRead()
	@ExecuteInContext()
	async before(@Req() req: Request, @Data() operators: OrderService.IOperators, @User() incommingUser: Promise<IUser>) {
		this.logger.i(VHOperatorsHandler.name, () => `@BeforeRead ${VHOperatorsHandler.name}: start`);
		const getOperatorsOfStationUseCase: GetOperatorsOfStationUseCase = DIContainer.get(GetOperatorsOfStationUseCase);
		const resultOperators = await getOperatorsOfStationUseCase.execute({
			userId: (await incommingUser).username,
		});
		if (resultOperators.isLeft()) {
			req.error();
		}
		this.logger.i(VHOperatorsHandler.name, () => `@BeforeRead ${VHOperatorsHandler.name}: end`);
	}
}
