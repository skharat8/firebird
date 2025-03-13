import type { Prisma } from "@prisma/client";
import { signJwt, verifyJwt, type JwtData } from "../utils/auth.utils.js";
import prisma from "../../prisma/customClient.js";
import logger from "../utils/logger.js";

async function createSession(
  userId: string,
  userAgent: string,
): Promise<Prisma.SessionGetPayload<Prisma.SessionDefaultArgs>> {
  return prisma.session.create({ data: { userId, userAgent } });
}

function findSessions(query: Prisma.SessionWhereInput) {
  return prisma.session.findMany({ where: query });
}

function deleteSession(query: Prisma.SessionWhereUniqueInput) {
  return prisma.session.delete({ where: query });
}

async function issueNewAccessToken(
  refreshToken: string,
): Promise<string | false> {
  // Verify refresh token
  const result = verifyJwt(refreshToken);
  if (!result.valid) {
    logger.warn("Could not verify refresh token");
    return false;
  }

  // Check if the user session is valid
  const { userId, sessionId } = result.decodedToken as JwtData;
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session?.valid) {
    logger.error("Could not verify user session", { session });
    return false;
  }

  return signJwt(
    { userId, sessionId },
    // @ts-expect-error Debug later
    { expiresIn: process.env.ACCESS_TOKEN_TTL },
  );
}

export { createSession, findSessions, deleteSession, issueNewAccessToken };
