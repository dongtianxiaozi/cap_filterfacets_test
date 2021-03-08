import { IUseCase } from '@Core/IUseCase';
import { OrderService } from '@Shared/Contract';
import { injectable, inject } from 'inversify';
import { Either, Right, Left } from '@Core/Either';
import { UnexpectedError } from '@Results/GlobalResults';
import { EmptyResult, EntityNotFoundResult, QueryResult } from '@Results/CrudResults';
import { ILogger } from '@Logger/ILogger';
import { ActivitiesRepository } from '../repository/ActivitiesRepository';
import { DifferentGrantedType, InvalidUnity, ValidUnityAndGrantedType } from '@Root/results/UseCaseResults';
import { EnvironmentManager } from '@Root/application/EnvironmentManager';
import { WorkCentesActivitiesRepository } from '../repository/WorkCentesActivitiesRepository';

export interface CheckWorkCentersActivitiesUserCaseParams {
	activity_id?: string;
	phase_id?: string;
	grantedtypes_id?: string;
}

@injectable()
export class CheckWorkCentersActivitiesUserCase
	implements
		IUseCase<
			CheckWorkCentersActivitiesUserCaseParams,
			Either<UnexpectedError | EmptyResult, QueryResult<OrderService.IResponsibles>>
		> {
	private readonly logger: ILogger;
	private readonly environmentManager: EnvironmentManager;
	private readonly activitiesRepository: ActivitiesRepository;
	private readonly workCentesActivitiesRepository: WorkCentesActivitiesRepository;

	constructor(
		@inject('Logger') logger: ILogger,
		environmentManager: EnvironmentManager,
		activitiesRepository: ActivitiesRepository,
		workCentesActivitiesRepository: WorkCentesActivitiesRepository
	) {
		this.logger = logger;
		this.environmentManager = environmentManager;
		this.activitiesRepository = activitiesRepository;
		this.workCentesActivitiesRepository = workCentesActivitiesRepository;
	}

	async execute(
		params: CheckWorkCentersActivitiesUserCaseParams
	): Promise<
		Either<UnexpectedError | EntityNotFoundResult | InvalidUnity | DifferentGrantedType, ValidUnityAndGrantedType>
	> {
		this.logger.i(
			CheckWorkCentersActivitiesUserCase.name,
			() => `start get CheckWorkCentersActivities UseCase with params=${JSON.stringify(params)}`
		);
		if (params.activity_id && params.phase_id) {
			const resultOrErrorActivityPhase = await this.activitiesRepository.getActivityPhasesWithId(params.phase_id);
			const resultOrErrorUnit = await this.activitiesRepository.getUnitsOfActivity(params.activity_id);
			if (resultOrErrorUnit.isLeft() || resultOrErrorActivityPhase.isLeft()) return Left(new EntityNotFoundResult());
			if (resultOrErrorActivityPhase.value.data.length === 0 || resultOrErrorUnit.value.data.length === 0)
				return Left(new EntityNotFoundResult());
			const unit: OrderService.IUnits = resultOrErrorUnit.value.data[0];
			const activityphase: OrderService.IActivityPhases = resultOrErrorActivityPhase.value.data[0];
			if (
				this.environmentManager.WORKCENTERSACTIVITIES_CASE_ACTIVITYPHASE.indexOf(activityphase.code) > -1 &&
				unit.code !== this.environmentManager.WORKCENTERSACTIVITIES_CASE_UNITY
			)
				return Left(new InvalidUnity());

			if (this.environmentManager.WORKCENTERSACTIVITIES_CASE_ACTIVITYPHASE.indexOf(activityphase.code) > -1) {
				const resultOrErrorGrantedTypes = await this.workCentesActivitiesRepository.getGrantedTypesWithPhase([
					activityphase.code,
				]);
				if (resultOrErrorGrantedTypes.isRight()) {
					if (resultOrErrorGrantedTypes.value.data.length > 1) return Left(new UnexpectedError());
					if (resultOrErrorGrantedTypes.value.data.length === 1) {
						if (resultOrErrorGrantedTypes.value.data[0].ID !== params.grantedtypes_id)
							return Left(new DifferentGrantedType());
					}
				}
			}

			return Right(new ValidUnityAndGrantedType());
		} else {
			return Left(new UnexpectedError());
		}
	}
}
