import e from "cors";
import { query } from "../config/db.mjs";

export const getposts = async () => {
  const text = `SELECT * FROM posts`;
  const { rows } = await query(text);
  return rows;
};

export const getPostById = async (id) => {
  const text = `SELECT * FROM posts WHERE id = $1`;
  const values = [id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getPostByUsername = async (username) => {
  const text = `SELECT * FROM posts WHERE userid = (SELECT id FROM users WHERE username = $1)`;
  const values = [username];
  const { rows } = await query(text, values);
  return rows;
};

export const createPost = async (userId, caption, imageurl) => {
  const text = `INSERT INTO posts (userid, caption, imageurl) VALUES ($1, $2, $3) RETURNING *`;
  const values = [userId, caption, imageurl];
  const { rows } = await query(text, values);
  return rows[0];
};

export const addLike = async (postId, userId) => {
  // add like to post and when a user likes a post, the postid and userid are stored in the likes table in the database
  // and update the likes count in the posts table for the post
  const text = `INSERT INTO likes (postid, userid) VALUES ($1, $2) RETURNING *`;
  const values = [postId, userId];
  const { rows } = await query(text, values);
  return rows[0];
};

export const updateLikesCount = async (postId) => {
  const text = `UPDATE posts SET likes = likes + 1 WHERE id = $1 RETURNING *`;
  const values = [postId];
  const { rows } = await query(text, values);
  return rows[0];
};

export const removeLike = async (postId, userId) => {
  const text = `DELETE FROM likes WHERE postid = $1 AND userid = $2 RETURNING *`;
  const values = [postId, userId];
  const { rows } = await query(text, values);
  return rows[0];
};

// get liked posts by joining likes and posts table
export const getLikedposts = async (userId) => {
  const text = `SELECT * FROM posts WHERE id IN (SELECT postid FROM likes WHERE userid = $1)`;
  const values = [userId];
  const { rows } = await query(text, values);
  return rows;
};

export const declike = async (postId) => {
  const text = `UPDATE posts SET likes = likes - 1 WHERE id = $1 RETURNING *`;
  const values = [postId];
  const { rows } = await query(text, values);
  return rows[0];
};
