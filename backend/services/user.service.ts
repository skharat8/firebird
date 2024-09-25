import createHttpError from "http-errors";
import { type Prisma, NotificationType } from "@prisma/client";

import prisma from "../prisma/customClient";
import type { UserSignup, SafeDbUser } from "../schemas/user.zod";
import { StatusCode } from "../data/enums";
import { createNotification } from "./notification.service";

async function createUser(userData: UserSignup): Promise<SafeDbUser> {
  return prisma.user.create({ data: userData });
}

async function findUser(query: Prisma.UserWhereInput): Promise<SafeDbUser> {
  return prisma.user.findFirstOrThrow({ where: query });
}

async function findUserWithFollows(query: Prisma.UserWhereInput) {
  return prisma.user.findFirstOrThrow({
    where: query,
    include: { followers: true, following: true },
  });
}

async function updateUser(id: string, updateData: Prisma.UserUpdateInput) {
  return prisma.user.update({ where: { id }, data: updateData });
}

async function validateCredentials(
  email: string,
  password: string,
): Promise<SafeDbUser> {
  const errorMessage = "Invalid username or password";
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw createHttpError(StatusCode.UNAUTHORIZED, errorMessage);

  const isValid = await user.isValidPassword(password);
  if (!isValid) throw createHttpError(StatusCode.UNAUTHORIZED, errorMessage);

  return user;
}

async function toggleFollowUser(currentUserId: string, targetUserId: string) {
  const relation = {
    followerId: currentUserId,
    followingId: targetUserId,
  };

  // Check if the current user is already following the target user.
  const isFollowing = await prisma.follow.findFirst({ where: relation });
  // currentUser.following.includes();

  if (isFollowing) {
    // Unfollow the target user
    await prisma.follow.delete({ where: { followerId_followingId: relation } });
  } else {
    // Follow the target user
    await prisma.follow.create({ data: relation });

    // Create a notification
    await createNotification({
      from: { connect: { id: currentUserId } },
      to: { connect: { id: targetUserId } },
      type: NotificationType.FOLLOW,
    });
  }
}

export {
  createUser,
  findUser,
  findUserWithFollows,
  updateUser,
  validateCredentials,
  toggleFollowUser,
};
