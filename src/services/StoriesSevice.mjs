import { query } from "../config/db.mjs";

export const addstory = async (userId, story) => {
  const text = `INSERT INTO stories (user_id, image_url) VALUES ($1, $2) RETURNING *`;
  const values = [userId, story];
  const { rows } = await query(text, values);
  return rows[0];
};

export const addStoriestoTempTable = async (userId, story) => {
  const text = `INSERT INTO stories_temp (user_id, image_url) VALUES ($1, $2) RETURNING *`;
  const values = [userId, story];
  const { rows } = await query(text, values);
  return rows[0];
};

export const deleteFromtemptable = async (storyId) => {
  const text = `DELETE FROM stories_temp WHERE id = $1`;
  const values = [storyId];
  await query(text, values);
};

export const getstories = async (userId) => {
  const text = `
    SELECT  s.id AS story_id, s.image_url, s.created_at, u.id AS user_id, u.username, u.profilepictureurl FROM  stories_temp s JOIN  users u ON u.id = s.user_id WHERE  s.user_id != $1 `;
  const values = [userId];
  const { rows } = await query(text, values);
  return rows;
};
