import mongoose from "mongoose";
import {DB_NAME} from '../constants.js'

const connectDB = async () => {
    try {
        const connectionInstance = mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected!! HOST:${(await connectionInstance).connection.host}`);
    } catch (error) {
        console.error("Error in db connection",error);
        process.exit(1);
    }
}

export default connectDB;