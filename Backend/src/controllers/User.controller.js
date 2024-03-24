const  pool  = require("../DB/Connect.js");
const bcrypt = require('bcrypt');
const date = new Date()

const signup = async(req,res,next)=>{
    try{
        const {Name,Email,Phone,Password,DOB,Gender,BMI,BMR,Age,Height,Weight,Daily_Intake,Food_pref,Activity_rate,Goal} = req.body;
        const User_ID = Math.floor(Math.random()*1000000)
        const weightHash = Math.floor(Math.random()*1000000)
        const bcPassword = bcrypt.hashSync(Password,10)
        const Join_date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        await pool.query("INSERT INTO Users VALUES (?,?,?,?,?,?,?);",[User_ID,Name,Email,Number(Phone),bcPassword,Join_date,DOB])
        //res.cookie("Auth",User_ID)
        await pool.query(`INSERT INTO User_details VALUES (${User_ID},'${Gender}',${BMI},${Math.floor(BMR)},${Number(Age)},${Number(Height)},${Number(Weight)},${Daily_Intake},${Food_pref},${Activity_rate},${Goal});`)
        await pool.query(`INSERT INTO weight_log VALUES (?,?,?,?);`,[User_ID,weightHash,Join_date,Weight]) 
        res.status(200).json({success:true,message:"User created"})

    }catch(err){  
            
            res.status(400).json({success:false,message:err})
            
    }
}

const login = async (req,res,next)=>{
    try{
        const {Email,Password} = req.body;
        const[result] = await pool.query("SELECT Password,User_ID FROM Users WHERE Email = ? ;",[Email])
        if(result.length){
            //{expires: new Date(Date.now()+(90*60*1000)),httpOnly:true,sameSite:"none",secure:true}
            if(bcrypt.compareSync(Password,result[0].Password)){
                res.cookie('AuthToken',result[0].User_ID,{httpOnly:true,sameSite:"none",secure:true})
                res.status(200).send({success:true,message:"logged in",User_ID:result[0].User_ID})
            }
            else
            res.status(400).send({success:false,message:"Incorrect password"})
        }
        else
        res.status(400).send({success:false,message:"User doesn't exist"})
        }catch(err){
            console.log(err)
            res.status(500).send({success:false,message:"Internal server error",err:err})   
        }
}

const about = async (req,res,next)=>{
    try{
        const token = Number(req.cookies.AuthToken)
        const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        //const [result] = await pool.query("SELECT Name,BMI,BMR,Age,Height,Weight,Daily_Intake,Gender FROM Users u JOIN User_details ud ON u.User_ID=ud.User_ID WHERE u.User_ID=454578 ;",[token])
        const [result] = await pool.query("SELECT Name,BMI,Age,Height,Weight,Daily_Intake,Gender,Phone,Email FROM Users u,user_details ud WHERE u.User_ID = ud.User_ID AND u.User_ID = ?;",[token])
        res.status(200).json({success:true,message:"Data sent",result:result})
       }catch(err){
        res.status(500).json({success:false,message:"Internal server error"})
       }
}

const userExists = async(req,res,next)=>{
    try{
        const {Email,Phone} = req.body
        let [result] = await pool.query(`SELECT User_ID FROM Users WHERE Email = ? ;`,[Email])
        if(result.length)
            return res.status(200).json({success:false,message:"Looks like the user exists, try another Email ID"})
        const [result2] = await pool.query(`SELECT User_ID FROM Users WHERE Phone = ? ;`,[Number(Phone)])
        if(result2.length)
            return res.status(200).json({success:false,message:"Looks like the user exists, try another Phone number"})
        res.status(200).json({success:true,message:"Good to go!"})
    }catch(err){
        res.status(500).json({success:false,message:"Internal server error"})
    }
}

const complete = async(req,res,next)=>{
    try{
        const User_ID = Number(req.cookies.AuthToken)
        const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        let [result] = await pool.query("SELECT Consumed , Goal FROM calorie_track WHERE User_ID = ? AND Date =?;",[User_ID,_date])
        if(result.length && result[0].Consumed)
         res.status(200).json({success:true,result:[{Consumed:result[0].Consumed,Goal:result[0].Goal}]})
        else
        {
            [result] = await pool.query("SELECT Daily_Intake FROM user_details WHERE User_ID = ?;",[User_ID])
            res.status(200).json({success:true,result:[{Consumed:0,Goal:result[0].Daily_Intake}]})
        }
       }catch(err){
        res.status(200).json({success:true,Message:"Oops something went wrong"})
       }
}
module.exports = {signup,login,about,userExists,complete}