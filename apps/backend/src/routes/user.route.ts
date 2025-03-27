import express from "express";

import upload from "../config/multer.js";
import validateResource from "../middleware/validateResource.js";
import requireUser from "../middleware/requireUser.js";
import uploadToCloudinary from "../middleware/uploadToCloudinary.js";
import { createUserSchema, updateUserSchema } from "../schemas/user.zod.js";
import {
  createUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
  getUserHandler,
  followUserHandler,
  getUserFeedHandler,
  getFollowRecommendations,
} from "../controllers/user.controller.js";
import { fetchPostFeedSchema } from "../schemas/post.zod.js";

const router = express.Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

router.get("/me", requireUser, getCurrentUserHandler);
router.get("/followRecommendations", requireUser, getFollowRecommendations);

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

router.get(
  "/feed/:cursor",
  requireUser,
  validateResource(fetchPostFeedSchema),
  getUserFeedHandler,
);

router.get("/:userId", requireUser, getUserHandler);
router.get("/:userId/:cursor", requireUser, getUserHandler);
router.post("/follow/:userId", requireUser, followUserHandler);

export default router;
