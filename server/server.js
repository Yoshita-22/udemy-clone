import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./configs/mongodb.js";
import { clerkWebhooks, stripeWebhooks } from "./controllers/webhook.js";
import EducatorRouter from "./routes/EducatorRouter.js";
import { clerkMiddleware } from "@clerk/express";
import ConnectCloudinary from "./configs/ConnectCloudinary.js";
import courseRouter from "./routes/CourseRouter.js";
import UserRouter from "./routes/UserRouter.js";
//initialise express app
const app = express();

//connect to database
await connectDB()
//connect to cloudinary
await ConnectCloudinary();

//middleware
app.use(cors());
app.use(clerkMiddleware())

//Routes
app.get("/",(req,res)=>{
    res.send("API WORKING");
});
//
app.post("/clerk",express.json(),clerkWebhooks)
app.use("/api/educator/",express.json(),EducatorRouter);
app.use("/api/course",express.json(),courseRouter);
app.use("/api/user",express.json(),UserRouter);
app.post("/stripe", express.raw({ type: "application/json" }), (req, res) => {
    console.log("🔥 Incoming headers:", req.headers);
    res.sendStatus(200);
  });
  

const PORT = process.env.PORT||5000;
app.listen(PORT,()=>{
    console.log(`Server running on ${PORT}`);
})

