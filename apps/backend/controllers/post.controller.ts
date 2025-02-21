import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import type { CreatePost, UpdatePost } from "../schemas/post.zod";
import * as PostService from "../services/post.service";
import { StatusCode } from "../data/enums";
import { assertObjectExists } from "../utils/common.utils";

const createPostHandler = asyncHandler(
  async (req: Request<object, object, CreatePost>, res: Response) => {
    assertObjectExists(res.locals.user);
    const { content, image } = req.body;
    const userId = res.locals.user.id;

    const post = await PostService.createPost(userId, content, image);
    res.status(StatusCode.CREATED).json(post);
  },
);

const getPostHandler = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;
  const post = await PostService.getPost(postId);
  res.json(post);
});

const updatePostHandler = asyncHandler(
  async (
    req: Request<UpdatePost["params"], object, UpdatePost["body"]>,
    res: Response,
  ) => {
    const { content, image } = req.body;
    const { postId } = req.params;

    const post = await PostService.updatePost(postId, content, image);
    res.json(post);
  },
);

const deletePostHandler = asyncHandler(async (req: Request, res: Response) => {
  const { postId } = req.params;

  await PostService.deletePost(postId);
  res.json({ message: "Post deleted" });
});

const likePostHandler = asyncHandler(async (req: Request, res: Response) => {
  assertObjectExists(res.locals.user);
  const userId = res.locals.user.id;
  const { postId } = req.params;

  await PostService.likePost(postId, userId);
  res.status(StatusCode.OK).end();
});

const retweetPostHandler = asyncHandler(async (req: Request, res: Response) => {
  assertObjectExists(res.locals.user);
  const userId = res.locals.user.id;
  const { postId } = req.params;

  await PostService.retweetPost(postId, userId);
  res.status(StatusCode.OK).end();
});

const getLikedPostsHandler = asyncHandler(async (_: Request, res: Response) => {
  assertObjectExists(res.locals.user);
  const userId = res.locals.user.id;

  const posts = await PostService.getLikedPosts(userId);
  res.json(posts);
});

const createCommentHandler = asyncHandler(
  async (
    req: Request<UpdatePost["params"], object, UpdatePost["body"]>,
    res: Response,
  ) => {
    assertObjectExists(res.locals.user);
    const { content, image } = req.body;
    const userId = res.locals.user.id;
    const { postId } = req.params;

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
