import e from "cors";
import { query } from "../config/db.mjs";
import Expo from "expo-server-sdk";

export const getposts = async () => {
  const text = `SELECT posts.*, users.username, users.profilepictureurl FROM posts JOIN users ON posts.userId = users.id`;
  const { rows } = await query(text);
  return rows;
};

export const getPostById = async (id) => {
  const text = ` SELECT posts.*, users.username, users.profilepictureurl FROM posts JOIN users ON posts.userId = users.id WHERE posts.id = $1`;
  const values = [id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getPostsById = async (id) => {
  const text = `SELECT users.*, posts.* FROM users INNER JOIN posts ON users.id = posts.userid WHERE users.id = $1`;
  const values = [id];
  const { rows } = await query(text, values);
  return rows;
};

export const createPost = async (userId, caption, imageurl) => {
  const text = `INSERT INTO posts (userid, caption, imageurl) VALUES ($1, $2, $3) RETURNING *`;
  const values = [userId, caption, imageurl];
  const { rows } = await query(text, values);
  return rows[0];
};

export const checkIfLiked = async (postId, userId) => {
  const result = await query(
    "SELECT * FROM likes WHERE postid = $1 AND userid = $2",
    [postId, userId]
  );
  return result.rowCount > 0; // Returns true if the user has liked the post
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

export const getcomments = async (postId) => {
  const text = ` SELECT  comments.*,  users.* FROM  comments JOIN  users ON comments.userId = users.id WHERE  comments.postId = $1`;
  const values = [postId];
  const { rows } = await query(text, values);
  return rows;
};

export const addcomment = async (postId, userId, comment) => {
  const text = `INSERT INTO comments (postid, userid, comment) VALUES ($1, $2, $3) RETURNING *`;
  const values = [postId, userId, comment];
  const { rows } = await query(text, values);
  return rows[0];
};

export const updateCommentsCount = async (postId) => {
  const text = `UPDATE posts SET comments = comments + 1 WHERE id = $1 RETURNING *`;
  const values = [postId];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getPostAuthorId = async (postId) => {
  const text = ` SELECT p.userid, u.username FROM posts p INNER JOIN users u ON p.userid = u.id WHERE p.id = $1;`;
  const { rows } = await query(text, [postId]);
  return rows[0];
};

export const getTokenbyUserId = async (userId) => {
  const text = `SELECT token FROM push_tokens WHERE user_id = $1`;
  const { rows } = await query(text, [userId]);
  return rows[0]?.token;
};
