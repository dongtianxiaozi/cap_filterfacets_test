import cds from '@sap/cds';
import { createCombinedHandler } from 'cds-routing-handlers';
import path from 'path';
import { Service } from '@sap/cds/apis/services';

export class TestService extends cds.ApplicationService {
  async init() {
    TestService.configRoutes(this);
    await super.init();
  }

  static configRoutes(service: Service, baseDir: string = 'gen/srv/srv') {
    const options = {
      handler: [
        path.join(__dirname, '..', baseDir, 'features', 'tests', '/handlers/entities/**/*.js'),
        path.join(__dirname, '..', baseDir, 'features', 'tests', '/handlers/functions/**/*.js'),
        path.join(__dirname, '..', baseDir, 'features', 'tests', '/handlers/actions/**/*.js'),
      ],
    };
    const hdl = createCombinedHandler(options);
    hdl(service);
  }
}

module.exports.TestService = TestService;
module.exports.TestService.configRoutes = TestService.configRoutes;
