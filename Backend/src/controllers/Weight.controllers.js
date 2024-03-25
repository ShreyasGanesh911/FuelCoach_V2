const  pool  = require("../DB/Connect");
const date = new Date()
const asyncHandler = require("../Utils/AsyncHandler")


const addWeight = asyncHandler(async(req,res,next)=>{
    const User_ID = req.cookies.AuthToken
    const {Weight} = req.body
    const weightHash = Math.floor(Math.random()*1000000)
    const _date = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
    let [result] = await pool.query("SELECT * FROM weight_log WHERE Date = ? AND user_ID = ?; ",[_date,User_ID])
    // if user has added today's weight already then 
    if(result.length){
        await pool.query("UPDATE weight_log SET Weight = ? WHERE Date = ? AND User_ID = ?;",[Weight,_date,User_ID])
    }
    else{
        await pool.query("INSERT INTO weight_log VALUES (?,?,?,?);",[User_ID,weightHash,_date,Weight])
    }
    // update BMI   
    [result] = await pool.query(`SELECT Height FROM user_details WHERE User_ID =?;`,[User_ID])
    await pool.query(`UPDATE user_details set BMI =(?/(?*?))*10000;`,[Weight,result[0].Height,result[0].Height])
    await pool.query(`UPDATE user_details set Weight = ? WHERE User_ID = ?;`,[Weight,User_ID])
     res.status(200).send({success:true,message:"Weight logged!"})
})


const getWeights = asyncHandler(async(req,res,next)=>{
    const User_ID = Number(req.cookies.AuthToken)
        const [result] = await pool.query(`SELECT Weight,CONCAT(day(Date)," ",monthname(Date)) AS Month FROM weight_log WHERE User_ID = ? ORDER BY Date DESC LIMIT 6;`,[User_ID])
        res.status(200).json({success:true,result:result})  
})
module.exports = {addWeight,getWeights}