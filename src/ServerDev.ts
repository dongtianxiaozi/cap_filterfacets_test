//import 'module-alias/register';
import 'reflect-metadata';
import proxy from '@sap/cds-odata-v2-adapter-proxy';
import cds from '@sap/cds';
import express, { Request, Response, NextFunction } from 'express';
import * as TestService from './TestService';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import { IEnvironment } from '@Shared/IEnvironment';
import { ContextManager } from '@Application/ContextManager';
import { DIContainer } from '@Application/DIContainer';

const contextManager: ContextManager = DIContainer.get(ContextManager);
contextManager.initContext();

export class ServerDev {
  static async run() {
    try {
      const app = express();
      app.use(helmet());
      app.use(function (req: Request, res: Response, next: NextFunction) {
        contextManager.startContext(function () {
          const environment: IEnvironment = {
            __UUID: uuidv4(),
            __REQUEST: req,
          };
          res.setHeader('TokenApi-UUID', environment.__UUID);
          contextManager.setEnvironment(environment);
          next();
        });
      });
      ServerDev.initServer(app);
      ServerDev.testService(app);
      // Run the server.
      const port = process.env.PORT || 4004;
      app.listen(port, async () => {
        console.info(`Server is listing at http://localhost:${port}`);
      });
    } catch (e) {
      console.log(e.message);
    }
  }
  static async initServer(app) {
    await cds.connect('db');
    cds.on('bootstrap', (srv: any) => srv.use(proxy()));
  }

  static async testService(app) {
    await cds
      .serve('TestService')
      .at('test')
      .in(app)
      .with((srv) => {
        try {
          TestService.TestService.configRoutes(srv);
        } catch (e) {
          console.log(e.message);
        }
      });
  }
}

ServerDev.run();
