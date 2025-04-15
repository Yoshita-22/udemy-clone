import mongoose from "mongoose";

//connect to mongodb database

async function connectDB(){
    mongoose.connection.on("connected",()=>console.log("database connected"));
    await mongoose.connect(`${process.env.MONGODB_URI}/udemy`)
} 
export default connectDB;