import type { Request, Response, Handler } from "express";
import asyncHandler from "express-async-handler";

import * as NotificationService from "../services/notification.service.js";
import { assertObjectExists } from "../utils/common.utils.js";

const getNotificationsHandler: Handler = asyncHandler(
  async (_: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    const notifications = await NotificationService.getAllNotifications(
      res.locals.user.id,
    );

    res.json(notifications);
  },
);

const deleteNotificationsHandler: Handler = asyncHandler(
  async (_: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    await NotificationService.deleteAllNotifications(res.locals.user.id);

    res.json({ message: "All notifications deleted" });
  },
);

const markNotificationsReadHandler: Handler = asyncHandler(
  async (_: Request, res: Response) => {
    assertObjectExists(res.locals.user);
    await NotificationService.markAllNotificationsRead(res.locals.user.id);

    res.json({ message: "All notifications cleared" });
  },
);

export {
  getNotificationsHandler,
  deleteNotificationsHandler,
  markNotificationsReadHandler,
};
