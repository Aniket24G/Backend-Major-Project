// require('dotenv').config({path:'./env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";
import {app} from "./app.js";
import {PORT_NO} from "./constants.js";

dotenv.config({
  path: "./env",
});

connectDB()
  .then(() => {
    app.on("error", (err) => {
      console.error("Error with the application", err);
      throw err;
    });

    app.listen(PORT_NO, () => {
      console.log(`Application is listening on port: ${PORT_NO}`);
    });
  })
  .catch((err) => console.log("MongoDB connection failed", err));

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
