import { Level } from '../logger/ILogger';
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
}
