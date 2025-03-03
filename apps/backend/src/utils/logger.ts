import pino, { type DestinationStream } from "pino";

const transport = pino.transport({
  targets: [
    {
      target: "pino/file",
      options: { destination: "logs/server.log" },
    },
    {
      target: "pino-pretty",
    },
  ],
}) as DestinationStream;

// @ts-expect-error This works as expected. Not sure why TS shows an error.
const logger = pino(
  {
    enabled: !(process.env.NODE_ENV === "test"),
    base: {
      pid: false,
    },
    level: process.env.PINO_LOG_LEVEL ?? "info",
    timestamp: pino.stdTimeFunctions.isoTime,
  },
  transport,
);

export default logger;
