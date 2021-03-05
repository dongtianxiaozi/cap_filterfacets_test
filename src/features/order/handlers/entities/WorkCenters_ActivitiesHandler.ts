import { OrderService } from '@Shared/Contract';
import { IUser } from '@Shared/IUser';
import { BeforeCreate, Handler, User, Data, Req, Entities, AfterCreate, BeforeUpdate } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { ILogger } from '@Logger/ILogger';
import { ExecuteInContext } from '@Core/ExecuteInContext';
import { CheckWorkCentersActivitiesUserCase } from '../../usecases/CheckWorkCentersActivitiesUserCase';

@Handler(OrderService.SanitizedEntity.WorkCenters_Activities)
export class WorkCenters_ActivitiesHandler {
  private readonly logger: ILogger;

  constructor() {
    this.logger = DIContainer.get('Logger');
  }

  @BeforeCreate()
  @BeforeUpdate()
  @ExecuteInContext()
  async beforeCreate(@Req() req: Request, @Data() workcenter_activitie: OrderService.IWorkCenters_Activities, @User() incommingUser: Promise<IUser>) {
    this.logger.i(WorkCenters_ActivitiesHandler.name, () => '@BeforeCreate name: start');
    const useCase: CheckWorkCentersActivitiesUserCase = DIContainer.get(CheckWorkCentersActivitiesUserCase);
    if(workcenter_activitie.toActivity_ID === undefined ||  workcenter_activitie.toPhase_ID == undefined){
      req.error();
    }
    const result = await useCase.execute({
      activity_id: workcenter_activitie.toActivity_ID,
      phase_id: workcenter_activitie.toPhase_ID,
      grantedtypes_id: workcenter_activitie.toGrantedType_ID
    });
    if (result.isRight()) {
      this.logger.v(WorkCenters_ActivitiesHandler.name, () => JSON.stringify(result.rightValue()));
    }
    else{
      req.error();
    }
    this.logger.i(WorkCenters_ActivitiesHandler.name, () => '@BeforeCreate name: end');
  }

  @AfterCreate()
  @ExecuteInContext()
  async after(@Req() req: Request, @Entities() workcenters: OrderService.IWorkCenters, @User() incommingUser: Promise<IUser>) {
    this.logger.i(WorkCenters_ActivitiesHandler.name, () => '@AfterCreate name: start');
  }
}
