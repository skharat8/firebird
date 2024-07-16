import mongoose, { Schema } from "mongoose";
import type { DbUser } from "../schemas/user.zod";
import { NotificationType } from "../data/enums";

type Notification = {
  from: DbUser["id"];
  to: DbUser["id"];
  read?: boolean;
  type: NotificationType;
};

const notificationSchema = new mongoose.Schema(
  {
    from: { type: Schema.Types.ObjectId, ref: "User", required: true },
    to: { type: Schema.Types.ObjectId, ref: "User", required: true },
    read: { type: Boolean, default: false },
    type: {
      type: String,
      required: true,
      enum: Object.values(NotificationType),
    },
  },
  { timestamps: true },
);

const NotificationModel = mongoose.model<Notification>(
  "Notification",
  notificationSchema,
);

export type { Notification };
export default NotificationModel;
