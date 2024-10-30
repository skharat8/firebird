import { z } from "zod";

const userSignupSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  email: z.string().email({ message: "Invalid email" }),
  password: z
    .string()
    .min(6, { message: "Password must be at least 6 characters long" }),
});

const userLoginSchema = userSignupSchema.omit({ username: true });

const userSchema = userSignupSchema.omit({ password: true }).extend({
  id: z.string(),
  firstName: z.string().nullish(),
  lastName: z.string().nullish(),
  fullName: z.string().nullish(),
  profileImage: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  coverImage: z
    .string()
    .nullish()
    .transform((x) => x ?? undefined),
  bio: z.string().nullish(),
});

type UserLogin = z.infer<typeof userLoginSchema>;
type UserSignup = z.infer<typeof userSignupSchema>;
type User = z.infer<typeof userSchema>;

export type { UserLogin, UserSignup, User };
export { userLoginSchema, userSignupSchema, userSchema };
