import express from "express";
import {
  AddFriend,
  checkfriend,
  GetFriends,
  RemoveFriend,
} from "../controller/FriendController.mjs";

const router = express.Router();

router.post("/add", AddFriend);
router.post("/remove", RemoveFriend);
router.get("/all", GetFriends);
router.post("/check", checkfriend);

export default router;
