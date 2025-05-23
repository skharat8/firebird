import type { Request, Response, Handler } from "express";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import { StatusCode } from "../data/enums.js";
import * as UserService from "../services/user.service.js";
import type { DbUser, UserSignup, UserUpdate } from "../schemas/user.zod.js";
import { assertObjectExists } from "../utils/common.utils.js";
import logger from "../utils/logger.js";

const createUserHandler: Handler = asyncHandler(
  async (req: Request<object, object, UserSignup>, res: Response) => {
    const newUser = await UserService.createUser(req.body);
    res.status(StatusCode.CREATED).json(newUser);
  },
);

const getCurrentUserHandler: Handler = asyncHandler(
  (_: Request, res: Response) => {
    res.json(res.locals.user);
  },
);

const updateCurrentUserHandler: Handler = asyncHandler(
  async (req: Request<object, object, UserUpdate>, res: Response) => {
    const { currentPassword, newPassword, ...rest } = req.body;
    const dataToUpdate: Partial<DbUser> = { ...rest };
    assertObjectExists(res.locals.user);

    if (currentPassword && newPassword) {
      // Validate current user password
      await UserService.validateCredentials(
        res.locals.user.email,
        currentPassword,
      );

      dataToUpdate.password = newPassword;
    }

    const updatedUser = await UserService.updateUser(
      res.locals.user.id,
      dataToUpdate,
    );

    res.json(updatedUser);
  },
);

const getUserHandler: Handler = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId, cursor } = req.params;

    if (!userId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "User ID not provided");
    }

    const { user, posts, nextCursor } = await UserService.getUserProfile(
      userId,
      cursor,
    );

    res.json({ user, posts, nextCursor });
  },
);

const followUserHandler: Handler = asyncHandler(
  async (req: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    const { userId } = req.params;
    const currentUser = res.locals.user;

    if (!userId) {
      throw createHttpError(StatusCode.BAD_REQUEST, "User ID not provided");
    }

    if (userId === currentUser.id) {
      throw createHttpError(
        StatusCode.BAD_REQUEST,
        "User can't follow/unfollow themselves",
      );
    }

    await UserService.toggleFollowUser(currentUser.id, userId);

    res.json({ message: "Follow/unfollow request successful" });
  },
);

const getUserFeedHandler: Handler = asyncHandler(
  async (req: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    const { cursor } = req.params;

    const data = await UserService.getUserFeed(res.locals.user.id, cursor);

    res.json(data);
  },
);

const getFollowRecommendations: Handler = asyncHandler(
  async (_: Request, res: Response) => {
    assertObjectExists(res.locals.user);

    const data = await UserService.getFollowRecommendations(res.locals.user.id);
    logger.info(data);

    res.json(data);
  },
);

export {
  createUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
  getUserHandler,
  followUserHandler,
  getUserFeedHandler,
  getFollowRecommendations,
};
