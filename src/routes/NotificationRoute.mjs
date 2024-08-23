import express from "express";
import { SaveToken } from "../controller/NotificationController.mjs";

const router = express.Router();

router.post("/save-token", SaveToken);

export default router;
