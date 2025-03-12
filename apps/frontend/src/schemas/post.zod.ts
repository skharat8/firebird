import { z } from "zod";

const postSchema = z.object({
  id: z.string(),
  author: z.object({
    id: z.string(),
    fullName: z.string(),
    username: z.string(),
    profileImage: z
      .string()
      .nullish()
      .transform((x) => x ?? undefined),
  }),
  content: z.string().max(280),
  image: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  likes: z.array(z.object({ id: z.string() })).optional(),
  retweets: z.array(z.object({ userId: z.string() })).optional(),
  _count: z.object({
    likes: z.number(),
    retweets: z.number(),
    comments: z.number(),
  }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});

const postArraySchema = z.array(postSchema);
const postWithCommentsSchema = postSchema.extend({
  comments: postSchema.array(),
});

const postFeedSchema = z.object({
  posts: postArraySchema,
  nextCursor: z.string(),
});

type Post = z.infer<typeof postSchema>;
type PostWithComments = z.infer<typeof postWithCommentsSchema>;

export type { Post, PostWithComments };
export { postSchema, postWithCommentsSchema, postFeedSchema, postArraySchema };
