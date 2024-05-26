import winston from "winston";
import { format } from "date-fns";

const levels = {
  error: 0,
  warn: 1,
  info: 2,
};

const colors = {
  error: "red",
  warn: "yellow",
  info: "blue",
};

winston.addColors(colors);

const logFormat = winston.format.printf((info) => {
  return `[${info.timestamp}] ${info.level}: ${info.message}`;
});

export class LoggerService {
  private logger: winston.Logger;

  constructor(level: string, filenamePrefix: string) {
    this.logger = winston.createLogger({
      level: level,
      levels: levels,
      format: winston.format.combine(
        winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss:ms" }),
        winston.format.metadata({ fillExcept: ["message", "level", "timestamp", "label"] }),
        winston.format.splat(),
        logFormat
      ),
      transports: [
        new winston.transports.Console({ format: winston.format.combine(winston.format.colorize({ all: true }), logFormat) }),
        new winston.transports.File({ filename: `logs/${filenamePrefix}-${format(new Date(), "yyyy-MM-dd")}.log`, level: level }),
      ],
    });
  }

  log(message: string, metadata?: any) {
    this.logger.log({ level: this.logger.level, message: message, ...metadata });
  }

  error(message: string, metadata?: any) {
    this.logger.error(message, metadata);
  }

  warn(message: string, metadata?: any) {
    this.logger.warn(message, metadata);
  }

  info(message: string, metadata?: any) {
    this.logger.info(message, metadata);
  }
}
