// require('dotenv').config({path:'./env'})
import dotenv from 'dotenv'
import connectDB from "./db/index.js"

dotenv.config({
    path:'./env'
})

connectDB();


/*
import express from 'express';
const app = express();

//javascript iffies - writing and calling function in same line
//      (()=>{})()

;(async()=>{
    try {
         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
         app.on("error",(error)=>{
            console.log('Error in application',error);
            throw error;
         })

         app.listen(process.env.PORT, () => {
            console.log(`App listening on port${process.env.PORT}`);
         })
    } catch (error) {
        console.error("Error conntecting to DB",error);
        throw error;
    }
})()

*/