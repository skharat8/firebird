import type { Prisma } from "@prisma/client";
import prisma from "../prisma/customClient";

async function createNotification(data: Prisma.NotificationCreateInput) {
  return prisma.notification.create({ data });
}

async function getAllNotifications(userId: string) {
  return prisma.notification.findMany({ where: { toId: userId } });
}

export { createNotification, getAllNotifications };
