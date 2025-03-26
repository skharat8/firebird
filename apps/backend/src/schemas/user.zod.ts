import { z } from "zod";
import type { Prisma } from "@prisma/client";

const createUserSchema = z.object({
  body: z.object({
    username: z.string().trim(),
    email: z.string().trim().email(),
    password: z.string().min(6),
    firstName: z.string().trim().nullish(),
    lastName: z.string().trim().nullish(),
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

const _userSignupSchema = createUserSchema.shape.body;

type UserSignup = z.infer<typeof _userSignupSchema>;
type UserUpdate = z.infer<typeof baseUpdateUserSchema>;
type DbUser = Prisma.UserGetPayload<Prisma.UserDefaultArgs>;
type SafeDbUser = Omit<DbUser, "password">;
type DbUserWithFollows = Omit<
  Prisma.UserGetPayload<{
    include: {
      followers: true;
      following: true;
      _count: { select: { followers: true; following: true } };
    };
  }>,
  "password"
>;

export type { UserSignup, DbUser, SafeDbUser, DbUserWithFollows, UserUpdate };
export { createUserSchema, updateUserSchema };
