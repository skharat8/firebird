import prisma from "../prisma/customClient";

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

export { createPost, getPost, updatePost, deletePost };
