import express from "express";
import {
  addComment,
  addlike,
  addPost,
  getComments,
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

// /comment/postId="post id"
router.get("/comment", getComments);
router.post("/comment", addComment);

export default router;
