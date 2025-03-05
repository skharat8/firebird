import path from "path";
import { fileURLToPath } from "url";
import express from "express";
import cors from "cors";
import { pinoHttp } from "pino-http";
import cookieParser from "cookie-parser";
import createHttpError from "http-errors";

import "./config/env.js";
import "./config/cloudinary.js";
import logger from "./utils/logger.js";
import { StatusCode } from "./data/enums.js";
import userRoutes from "./routes/user.route.js";
import sessionRoutes from "./routes/session.route.js";
import postRoutes from "./routes/post.route.js";
import notificationRoutes from "./routes/notification.route.js";
import errorHandler from "./middleware/errorHandler.js";
import deserializeUser from "./middleware/deserializeUser.js";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

function createServer() {
  const app = express();

  /* ---------------------- */
  /* Third Party Middleware */
  /* ---------------------- */

  // HTTP logger. Log to console using req.log.info()
  app.use(pinoHttp({ logger }));

  // Enable cross-origin requests. This is needed because client and server
  // are located on different ports. A URL's origin is defined by combination
  // of protocol (http), hostname (example.com), and port (3000).
  app.use(cors({ origin: process.env.CLIENT_ORIGIN, credentials: true }));

  // Parse incoming JSON requests (application/json) into req.body
  app.use(express.json());

  // Parse requests (application/x-www-form-urlencoded) with URL-encoded payload.
  // Example: /urlencoded?firstname=xx&lastname=yy for POST & PUT requests.
  app.use(express.urlencoded({ extended: false }));

  // Parse cookie header and populate req.cookies
  app.use(cookieParser());

  // Serves static assets such as HTML files, CSS files, images
  app.use(express.static(path.join(dirname, "public")));

  /* ---------------------- */
  /*  App Level Middleware  */
  /* ---------------------- */
  app.use(deserializeUser);

  app.use("/api/users", userRoutes);
  app.use("/api/sessions", sessionRoutes);
  app.use("/api/posts", postRoutes);
  app.use("/api/notifications", notificationRoutes);

  /* --------------------------- */
  /*  Error Handling Middleware  */
  /* --------------------------- */

  // Catch requests to unknown routes.
  app.use((_, __, next) => next(createHttpError(StatusCode.NOT_FOUND)));

  // Catch all errors.
  app.use(errorHandler);

  return app;
}

export default createServer;
