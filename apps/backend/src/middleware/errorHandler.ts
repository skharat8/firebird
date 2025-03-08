import type { Request, Response, NextFunction } from "express";
import { HttpError } from "http-errors";
import { Prisma } from "@prisma/client";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

import { StatusCode } from "../data/enums.js";
import logger from "../utils/logger.js";

// Catch all errors encountered in the app.
function errorHandler(
  err: unknown,
  _: Request,
  res: Response,
  __: NextFunction,
) {
  if (!(err instanceof ZodError)) logger.error(err);

  switch (true) {
    case err instanceof ZodError: {
      const validationError = fromZodError(err);
      logger.error(validationError.message, {
        details: validationError.details,
      });

      res.status(StatusCode.BAD_REQUEST).json({ error: validationError });
      break;
    }

    case err instanceof Prisma.PrismaClientKnownRequestError: {
      let errorMessage;

      if (err.code === "P2002") {
        errorMessage =
          "Unique constraint violation. Failed to create new entry.";
        res.status(StatusCode.CONFLICT).json({ error: errorMessage });
      } else if (err.code === "P2025") {
        res.status(StatusCode.NOT_FOUND).json({ error: err.message });
      } else {
        res.status(StatusCode.BAD_REQUEST).json({ error: err.message });
      }
      break;
    }

    case err instanceof HttpError: {
      res
        .status(err.status || StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: err.message });
      break;
    }

    case err instanceof Error: {
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: err.message, cause: err.cause });
      break;
    }

    default:
      res
        .status(StatusCode.INTERNAL_SERVER_ERROR)
        .json({ error: "Unknown Error!" });
  }
}

export default errorHandler;
