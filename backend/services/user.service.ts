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

async function getUserProfile(username: string) {
  const user = await prisma.user.findFirstOrThrow({
    where: {
      username,
    },
    include: { _count: { select: { followers: true, following: true } } },
  });

  const allPosts = await prisma.post.findMany({
    where: {
      OR: [{ authorId: user.id }, { retweets: { some: { userId: user.id } } }],
    },
    select: {
      id: true,
      author: {
        select: { fullName: true, username: true, profileImage: true },
      },
      content: true,
      image: true,
      createdAt: true,
      retweets: { select: { createdAt: true } },
      _count: { select: { likes: true, retweets: true, comments: true } },
    },
    orderBy: { createdAt: "desc" },
    take: 10,
  });

  // If the post was a retweet, then replace createdAt with the time the retweet
  // was created. This is so that the posts can be sorted on user's profile.
  const posts = allPosts.map((post) => {
    if (post.retweets.length > 0)
      return { ...post, createdAt: post.retweets[0].createdAt, retweets: true };
    return { ...post, retweets: false };
  });

  posts.sort((a, b) => b.createdAt.valueOf() - a.createdAt.valueOf());

  return { user, posts };
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

async function getUserFeed(userId: string) {
  // Get a list of users being followed by the current user
  const currentUser = await prisma.user.findUniqueOrThrow({
    where: { id: userId },
    select: { following: { select: { followingId: true } } },
  });

  // Create a feed from following users and the current user's posts.
  const feed = await prisma.post.findMany({
    where: {
      authorId: {
        in: [...currentUser.following.map((user) => user.followingId), userId],
      },
    },
    select: {
      id: true,
      author: {
        select: { fullName: true, username: true, profileImage: true },
      },
      content: true,
      image: true,
      createdAt: true,
      _count: { select: { likes: true, retweets: true, comments: true } },
    },
    take: 10,
  });

  return feed;
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
