import express from "express";

import upload from "../config/multer";
import validateResource from "../middleware/validateResource";
import requireUser from "../middleware/requireUser";
import uploadToCloudinary from "../middleware/uploadToCloudinary";
import { createUserSchema, updateUserSchema } from "../schemas/user.zod";
import {
  createUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
  getUserHandler,
  followUserHandler,
  getUserFeedHandler,
} from "../controllers/user.controller";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

router.get("/me", requireUser, getCurrentUserHandler);
router.post(
  "/update",
  requireUser,
  validateResource(updateUserSchema),
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  uploadToCloudinary,
  updateCurrentUserHandler,
);

router.get("/feed", requireUser, getUserFeedHandler);

router.get("/:username", requireUser, getUserHandler);
router.post("/follow/:username", requireUser, followUserHandler);

export default router;
