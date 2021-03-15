import { Level } from '@Logger/ILogger';
import { injectable } from 'inversify';

@injectable()
export class EnvironmentManager {
	public get isProduction(): boolean {
		const nodeEnvirontment = process.env.NODE_ENV;
		return nodeEnvirontment === 'prod';
	}

	public get LOG_LEVEL(): Level {
		const level = process.env.LOG_LEVEL;
		return level !== undefined && level !== null && !isNaN(Number(level)) ? parseInt(level) : Level.INFO;
	}

	public get WORKCENTERSACTIVITIES_CASE_ACTIVITYPHASE(): Array<string> {
		return ['P', 'E', 'D'];
	}

	public get WORKCENTERSACTIVITIES_CASE_UNITY(): string {
		return 'H';
	}

	public get ROLE_WORKSTATION_OF_PLANT(): Array<string> {
		return ['E'];
	}
}
