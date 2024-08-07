import express from "express";
import {
  addlike,
  addPost,
  getLikedPosts,
  getPostByid,
  getPosts,
  removelike,
} from "../controller/postController.mjs";

const router = express.Router();

router.get("/all", getPosts);
router.get("/:id", getPostByid);
router.post("/add", addPost);
router.post("/like", addlike);
router.get("/likes/:userId", getLikedPosts);
router.post("/remove", removelike);

export default router;
