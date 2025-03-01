import { postSchema, postWithCommentsSchema } from "@/schemas/post.zod";
import createAxiosInstance from "@/lib/axiosInstance";

const api = createAxiosInstance();

export async function createPost(content: string, image = "") {
  return api.post("api/posts", { content, image });
}

export async function getPost(postId: string) {
  const res = await api.get(`api/posts/${postId}`);
  return postWithCommentsSchema.parse(res.data);
}

export async function likePost(postId: string) {
  const res = await api.post(`api/posts/${postId}/like`);
  return postSchema.parse(res.data);
}

export async function retweetPost(postId: string) {
  return api.post(`api/posts/${postId}/retweet`);
}
