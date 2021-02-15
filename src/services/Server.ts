import 'module-alias/register';
import 'reflect-metadata';
import cds from '@sap/cds';
import proxy from '@sap/cds-odata-v2-adapter-proxy';
import helmet from 'helmet';
import cls from 'cls-hooked';
import { v4 as uuidv4 } from 'uuid';
import { Router, Request, Response, NextFunction } from 'express';
import { IEnvironment } from '@Shared/IEnvironment';
const requestContext = cls.createNamespace('Context');

cds.on('bootstrap', (app: Router) => {
  app.use(helmet());
  app.use(function (req: Request, res: Response, next: NextFunction) {
    requestContext.run(function () {
      const environment: IEnvironment = {
        __UUID: uuidv4(),
        __REQUEST: req,
      };
      res.setHeader('Request-UUID', environment.__UUID);
      requestContext.set('Environment', environment);
      next();
    });
  });
});
cds.on('bootstrap', (app: any) => app.use(proxy()));
// @ts-ignore
module.exports = cds.server;
