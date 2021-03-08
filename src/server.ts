import 'module-alias/register';
import 'reflect-metadata';
import './RegisterModules';
import cds from '@sap/cds';
import proxy from '@sap/cds-odata-v2-adapter-proxy';
import helmet from 'helmet';
import { Router } from 'express';
import { DIContainer } from '@Application/DIContainer';
import { ContextManager } from '@Application/ContextManager';

cds.on('bootstrap', (app: Router) => {
  app.use(helmet());
  app.use(proxy());
  DIContainer.get(ContextManager).initContext();
  // app.use(function (req: Request, res: Response, next: NextFunction) {
  //   contextManager.startContext(function () {
  //     const environment: IEnvironment = {
  //       __UUID: uuidv4(),
  //     };
  //     res.setHeader('UUID', environment.__UUID);
  //     contextManager.setEnvironment(environment);
  //     next();
  //   });
  // });
});
module.exports = (o) => {
  // o.from = 'srv/precompiled-csn.json'
  // o.app = require('express')()
  // @ts-ignore
  return cds.server(o); //> delegate to default server.js
};
