import createHttpError from "http-errors";
import { type Prisma, NotificationType } from "@prisma/client";

import prisma from "../../prisma/customClient.js";
import type {
  UserSignup,
  SafeDbUser,
  DbUserWithFollows,
} from "../schemas/user.zod.js";
import { StatusCode } from "../data/enums.js";
import { createNotification } from "./notification.service.js";
import { fetchNextPage } from "../utils/prisma.utils.js";

async function createUser(userData: UserSignup): Promise<SafeDbUser> {
  return prisma.user.create({ data: userData });
}

async function findUser(
  query: Prisma.UserWhereInput,
): Promise<DbUserWithFollows> {
  return prisma.user.findFirstOrThrow({
    where: query,
    include: {
      followers: true,
      following: true,
      _count: { select: { followers: true, following: true } },
    },
  });
}

async function getUserProfile(userId: string, cursor?: string) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      id: userId,
    },
    include: {
      followers: true,
      following: true,
      _count: { select: { followers: true, following: true } },
    },
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
): Promise<DbUserWithFollows> {
  const errorMessage = "Invalid username or password";
  const user = await prisma.user.findUnique({
    where: { email },
    include: {
      followers: true,
      following: true,
      _count: { select: { followers: true, following: true } },
    },
  });
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
  const followingObjects = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { following: { select: { followingId: true } } },
  });

  const followingIds = followingObjects.following.map(
    (item) => item.followingId,
  );

  const notFollowingObjects = await prisma.user.findMany({
    where: { id: { notIn: followingIds } },
    take: 10,
  });

  const notFollowingIds = notFollowingObjects.map((item) => item.id);

  // Create a feed from current user + following users + 10 not following users
  const filterQuery = {
    author: {
      is: {
        id: {
          in: [userId, ...followingIds, ...notFollowingIds],
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

async function getFollowRecommendations(currentUserId: string) {
  const followingObjects = await prisma.user.findUniqueOrThrow({
    where: { id: currentUserId },
    select: { following: { select: { followingId: true } } },
  });

  const followingIds = followingObjects.following.map(
    (item) => item.followingId,
  );

  const notFollowingObjects = await prisma.user.findMany({
    where: {
      AND: [{ id: { notIn: followingIds } }, { id: { not: currentUserId } }],
    },
    take: 10,
  });

  return notFollowingObjects.map((item) => ({
    id: item.id,
    fullName: item.fullName,
    profileImage: item.profileImage,
  }));
}

export {
  createUser,
  findUser,
  getUserProfile,
  updateUser,
  validateCredentials,
  toggleFollowUser,
  getUserFeed,
  getFollowRecommendations,
};
