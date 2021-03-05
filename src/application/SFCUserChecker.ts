import { IUserChecker, Jwt, Req, UserChecker } from 'cds-routing-handlers';
import { IUser } from '@Shared/IUser';

@UserChecker() // Omit options for handler middlewares
export class SFCUserChecker implements IUserChecker {
  // You can inject the request parameters as you would in any other handler.
  // NOTE: With one exception the @User() decorator will not work.
  public async check(@Req() req: any, @Jwt() jwt: string): Promise<IUser> {
    // Custom code here to create user from JWT...
    // Let's fake it here
    // const contextManager = DIContainer.get(ContextManager);
    // const environment: IEnvironment = contextManager.getEnvironment()
    // const request = environment.__REQUEST;

    return {
      username: req.user.id,
      locale: req.user.locale,
      tenant: req.user.tenant,
    }
  }
}
