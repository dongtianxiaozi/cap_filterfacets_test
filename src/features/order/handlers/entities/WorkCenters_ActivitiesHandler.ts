import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { BeforeCreate, Handler, User, Data, Req, Entities, AfterCreate, BeforeUpdate } from 'cds-routing-handlers';
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
export class WorkCenters_ActivitiesHandler {
  private readonly logger: ILogger;

  constructor() {
    this.logger = DIContainer.get('Logger');
  }

  @BeforeCreate()
  @ExecuteInContext()
  async beforeCreate(
    @Req() req: Request,
    @Data() workcenter_activitie: OrderService.IWorkCenters_Activities,
    @User() incommingUser: Promise<IUser>
  ) {
    this.logger.i(WorkCenters_ActivitiesHandler.name, () => `@BeforeCreate ${WorkCenters_ActivitiesHandler.name}: start`);
    let resultOrError = await this.beforeCreateAndUpdate(req, workcenter_activitie);
    if (resultOrError.isLeft()) {
      req.error();
    }
    this.logger.i(WorkCenters_ActivitiesHandler.name, () => `@BeforeCreate ${WorkCenters_ActivitiesHandler.name}: end`);
  }

  @BeforeUpdate()
  @ExecuteInContext()
  async beforeUpdate(
    @Req() req: Request,
    @Data() workcenter_activitie: OrderService.IWorkCenters_Activities,
    @User() incommingUser: Promise<IUser>
  ) {
    this.logger.i(WorkCenters_ActivitiesHandler.name, () => `@BeforeUpdate ${WorkCenters_ActivitiesHandler.name}: start`);
    let resultOrError = await this.beforeCreateAndUpdate(req, workcenter_activitie);
    if (resultOrError.isLeft()) {
      req.error();
    }
    this.logger.i(WorkCenters_ActivitiesHandler.name, () => `@BeforeUpdate ${WorkCenters_ActivitiesHandler.name}: end`);
  }

  async beforeCreateAndUpdate(
    req: Request,
    workcenter_activitie: OrderService.IWorkCenters_Activities
  ): Promise<Either<UnexpectedError | EntityNotFoundResult | InvalidUnity | DifferentGrantedType, ValidUnityAndGrantedType>> {
    const useCase: CheckWorkCentersActivitiesUserCase = DIContainer.get(CheckWorkCentersActivitiesUserCase);
    if (
      workcenter_activitie.toActivity_ID === undefined ||
      workcenter_activitie.toPhase_ID === undefined ||
      workcenter_activitie.toGrantedType_ID === undefined
    ) {
      return Left(new UnexpectedError());
    }

    return await useCase.execute({
      activity_id: workcenter_activitie.toActivity_ID,
      phase_id: workcenter_activitie.toPhase_ID,
      grantedtypes_id: workcenter_activitie.toGrantedType_ID,
    });
  }
}
