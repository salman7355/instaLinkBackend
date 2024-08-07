import express from "express";
import userRoutes from "./userRoutes.mjs";
import postRoutes from "./postsRoute.mjs";

const router = express.Router();

router.use("/users", userRoutes);
router.use("/posts", postRoutes);

export default router;
