const  pool  = require("../DB/Connect.js");
const bcrypt = require('bcrypt');
const date = new Date()
require('dotenv').config()
const jwt = require('jsonwebtoken')
const asyncHandler = require("../Utils/AsyncHandler.js")
const ErrorHandler = require("../Utils/ErrorHandler.js")
const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`


const signup = asyncHandler(async(req,res,next)=>{
    const {Name,Email,Phone,Password,DOB,Gender,BMI,BMR,Age,Height,Weight,Daily_Intake,Food_pref,Activity_rate,Goal} = req.body;
        const User_ID = Math.floor(Math.random()*1000000)
        const weightHash = Math.floor(Math.random()*1000000)
        const bcPassword = bcrypt.hashSync(Password,10)
        await pool.query("INSERT INTO Users VALUES (?,?,?,?,?,?,?);",[User_ID,Name,Email,Number(Phone),bcPassword,_date,DOB])
        await pool.query(`INSERT INTO User_details VALUES (${User_ID},'${Gender}',${BMI},${Math.floor(BMR)},${Number(Age)},${Number(Height)},${Number(Weight)},${Daily_Intake},${Food_pref},${Activity_rate},${Goal});`)
        await pool.query(`INSERT INTO weight_log VALUES (?,?,?,?);`,[User_ID,weightHash,_date,Weight]) 
        res.status(200).json({success:true,message:"User created"})
})

const login = asyncHandler(async(req,res,next)=>{
    const {Email,Password} = req.body;
    const[result] = await pool.query("SELECT Password,User_ID FROM Users WHERE Email = ? ;",[Email])
    if(result.length){
        
        //{expires: new Date(Date.now()+(90*60*1000)),httpOnly:true,sameSite:"none",secure:true}
        if(bcrypt.compareSync(Password,result[0].Password)){
            const AuthToken = jwt.sign({id:result[0].User_ID},process.env.JWTKEY,{expiresIn:"1d"})
            res.cookie('AuthToken',AuthToken,{httpOnly:true,sameSite:"none",secure:true})
            res.status(200).send({success:true,message:"logged in",User_ID:result[0].User_ID})
        }
        else
            next(new ErrorHandler("Incorrect password",401))
    }
    else
        next(new ErrorHandler(`No user exists with email ${Email}`,401))
})


const about = asyncHandler(async(req,res,next)=>{
    const token = Number(req.user)
    const [result] = await pool.query("SELECT Name,BMI,Age,Height,Weight,Daily_Intake,Gender,Phone,Email FROM Users u,user_details ud WHERE u.User_ID = ud.User_ID AND u.User_ID = ?;",[token])
    res.status(200).json({success:true,message:"Data sent",result:result})
})

const userExists = asyncHandler(async(req,res,next)=>{
    const {Email,Phone} = req.body
    let [result] = await pool.query(`SELECT User_ID FROM Users WHERE Email = ? ;`,[Email])
    if(result.length)
       return next(new ErrorHandler("This email is already used, try loging in!",409))
    const [result2] = await pool.query(`SELECT User_ID FROM Users WHERE Phone = ? ;`,[Number(Phone)])
    if(result2.length)
       return next(new ErrorHandler("Phone number is already used"),409)
    res.status(200).json({success:true,message:"Good to go!"})
})

const complete = asyncHandler(async(req,res,next)=>{
    const User_ID = Number(req.user)
    let [result] = await pool.query("SELECT Consumed , Goal FROM calorie_track WHERE User_ID = ? AND Date =?;",[User_ID,_date])
        if(result.length && result[0].Consumed)
         res.status(200).json({success:true,result:[{Consumed:result[0].Consumed,Goal:result[0].Goal}]})
        else
        {
            [result] = await pool.query("SELECT Daily_Intake FROM user_details WHERE User_ID = ?;",[User_ID])
            res.status(200).json({success:true,result:[{Consumed:0,Goal:result[0].Daily_Intake}]})
        }
})
module.exports = {signup,login,about,userExists,complete}