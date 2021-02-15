import { Level, LogMessage, getLevel, now } from './ILogger';
import { injectable } from 'inversify';
import cls from 'cls-hooked';
import { IEnvironment } from '../shared/IEnvironment';

@injectable()
export class ConsoleLog {
  log(level: Level, tag: string, message: LogMessage): void {
    const requestContext = cls.getNamespace('Context');
    const environment: IEnvironment = requestContext && requestContext.get('Environment');
    const uuid = environment && environment.__UUID;
    const msg = `::${now()} [${getLevel(level).toUpperCase()}] UUID:${uuid} TAG:${tag}\tMESSAGE:${message}`;
    switch (level) {
      case Level.VERBOSE:
        console.log(msg);
        break;
      case Level.DEBUG:
        console.debug(msg);
        break;
      case Level.INFO:
        console.info(msg);
        break;
      case Level.WARNING:
        console.warn(msg);
        break;
      case Level.ERROR:
        console.error(msg);
        break;
      case Level.WTF:
        console.error(msg);
        break;
    }
  }
}
