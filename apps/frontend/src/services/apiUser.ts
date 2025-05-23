import { z } from "zod";

import createAxiosInstance from "@/lib/axiosInstance";
import { userSchema } from "@/schemas/auth.zod";
import { postFeedSchema, userAndPostFeedSchema } from "@/schemas/post.zod";

const api = createAxiosInstance();

export async function getCurrentUser() {
  const res = await api.get("api/users/me");
  return userSchema.parse(res.data);
}

export async function getUser(userId: string, cursor?: string) {
  const url = cursor ? `api/users/${userId}/${cursor}` : `api/users/${userId}`;
  const res = await api.get(url);
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

export async function followUser(userId: string) {
  await api.post(`api/users/follow/${userId}`);
}

export async function getFollowRecommendations() {
  const res = await api.get("api/users/followRecommendations");
  const schema = z.array(
    z.object({
      id: z.string(),
      fullName: z.string(),
      profileImage: z.string(),
    }),
  );

  return schema.parse(res.data);
}
