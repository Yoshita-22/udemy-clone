import express from "express";
import { AddNewCourse, UpdateRoleToEducator, educatorDashboard, getAllCourses, getpurchasedStudents } from "../controllers/EducatorController.js";
import protectEducator from "../middlewares/authMiddleWare.js";
import upload from "../configs/multer.js";

const EducatorRouter = express.Router();

EducatorRouter.post("/update-role",UpdateRoleToEducator);
EducatorRouter.post("/add-course",upload.single("image"),protectEducator,AddNewCourse);
EducatorRouter.get("/courses",protectEducator,getAllCourses);
EducatorRouter.get("/dashborad",protectEducator,educatorDashboard);
EducatorRouter.get("/enrolled-students",protectEducator,getpurchasedStudents);
export default EducatorRouter;