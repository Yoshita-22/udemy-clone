import course from "../models/Course.js"

//get all courses
export const getAllCourses = async(req,res)=>{
    try {
        const courses = await course.find({isPublished:true}).select(["-courseContent","-enrolledStudents"]).populate({path:"educator"});
        res.json({success:true,courses})
    } catch (error) {
            res.json({success:false,message:error.message});
    }
}
//get course based on courseId
export const getCourseById = async(req,res)=>{
    try {
        const {id} = req.params;
        const courses = await course.find({_id:id}).populate({path:"educator"});
        //remove if ispreviewnotfree
        courses.courseContent.forEach((chapter)=>{
            chapter.chapterContent.forEach((lecture)=>{
                if(!lecture.isPreviewFree){
                    lecture.lectureUrl="";
                }
            })
        })
        res.json({success:true,courses});
    } catch (error) {
        res.json({success:false,message:error.message})
    }
}