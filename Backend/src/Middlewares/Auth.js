const pool = require('../DB/Connect.js')
const ErrorHandler = require('../Utils/ErrorHandler.js')

const auth = async(req,res,next)=>{
    const token = req.cookies?.AuthToken    
    if(token){
        const [result] = await pool.query("SELECT User_ID FROM Users WHERE User_ID = ?;",[token]) 
        if(result.length)
            next()
        else
        next(new ErrorHandler('Login First with fake token',401))
    }
        
    else
    next(new ErrorHandler('Login First, token does not exist ',401))
    
}
module.exports = auth