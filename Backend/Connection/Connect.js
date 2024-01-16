const mysql = require("mysql2")
require("dotenv").config()
const pool = mysql.createPool({
    host:process.env.HOST,
    database:process.env.DATABASE,
    user:process.env.USER,
    password:process.env.PASSWORD
    
}).promise()

module.exports = pool