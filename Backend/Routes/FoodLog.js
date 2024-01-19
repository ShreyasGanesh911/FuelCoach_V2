const express = require("express")
const auth = require('../Auth.js')
const pool = require("../Connection/Connect.js")
const foodRoute = express.Router()
const date = new Date()
// get logged food
foodRoute.get("/logged",auth,async(req,res)=>{
    try{
        const User_ID = req.cookies.AuthToken;
        const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        
        const [result] = await pool.query("SELECT Calories,date,Tag,FoodName,Qty,FoodHash FROM foodlog WHERE User_ID = ? AND date = ? ORDER BY Time;",[User_ID,_date])
        res.status(200).json({status:true,result:result})
    }catch(err){
        res.status(500).send({status:false,message:"Internal server error"})
    }
   

})
// Log food
foodRoute.post('/add',auth,async(req,res)=>{
    try{
    const{Calories,Tag,Qty,FoodName} = req.body
    const User_ID = Number(req.cookies.AuthToken);
    const foodHash = Math.floor(Math.random()*1000000)
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    await pool.query("INSERT INTO foodlog VALUES (?,?,?,?,?,?,?,?);",[User_ID,foodHash,Calories,_date,Tag,date.getTime(),FoodName,Qty])
    let [result] = await pool.query("SELECT * FROM calorie_track WHERE User_ID = ? AND Date =?;",[User_ID,_date])
    if(result.length)
        await pool.query('UPDATE calorie_track SET Consumed = Consumed + ? WHERE User_Id = ? AND Date = ?;',[Calories,User_ID,_date])
    else
        await pool.query('INSERT INTO calorie_track VALUES(?,?,?,(select Daily_Intake FROM user_details WHERE User_ID = ?));',[User_ID,_date,Calories,User_ID])

    res.status(200).send({success:true,Message:"Food Logged"})
    }catch(err){
        res.status(500).send({success:false,Message:"Internal server error"})
    }
})







// Remove logged food
foodRoute.post('/remove',auth,async(req,res)=>{
    try{
        const{FoodHash,Calories} = req.body
        const nFoodHash = Number(FoodHash)
        const User_ID = req.cookies.AuthToken;
        const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
        await pool.query("DELETE FROM foodlog WHERE User_ID = ? AND FoodHash = ?;",[User_ID,nFoodHash])
        await pool.query('UPDATE calorie_track SET Consumed = Consumed - ? WHERE User_Id = ? AND Date = ?;',[Calories,User_ID,_date])
        res.status(200).send({success:true,Message:"Logged food removed!"})
    }catch(err){
        res.status(500).send({success:false,Message:err})
    }
})

// search for food 
foodRoute.post('/search',auth,async(req,res)=>{
    try{
        const {query} = req.body
        const key = "cLStwAiKjoo1aMlCpC80SA==vQXVCIc79yvN9mcE"
        const url = 'https://api.api-ninjas.com/v1/nutrition?query='
        const data = await fetch(url+query,{
            method: 'GET',
           headers: {
               'X-Api-Key': key,
               contentType: 'application/json',
           },
           
       })
       const responce = await data.json()
       console.log(responce.length)
       if(responce.length)
        res.status(200).json({success:true,result:responce})
       //console.log(responce[0].name)
       else
       res.status(200).json({success:false,message:"no data found"})
    }catch(err){
        res.status(400).json({success:false,message:err})
    }
})
module.exports = foodRoute;