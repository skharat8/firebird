import type { Request, Response, Handler } from "express";
import asyncHandler from "express-async-handler";

import type { UserLogin } from "../schemas/session.zod.js";
import { validateCredentials } from "../services/user.service.js";
import { getCookieOptions, signJwt } from "../utils/auth.utils.js";
import {
  createSession,
  findSessions,
  deleteSession,
} from "../services/session.service.js";

const createSessionHandler: Handler = asyncHandler(
  async (req: Request<object, object, UserLogin>, res: Response) => {
    // Authenticate the user
    const user = await validateCredentials(req.body.email, req.body.password);

    // Create a session using user ID
    const session = await createSession(user.id, req.get("user-agent") ?? "");

    // Generate an access token and refresh token for this session
    const { ACCESS_TOKEN_TTL, REFRESH_TOKEN_TTL } = process.env;

    const accessToken = signJwt(
      { userId: user.id, sessionId: session.id },
      // @ts-expect-error Shouldn't error, doesn't make sense
      { expiresIn: ACCESS_TOKEN_TTL },
    );

    const refreshToken = signJwt(
      { userId: user.id, sessionId: session.id },
      // @ts-expect-error Shouldn't error, doesn't make sense
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

const getSessionsHandler: Handler = asyncHandler(
  async (_: Request, res: Response) => {
    const { user } = res.locals;
    const sessions = await findSessions({ userId: user?.id, valid: true });

    res.json({ sessions });
  },
);

const deleteSessionHandler: Handler = asyncHandler(
  async (_: Request, res: Response) => {
    await deleteSession({ id: res.locals.sessionId });

    const { maxAge, ...cookieOptions } = getCookieOptions();
    res.clearCookie("AccessToken", cookieOptions);
    res.clearCookie("RefreshToken", cookieOptions);

    res.json({ message: "Session deleted" });
  },
);

export { createSessionHandler, getSessionsHandler, deleteSessionHandler };
