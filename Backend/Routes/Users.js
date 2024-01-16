const express = require('express')
const userRouter = express.Router()
const date = new Date()
const auth = require("../Auth.js")
const bcrypt = require('bcrypt');
const saltRounds = 10;
/*
    Routes under user CRUD
        Needs to login //
        Needs to signup //
        Needs to get his details 
        Needs to update his profile if needed
*/

const pool = require('../Connection/Connect.js')
userRouter.get("",async(req,res)=>{
    const [result] = await pool.query("SELECT * FROM Users;")
    res.json(result)
})
userRouter.get("/signup",async(req,res)=>{
    try{
        const {Name,Email,Phone,Password,Gender,BMI,BMR,Age,Height,Weight,Daily_Intake,Food_pref,Activity_rate} = req.body;
        const User_ID = Math.floor(Math.random()*1000000)
        const bcPassword = bcrypt.hashSync(Password,10)
        const Join_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        await pool.query("INSERT INTO Users VALUES (?,?,?,?,?,?);",[User_ID,Name,Email,Phone,bcPassword,Join_date])
        res.cookie("Auth",User_ID)
        await pool.query(`INSERT INTO User_details VALUES (${User_ID},'${Gender}',${BMI},${BMR},${Age},${Height},${Weight},${Daily_Intake},${Food_pref},${Activity_rate});`)
            res.status(200).send({success:true,message:"User created"})
    }catch(err){
            if(err.message.toLowerCase().includes("email"))
            res.status(400).send({message:"Email used",err:err})
            else if(err.message.toLowerCase().includes("phone"))
            res.status(400).send({message:"Phone used",err:err})
            else
            res.status(400).send({message:"oops something went wrong",err:err})
    }
})

userRouter.post("/login",async(req,res)=>{
    try{
    const {Email,Password} = req.body;
    const[result] = await pool.query("SELECT Password,User_ID FROM Users WHERE Email = ? ;",[Email])
    if(result.length){
        if(bcrypt.compareSync(Password,result[0].Password)){
            res.cookie('Auth',result[0].User_ID)
            res.status(200).send({success:true,message:"logged in"})
        }
        else
        res.status(400).send({success:false,message:"Incorrect password"})
    }
    else
    res.status(400).send({success:false,message:"User doesn't exist"})
    }catch(err){
        res.status(500).send({success:false,message:"Internal server error",err:err})   
    }
    
})


userRouter.get('/about',async(req,res)=>{
    const token = req.cookies.Auth
    const [result] = await pool.query("SELECT Email,Phone,Name,BMI,BMR,Age,Height,Weight,Daily_Intake,Gender FROM Users u JOIN User_details ud ON u.User_ID = ud.User_ID WHERE u.User_ID=?;",[token])
    res.send(result)
    
})
module.exports = userRouter 