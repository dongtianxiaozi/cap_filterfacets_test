import { ICdsMiddleware, Middleware, Req, Jwt } from 'cds-routing-handlers';
import { IEnvironment } from '@Shared/IEnvironment';
import cls from 'cls-hooked';

@Middleware({ global: true, priority: 1 })
export class EnvironmentMiddleware implements ICdsMiddleware {
  // You can inject the request parameters as you would in any other handler.
  public async use(@Req() req: any, @Jwt() jwt: string): Promise<void> {
    console.log('I am global middleware prio 1');

    const requestContext = cls.getNamespace('Context');
    const environment: IEnvironment = requestContext.get('Environment');
    environment.__REQUEST = req;
    requestContext.set('Environment', environment);
  }
}
