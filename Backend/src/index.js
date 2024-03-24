require("dotenv").config();
const pool = require("./DB/Connect.js")
const app = require("./App.js")
const port = process.env.PORT;

try{
    if(pool){
        app.listen(port, () => {
            console.log("Listening to port ", port);
          });
          console.log("Connected to database");
    }
  
} catch(err){
    console.log("error in database cononection :",err)
}