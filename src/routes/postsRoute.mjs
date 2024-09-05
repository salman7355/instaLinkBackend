import express from "express";
import {
  addComment,
  addlike,
  addPost,
  getComments,
  getLikedPosts,
  getPostByid,
  getPosts,
  getUserPosts,
  handleLike,
  removelike,
} from "../controller/postController.mjs";

const router = express.Router();

router.get("/all/:userId", getPosts);
router.get("/:id", getPostByid);
router.post("/add", addPost);
router.get("/user/:id", getUserPosts);
router.post("/like", handleLike);

router.get("/likes/:userId", getLikedPosts);

// /comment/postId="post id"
router.get("/comment/:postId", getComments);
router.post("/comment", addComment);

export default router;
