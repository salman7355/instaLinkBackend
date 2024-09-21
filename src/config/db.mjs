import pkg from "pg";
const { Pool } = pkg;
import * as key from "dotenv";

key.config();

export const pool = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  port: process.env.DBPORT,
  database: process.env.DATABASE,
});

pool.on("connect", () => {
  console.log("connected to the db");
});

export const query = (text, params) => pool.query(text, params);
