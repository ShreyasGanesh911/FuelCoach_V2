const express = require("express");
const jwt = require('jsonwebtoken');
const userRouter = require("./Routes/Users.js");
require("dotenv").config();
const cors = require("cors");
const cookie = require('cookie-parser')
const port = process.env.PORT;

const app = express();
app.use(cookie())
app.use(cors());
app.use(express.json());
app.use("/user", userRouter);



app.listen(port, () => {
  console.log("Active");
});
