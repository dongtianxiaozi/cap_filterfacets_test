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
import { TestService } from '../../../../shared/Contract';
import { DIContainer } from '../../../../application/DIContainer';
import { GetPersonsUseCase, GetPersonsUseCaseParams } from '../../../../features/tests/usecases/GetPersonUseCase';
import * as TestServiceImpl from '../../../../services/TestService';
import { Request } from '@sap/cds/apis/services';
import { IUser } from '../../../../shared/IUser';
import { ILogger } from '../../../../logger/ILogger';
/**
 * Person handler
 */
@Handler(TestService.SanitizedEntity.Person)
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
  @AfterRead()
  async addLastName(@Entities() persons: TestService.IPerson[], @User() incommingUser: Promise<IUser>): Promise<any> {
    const user: IUser = await incommingUser;
    this.logger.i(
      PersonHandler.name,
      () => `@AfterRead addLastName with user=${JSON.stringify(user)} and personList=${JSON.stringify(persons)}`
    );
    if (persons) {
      for (const person of persons) {
        person.title += ` -- 11% discount!`;
      }
    }
  }

  /**
   *
   */
  @OnRead()
  async queryPersons(
    @Srv() srv: TestServiceImpl.TestService,
    @Req() req: Request,
    @Param('ID') id: string,
    @User() incommingUser: Promise<IUser>
  ): Promise<any> {
    const user: IUser = await incommingUser;
    this.logger.i(
      PersonHandler.name,
      () => `@OnRead queryPersons with user=${JSON.stringify(user)} and ID=${id} and request=${JSON.stringify(req.query)}`
    );
    let params: GetPersonsUseCaseParams;
    if (id) {
      params = {
        id: id,
      };
    } else {
      // TODO: Utilizar una función para extraer los datos de búsqueda (@Utils)
      const columns: string[] = req.query['SELECT'].columns.map((value: any) => {
        return value.ref[0];
      });
      const limit: number = req.query['SELECT'].limit.rows.val;
      const top: number = req.query['SELECT'].top;
      params = {
        top: top,
        limit: limit,
        select: columns,
      };
    }
    const result = await DIContainer.get(GetPersonsUseCase).execute(params);
    if (result.isRight()) {
      return result.rightValue().data;
    } else {
      throw req.reject();
    }
  }

  /**
   *
   */
  @BeforeRead()
  async test(@User() incommingUser: Promise<IUser>): Promise<any> {
    const user: IUser = await incommingUser;
    this.logger.i(PersonHandler.name, () => `@BeforeRead test with user=${JSON.stringify(user)}`);
  }

  /**
   *
   */
  @OnCreate()
  async createPerson(
    @Srv() srv: TestServiceImpl.TestService,
    @Req() req: any,
    @Data() data: any,
    @User() incommingUser: Promise<IUser>
  ): Promise<any> {
    const user: IUser = await incommingUser;
    this.logger.i(PersonHandler.name, () => `@OnCreate createPerson with user=${JSON.stringify(user)}`);
    throw new Error('NOPE');
  }
}
