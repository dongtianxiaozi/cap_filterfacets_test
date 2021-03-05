import cds from '@sap/cds';
import { createCombinedHandler } from 'cds-routing-handlers';
import path from 'path';
import { Service } from '@sap/cds/apis/services';
import { EnvironmentMiddleware } from '@Application/GlobalMiddleware';
import { SFCUserChecker } from '@Application/SFCUserChecker';

export class TestService extends cds.ApplicationService {
  async init() {
    TestService.configRoutes(this);
    await super.init();
  }

  static configRoutes(service: Service) {
    const options = {
      handler: [
        path.join(__dirname, 'features', 'tests', '/handlers/entities/**/*.js'),
        path.join(__dirname, 'features', 'tests', '/handlers/functions/**/*.js'),
        path.join(__dirname, 'features', 'tests', '/handlers/actions/**/*.js'),
      ],
      middlewares: [EnvironmentMiddleware],
      userChecker: SFCUserChecker,
    };
    console.log(JSON.stringify(options.handler))
    const hdl = createCombinedHandler(options);
    hdl(service);
  }
}

module.exports.TestService = TestService;
module.exports.TestService.configRoutes = TestService.configRoutes;
