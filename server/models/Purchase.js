import mongoose from "mongoose";

//Purchase Model
const purchaseSchema = new mongoose.Schema({
    courseId:{
        type:String,
        ref:"course",
        required:true
    },
    userId:{
        type:String,
        ref:"User",
        required:true
    },
    status:{type:String,enum:["pending","completed","failed"],default:"pending"},
    amount:{type:Number,required:true}

},{timestamps:true});
export const purchase = mongoose.model("Purchase",purchaseSchema);