import type { Request, Response, NextFunction } from "express";
import type { AnyZodObject } from "zod";

const validateResource =
  (schema: AnyZodObject) => (req: Request, _: Response, next: NextFunction) => {
    try {
      schema.parse({
        // This validates request, so "any" type is acceptable.
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        body: req.body,
        query: req.query,
        params: req.params,
      });
      next();
    } catch (err) {
      next(err);
    }
  };

export default validateResource;
