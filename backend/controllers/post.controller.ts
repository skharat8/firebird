import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

const createPostHandler = asyncHandler(async (req: Request, res: Response) => {
  console.log("create post");
});

const deletePostHandler = asyncHandler(async (req: Request, res: Response) => {
  console.log("delete post");
});

export { createPostHandler, deletePostHandler };
