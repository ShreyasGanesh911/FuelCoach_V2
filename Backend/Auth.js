const pool = require('./Connection/Connect.js')
const auth = async(req,res,next)=>{
    const token = req.cookies.Auth
    console.log(token)
    if(token){
        const [result] = await pool.query("SELECT User_ID FROM Users WHERE User_ID = ?;",[token]) 
        if(result.length)
            next()
        else
        res.status(400).send("Login first")
    }
        
    else
    res.status(400).send("Login first")
}
module.exports = auth