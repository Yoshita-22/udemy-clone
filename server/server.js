import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks } from "./controllers/webhook.js";
//initialise express app
const app = express();

//connect to database
await connectDB()


//middleware
app.use(cors());

//Routes
app.get("/",(req,res)=>{
    res.send("API WORKING");
});

app.post("/clerk",express.json(),clerkWebhooks)

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})

