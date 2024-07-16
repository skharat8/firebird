import express from "express";

import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import { createUserSchema, updateUserSchema } from "../schemas/user.zod";
import {
  createUserHandler,
  updateCurrentUserHandler,
  getCurrentUserHandler,
  getUserHandler,
  followUserHandler,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

router.get("/me", requireUser, getCurrentUserHandler);
router.post(
  "/update",
  requireUser,
  validateResource(updateUserSchema),
  updateCurrentUserHandler,
);

router.get("/:username", requireUser, getUserHandler);
router.post("/follow/:username", requireUser, followUserHandler);

export default router;
