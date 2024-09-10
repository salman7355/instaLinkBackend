import { query } from "../config/db.mjs";

export const savetoken = async (user_id, token) => {
  const text = `INSERT INTO push_tokens (user_id, token) VALUES ($1, $2) RETURNING *`;
  const values = [user_id, token];
  const { rows } = await query(text, values);
  return rows[0];
};

export const findTokenByUserId = async (user_id) => {
  const text = `SELECT * FROM push_tokens WHERE user_id = $1`;
  const values = [user_id];
  const { rows } = await query(text, values);
  return rows[0]; // Returns the token if found, otherwise `undefined`
};

export const updateToken = async (user_id, token) => {
  const text = `UPDATE push_tokens SET token = $1 WHERE user_id = $2 RETURNING *`;
  const values = [token, user_id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getPostOwner = async (postId) => {
  const text = `SELECT userid FROM posts WHERE id = $1`;
  const values = [postId];
  const { rows } = await query(text, values);
  return rows[0];
};

export const insertnotification = async (
  userId,
  actorId,
  postId,
  type,
  message
) => {
  const text = `INSERT INTO notifications (user_id, actor_id, post_id, type, message) VALUES ($1, $2, $3, $4, $5) RETURNING *`;
  const values = [userId, actorId, postId, type, message];
  const { rows } = await query(text, values);
  return rows[0];
};

export const readnotification = async (notificationId) => {
  const text = `UPDATE notifications SET is_read = true WHERE id = $1 RETURNING *`;
  const values = [notificationId];
  const { rows } = await query(text, values);
  return rows[0];
};

export const markAllNotificationsAsread = async (userId) => {
  const text = `UPDATE notifications SET is_read = true WHERE user_id = $1 RETURNING *`;
  const values = [userId];
  const { rows } = await query(text, values);
  return rows;
};

export const getnotifications = async (userId) => {
  const text = `SELECT * FROM notifications WHERE user_id = $1 ORDER BY created_at DESC`;
  const values = [userId];
  const { rows } = await query(text, values);
  return rows;
};
