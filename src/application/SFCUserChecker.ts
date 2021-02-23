import { IUserChecker, UserChecker, Jwt } from 'cds-routing-handlers';
import { IUser } from '../shared/IUser';
import { IEnvironment } from '../shared/IEnvironment';
import { DIContainer } from './DIContainer';
import { ContextManager } from './ContextManager';

@UserChecker() // Omit options for handler middlewares
export class SFCUserChecker implements IUserChecker {
  // You can inject the request parameters as you would in any other handler.
  // NOTE: With one exception the @User() decorator will not work.
  public async check(@Jwt() jwt: string): Promise<IUser> {
    // Custom code here to create user from JWT...
    // Let's fake it here
    const contextManager = DIContainer.get(ContextManager);
    const environment: IEnvironment = contextManager.getEnvironment()
    const request = environment.__REQUEST;
    return {
      username: request.user.id,
      locale: request.user.locale,
      tenant: request.user.tenant,
    };
  }
}
