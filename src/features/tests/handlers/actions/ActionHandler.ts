import { Handler, Req, Param, Action } from 'cds-routing-handlers';
import { TestService } from '@Shared/Contract';

/**
 * Action handler.
 *
 * @export
 * @class ActionHandler
 */
@Handler()
export class ActionHandler {
  /**
   * @memberof ActionHandler
   */
  @Action(TestService.ActionHello2.name)
  public async hello(@Param(TestService.FuncHello.paramTo) to: string, @Req() req: any): Promise<string> {
    return `Hello ${to}!`;
  }
}
