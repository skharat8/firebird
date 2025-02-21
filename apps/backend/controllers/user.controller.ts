import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import { StatusCode } from "../data/enums";
import * as UserService from "../services/user.service";
import type { DbUser, UserSignup, UserUpdate } from "../schemas/user.zod";
import { assertObjectExists } from "../utils/common.utils";

const createUserHandler = asyncHandler(
  async (req: Request<object, object, UserSignup>, res: Response) => {
    const newUser = await UserService.createUser(req.body);
    res.status(StatusCode.CREATED).json(newUser);
  },
);

const getCurrentUserHandler = asyncHandler((_: Request, res: Response) => {
  res.json(res.locals.user);
});

const updateCurrentUserHandler = asyncHandler(
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

const getUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const { userId } = req.params;
  const { user, posts } = await UserService.getUserProfile(userId);

  res.json({ user, posts });
});

const followUserHandler = asyncHandler(async (req: Request, res: Response) => {
  assertObjectExists(res.locals.user);
  const { targetUserId } = req.params;
  const currentUser = res.locals.user;

  if (targetUserId === currentUser.id) {
    throw createHttpError(
      StatusCode.BAD_REQUEST,
      "User can't follow/unfollow themselves",
    );
  }

  await UserService.toggleFollowUser(currentUser.id, targetUserId);

  res.json({ message: "Follow/unfollow request successful" });
});

const getUserFeedHandler = asyncHandler(async (_: Request, res: Response) => {
  assertObjectExists(res.locals.user);
  const feed = await UserService.getUserFeed(res.locals.user.id);

  res.json(feed);
});

export {
  createUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
  getUserHandler,
  followUserHandler,
  getUserFeedHandler,
};
