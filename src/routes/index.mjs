import express from "express";
import userRoutes from "./userRoutes.mjs";
import postRoutes from "./postsRoute.mjs";
import NotificationRoutes from "./NotificationRoute.mjs";
import FriendRoutes from "./FriendRoute.mjs";
import HistoryRoutes from "./History.mjs";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/Notification", NotificationRoutes);
router.use("/friends", FriendRoutes);
router.use("/history", HistoryRoutes);

export default router;
