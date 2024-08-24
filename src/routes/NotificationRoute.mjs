import express from "express";
import { sample, SaveToken } from "../controller/NotificationController.mjs";

const router = express.Router();

router.post("/save-token", SaveToken);
router.post("/sample", sample);

export default router;
