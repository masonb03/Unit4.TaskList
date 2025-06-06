import express from 'express';
import db from '../db/client.js';
import { verifyToken } from '../middleware/authMiddleware.js';




const router = express.Router();

router.post('/', verifyToken, async (req, res) => {
  const { title, done } = req.body;
  if (!title || done == null) return res.status(400).send({ error: 'Missing task fields' });

  const result = await db.query(
    `INSERT INTO tasks (title, done, user_id) VALUES ($1, $2, $3) RETURNING *`,
    [title, done, req.user.id]
  );
  res.send(result.rows[0]);
});

router.get('/', verifyToken, async (req, res) => {
  const result = await db.query(`SELECT * FROM tasks WHERE user_id = $1`, [req.user.id]);
  res.send(result.rows);
});

router.put('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;
  const { title, done } = req.body;
  if (!title || done == null) return res.status(400).send({ error: 'Missing task fields' });

  const taskCheck = await db.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  if (taskCheck.rows.length === 0) return res.status(404).send({ error: 'Task not found' });
  if (taskCheck.rows[0].user_id !== req.user.id) return res.status(403).send({ error: 'Forbidden' });

  const result = await db.query(
    `UPDATE tasks SET title = $1, done = $2 WHERE id = $3 RETURNING *`,
    [title, done, id]
  );
  res.send(result.rows[0]);
});

router.delete('/:id', verifyToken, async (req, res) => {
  const { id } = req.params;

  const taskCheck = await db.query(`SELECT * FROM tasks WHERE id = $1`, [id]);
  if (taskCheck.rows.length === 0) return res.status(404).send({ error: 'Task not found' });
  if (taskCheck.rows[0].user_id !== req.user.id) return res.status(403).send({ error: 'Forbidden' });

  await db.query(`DELETE FROM tasks WHERE id = $1`, [id]);
  res.send({ success: true });
});

export default router;
