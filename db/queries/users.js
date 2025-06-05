import db from "#db/client.js";

export async function createUser({ name, password }){
    const res = await db.query(
        `INSERT INTO users (name, password)
         VALUES ($1, $2) 
         RETURNING *;
         `, [name, password]
        );

        return res.rows[0]
}