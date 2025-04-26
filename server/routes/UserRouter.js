import express from "express";
import { getUserData, getUserEnrolledCourses, purchaseCourse } from "../controllers/UserController.js";
const UserRouter = express.Router();

UserRouter.get("/data",getUserData);
UserRouter.get("/enrolled-courses",getUserEnrolledCourses);
UserRouter.post('/purchase',purchaseCourse);
export default UserRouter;