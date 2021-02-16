import { ILogger, Level, LogMessage, getLevel, now } from './ILogger';
import { injectable } from 'inversify';
import { ConsoleLog } from './ConsoleLog';
import { EnvironmentManager } from '../application/EnvironmentManager';

@injectable()
export class Logger implements ILogger {
  private readonly _consoleLog: ConsoleLog;
  private readonly _environmentManager: EnvironmentManager;

  constructor(consoleLog: ConsoleLog, environmentManager: EnvironmentManager) {
    this._consoleLog = consoleLog;
    this._environmentManager = environmentManager;
  }

  v(tag: string, message: LogMessage): void {
    this.log(Level.VERBOSE, tag, message);
  }

  d(tag: string, message: LogMessage): void {
    this.log(Level.DEBUG, tag, message);
  }

  i(tag: string, message: LogMessage): void {
    this.log(Level.INFO, tag, message);
  }

  w(tag: string, message: LogMessage): void {
    this.log(Level.WARNING, tag, message);
  }

  e(tag: string, message: LogMessage): void {
    this.log(Level.ERROR, tag, message);
  }

  wtf(tag: string, message: LogMessage): void {
    this.log(Level.WTF, tag, message);
  }

  log(level: Level, tag: string, message: LogMessage): void {
    if (this._environmentManager.LOG_LEVEL >= level) {
      if (!this._environmentManager.isProduction) {
        this._consoleLog.log(level, tag, message.apply(this));
      }
    }
  }
}
