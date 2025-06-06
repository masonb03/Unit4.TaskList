import express from "express";
const app = express();
export default app;
import usersRouter from './api/users.js';
import tasksRouter from './api/tasks.js';
import dotenv from 'dotenv';

dotenv.config();

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Welcome to the TaskList API');
});

app.use('/users', usersRouter);
app.use('/tasks', tasksRouter);

app.get('/', (req, res) =>{
    res.send('Welcome to the TaskList!')
})




app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
