import {clerkClient} from "@clerk/express"
import {v2 as cloudinary} from "cloudinary";
import course from "../models/Course.js";
import mongoose from "mongoose";
import { purchase } from "../models/Purchase.js";

export const UpdateRoleToEducator = async(req,res)=>{
    try{
        const userId = req.auth.userId;
        await clerkClient.users.updateUserMetadata(userId,{
            publicMetadata:{
                role:'educator',
            }
        })
        res.json({success:true,message:"You can Publish a course now"});
    }catch(err){
        res.json({success:false,message:err.message});
    }
}
export const AddNewCourse = async(req,res)=>{
    try {
       
         
        const parsedNewCourse = JSON.parse(req.body.courseData);
        
        const imageFile = req.file;
        const educatorId = req.auth.userId;
   
        if(!imageFile){
            res.json({success:false,message:"Thumbnail not attached"});
        }
        

        const imageUpload = await cloudinary.uploader.upload(imageFile.path);
        parsedNewCourse.educator = educatorId;
        
        const newCourse =await course.create(parsedNewCourse);
        const courseThumbnail = imageUpload.secure_url;
        newCourse.courseThumbnail = courseThumbnail;;
        
        await newCourse.save();
        res.json({success:true,message:"Course Added"});
    } catch (error) {
        console.log(error.message);
        res.json({success:false,message:error.message});
    }
}

//get all courses of a educator
export const getAllCourses = async(req,res)=>{
   try {
    const educator = req.auth.userId;
    const allCourses =await course.find({educator});
    res.send({success:true,allCourses});
   } catch (error) {
    res.send({success:false,message:error.message});
   }
}

//educator dashboard(total earnings,enrolled students,  No of courses)

export const educatorDashboard = async(req,res)=>{
    try {
        //calculate total earnings
        const educator = req.auth.userId;
        //get all the courses that educator offered
        const Educatorcourses =await course.find({educator});
        const course_ids =  Educatorcourses.map((course)=>course._id)
        const purchases =await purchase.find({
            courseId:{$in:course_ids},
            status:"completed"
        });
        const totalEarnings = purchases.reduce((sum,purchase)=>sum+purchase.amount,0);
        
        //total courses offered by educator
        const totalCourses = Educatorcourses.length;
        //get unique enrolled student data(name,imageUrl) with their course titles
        const enrolledStudentsData = []
        for(let course of Educatorcourses){
            const students =await  User.find({
                _id:{$in:course.enrolledStudents}
            },'name imageUrl');
            students.forEach(student=> {
                enrolledStudentsData.push({
                    courseTitle:course.courseTitle,
                    student
                })
                
            });
        }

        res.send({success:true,dashbordData:{totalEarnings,totalCourses,enrolledStudentsData}})


    } catch (error) {
        res.send({success:false,message:error.message});
    }
}

//get all the purchased students data with course data
export const getpurchasedStudents = async(req,res)=>{
    try{
        const educator = req.auth.userId;
    const Educatorcourses =await course.find({educator});
    const course_ids =  Educatorcourses.map((course)=>course._id);
    const purchases = await purchases.find({
        courseId:{$in:course_ids},
        status:"completed"
    }).populate('userId','name imageUrl').populate('courseId','courseTitle');

    const enrolledStudents = purchases.map(purchase=>({
        student:purchase.userId,
        courseTitle:purchase.courseTitle,
        purchaseDate:purchase.createdAt
    }));
    res.send({success:true,enrolledStudents});
    }catch(error){res.send({success:false,message:error.message})};
 
}
