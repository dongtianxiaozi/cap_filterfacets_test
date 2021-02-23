import { Handler, Req, Func, Param } from 'cds-routing-handlers';
import { TestService } from '../../../../shared/Contract';

/**
 * Function handler.
 *
 * @export
 * @class FunctionHandler
 */
@Handler()
export class FunctionHandler {
  /**
   * @memberof FunctionHandler
   */
  @Func(TestService.FuncHello.name)
  public async hello(@Param(TestService.FuncHello.paramTo) to: string, @Req() req: any): Promise<string> {
    return `Hello ${to}!`;
  }
}
