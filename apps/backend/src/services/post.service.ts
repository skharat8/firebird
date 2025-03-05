import createHttpError from "http-errors";
import { NotificationType } from "@prisma/client";

import prisma from "../../prisma/customClient.js";
import { PostAction, StatusCode } from "../data/enums.js";
import { createNotification } from "./notification.service.js";

async function createPost(userId: string, content: string, image?: string) {
  return prisma.post.create({
    data: { content, image, author: { connect: { id: userId } } },
    include: { author: true },
  });
}

async function getPost(postId: string, currentUserId: string) {
  const counters = { likes: true, retweets: true, comments: true };

  const authorInfo = {
    id: true,
    fullName: true,
    username: true,
    profileImage: true,
  };
  const postInfo = {
    id: true,
    content: true,
    image: true,
    createdAt: true,
    updatedAt: true,
  };
  const commentInfo = {
    ...postInfo,
    author: { select: authorInfo },
    _count: { select: counters },
  };

  return prisma.post.findUniqueOrThrow({
    where: { id: postId },
    select: {
      ...postInfo,
      likes: { where: { id: currentUserId } },
      retweets: { where: { userId: currentUserId } },
      author: { select: authorInfo },
      comments: { select: commentInfo },
      _count: { select: counters },
    },
  });
}

async function updatePost(postId: string, content: string, image?: string) {
  return prisma.post.update({
    where: { id: postId },
    data: { content, image },
  });
}

async function deletePost(postId: string) {
  return prisma.post.delete({ where: { id: postId } });
}

async function throwIfOwnPost(
  postId: string,
  userId: string,
  action: PostAction,
) {
  const ownPost = await prisma.post.findUnique({
    where: { id: postId, authorId: userId },
  });

  if (ownPost) {
    const actionText = action === PostAction.LIKE ? "like" : "retweet";
    const msg = `User can't ${actionText} their own post`;
    throw createHttpError(StatusCode.BAD_REQUEST, msg);
  }
}

async function likePost(postId: string, userId: string) {
  await throwIfOwnPost(postId, userId, PostAction.LIKE);

  const post = await prisma.post.findUnique({
    where: { id: postId, likes: { some: { id: userId } } },
  });

  let updatedPost;

  if (!post) {
    // Add the like
    updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likes: { connect: { id: userId } } },
      include: { author: true, _count: true },
    });

    // Create a notification
    await createNotification(
      userId,
      updatedPost.authorId,
      NotificationType.LIKE,
    );
  } else {
    // Remove the like
    updatedPost = await prisma.post.update({
      where: { id: postId },
      data: { likes: { disconnect: { id: userId } } },
      include: { author: true, _count: true },
    });
  }

  return updatedPost;
}

async function retweetPost(postId: string, userId: string) {
  await throwIfOwnPost(postId, userId, PostAction.RETWEET);

  const repost = await prisma.repost.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  let updatedPost;

  if (!repost) {
    // Retweet the post
    updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        retweets: {
          create: { user: { connect: { id: userId } } },
        },
      },
      include: { author: true, _count: true },
    });

    // Create a notification
    await createNotification(
      userId,
      updatedPost.authorId,
      NotificationType.RETWEET,
    );
  } else {
    // Undo the retweet
    updatedPost = await prisma.post.update({
      where: { id: postId },
      data: {
        retweets: {
          delete: { userId_postId: { userId, postId } },
        },
      },
      include: { author: true, _count: true },
    });
  }

  return updatedPost;
}

async function getLikedPosts(userId: string) {
  return prisma.post.findMany({
    where: {
      likes: { some: { id: userId } },
    },
  });
}

async function createComment(
  postId: string,
  userId: string,
  content: string,
  image?: string,
) {
  return prisma.post.update({
    where: { id: postId },
    data: {
      comments: {
        create: { content, image, author: { connect: { id: userId } } },
      },
    },
  });
}

export {
  createPost,
  getPost,
  updatePost,
  deletePost,
  likePost,
  retweetPost,
  getLikedPosts,
  createComment,
};
