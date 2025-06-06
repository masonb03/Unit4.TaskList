import db from "../client.js";


export async function createTask({ title, done, user_id }) {
  const sql = `INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3) RETURNING *`;
  const { rows } = await db.query(sql, [title, done, user_id]);
  return rows[0];
}


export async function getTasksByUser(user_id) {
  const sql = `SELECT * FROM tasks WHERE user_id = $1 ORDER BY id`;
  const { rows } = await db.query(sql, [user_id]);
  return rows;
}


export async function updateTask({ id, title, done, user_id }) {
  const sql = `
    UPDATE tasks
    SET title = $1, done = $2
    WHERE id = $3 AND user_id = $4
    RETURNING *`;
  const { rows } = await db.query(sql, [title, done, id, user_id]);
  return rows[0];
}


export async function deleteTask(id, user_id) {
  const sql = `DELETE FROM tasks WHERE id = $1 AND user_id = $2 RETURNING *`;
  const { rows } = await db.query(sql, [id, user_id]);
  return rows[0];
}

export async function getTaskById(id) {
  const sql = `SELECT * FROM tasks WHERE id = $1`;
  const { rows } = await db.query(sql, [id]);
  return rows[0];
}
