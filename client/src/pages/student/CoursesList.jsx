import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { AppContext } from '../../context/AppContext';
import CourseCard from '../../components/student/CourseCard';
import { useContext,useState,useEffect } from 'react';
import { assets } from '../../assets/assets';
import Footer from "../../components/student/Footer"
const CoursesList = () => {
  const navigate = useNavigate();
  const {allCourses} = useContext(AppContext);
  const {input} = useParams();
  const [filteredCourses,setFilteredCourses] = useState([])
  useEffect(()=>{
    const tempCourses = allCourses.slice()
    if(allCourses && allCourses.length>0){
      input ? 
      setFilteredCourses(
        tempCourses.filter(
          item=>item.courseTitle.toLowerCase().includes(input.toLowerCase())
        )
      )
      :setFilteredCourses(tempCourses)
    }
  },[allCourses,input])
  return (
    <>
    <div className='relative md:px-10 px-8  text-left'>
        <div>
          <h1 className='text-4xl semi-bold text-gray-900'>Course List</h1>
          <p className='text-gray-600'>
            <span className='text-blue-500 cursor-pointer' onClick = {()=>navigate("/")}> Home </span>/ Course List
          </p>
        </div>
        <div className="container-fluid">
    <div className="row">
      {/* Filter tag should be wrapped in its own col-auto to take only required width */}
      {input && (
        <div className="col-*">
          <div className="d-inline-flex align-items-center border border-dark rounded p-3 mb-3">
            <p className="me-3 mb-0">{input}</p>
            <img
              src={assets.cross_icon}
              alt="Close"
              className="cursor-pointer"
              onClick={() => navigate("/course-list/")}
              style={{ width: "20px", height: "20px" }} // Adjust icon size
            />
          </div>
        </div>
      )}

    {/* Course Cards Grid */}
    {filteredCourses.map((course, index) => (
      <div key={index} className="col-md-6 col-xl-3">
        <CourseCard course={course} />
      </div>
    ))}
  </div>
</div>

    </div>
    <Footer/>
    </>
  )
}

export default CoursesList
