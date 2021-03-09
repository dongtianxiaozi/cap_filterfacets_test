import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { BeforeCreate, Handler, User, Data, Req, BeforeUpdate } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { ILogger } from '@Logger/ILogger';
import { ExecuteInContext } from '@Core/ExecuteInContext';
import { CheckWorkCentersActivitiesUserCase } from '../../usecases/CheckWorkCentersActivitiesUserCase';
import { Either, Left } from '@Root/core/Either';
import { UnexpectedError } from '@Root/results/GlobalResults';
import { EntityNotFoundResult } from '@Root/results/CrudResults';
import { DifferentGrantedType, InvalidUnity, ValidUnityAndGrantedType } from '@Root/results/UseCaseResults';

@Handler(OrderService.SanitizedEntity.WorkCenters_Activities)
export class WorkCentersActivitiesHandler {
	private readonly logger: ILogger;

	constructor() {
		this.logger = DIContainer.get('Logger');
	}

	@BeforeCreate()
	@ExecuteInContext()
	async beforeCreate(
		@Req() req: Request,
		@Data() workcenterActivities: OrderService.IWorkCenters_Activities,
		@User() incommingUser: Promise<IUser>
	) {
		this.logger.i(WorkCentersActivitiesHandler.name, () => `@BeforeCreate ${WorkCentersActivitiesHandler.name}: start`);
		const resultOrError = await this.beforeCreateAndUpdate(req, workcenterActivities);
		if (resultOrError.isLeft()) {
			req.error();
		}
		this.logger.i(WorkCentersActivitiesHandler.name, () => `@BeforeCreate ${WorkCentersActivitiesHandler.name}: end`);
	}

	@BeforeUpdate()
	@ExecuteInContext()
	async beforeUpdate(
		@Req() req: Request,
		@Data() workcenterActivities: OrderService.IWorkCenters_Activities,
		@User() incomingUser: Promise<IUser>
	) {
		this.logger.i(WorkCentersActivitiesHandler.name, () => `@BeforeUpdate ${WorkCentersActivitiesHandler.name}: start`);
		const resultOrError = await this.beforeCreateAndUpdate(req, workcenterActivities);
		if (resultOrError.isLeft()) {
			req.error();
		}
		this.logger.i(WorkCentersActivitiesHandler.name, () => `@BeforeUpdate ${WorkCentersActivitiesHandler.name}: end`);
	}

	async beforeCreateAndUpdate(
		req: Request,
		workcenterActivities: OrderService.IWorkCenters_Activities
	): Promise<
		Either<UnexpectedError | EntityNotFoundResult | InvalidUnity | DifferentGrantedType, ValidUnityAndGrantedType>
	> {
		const useCase: CheckWorkCentersActivitiesUserCase = DIContainer.get(CheckWorkCentersActivitiesUserCase);
		if (
			workcenterActivities.toActivity_ID === undefined ||
			workcenterActivities.toPhase_ID === undefined ||
			workcenterActivities.toGrantedType_ID === undefined
		) {
			return Left(new UnexpectedError());
		}

		return useCase.execute({
			activity_id: workcenterActivities.toActivity_ID,
			phase_id: workcenterActivities.toPhase_ID,
			grantedtypes_id: workcenterActivities.toGrantedType_ID,
		});
	}
}
