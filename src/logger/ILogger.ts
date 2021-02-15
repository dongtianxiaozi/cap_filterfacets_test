export interface ILogger {
  v(tag: string, message: LogMessage): void;
  d(tag: string, message: LogMessage): void;
  i(tag: string, message: LogMessage): void;
  w(tag: string, message: LogMessage): void;
  e(tag: string, message: LogMessage): void;
  wtf(tag: string, message: LogMessage): void;
  log(level: Level, tag: string, message: LogMessage): void;
}

export type LogMessage = () => string;

export enum Level {
  WTF,
  ERROR,
  WARNING,
  INFO,
  DEBUG,
  VERBOSE,
}

export function getLevel(level: Level): string {
  switch (level) {
    case Level.WTF:
      return 'wtf';
    case Level.ERROR:
      return 'error';
    case Level.WARNING:
      return 'warning';
    case Level.INFO:
      return 'info';
    case Level.DEBUG:
      return 'debug';
    case Level.VERBOSE:
      return 'verbose';
    default:
      return 'error';
  }
}

export function now(): string {
  const today = new Date(Date.now());
  const year = today.getFullYear();
  const month = (today.getMonth() + 1).toString().padStart(2, '0');
  const day = today.getDate();
  const hour = today.getHours();
  const minute = today.getMinutes();
  const second = today.getSeconds();
  // const milliseconds = today.getMilliseconds();
  const date = `${year}-${month}-${day}`;
  const time = `${hour}:${minute}:${second}`; //.${milliseconds}`;
  const hrTime = process.hrtime();
  return `${date}T${time}.${hrTime[1]}Z`;
}
