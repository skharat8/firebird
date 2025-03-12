import createHttpError from "http-errors";
import { type Prisma, NotificationType } from "@prisma/client";

import prisma from "../../prisma/customClient.js";
import type { UserSignup, SafeDbUser } from "../schemas/user.zod.js";
import { StatusCode } from "../data/enums.js";
import { createNotification } from "./notification.service.js";
import { fetchNextPage } from "../utils/prisma.utils.js";

async function createUser(userData: UserSignup): Promise<SafeDbUser> {
  return prisma.user.create({ data: userData });
}

async function findUser(query: Prisma.UserWhereInput): Promise<SafeDbUser> {
  return prisma.user.findFirstOrThrow({ where: query });
}

async function getUserProfile(userId: string, cursor?: string) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    include: { _count: { select: { followers: true, following: true } } },
  });

  const filterQuery = {
    OR: [{ authorId: user.id }, { retweets: { some: { userId: user.id } } }],
    parentPost: null,
  };

  // TODO: How to orderby retweet createdAt only for retweets?
  const selectQuery = {
    id: true,
    author: {
      select: {
        id: true,
        fullName: true,
        username: true,
        profileImage: true,
      },
    },
    content: true,
    image: true,
    likes: { where: { id: userId } },
    retweets: {
      where: { userId: userId },
      select: { userId: true, createdAt: true },
    },
    createdAt: true,
    updatedAt: true,
    _count: { select: { likes: true, retweets: true, comments: true } },
  };

  const { posts, nextCursor } = await fetchNextPage({
    cursor,
    filterQuery,
    selectQuery,
    pageSize: 10,
    orderBy: "createdAt",
  });

  return { user, posts, nextCursor };
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

  if (isFollowing) {
    // Unfollow the target user
    await prisma.follow.delete({ where: { followerId_followingId: relation } });
  } else {
    // Follow the target user
    await prisma.follow.create({ data: relation });

    // Create a notification
    await createNotification(
      currentUserId,
      targetUserId,
      NotificationType.FOLLOW,
    );
  }
}

async function getUserFeed(userId: string, cursor?: string) {
  // Get a list of users being followed by the current user
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const currentUser = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { following: { select: { followingId: true } } },
  });

  // Create a feed from following users
  // TODO: include the current user's posts
  const filterQuery = {
    author: {
      is: {
        id: {
          not: userId,
        },
      },
    },
    parentPost: null,
  };

  const selectQuery = {
    id: true,
    author: {
      select: {
        id: true,
        fullName: true,
        username: true,
        profileImage: true,
      },
    },
    content: true,
    image: true,
    likes: { where: { id: userId } },
    retweets: { where: { userId: userId } },
    createdAt: true,
    updatedAt: true,
    _count: { select: { likes: true, retweets: true, comments: true } },
  };

  return fetchNextPage({
    cursor,
    filterQuery,
    selectQuery,
    pageSize: 10,
    orderBy: "id",
  });
}

export {
  createUser,
  findUser,
  getUserProfile,
  updateUser,
  validateCredentials,
  toggleFollowUser,
  getUserFeed,
};
