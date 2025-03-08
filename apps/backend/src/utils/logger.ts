import winston from "winston";
import "winston-daily-rotate-file";
import { consoleFormat } from "winston-console-format";

const { combine, timestamp, json, errors, colorize, padLevels, ms, splat } =
  winston.format;

// Default Levels For Reference
// levels = { error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6 };

// DailyRotateFile is used to rotate the log file daily and ensure old
// log files are deleted automatically.

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL ?? "info",
  format: combine(timestamp(), ms(), errors({ stack: true }), splat(), json()),
  transports: [
    // Write all logs with importance level of `error` or higher to `error.log`
    new winston.transports.DailyRotateFile({
      filename: "./logs/error-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
      level: "error",
    }),

    // Write all logs with importance level of `info` or higher to `combined.log`
    new winston.transports.DailyRotateFile({
      filename: "./logs/combined-%DATE%.log",
      datePattern: "YYYY-MM-DD",
      maxFiles: "14d",
    }),
  ],
  exceptionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: "./logs/exception.log",
      datePattern: "YYYY-MM",
      maxFiles: "1m",
    }),
  ],
  rejectionHandlers: [
    new winston.transports.DailyRotateFile({
      filename: "./logs/rejection.log",
      datePattern: "YYYY-MM",
      maxFiles: "1m",
    }),
  ],
});

// If we're not in production then log to the console with a pretty format
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new winston.transports.Console({
      level: "debug",
      format: combine(
        colorize({ all: true }),
        padLevels(),
        consoleFormat({
          showMeta: true,
          metaStrip: ["timestamp", "service"],
          inspectOptions: {
            depth: Infinity,
            colors: true,
            maxArrayLength: Infinity,
            breakLength: 120,
            compact: Infinity,
          },
        }),
      ),
    }),
  );
}

export default logger;
