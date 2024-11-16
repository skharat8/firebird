import { userSchema } from "@/schemas/auth.zod";
import { postArraySchema } from "@/schemas/post.zod";
import createAxiosInstance from "@/lib/axiosInstance";

const api = createAxiosInstance();

export async function getCurrentUser() {
  const res = await api.get("api/users/me");
  return userSchema.parse(res.data);
}

export async function getUser(userId: string) {
  const res = await api.get(`api/users/:${userId}`);
  return userSchema.parse(res.data);
}

export async function getUserFeed() {
  const res = await api.get("api/users/feed");
  return postArraySchema.parse(res.data);
}
