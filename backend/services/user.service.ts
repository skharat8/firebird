import { type FilterQuery, type UpdateQuery } from "mongoose";
import createHttpError from "http-errors";
import util from "node:util";
import UserModel from "../models/user.model";
import type { UserSignup, SafeDbUser, DbUser } from "../schemas/user.zod";
import { NotificationType, StatusCode } from "../data/enums";
import logger from "../utils/logger";
import { createNotification } from "./notification.service";
import { getHashedPassword } from "../utils/auth.utils";

async function createUser(userData: UserSignup): Promise<SafeDbUser> {
  const user = await UserModel.create(userData);
  return user.toJSON();
}

async function validateCredentials(
  email: string,
  password: string,
): Promise<SafeDbUser> {
  const errorMessage = "Invalid username or password";
  const user = await UserModel.findOne({ email });
  if (!user) throw createHttpError(StatusCode.UNAUTHORIZED, errorMessage);

  const isValid = await user.isValidPassword(password);
  if (!isValid) throw createHttpError(StatusCode.UNAUTHORIZED, errorMessage);

  return user.toJSON();
}

async function findUser(query: FilterQuery<SafeDbUser>): Promise<SafeDbUser> {
  const user = await UserModel.findOne(query);

  if (!user) {
    const errorMessage = `User ${util.inspect(query)} not found`;
    throw createHttpError(StatusCode.NOT_FOUND, errorMessage);
  }

  return user.toJSON();
}

async function findByIdAndUpdateUser(
  id: string,
  updateData: Partial<DbUser>,
): Promise<SafeDbUser> {
  if (updateData.password) {
    updateData.password = await getHashedPassword(updateData.password);
  }

  const user = await UserModel.findByIdAndUpdate(id, updateData, { new: true });

  if (!user) {
    throw createHttpError(StatusCode.NOT_FOUND, "Updating user data failed");
  }

  return user.toJSON();
}

async function updateUserById(id: string, update: UpdateQuery<SafeDbUser>) {
  const res = await UserModel.updateOne({ _id: id }, update);

  if (res.modifiedCount === 0) {
    logger.warn(
      `No item was modified by updateOne call with query ${util.inspect(update)}`,
    );
  }
}

async function toggleFollowUser(
  currentUser: SafeDbUser,
  targetUser: SafeDbUser,
) {
  // Check if the current user is already following the target user.
  const isFollowing = currentUser.following
    .map((userId) => userId.toString())
    .includes(targetUser.id);

  if (isFollowing) {
    // Unfollow the target user
    await updateUserById(currentUser.id, {
      $pull: { following: targetUser.id },
    });
    await updateUserById(targetUser.id, {
      $pull: { followers: currentUser.id },
    });
  } else {
    // Follow the target user
    await updateUserById(currentUser.id, {
      $addToSet: { following: targetUser.id },
    });
    await updateUserById(targetUser.id, {
      $addToSet: { followers: currentUser.id },
    });

    // Create a notification
    await createNotification({
      from: currentUser.id,
      to: targetUser.id,
      type: NotificationType.FOLLOW,
    });
  }
}

export {
  createUser,
  validateCredentials,
  findUser,
  findByIdAndUpdateUser,
  updateUserById,
  toggleFollowUser,
};
