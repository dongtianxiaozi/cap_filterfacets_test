import 'reflect-metadata';
import proxy from '@sap/cds-odata-v2-adapter-proxy';
import cds from '@sap/cds';
import express from 'express';
import * as TestService from './TestService';
import helmet from 'helmet';
import { ContextManager } from '@Application/ContextManager';
import { DIContainer } from '@Application/DIContainer';

export class ServerDev {
	static async run() {
		try {
			const app = express();
			app.use(helmet());
			DIContainer.get(ContextManager).initContext();
			await ServerDev.initServer();
			await ServerDev.testService(app);
			// Run the server.
			const port = process.env.PORT || 4004;
			app.listen(port, async () => {
				console.info(`Server is listing at http://localhost:${port}`);
			});
		} catch (e) {
			console.log(e.message);
		}
	}
	static async initServer() {
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
