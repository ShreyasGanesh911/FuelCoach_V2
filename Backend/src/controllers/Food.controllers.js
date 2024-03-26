const pool = require("../DB/Connect.js");
require('dotenv').config()
const asyncHandler = require("../Utils/AsyncHandler.js");
const ErrorHandler = require("../Utils/ErrorHandler.js");
const date = new Date()


const loggedFood = asyncHandler(async(req,res,next)=>{  
    const User_ID = Number(req.user);
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    const [result] = await pool.query("SELECT Calories,date,Tag,FoodName,Qty,FoodHash FROM foodlog WHERE User_ID = ? AND date = ? ORDER BY Time;",[User_ID,_date])
    res.status(200).json({status:true,result:result})
})

const addFood = asyncHandler(async(req,res,next)=>{
    const{Calories,Tag,Qty,FoodName} = req.body
    const User_ID = Number(req.user);
    const foodHash = Math.floor(Math.random()*1000000)
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    await pool.query("INSERT INTO foodlog VALUES (?,?,?,?,?,?,?,?);",[User_ID,foodHash,Calories,_date,Tag,date.getTime(),FoodName,Qty])
    let [result] = await pool.query("SELECT * FROM calorie_track WHERE User_ID = ? AND Date =?;",[User_ID,_date])
    if(result.length)
        await pool.query('UPDATE calorie_track SET Consumed = Consumed + ? WHERE User_Id = ? AND Date = ?;',[Calories,User_ID,_date])
    else
        await pool.query('INSERT INTO calorie_track VALUES(?,?,?,(select Daily_Intake FROM user_details WHERE User_ID = ?));',[User_ID,_date,Calories,User_ID])

    res.status(200).send({success:true,Message:"Food Logged"})
})

const removeFood = asyncHandler(async(req,res,next)=>{
    const{FoodHash,Calories} = req.body
    const nFoodHash = Number(FoodHash)
    const User_ID = Number(req.user);  
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    await pool.query("DELETE FROM foodlog WHERE User_ID = ? AND FoodHash = ?;",[User_ID,nFoodHash])
    await pool.query('UPDATE calorie_track SET Consumed = Consumed - ? WHERE User_Id = ? AND Date = ?;',[Calories,User_ID,_date])
    res.status(200).send({success:true,Message:"Logged food removed!"})
})


const searchFood = asyncHandler(async(req,res,next)=>{
    const {query} = req.body
    const url = process.env.APIURL
    const data = await fetch(url+query,{
        method: 'GET',
       headers: {
           'X-Api-Key': process.env.APIKEY,
           contentType: 'application/json',
       },
       
   })
   const responce = await data.json()
   if(responce.length && data.status == 200)
        res.status(200).json({success:true,result:responce})
   else if (data.status != 200)
    next(new ErrorHandler("API Error",500))
    else
        next(new ErrorHandler("No data found",404))
        
})
module.exports = {loggedFood,addFood,removeFood,searchFood}