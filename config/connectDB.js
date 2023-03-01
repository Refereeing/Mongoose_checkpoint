//require mongoose to connect
const mongoose = require('mongoose')
require("dotenv").config() 

//require dotenv to get the MONGO_URI
const MONGO_URI = process.env.MONGO_URI

 //connecting to Atlas database

 const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
        console.log("Database connected successfully")
    } catch (error) {
        console.log("An error has occured while trying to connect")
    }
}
module.exports= connectDB ;

