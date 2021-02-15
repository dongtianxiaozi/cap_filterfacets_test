import { Handler, AfterRead, Entities, OnRead, Srv, Req, BeforeRead, OnCreate, Data, Param, User } from 'cds-routing-handlers';
import { TestService } from '@Shared/Contract';
import { DIContainer } from '@Application/DIContainer';
import { GetPersonsUseCase, GetPersonsUseCaseParams } from '@Features/tests/usecases/GetPersonUseCase';
import * as TestServiceImpl from '@Services/TestService';
import { Request } from '@sap/cds/apis/services';
import { column_expr } from '@sap/cds/apis/cqn';
import { GetPersonsUnitWork } from '@Features/tests/unitsOfWork/GetPersonsUnitWork';
import { IUser } from '@Shared/IUser';
/**
 * Person handler
 */
@Handler(TestService.SanitizedEntity.Person)
export class PersonHandler {
  /**
   *
   * @param persons
   */
  @AfterRead()
  async addLastName(@Entities() persons: TestService.IPerson[], @User() incommingUser: Promise<IUser>): Promise<any> {
    const user: IUser = await incommingUser;
    console.log('After: Test addLastName: ' + JSON.stringify(user));
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
    console.log('Read: Test queryPersons: ' + JSON.stringify(user));
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
    const result = await DIContainer.get(GetPersonsUnitWork).execute(params);
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
  async befff(@User() incommingUser: Promise<IUser>): Promise<any> {
    const user: IUser = await incommingUser;
    console.log('Before: Test befff: ' + JSON.stringify(user));
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
    console.log('Ceate: Test queryPersons: ' + JSON.stringify(user));
    throw new Error('NOPE');
  }
}
