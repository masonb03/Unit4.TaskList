import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import db from "../db/client.js";

const router = express.Router();

router.post('/register', async(req, res) =>{
    const { name, password } = req.body;
    if(!name || !password)
        return res.status(400).send({error: 'Missing information'});

    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db.query(
        `INSERT INTO users (name, password) VALUES ($1, $2) RETURNING id, name`,
        [name, hashedPassword]
    );

    const token = jwt.sign({ id: result.rows[0].id, name }, process.env.JWT_SECRET);
    res.send({ token });
});

router.post('/login', async(req, res) =>{
    const {name , password } = req.body;
    if(!name || !password)
        return res.status(400).send({error: 'Missing information'});

    const result = await db.query(
        `INSERT * FROM users WHERE name = $1`, [name]
    );
    const user = result.rows[0];
    if(!user)
        return res.status(400).send({error: 'Invalid information'});

    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch)
        return res.status(400).send({error: 'Invalid information'});

    const token = jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
    res.send({ token });
});

export default router;