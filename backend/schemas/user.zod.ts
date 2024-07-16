import { Types } from "mongoose";
import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    firstName: z.string(),
    lastName: z.string(),
  }),
});

const baseUpdateUserSchema = createUserSchema.shape.body
  .extend({
    profileImage: z.string().optional(),
    coverImage: z.string().optional(),
    bio: z.string().optional(),
  })
  .partial();

const updateUserSchema = z.object({ body: baseUpdateUserSchema });

const userSignupSchema = createUserSchema.shape.body;

// Interface for document stored in the database
const userDbSchema = userSignupSchema.extend({
  id: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  isValidPassword: z
    .function()
    .args(z.string())
    .returns(z.promise(z.boolean())),
  name: z.string(),
  profileImage: z.string().optional(),
  coverImage: z.string().optional(),
  bio: z.string().optional(),
  followers: z.array(z.instanceof(Types.ObjectId)),
  following: z.array(z.instanceof(Types.ObjectId)),
});

const safeDbUserSchema = userDbSchema.omit({ password: true });

type UserSignup = z.infer<typeof userSignupSchema>;
type UserUpdate = z.infer<typeof updateUserSchema>;
type DbUser = z.infer<typeof userDbSchema>;
type SafeDbUser = z.infer<typeof safeDbUserSchema>;

export type { UserSignup, DbUser, SafeDbUser, UserUpdate };
export { createUserSchema, updateUserSchema };
