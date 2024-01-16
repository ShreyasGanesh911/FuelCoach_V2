const express = require("express")
const auth = require('../Auth.js')
const pool = require("../Connection/Connect.js")
const foodRoute = express.Router()
const date = new Date()
// get logged food
foodRoute.get("/logged",auth,async(req,res)=>{
    try{
        const User_ID = req.cookies.Auth;
        const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        const [result] = await pool.query("SELECT Calories,date,Tag FROM foodlog WHERE User_ID = ? AND date = ? ORDER BY Time;",[User_ID,_date])
        res.status(200).json({status:true,result:result})
    }catch(err){
        res.status(500).send({status:false,message:"Internal server error"})
    }
   

})
// Log food
foodRoute.put('/add',auth,async(req,res)=>{
    try{
    const{Calories,Tag} = req.body
    const User_ID = req.cookies.Auth;
    const foodHash = Math.floor(Math.random()*1000000)
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    await pool.query("INSERT INTO foodlog VALUES (?,?,?,?,?,?);",[User_ID,foodHash,Calories,_date,Tag,date.getTime()])
    res.status(200).send({success:true,Message:"Food Logged"})
    }catch(err){
        res.status(500).send({success:false,Message:"Internal server error"})
    }
})

// Remove logged food
foodRoute.post('/remove',auth,async(req,res)=>{
    try{
        const{FoodHash} = req.body
        const User_ID = req.cookies.Auth;
        await pool.query("DELETE FROM foodlog WHERE User_ID = ? AND FoodHash = ?;",[User_ID,FoodHash])
        res.status(200).send({success:true,Message:"Logged food removed!"})
    }catch(err){
        res.status(500).send({success:false,Message:"Internal server error"})
    }
})
module.exports = foodRoute;