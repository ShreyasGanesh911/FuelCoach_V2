const express = require("express");
const jwt = require('jsonwebtoken');
const userRouter = require("./Routes/Users.js");
require("dotenv").config();
const cors = require("cors");
const cookie = require('cookie-parser');
const weightRoute = require("./Routes/Weight.js");
const calorieRoute = require("./Routes/Calorie.js");
const foodRoute = require("./Routes/FoodLog.js");
const port = process.env.PORT;

const app = express();
app.use(cookie())
app.use(cors({origin: 'http://localhost:3000',credentials: true}));
app.use(express.json());
app.use("/user", userRouter);
app.use('/weight',weightRoute)
app.use('/calories',calorieRoute)
app.use('/FoodLog',foodRoute)


app.listen(port, () => {
  console.log("Active");
});
