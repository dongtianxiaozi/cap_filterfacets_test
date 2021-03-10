import { ICdsMiddleware, Middleware, Req, Jwt } from 'cds-routing-handlers';

@Middleware({ global: true, priority: 1 })
export class EnvironmentMiddleware implements ICdsMiddleware {
	// You can inject the request parameters as you would in any other handler.
	public async use(@Req() req: any, @Jwt() jwt: string): Promise<void> {
		console.log('I am global middleware prio 1');
	}
}
