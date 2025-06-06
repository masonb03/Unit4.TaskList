import db from "../client.js";


export async function getUserByName(name) {
  const sql = "SELECT * FROM users WHERE name = $1";
  const { rows } = await db.query(sql, [name]);
  return rows[0];
}


export async function createUser({ name, password }) {
  const sql = `INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name`;
  const { rows } = await db.query(sql, [name, password]);
  return rows[0];
}
