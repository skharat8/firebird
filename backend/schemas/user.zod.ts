import { Types } from "mongoose";
import { z } from "zod";

const createUserSchema = z.object({
  body: z.object({
    username: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().min(6),
    firstName: z.string().trim(),
    lastName: z.string().trim(),
  }),
});

const baseUpdateUserSchema = createUserSchema.shape.body
  .omit({ password: true })
  .extend({
    profileImage: z.string(),
    coverImage: z.string(),
    bio: z.string().trim(),
    currentPassword: z.string().min(6),
    newPassword: z.string().min(6),
  })
  .partial()
  .refine(
    (data) => {
      const missingData =
        // eslint-disable-next-line @typescript-eslint/prefer-nullish-coalescing
        (data.currentPassword && !data.newPassword) ||
        (!data.currentPassword && data.newPassword);

      // Return false to signify validation failure
      return !missingData;
    },
    {
      message: "Please provide both current password and new password",
      path: ["currentPassword", "newPassword"],
    },
  )
  .refine(
    (data) => {
      if (!data.currentPassword && !data.newPassword) return true;
      return !(data.currentPassword === data.newPassword);
    },
    {
      message: "Current password and new password cannot be the same",
      path: ["currentPassword", "newPassword"],
    },
  );

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
type UserUpdate = z.infer<typeof baseUpdateUserSchema>;
type DbUser = z.infer<typeof userDbSchema>;
type SafeDbUser = z.infer<typeof safeDbUserSchema>;

export type { UserSignup, DbUser, SafeDbUser, UserUpdate };
export { createUserSchema, updateUserSchema };
