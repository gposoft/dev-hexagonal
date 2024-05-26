import pino, { LogDescriptor, Logger } from "pino";
import pretty from "pino-pretty";
import { blue, yellow, white, red, green, bold, underline } from "colorette";

export const streamPretty = pretty({
  colorize: true,
  colorizeObjects: true,
  translateTime: "SYS:dd-mm-yyyy HH:MM:ss",
  ignore: "requestId,pid",
  customColors: "err:red,info:blue,warn:yellow",
  messageFormat: (log: LogDescriptor, messageKey: string) => {
    const message = log[messageKey];
    if (log.requestId) return `[${log.requestId}] ${message}`;
    if (log.level === 30) return blue(message);
    if (log.level === 40) return yellow(message);
    if (log.level === 50) return red(message);
    return white(message);
  },
});

export const logger = pino({}, streamPretty);

let log: Logger<never>;

export const LoggerInjection = {
  create: (lg: Logger<never>) => (log = lg),
  get: () => log,
};
