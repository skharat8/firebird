import type { NotificationType } from "@prisma/client";
import prisma from "../../prisma/customClient.js";

async function createNotification(
  fromId: string,
  toId: string,
  type: NotificationType,
) {
  return prisma.notification.create({
    data: {
      from: { connect: { id: fromId } },
      to: { connect: { id: toId } },
      type,
    },
  });
}

async function getAllNotifications(userId: string) {
  return prisma.notification.findMany({ where: { toId: userId } });
}

async function deleteAllNotifications(userId: string) {
  return prisma.notification.deleteMany({ where: { toId: userId } });
}

async function markAllNotificationsRead(userId: string) {
  return prisma.notification.updateMany({
    where: { toId: userId },
    data: { read: true },
  });
}

export {
  createNotification,
  getAllNotifications,
  deleteAllNotifications,
  markAllNotificationsRead,
};
