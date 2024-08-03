import { query } from "../config/db.mjs";

export const createUser = async (
  username,
  email,
  password,
  profilepictureurl
) => {
  const text = `INSERT INTO users (username, email, password, profilepictureurl) VALUES ($1, $2, $3, $4) RETURNING *`;
  const values = [username, email, password, profilepictureurl];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const text = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  const { rows } = await query(text, values);
  return rows[0];
};
