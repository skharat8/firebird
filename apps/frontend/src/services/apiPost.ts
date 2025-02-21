import { postWithCommentsSchema } from "@/schemas/post.zod";
import createAxiosInstance from "@/lib/axiosInstance";

const api = createAxiosInstance();

export async function createPost(content: string, image = "") {
  return api.post("api/posts", { content, image });
}

export async function getPost(postId: string) {
  const res = await api.get(`api/posts/${postId}`);
  return postWithCommentsSchema.parse(res.data);
}
