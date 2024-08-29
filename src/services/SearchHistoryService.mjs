import { query } from "../config/db.mjs";

export const addusertosearchhistory = async (userId, searchedUser) => {
  const text = `INSERT INTO search_history (user_id, searched_user_id) VALUES ($1, $2) RETURNING *`;
  const values = [userId, searchedUser];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getsearchhistory = async (userId) => {
  const text = `SELECT users.username, users.profilepictureurl , users.followers , users.id FROM search_history JOIN users ON search_history.searched_user_id = users.id WHERE user_id = $1`;
  const values = [userId];
  const { rows } = await query(text, values);
  return rows;
};

export const checkIfUserExistsInSearchHistory = async (
  userId,
  searchedUserId
) => {
  const text = `SELECT * FROM search_history WHERE user_id = $1 AND searched_user_id = $2`;
  const values = [userId, searchedUserId];
  const { rows } = await query(text, values);
  return rows[0];
};

export const clearsearchHistory = async (userId) => {
  const text = `DELETE FROM search_history WHERE user_id = $1`;
  const values = [userId];
  await query(text, values);
};
