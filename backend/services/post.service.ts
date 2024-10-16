import createHttpError from "http-errors";

import prisma from "../prisma/customClient";
import { PostAction, StatusCode } from "../data/enums";

async function createPost(userId: string, content: string, image?: string) {
  return prisma.post.create({
    data: { content, image, author: { connect: { id: userId } } },
  });
}

async function getPost(postId: string) {
  return prisma.post.findUniqueOrThrow({ where: { id: postId } });
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

  if (!post) {
    // Add the like
    await prisma.post.update({
      where: { id: postId },
      data: { likes: { connect: { id: userId } } },
    });
  } else {
    // Remove the like
    await prisma.post.update({
      where: { id: postId },
      data: { likes: { disconnect: { id: userId } } },
    });
  }
}

async function retweetPost(postId: string, userId: string) {
  await throwIfOwnPost(postId, userId, PostAction.RETWEET);

  const repost = await prisma.repost.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  if (!repost) {
    // Retweet the post
    await prisma.post.update({
      where: { id: postId },
      data: {
        retweets: {
          create: { user: { connect: { id: userId } } },
        },
      },
    });
  } else {
    // Undo the retweet
    await prisma.post.update({
      where: { id: postId },
      data: {
        retweets: {
          delete: { userId_postId: { userId, postId } },
        },
      },
    });
  }
}

export { createPost, getPost, updatePost, deletePost, likePost, retweetPost };
