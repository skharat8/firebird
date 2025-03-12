import { z } from "zod";

const createPostSchema = z.object({
  body: z.object({
    content: z.string().trim().max(280),
    image: z.string().optional(),
  }),
});

const updatePostSchema = createPostSchema.extend({
  params: z.object({ postId: z.string().optional() }),
});

const fetchPostFeedSchema = z.object({
  params: z.object({ cursor: z.string() }),
});

type CreatePost = z.infer<typeof createPostSchema.shape.body>;
type UpdatePost = z.infer<typeof updatePostSchema>;

export { createPostSchema, updatePostSchema, fetchPostFeedSchema };
export type { CreatePost, UpdatePost };
