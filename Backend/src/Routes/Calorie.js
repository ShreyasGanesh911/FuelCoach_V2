const express =require("express")
const auth = require('../Middlewares/Auth.js')
const calorieRoute = express.Router()

calorieRoute.put("/add",auth,async(req,res)=>{
    const User_ID = req.cookies.Auth
    // const [result] = 
})

module.exports = calorieRoute;