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
