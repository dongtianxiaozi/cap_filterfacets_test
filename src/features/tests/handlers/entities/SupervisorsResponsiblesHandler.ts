import {
  Handler,
  AfterRead,
  Entities,
  OnRead,
  Srv,
  Req,
  BeforeRead,
  OnCreate,
  Data,
  Param,
  User,
  Action,
} from 'cds-routing-handlers';
import { TestService } from '@Shared/Contract';
import { DIContainer } from '@Application/DIContainer';
import { GetPersonsUseCase, GetPersonsUseCaseParams } from '@Features/tests/usecases/GetPersonUseCase';
import * as TestServiceImpl from '@Services/TestService';
import { Request } from '@sap/cds/apis/services';
import { IUser } from '@Shared/IUser';
import { ILogger } from '@Logger/ILogger';
/**
 * Person handler
 */
@Handler(TestService.SanitizedEntity.SupervisorsResponsibles)
export class PersonHandler {
  private readonly logger: ILogger;

  constructor() {
    this.logger = DIContainer.get('Logger');
  }

  bondedActionTest(@Param('ID') id: string) {
    // TODO: Pendiente revisar Bounded Actions
  }

  /**
   *
   * @param persons
   */
  @BeforeRead()
  async test(    
    @Srv() srv: TestServiceImpl.TestService,
    @Req() req: Request,
    @Param('ID') id: string,
    @User() incommingUser: Promise<IUser>
    ): Promise<any> {
    
  }
}
