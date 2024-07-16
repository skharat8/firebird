import type { Request, Response } from "express";
import asyncHandler from "express-async-handler";

import type { UserLogin } from "../schemas/session.zod";
import { validateCredentials } from "../services/user.service";
import { getCookieOptions, signJwt } from "../utils/auth.utils";
import {
  createSession,
  findSessions,
  deleteSession,
} from "../services/session.service";

const createSessionHandler = asyncHandler(
  async (req: Request<object, object, UserLogin>, res: Response) => {
    // Authenticate the user
    const user = await validateCredentials(req.body.email, req.body.password);

    // Create a session using user ID
    const session = await createSession(user.id, req.get("user-agent") ?? "");

    // Generate an access token and refresh token for this session
    const { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } = process.env;

    const accessToken = signJwt(
      { userId: user.id, sessionId: session.id },
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    const refreshToken = signJwt(
      { userId: user.id, sessionId: session.id },
      { expiresIn: REFRESH_TOKEN_TTL },
    );

    // AccessToken cookie should last till refresh token expires. Otherwise,
    // client won't have an expired token to send back to the server in case
    // the user logs in much later.
    const cookieOptions = getCookieOptions(REFRESH_TOKEN_TTL);

    res.cookie("AccessToken", accessToken, cookieOptions);
    res.cookie("RefreshToken", refreshToken, cookieOptions);
    res.json(user);
  },
);

const getSessionsHandler = asyncHandler(async (_: Request, res: Response) => {
  const { user } = res.locals;
  const sessions = await findSessions({ user: user?.id, valid: true });

  res.json({ sessions });
});

const deleteSessionHandler = asyncHandler(async (_: Request, res: Response) => {
  await deleteSession({ _id: res.locals.sessionId });
  res.clearCookie("AccessToken");
  res.clearCookie("RefreshToken");

  res.json({ message: "Session deleted" });
});

export { createSessionHandler, getSessionsHandler, deleteSessionHandler };
