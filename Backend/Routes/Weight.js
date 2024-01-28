const express = require("express")
const weightRoute = express.Router()
const pool = require("../Connection/Connect.js")
const auth = require("../Auth.js")
const date = new Date()
// Push weight to DB , but if it exists dont add, instead update
weightRoute.post('/add',auth,async(req,res)=>{
    try{
    const User_ID = req.cookies.AuthToken
    const {Weight} = req.body
    const weightHash = Math.floor(Math.random()*1000000)
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    let [result] = await pool.query("SELECT * FROM weight_log WHERE Date = ?; ",[_date])
    if(result.length){
        await pool.query("UPDATE weight_log SET Weight = ? WHERE Date = ? AND User_ID = ?;",[Weight,_date,User_ID])
    }
    else{
        await pool.query("INSERT INTO weight_log VALUES (?,?,?,?);",[User_ID,weightHash,_date,Weight])
    }
    [result] = await pool.query(`SELECT Height FROM user_details WHERE User_ID =?;`,[User_ID])
    console.log(result[0].Height)
    await pool.query(`UPDATE user_details set BMI =(?/(?*?))*10000;`,[Weight,result[0].Height,result[0].Height])
    await pool.query(`UPDATE user_details set Weight = ? WHERE User_ID = ?;`,[Weight,User_ID])
     res.status(200).send({success:true,message:"Weight logged!"})
    }catch(err){
        res.status(500).send({success:false,message:"Something went wrong!"})
    }
    
})
// get users 6 latest weights
weightRoute.get('/getAllWeightLogs',auth,async(req,res)=>{
    try{
        const User_ID = Number(req.cookies.AuthToken)
        const [result] = await pool.query(`SELECT Weight,CONCAT(day(Date)," ",monthname(Date)) AS Month FROM weight_log WHERE User_ID = ? ORDER BY Date DESC LIMIT 6;`,[User_ID])
        res.status(200).json({success:true,result:result})  
    }catch(err){
        res.status(500).json({success:false,result:{message:"internal server error"}})  
    }
    
})
module.exports = weightRoute