import express from "express";

import requireUser from "../middleware/requireUser";
import validateResource from "../middleware/validateResource";
import { createPostSchema, updatePostSchema } from "../schemas/post.zod";
import {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  likePostHandler,
  retweetPostHandler,
  getLikedPostsHandler,
  createCommentHandler,
} from "../controllers/post.controller";

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

router.post("/:postId/like", requireUser, likePostHandler);
router.post("/:postId/retweet", requireUser, retweetPostHandler);

router.post(
  "/:postId/comments",
  requireUser,
  validateResource(updatePostSchema),
  createCommentHandler,
);

export default router;
