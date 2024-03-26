const express = require("express")
const auth = require('../Middlewares/Auth.js')
const { searchFood, addFood, removeFood, loggedFood } = require("../controllers/Food.controllers.js")
const foodRoute = express.Router()

// get logged food
foodRoute.get("/logged",auth,loggedFood)
// Log food
foodRoute.post('/add',auth,addFood)
// Remove logged food
foodRoute.post('/remove',auth,removeFood)

// search for food 
foodRoute.post('/search',auth,searchFood)
module.exports = foodRoute;