import { OrderService } from '@Shared/Contract';
import { BaseHandler } from '@Core/BaseHandler';
import { IUser } from '@Shared/IUser';
import { BeforeCreate, Handler, User, Data, Req, Entities, AfterCreate } from 'cds-routing-handlers';
import { DIContainer } from '@Root/application/DIContainer';
import { Request } from '@sap/cds/apis/services';
import { GetPersonsUseCase } from '@Root/features/tests/usecases/GetPersonUseCase';


@Handler(OrderService.SanitizedEntity.WorkCenters)
export class WorkCentersHandler extends BaseHandler {
  @BeforeCreate()
  async before(@Req() req: Request, @Data() workcenter: OrderService.IWorkCenters, @User() incommingUser: Promise<IUser>) {
    return this.runWithContext(req, async () => {
      this.logger.i(WorkCentersHandler.name, () => '@BeforeCreate name: start');
      const useCase: GetPersonsUseCase = DIContainer.get(GetPersonsUseCase);
      const result = await useCase.execute({});
      if (result.isRight()) {
        this.logger.v(WorkCentersHandler.name, () => JSON.stringify(result.rightValue()));
      } else return workcenter;
      this.logger.i(WorkCentersHandler.name, () => '@BeforeCreate name: end');
    });
  }

  @AfterCreate()
  async after(@Req() req: Request, @Entities() workcenters: OrderService.IWorkCenters, @User() incommingUser: Promise<IUser>) {
    return this.runWithContext(req, async () => {
      this.logger.i(WorkCentersHandler.name, () => '@AfterCreate name: start');
    });
  }
}
