import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

const connectDB = async ()=>{
  try {
    const connection_instance = await mongoose.connect(`${process.env.MONGODB_URL}/${DB_NAME}`);

    console.log(`MonogDB CONNECTED : ${connection_instance.connection.host}`);

  } catch (error) {
    console.error("ERROR : " , error);
    process.exit(1)
  }
}

export default connectDB;