//initialize dependencies and import functions
const express = require("express")
const app = express();
//import connectDB
const connectDB=require("./config/connectDB");
//initialize the app
require("dotenv").config() 

//parsing data: JSON 
app.use(express.json())

//require router + import
const router = require('./routes/router')
app.use('/', router)
//connect to database
connectDB()
//create the port
const PORT= process.env.PORT || 8000;


app.listen (PORT, (err)=>
err ? console.log(err) : console.log (`server is running on ${PORT} `))

