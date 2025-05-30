
import User from "../models/User.js";
import course from "../models/Course.js";
import { purchase } from "../models/Purchase.js";
import Stripe from "stripe";

//get user data
export const getUserData = async(req,res)=>{
   try{
    const userId = req.auth.userId;
    const user = await User.findById(userId);
    if(!user){
        res.json({success:false,message:"User Not Found"});
    }
    res.json({success:true,user});
   }catch(error){res.json({success:false,message:error.message})};
}
//get user Enrolled courses
export const getUserEnrolledCourses = async(req,res)=>{
    try {
        const userId = req.auth.userId;
        const userData = await User.findById(userId).populate("enrolledCourses");
        if (userData.enrolledCourses.length === 0) {
            res.json({success:false,message:"You haven't enrolled in any courses yet"})
        }
        res.json({success:true,enrolledCourses:userData.enrolledCourses});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
}
//purchase Course
export const purchaseCourse = async(req,res)=>{
    try {
    const {courseId} = req.body;
    const userId = req.auth.userId;
    const {origin} = req.headers;
    const userData = await User.findById(userId);
    const courseData = await course.findById(courseId);

    if(!userData || !courseData){
        return res.json({success:false,message:"Data Not Found"});
    }
    const purchaseData = {
        courseId:courseData._id,
        userId,
        amount:Number((courseData.coursePrice-courseData.discount*courseData.coursePrice/100).toFixed(2))
    }
    
        const newPurchase  = await purchase.create(purchaseData);
        await newPurchase.save();
        const purchaseCoursess = await purchase.findById(newPurchase._id);

    //initialise stripe payment gateway
    const stripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY)

    const currency = process.env.CURRENCY.toLowerCase()

    //creating line items to stripe
    const line_items = [
        {
            price_data:{
                currency,
                product_data:{
                    name:courseData.courseTitle
                },
                unit_amount:Math.floor(newPurchase.amount)*100
            },
            quantity:1
        }
    ];
    const session = await stripeInstance.checkout.sessions.create({
        success_url:`${origin}loading/my-enrollments`,
        cancel_url:`${origin}/`,
        line_items:line_items,
        mode:'payment',
        metadata:{
            purchaseId:newPurchase._id.toString()
        }
    })
    res.json({success:true,session_url:session.url});
    } catch (error) {
        res.json({success:false,message:error.message});
    }
} 