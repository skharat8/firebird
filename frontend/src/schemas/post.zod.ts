import { z } from "zod";

const postSchema = z.object({
  id: z.string(),
  author: z.object({
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
  _count: z.object({
    likes: z.number(),
    retweets: z.number(),
    comments: z.number(),
  }),
});

const postArraySchema = z.array(postSchema);
const postWithCommentsSchema = postSchema.extend({ comments: postSchema });

type Post = z.infer<typeof postSchema>;

export type { Post };
export { postSchema, postArraySchema, postWithCommentsSchema };
