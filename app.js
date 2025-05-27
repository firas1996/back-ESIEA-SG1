const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const userRouter = require('./routes/userRoutes')

dotenv.config({ path: "./.env" });

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log("Db connection secured !!!");
  })
  .catch((e) => {
    console.log(e.message);
  });

const app = express();

app.use(express.json())
app.use('/users',userRouter)

const port = 1122;

app.listen(port, () => {
  console.log("The server is running !!!!");
});
