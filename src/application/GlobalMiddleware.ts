import { ICdsMiddleware, Middleware, Req, Jwt } from 'cds-routing-handlers';
import { IEnvironment } from '@Shared/IEnvironment';
import { DIContainer } from './DIContainer';
import { ContextManager } from './ContextManager';

@Middleware({ global: true, priority: 1 })
export class EnvironmentMiddleware implements ICdsMiddleware {
  // You can inject the request parameters as you would in any other handler.
  public async use(@Req() req: any, @Jwt() jwt: string): Promise<void> {
    console.log('I am global middleware prio 1');

    const contextManager = DIContainer.get(ContextManager);
    const environment: IEnvironment = contextManager.getEnvironment();
    environment.__REQUEST = req;
    contextManager.setEnvironment(environment);
  }
}
