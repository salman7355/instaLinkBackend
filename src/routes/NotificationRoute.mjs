import express from "express";
import {
  getNotifications,
  markAllAsRead,
  readNotification,
  sample,
  SaveToken,
} from "../controller/NotificationController.mjs";

const router = express.Router();

router.post("/save-token", SaveToken);
router.post("/sample", sample);
router.put("/read", readNotification);
router.put("/mark-all-read", markAllAsRead);
router.get("/:userId", getNotifications);

export default router;
