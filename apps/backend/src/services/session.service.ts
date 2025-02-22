import type { Prisma } from "@prisma/client";
import { signJwt, verifyJwt, type JwtData } from "../utils/auth.utils";
import prisma from "../prisma/customClient";

async function createSession(
  userId: string,
  userAgent: string
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
  refreshToken: string
): Promise<string | false> {
  // Verify refresh token
  const result = verifyJwt(refreshToken);
  if (!result.valid) return false;

  // Check if the user session is valid
  const { userId, sessionId } = result.decodedToken as JwtData;
  const session = await prisma.session.findUnique({ where: { id: sessionId } });
  if (!session?.valid) return false;

  return signJwt(
    { userId, sessionId },
    // @ts-expect-error Debug later
    { expiresIn: process.env.ACCESS_TOKEN_TTL }
  );
}

export { createSession, findSessions, deleteSession, issueNewAccessToken };
