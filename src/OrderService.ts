import cds from '@sap/cds';
import { createCombinedHandler } from 'cds-routing-handlers';
import path from 'path';
import { Service } from '@sap/cds/apis/services';
import { EnvironmentMiddleware } from '@Application/GlobalMiddleware';
import { SFCUserChecker } from '@Application/SFCUserChecker';

export class OrderService extends cds.ApplicationService {
  async init() {
    OrderService.configRoutes(this);
    await super.init();
  }

  static configRoutes(service: Service) {
    const options = {
      handler: [
        path.join(__dirname, 'features', 'order', '/handlers/entities/**/*.js'),
        path.join(__dirname, 'features', 'order', '/handlers/functions/**/*.js'),
        path.join(__dirname, 'features', 'order', '/handlers/actions/**/*.js'),
      ],
      middlewares: [EnvironmentMiddleware],
      userChecker: SFCUserChecker,
    };
    const hdl = createCombinedHandler(options);
    hdl(service);
  }
}

module.exports.OrderService = OrderService;
module.exports.OrderService.configRoutes = OrderService.configRoutes;
