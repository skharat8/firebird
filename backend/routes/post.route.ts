import express from "express";

import requireUser from "../middleware/requireUser";
import {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  likePostHandler,
  retweetPostHandler,
  getLikedPostsHandler,
} from "../controllers/post.controller";

const router = express.Router();

router.get("/likes", requireUser, getLikedPostsHandler);

router.post("/", requireUser, createPostHandler);
router.get("/:postId", requireUser, getPostHandler);
router.put("/:postId", requireUser, updatePostHandler);
router.delete("/:postId", requireUser, deletePostHandler);

router.post("/:postId/like", requireUser, likePostHandler);
router.post("/:postId/retweet", requireUser, retweetPostHandler);

// router.post("/:postId/comments", requireUser, createCommentHandler);
// router.get("/:postId/comments/:commentId", requireUser, getCommentHandler);
// router.put("/:postId/comments/:commentId", requireUser, updateCommentHandler);
// router.delete("/:postId/comments/:commentId", requireUser, deleteCommentHandler);

export default router;
