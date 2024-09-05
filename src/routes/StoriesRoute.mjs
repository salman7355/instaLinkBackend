import express from "express";
import { addStory, getStories } from "../controller/StoriesController.mjs";

const router = express.Router();

router.post("/add", addStory);
router.get("/:userId", getStories);

export default router;
