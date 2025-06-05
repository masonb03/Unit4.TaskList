import db from "#db/client.js";

export async function createTask({ title, done, user_id}) {
    const res = await db.query(
        `INSERT INTO tasks (title, done, user_id)
        VALUES ($1, $2, $3)
        RETURNING *;
        `, [title, done, user_id]
    );

    return res.rows[0]
}