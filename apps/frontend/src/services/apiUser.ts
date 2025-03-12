import { userAndPostSchema, userSchema } from "@/schemas/auth.zod";
import { postFeedSchema } from "@/schemas/post.zod";
import createAxiosInstance from "@/lib/axiosInstance";

const api = createAxiosInstance();

export async function getCurrentUser() {
  const res = await api.get("api/users/me");
  return userSchema.parse(res.data);
}

export async function getUser(userId: string) {
  const res = await api.get(`api/users/${userId}`);
  return userAndPostSchema.parse(res.data);
}

export async function getUserFeed(cursor?: string) {
  const res = await api.get(`api/users/feed/${cursor}`);
  return postFeedSchema.parse(res.data);
}
