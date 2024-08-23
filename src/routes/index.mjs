import express from "express";
import userRoutes from "./userRoutes.mjs";
import postRoutes from "./postsRoute.mjs";
import NotificationRoutes from "./NotificationRoute.mjs";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);
router.use("/Notification", NotificationRoutes);

export default router;
