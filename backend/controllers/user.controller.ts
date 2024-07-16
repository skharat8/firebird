import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import createHttpError from "http-errors";

import { StatusCode } from "../data/enums";
import * as UserService from "../services/user.service";
import type { DbUser, UserSignup, UserUpdate } from "../schemas/user.zod";

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

    if (currentPassword && newPassword) {
      // Validate current user password
      await UserService.validateCredentials(
        res.locals.user!.email,
        currentPassword,
      );

      dataToUpdate.password = newPassword;
    }

    const updatedUser = await UserService.findByIdAndUpdateUser(
      res.locals.user!.id,
      dataToUpdate,
    );

    res.json(updatedUser);
  },
);

const getUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;
  const user = await UserService.findUser({ username });

  res.json(user);
});

const followUserHandler = asyncHandler(async (req: Request, res: Response) => {
  const { username } = req.params;
  const currentUser = res.locals.user!;

  if (username === currentUser.username) {
    throw createHttpError(
      StatusCode.BAD_REQUEST,
      "User can't follow/unfollow themselves",
    );
  }

  const targetUser = await UserService.findUser({ username });
  await UserService.toggleFollowUser(currentUser, targetUser);

  res.json("Follow/unfollow request successful");
});

export {
  createUserHandler,
  getCurrentUserHandler,
  updateCurrentUserHandler,
  getUserHandler,
  followUserHandler,
};
