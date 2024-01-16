const express = require("express")
const weightRoute = express.Router()
const pool = require("../Connection/Connect.js")
const auth = require("../Auth.js")
const date = new Date()
// Push weight to DB , but if it exists dont add, instead update
weightRoute.post('/add',auth,async(req,res)=>{
    try{
    const User_ID = req.cookies.Auth
    const {Weight} = req.body
    const weightHash = Math.floor(Math.random()*1000000)
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const [result] = await pool.query("SELECT * FROM weight_log WHERE Date = ?; ",[_date])
    if(result.length)
        await pool.query("UPDATE weight_log SET Weight = ? WHERE Date = ? AND User_ID = ?;",[Weight,_date,User_ID])
    else
        await pool.query("INSERT INTO weight_log VALUES (?,?,?,?);",[User_ID,weightHash,_date,Weight])
    res.status(200).send({success:true,message:"Weight logged!"})
    }catch(err){
        res.status(500).send({success:false,message:"Something went wrong!"})
    }
    
})
// get users 6 latest weights
weightRoute.get('/getAllWeightLogs',auth,async(req,res)=>{
    const User_ID = req.cookies.Auth
    const [result] = await pool.query("SELECT Weight,Date FROM weight_log WHERE User_ID = ? ORDER BY Date LIMIT 6;",[User_ID])
    res.send(result)
})
module.exports = weightRoute