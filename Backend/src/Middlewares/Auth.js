require('dotenv').config()
const jwt = require('jsonwebtoken')
const pool = require('../DB/Connect.js')
const ErrorHandler = require('../Utils/ErrorHandler.js')

const auth = async(req,res,next)=>{
    const token = req.cookies?.AuthToken    
    if(token){
        jwt.verify(token,process.env.JWTKEY,async(err,user)=>{
            if(err){
                res.clearCookie('AuthToken')
                return next(new ErrorHandler("Token doesn't exists",401))
            }
            const [result] = await pool.query("SELECT User_ID FROM Users WHERE User_ID = ?;",[user.id]) 
            if(result.length){
                req.user = user.id
                next()
            }
                
             else
                next(new ErrorHandler('Login First with fake token',401))
        })
       
    }
        
    else
    next(new ErrorHandler("Token doesn't exists",401))
    
}
module.exports = auth