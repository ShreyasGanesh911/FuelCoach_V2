  const express = require("express");
const jwt = require('jsonwebtoken');
const userRouter = require("./Routes/Users.js");
require("dotenv").config();
const cors = require("cors");
const cookie = require('cookie-parser');
const weightRoute = require("./Routes/Weight.js");
const foodRoute = require("./Routes/FoodLog.js");
const APIError = require("./Utils/APIError.js");
const ErrorHandler = require("./Utils/ErrorHandler.js");

const app = express();
app.use(cookie())
app.use(cors({origin: true,credentials: true}));
app.use(express.json());
app.use("/user", userRouter);
app.use('/weight',weightRoute)
app.use('/FoodLog',foodRoute)

//Logout
app.get('/logout',(req,res)=>{
  res.clearCookie('AuthToken')
  res.status(200).json({success:true,message:"Logged out"})
})
app.use(APIError)


module.exports = app