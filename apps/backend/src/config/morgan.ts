import morgan from "morgan";
import logger from "../utils/logger.js";

const morganMiddleware = morgan(
  function (tokens, req, res) {
    return JSON.stringify({
      method: tokens.method ? tokens.method(req, res) : undefined,
      url: tokens.url ? tokens.url(req, res) : undefined,
      status: Number.parseFloat(tokens.status!(req, res) ?? ""),
      content_length: tokens.res
        ? tokens.res(req, res, "content-length")
        : undefined,
      response_time: Number.parseFloat(tokens["response-time"]!(req, res)!),
    });
  },
  {
    stream: {
      // Configure Morgan to use the Winston logger with http severity
      write: (message) => {
        const data: unknown = JSON.parse(message);
        logger.http("incoming-request", data);
      },
    },
  },
);

export { morganMiddleware };
