const express = require('express')
const userRouter = express.Router()
const auth = require('../Middlewares/Auth.js')
const { signup, login,about, complete, userExists } = require('../controllers/User.controller.js');

userRouter.post("/signup",signup)      
userRouter.post("/login",login)
userRouter.post('/checkUserExists',userExists)
userRouter.get('/about',auth,about)

userRouter.get('/completed',auth,complete)
module.exports = userRouter 