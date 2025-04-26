import express from "express";
import { getAllCourses, getCourseById } from "../controllers/CourseController.js";

const courseRouter = express.Router();

courseRouter.get("/all",getAllCourses);
courseRouter.get("/:id",getCourseById);

export default courseRouter;