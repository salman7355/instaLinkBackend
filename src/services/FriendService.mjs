import { query } from "../config/db.mjs";

export const checkFriend = async (user_id, friend_id) => {
  const text = `SELECT * FROM friends WHERE user_id = $1 AND friend_id = $2`;
  const values = [user_id, friend_id];
  const { rows } = await query(text, values);
  return rows[0];
};



export const addfriend = async (user_id, friend_id) => {
  const text = `INSERT INTO friends (user_id, friend_id) VALUES ($1, $2) RETURNING *`;
  const values = [user_id, friend_id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const incrementFollowing = async (user_id) => {
  const text = `UPDATE users SET following = following + 1 WHERE id = $1 RETURNING *`;
  const values = [user_id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const incrementFollowers = async (friend_id) => {
  const text = `UPDATE users SET followers = followers + 1 WHERE id = $1 RETURNING *`;
  const values = [friend_id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const removefriend = async (user_id, friend_id) => {
  const text = `DELETE FROM friends WHERE user_id = $1 AND friend_id = $2 RETURNING *`;
  const values = [user_id, friend_id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const decrementFollowing = async (user_id) => {
  const text = `UPDATE users SET following = following - 1 WHERE id = $1 RETURNING *`;
  const values = [user_id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const decrementFollowers = async (friend_id) => {
  const text = `UPDATE users SET followers = followers - 1 WHERE id = $1 RETURNING *`;
  const values = [friend_id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getfriends = async (user_id) => {
  const text = `SELECT * FROM friends WHERE user_id = $1`;
  const values = [user_id];
  const { rows } = await query(text, values);
  return rows;
};
