import React, { useContext } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom';
import { Line } from 'rc-progress';
const MyEnrollments = () => {
  const {enrolledCourses,calculateTotalDuration} = useContext(AppContext);
  const navigate = useNavigate();
  return (
    <>
    <div className = "md:px-36 px-8 pt-10">
      <h1 className='text-2xl font-semibold'>My Enrollments</h1>
      <table className='md:table-auto table-fixed w-full overflow-hidden border mt-10'>
        <thead className = 'text-gray-900 border-b border-gray-500/20 text-sm text-left max-sm:hidden'>
        <tr>
          <th className='px-4 py-3 font-semibold truncate'>Course</th>
          <th className='px-4 py-3 font-semibold truncate'>Duration</th>
          <th className='px-4 py-3 font-semibold truncate'>Completed</th>
          <th className='px-4 py-3 font-semibold truncate'>Status</th>
        </tr>
        </thead>
        <tbody>
        {enrolledCourses.map((course,index)=>{
          let progressPercentage = 10;
            return (
              <>
            <tr key = {index} >
            <td className='px-2 py-2'>
              <div className='d-flex gap-3'>
                <img src = {course.courseThumbnail} alt = "" className='rounded w-14 sm:w-14' />
                <div>
                <p>{course.courseTitle}</p>
                
                <Line percent={progressPercentage} strokeWidth={2} strokeColor={progressPercentage<50 ? "#ff0000":"green"}/>
                </div>
              </div>
            </td>
            <td>
              <p>{calculateTotalDuration(course)}</p>
              
              
            </td>
            <td>
              4/5
            </td>
            <td>
              
            <button className={`rounded p-2 border text-white transition duration-300 ${
                progressPercentage === 100
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-blue-600 hover:bg-blue-700"
              }`} onClick = {()=>navigate("/player"+course._id)}>{progressPercentage===100?"Completed":"On Going"}</button>
            </td>
            </tr>
            </>
            )
          })}
        
      
        </tbody>
      </table>

    </div>
    
    </>
  )
}

export default MyEnrollments
