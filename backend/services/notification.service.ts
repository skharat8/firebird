import type { Notification } from "../models/notification.model";
import NotificationModel from "../models/notification.model";

async function createNotification(data: Notification) {
  const notification = await NotificationModel.create(data);
  return notification.toJSON();
}

async function getAllNotifications(userId: string) {
  return NotificationModel.find({ to: userId }).lean();
}

export { createNotification, getAllNotifications };
