import { beforeAll, describe, expect, it, vi } from "vitest";
import supertest from "supertest";

import createServer from "../server.js";
import * as UserService from "../services/user.service.js";
import * as SessionService from "../services/session.service.js";
import * as PostService from "../services/post.service.js";
import { StatusCode } from "../data/enums.js";
import type { UserLogin } from "../schemas/session.zod.js";
import type { DbUserWithFollows, UserSignup } from "../schemas/user.zod.js";
import type { CreatePost } from "../schemas/post.zod.js";

const app = createServer();

const userId = "10";

const session = {
  id: "2",
  userId,
  valid: true,
  userAgent: "",
  createdAt: new Date(),
  updatedAt: new Date(),
};

const signupPayload: UserSignup = {
  username: "test_name",
  email: "johndoe@gmail.com",
  password: "test_password",
  firstName: "John",
  lastName: "Doe",
};

const loginPayload: UserLogin = {
  email: "johndoe@gmail.com",
  password: "test_password",
};

const createPostPayload: CreatePost = {
  content: "This is a test post",
};

// @ts-expect-error Not including common DB fields like createdAt
const userResponsePayload: DbUserWithFollows = {
  id: "10",
  username: "test_name",
  email: "johndoe@gmail.com",
  firstName: "John",
  lastName: "Doe",
};

const postResponsePayload = {
  id: "1",
  content: "This is a test post",
  authorId: userId,
  image: null,
  parentPostId: null,
};

let accessToken: string;
let refreshToken: string;

describe("Post", () => {
  beforeAll(async () => {
    vi.spyOn(UserService, "createUser").mockResolvedValue(userResponsePayload);
    vi.spyOn(UserService, "validateCredentials").mockResolvedValue(
      userResponsePayload,
    );
    vi.spyOn(SessionService, "createSession").mockResolvedValue(session);

    await supertest(app).post("/api/users").send(signupPayload);

    const { statusCode, headers } = await supertest(app)
      .post("/api/sessions/login")
      .send(loginPayload);

    const cookies = headers["set-cookie"];
    expect(statusCode).toBe(StatusCode.OK);
    expect(cookies).not.toBeUndefined();
    expect(cookies![0]).toContain("AccessToken");
    expect(cookies![1]).toContain("RefreshToken");

    // @ts-expect-error Debug later
    [accessToken, refreshToken] = cookies;
  });

  describe("Create Post Route", () => {
    it("If content is within character limits, create new post", async () => {
      vi.spyOn(UserService, "findUser").mockResolvedValue(userResponsePayload);
      const createPostMock = vi
        .spyOn(PostService, "createPost")
        // @ts-expect-error Not including createdAt, updatedAt fields
        .mockResolvedValue(postResponsePayload);

      // eslint-disable-next-line
      const { statusCode, body } = await supertest(app)
        .post("/api/posts")
        .set("Cookie", [accessToken, refreshToken])
        .send(createPostPayload);

      expect(body).toEqual(postResponsePayload);
      expect(statusCode).toBe(StatusCode.CREATED);
      expect(createPostMock.mock.calls.length).toBe(1);
    });
  });
});
