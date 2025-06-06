import express from "express";
const app = express();
export default app;

app.use(express.json())

app.use((req, res, next) =>{
  console.log(req.method, req.originalUrl)
  next()
})


app.get('/', (req, res) =>{
    res.send('Welcome to the backend application!')
})




app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});
