import mongoose from "mongoose";

const lectureSchema = mongoose.Schema({
    lectureId:{type:String,required:true},
    lectureTitle:{type:String,required:true},
    lectureDuration:{type:Number,required:true},
    isPreviewFree:{type:Boolean,required:true},
    lectureUrl:{type:String,required:true}
},{_id:false})
const chapterSchema = mongoose.Schema({
    chapter_id:{type:String,required:true},
    chapterTitle:{type:String,required:true},
    chapterOrder:{type:Number,required:true},
    chapterContent:[lectureSchema]
},{_id:false})
//course schema
const CourseSchema = new mongoose.Schema({
    courseTitle:{type:String,required:true},
    courseDescription:{type:String,required:true},
    courseThumbnail:{type:String},
    coursePrice:{type:Number,required:true},
    isPublished:{type:Boolean,default:true},
    discount:{type:Number,min:0,max:100,required:true},
    courseContent:[chapterSchema],
    courseRatings:[
        {
            userId:String,
            ratings:{type:Number,min:1,max:5}
        }
    ],
    educator:{
        type:String,
        ref:"User",
        required:true
    },
    enrolledStudents:[
        {
            type:String,
            ref:"User",
        }
    ]
},{timestamps:true})
const course = mongoose.model("Course",CourseSchema);
export default course;