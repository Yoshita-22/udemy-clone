import { Routes,Route, useMatch } from "react-router-dom";
import CoursesList from "./pages/student/CoursesList"
import Loading from "./components/student/Loading";
import MyEnrollments from "./pages/student/MyEnrollments";
import Player from "./pages/student/Player";
import Home from "./pages/student/Home";
import CourseDetails from "./pages/student/CourseDetails"
import Enrollments from "./pages/educator/Enrollments";
import AddCourse from "./pages/educator/AddCourse";
import EducatorDashBoard from "./pages/educator/EducatorDashBoard";
import EducatorPage from "./pages/educator/EducatorPage";
import MyCourses from "./pages/educator/MyCourses";
import 'bootstrap/dist/css/bootstrap.min.css';
import HomeNavbar from "./components/HomeNavbar";

function App(){
  const isEducatorRoute = useMatch("/educator/*")
  return(

   <div>
    {!isEducatorRoute && <HomeNavbar/>}
    <Routes>
      
      <Route path = "/" element = {<Home/>}/>
      <Route path = "/course-list" element = {<CoursesList/>}/>
      <Route path = "/course-list/:input" element = {<CoursesList/>}/>
      <Route path = "/course/:id" element = {<CourseDetails/>}/>
      <Route path = "/my-enrollments" element = {<MyEnrollments/>}/>
      <Route path = "/player/:courseId" element = {<Player/>}/>
      <Route path = "/loading/:path" element = {<Loading/>}/>
      <Route path = "/educator" element = {<EducatorPage/>}>
        <Route path = "/educator" element =  {<EducatorDashBoard/>}/>
        <Route path = "add-course" element =  {<AddCourse/>}/>  
        <Route path = "student-enrolled" element =  {<Enrollments/>}/>
        <Route path = "my-courses" element =  {<MyCourses/>}/>
      </Route>
    </Routes>
   </div>
  )
}
export default App;