import express from "express";

import requireUser from "../middleware/requireUser.js";
import validateResource from "../middleware/validateResource.js";
import { createPostSchema, updatePostSchema } from "../schemas/post.zod.js";
import {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  likePostHandler,
  retweetPostHandler,
  getLikedPostsHandler,
  createCommentHandler,
} from "../controllers/post.controller.js";

const router = express.Router();

router.get("/likes", requireUser, getLikedPostsHandler);

router.post(
  "/",
  requireUser,
  validateResource(createPostSchema),
  createPostHandler,
);
router.put(
  "/:postId",
  requireUser,
  validateResource(updatePostSchema),
  updatePostHandler,
);
router.get("/:postId", requireUser, getPostHandler);
router.delete("/:postId", requireUser, deletePostHandler);

router.patch("/:postId/like", requireUser, likePostHandler);
router.patch("/:postId/retweet", requireUser, retweetPostHandler);

router.post(
  "/:postId/comments",
  requireUser,
  validateResource(updatePostSchema),
  createCommentHandler,
);

export default router;
