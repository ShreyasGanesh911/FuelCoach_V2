const express = require("express")
const weightRoute = express.Router()
const auth = require('../Middlewares/Auth.js')
const { addWeight, getWeights } = require("../controllers/Weight.controllers.js")

// Push weight to DB , but if it exists dont add, instead update
weightRoute.post('/add',auth,addWeight)
// get users 6 latest weights
weightRoute.get('/getAllWeightLogs',auth,getWeights)

module.exports = weightRoute