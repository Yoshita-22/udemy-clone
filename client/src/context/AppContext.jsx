import {createContext,useEffect,useState} from "react";
import { dummyCourses } from "../assets/assets";
import humanizeDuration from "humanize-duration";
import {useAuth,useUser} from "@clerk/clerk-react";
export const AppContext=createContext()
export const AppContextProvider=(props)=>{
    //const currency=import.meta.env.VITE_CURRENCY
    const [allCourses,setAllCourses]=useState([]);
    const [enrolledCourses,setEnrolledCourses] = useState([]);
    const [isEducator,setIsEducator]=useState(true)
    //Fetch all courses
    const fetchAllCourses=async()=>{
        setAllCourses(dummyCourses)
    }

    const {getToken} = useAuth();
    const {user} = useUser();
    const calculateRating=(course)=>{
        if(course.courseRatings.length===0){
            return 0;
        }
        let totalRating=0
        course.courseRatings.forEach(rating=>{
            totalRating+=rating.rating
        })
        return totalRating/course.courseRatings.length
}
    const fetchEnrolledCourses = async()=>{
        setEnrolledCourses(dummyCourses)
    }
 //functiom to calculate course chapter time  
 
 
 //function to calculate total hours for a particular course
 const calculateTotalDuration = (course) => {
    const totalDuration= course.courseContent.reduce((total, chap) => {
        return total + chap.chapterContent.reduce((acc, lecture) => acc + lecture.lectureDuration, 0);
    }, 0);
    return humanizeDuration(totalDuration*60*1000,{units: ["h", "m"]});
 }
 const calculateNoOfLectures = (course)=>{
    return course.courseContent.reduce((acc,lecture)=>{
        return acc+lecture.chapterContent.reduce((acc,course)=>{return acc+1},0)
    },0);
    
 }
 const [FavouriteItems,setFavouriteItems] = useState([])

 const calculateChapterTime = (chapter)=>{
    const totalChapterTime =  chapter.chapterContent.reduce((acc,lecture)=>acc+lecture.lectureDuration,0);
    return humanizeDuration(totalChapterTime*60*1000,{units:["h","m"]});
 }
useEffect(()=>{
    fetchAllCourses(),
    fetchEnrolledCourses()
},[])

const logToken = async()=>{
    console.log(await getToken())
}
useEffect(()=>{
    if(user){
        logToken()
    }
},[user])
    const value={
        isEducator,
        setIsEducator,
        allCourses,
        calculateRating,
        fetchEnrolledCourses,
        enrolledCourses,
        calculateTotalDuration,
        calculateNoOfLectures,
        calculateChapterTime,
        FavouriteItems,
        setFavouriteItems,
       
    }

    
    return (
        <AppContext.Provider value={value}>
            {props.children}
        </AppContext.Provider>
    )
}