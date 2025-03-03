import type { Request, Response, Handler } from "express";
import asyncHandler from "express-async-handler";

import type { CreatePost, UpdatePost } from "../schemas/post.zod.js";
import * as PostService from "../services/post.service.js";
import { StatusCode } from "../data/enums.js";
import { assertObjectExists } from "../utils/common.utils.js";
import createHttpError from "http-errors";

const createPostHandler: Handler = asyncHandler(
  async (req: Request<object, object, CreatePost>, res: Response) => {
    assertObjectExists(res.locals.user);
    const { content, image } = req.body;
    const userId = res.locals.user.id;

    const post = await PostService.createPost(userId, content, image);
    res.status(StatusCode.CREATED).json(post);
  },
);

const getPostHandler: Handler = asyncHandler(
  async (req: Request, res: Response) => {
    const { postId } = req.params;
    const { user } = res.locals;
    assertObjectExists(user);

    if (!postId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "Post ID not provided");
    }

    const post = await PostService.getPost(postId, user.id);
    res.json(post);
  },
);

const updatePostHandler: Handler = asyncHandler(
  async (
    req: Request<UpdatePost["params"], object, UpdatePost["body"]>,
    res: Response,
  ) => {
    const { content, image } = req.body;
    const { postId } = req.params;

    if (!postId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "Post ID not provided");
    }

    const post = await PostService.updatePost(postId, content, image);
    res.json(post);
  },
);

const deletePostHandler: Handler = asyncHandler(
  async (req: Request, res: Response) => {
    const { postId } = req.params;

    if (!postId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "Post ID not provided");
    }

    await PostService.deletePost(postId);
    res.json({ message: "Post deleted" });
  },
);

const likePostHandler: Handler = asyncHandler(
  async (req: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    const userId = res.locals.user.id;
    const { postId } = req.params;

    if (!postId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "Post ID not provided");
    }

    const updatedPost = await PostService.likePost(postId, userId);
    res.status(StatusCode.OK).json(updatedPost);
  },
);

const retweetPostHandler: Handler = asyncHandler(
  async (req: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    const userId = res.locals.user.id;
    const { postId } = req.params;

    if (!postId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "Post ID not provided");
    }

    const updatedPost = await PostService.retweetPost(postId, userId);
    res.status(StatusCode.OK).json(updatedPost);
  },
);

const getLikedPostsHandler: Handler = asyncHandler(
  async (_: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    const userId = res.locals.user.id;

    const posts = await PostService.getLikedPosts(userId);
    res.json(posts);
  },
);

const createCommentHandler: Handler = asyncHandler(
  async (
    req: Request<UpdatePost["params"], object, UpdatePost["body"]>,
    res: Response,
  ) => {
    assertObjectExists(res.locals.user);
    const { content, image } = req.body;
    const userId = res.locals.user.id;
    const { postId } = req.params;

    if (!postId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "Post ID not provided");
    }

    const posts = await PostService.createComment(
      postId,
      userId,
      content,
      image,
    );

    res.json(posts);
  },
);

export {
  createPostHandler,
  getPostHandler,
  updatePostHandler,
  deletePostHandler,
  likePostHandler,
  retweetPostHandler,
  getLikedPostsHandler,
  createCommentHandler,
};
