import type { Request, Response, NextFunction, Handler } from "express";
import asyncHandler from "express-async-handler";

import {
  getCookieOptions,
  verifyJwt,
  type JwtData,
} from "../utils/auth.utils.js";
import { issueNewAccessToken } from "../services/session.service.js";
import { findUser } from "../services/user.service.js";
import logger from "../utils/logger.js";

async function setLocals(res: Response, decodedToken: JwtData) {
  const { userId, sessionId } = decodedToken;
  res.locals.user = await findUser({ id: userId });
  res.locals.sessionId = sessionId;
}

const deserializeUser: Handler = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.cookies.AccessToken) {
      return next();
    }

    const accessToken = req.cookies.AccessToken as string;
    const refreshToken = req.cookies.RefreshToken as string;
    const { valid, expired, decodedToken } = verifyJwt(accessToken);

    // If access token is valid, deserialize the user.
    if (valid) {
      await setLocals(res, decodedToken as JwtData);
      return next();
    }

    // If access token is expired while refresh token is valid,
    // issue a new access token and send it back to client.
    if (expired && refreshToken) {
      const newAccessToken = await issueNewAccessToken(refreshToken);

      if (newAccessToken) {
        // AccessToken cookie should last till refresh token expires. Otherwise,
        // client won't have an expired token to send back to the server in case
        // the user logs in much later. Internally, the access token expires
        // much quicker.
        res.cookie(
          "AccessToken",
          newAccessToken,
          getCookieOptions(process.env.REFRESH_TOKEN_TTL),
        );

        const result = verifyJwt(newAccessToken);
        await setLocals(res, result.decodedToken as JwtData);
        logger.info("Access Token Refreshed", result.decodedToken);
      }
    }

    return next();
  },
);

export default deserializeUser;
