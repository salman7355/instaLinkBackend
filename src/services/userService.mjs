import { query } from "../config/db.mjs";

export const createUser = async (
  username,
  email,
  password,
  profilepictureurl,
  dateofbirth,
  mobile
) => {
  const text = `INSERT INTO users (username, email, password, profilepictureurl , dateofbirth , mobile ) VALUES ($1, $2, $3, $4 , $5 , $6) RETURNING *`;
  const values = [
    username,
    email,
    password,
    profilepictureurl,
    dateofbirth,
    mobile,
  ];
  const { rows } = await query(text, values);
  return rows[0];
};

export const getUserByEmail = async (email) => {
  const text = `SELECT * FROM users WHERE email = $1`;
  const values = [email];
  const { rows } = await query(text, values);
  return rows[0];
};

export const searchUser = async (username) => {
  const text = `Select * from users where username ILIKE $1`;
  const values = [`%${username}%`];
  const { rows } = await query(text, values);
  return rows;
};

export const getuserbyid = async (id) => {
  const text = `SELECT * FROM users WHERE id = $1`;
  const values = [id];
  const { rows } = await query(text, values);
  return rows[0];
};

export const updateuser = async (id, username, email, mobile, password) => {
  const text = `UPDATE users SET username = $1 , email = $2 , mobile = $3 , password = $4 WHERE id = $5 RETURNING *`;
  const values = [username, email, mobile, password, id];
  const { rows } = await query(text, values);
  return rows[0];
};
