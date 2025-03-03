import express from "express";

import validateResource from "../middleware/validateResource.js";
import { createSessionSchema } from "../schemas/session.zod.js";
import requireUser from "../middleware/requireUser.js";
import {
  createSessionHandler,
  deleteSessionHandler,
  getSessionsHandler,
} from "../controllers/session.controller.js";

const router = express.Router();

router.post(
  "/login",
  validateResource(createSessionSchema),
  createSessionHandler,
);

router.get("/", requireUser, getSessionsHandler);
router.delete("/logout", requireUser, deleteSessionHandler);

export default router;
