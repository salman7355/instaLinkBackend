import express from "express";
import {
  addusertoSearchHistory,
  clearSearchHistory,
  getUsersFromSearchHistory,
} from "../controller/SearchHistoryController.mjs";

const router = express.Router();

router.get("/users/:userId", getUsersFromSearchHistory);
router.post("/users", addusertoSearchHistory);
router.delete("/users/:userId", clearSearchHistory);

export default router;
