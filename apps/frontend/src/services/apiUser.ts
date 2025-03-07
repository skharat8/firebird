import { userAndPostSchema, userSchema } from "@/schemas/auth.zod";
import { postArraySchema } from "@/schemas/post.zod";
import createAxiosInstance from "@/lib/axiosInstance";
import { getCookie } from "@/utils/common.utils";

const api = createAxiosInstance();

export async function getCurrentUser() {
  const isAuthenticated = getCookie("isAuthenticated") === "true";
  if (!isAuthenticated) throw Error("User is not authenticated");

  const res = await api.get("api/users/me");
  return userSchema.parse(res.data);
}

export async function getUser(userId: string) {
  const res = await api.get(`api/users/${userId}`);
  return userAndPostSchema.parse(res.data);
}

export async function getUserFeed() {
  const res = await api.get("api/users/feed");
  return postArraySchema.parse(res.data);
}
