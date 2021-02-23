// import 'module-alias/register';
import 'reflect-metadata';
import cds from '@sap/cds';
import proxy from '@sap/cds-odata-v2-adapter-proxy';
import helmet from 'helmet';
import { v4 as uuidv4 } from 'uuid';
import { Router, Request, Response, NextFunction } from 'express';
import { IEnvironment } from '../shared/IEnvironment';
import { ContextManager } from '../application/ContextManager';
import { DIContainer } from '../application/DIContainer';

const contextManager: ContextManager = DIContainer.get(ContextManager);
contextManager.initContext()

cds.on('bootstrap', (app: Router) => {
  app.use(helmet());
  app.use(function (req: Request, res: Response, next: NextFunction) {
    contextManager.startContext(function () {
      const environment: IEnvironment = {
        __UUID: uuidv4(),
        __REQUEST: req,
      };
      res.setHeader('UUID', environment.__UUID);
      contextManager.setEnvironment(environment);
      next();
    });
  });
});
cds.on('bootstrap', (app: any) => app.use(proxy()));
// @ts-ignore
module.exports = cds.server;
