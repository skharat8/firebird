import { z } from "zod";
import { userSchema } from "@/schemas/auth.zod";
import { postFeedSchema, userAndPostFeedSchema } from "@/schemas/post.zod";
import createAxiosInstance from "@/lib/axiosInstance";

const api = createAxiosInstance();

export async function getCurrentUser() {
  const res = await api.get("api/users/me");
  return userSchema.parse(res.data);
}

export async function getUser(userId: string, cursor?: string) {
  const res = await api.get(`api/users/${userId}/${cursor}`);
  return userAndPostFeedSchema.parse(res.data);
}

export async function getHomeFeed(cursor?: string) {
  const res = await api.get(`api/users/feed/${cursor}`);
  return postFeedSchema.parse(res.data);
}

export async function getPlaceholderImage(format: string) {
  const res = await api.get(`https://placehold.co/${format}`);

  const schema = z.string();
  return schema.parse(res.data);
}
