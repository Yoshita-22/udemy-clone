import React,{useContext,useEffect,useState} from 'react'
import {useNavigate, useParams}from 'react-router-dom'
import {AppContext}from '../../context/AppContext'
import Loading from '../../components/student/Loading'
import {assets}from '../../assets/assets'
import humanizeDuration from 'humanize-duration'
import Footer from '../../components/student/Footer'
import YouTube from'react-youtube'
import { IoMdHeartEmpty } from "react-icons/io";
import { FaHeart } from "react-icons/fa6";
import { useCart } from '../../context/CartContext'
const CourseDetails = () => {
  const {id}=useParams()
 
  const [courseData,setCourseData]=useState(null)
  const [openSections,setOpenSections]=useState({})
  const[isAlreadyEnrolled,setIsAlreadyEnrolled]=useState(false)
  const[playerData,setPlayerData]=useState(null)
  
  
  const navigate = useNavigate();

  const {allCourses,calculateRating,calculateNoOfLectures,calculateTotalDuration,
    calculateChapterTime,FavouriteItems,setFavouriteItems}=useContext(AppContext);
  const {CartItems,setCartItems,addToCart,isInCart} = useCart();
  
    useEffect(() => {
      console.log(FavouriteItems);
      console.log("Cart Items are",CartItems);
  }, [FavouriteItems,CartItems]);
    const fetchCourseData=async ()=>{
    const findCourse=allCourses.find(course=>course._id===id)
    setCourseData(findCourse);
  }
  useEffect(()=>{
    fetchCourseData()

  },[allCourses])

  
  const toggleSection=(index)=>{
      setOpenSections((prev)=>(
        {...prev,
          [index]:!prev[index],
        }
      ));
  };
  return courseData ? (
    <>
    <div className='flex md:flex-row flex-col-reverse gap-10 relative items-start
    justify-between md:px-15 px-8  pt-20 text-left'>
      <div className='absolute top-0 left-0 w-full h-section-height -z-1 
      bg-gradient-to-b from-cyan-100/70'>
      </div>
      {/*left column*/}
      <div className='max-w-xl z-10 text-gray-500'>
          <h1 className='md:text-9xl
          text-course-details-heading-small font-semibold text-gray-800'>{courseData.courseTitle}</h1>
         <p className=' md:text-base text-sm' 
          dangerouslySetInnerHTML={{ __html: courseData.courseDescription.slice(0, 200) }}>
        </p>


      {/*review and ratings */}
      <div className='flex items-center space-x-2 pt-3 pb-1 text-sm'>
          <p className='mb-0'>{calculateRating(courseData)}</p>
          <div className='flex'>
            {[...Array(5)].map((_,i)=>(<img key={i} src={i<Math.floor(calculateRating(courseData))?assets.star:assets.star_blank} 
            alt='' className='w-3.5 h-3.5'/>))}
          </div>
          <p className='text-gray-500 mb-0'>{courseData.courseRatings.length}
            {courseData.courseRatings.length>1 ? 'ratings':'rating'}</p>
        
          <p className='mb-0'>{courseData.enrolledStudents.length}
            {courseData.enrolledStudents.length>1?'students':'student'}</p>
        </div>
        
        <p className=' mb-0'>Course by
          <span className='text-blue-600'> Greatstack</span></p>
        
        <div className='pt-8 text-gray-800'>
            <h2 className='text-xl font-semibold'>Course Structure</h2>
            
            <div className='pt-5'>
              {courseData.courseContent.map((chapter,index)=>(
                <div key={index} className='border border-gray-300 bg-white mb-2 rounded'>
                  <div className='flex items-center justify-between px-4 py-3 gap-3
                  cursor-pointer select-none'onClick={()=>toggleSection(index)}>
                    <div className='flex items-center gap-2'>
                      <img className={`transform transition-transform ${openSections[index] ? 'rotate-180':''}`}
                      src={assets.down_arrow_icon}alt="arrow icon" />
                      <p className='font-medium md:text-base text-sm mb-0 '>{chapter.chapterTitle}</p>
                    </div>
                    <p className='text-sm md:text-default mb-0'>{chapter.chapterContent.length}lectures-
                      {calculateChapterTime(chapter)}</p>
                  </div>
                  <div className={`overflow-hidden transition-all duration-300 ${openSections[index] ? 'max-h-96':'max-h-0'}`}>
                    <ul className='list-disc md:pl-10 pl-4 pr-4 py-2 text-gray-600
                    border-t border-gray-300'>
                      {chapter.chapterContent.map((lecture,i)=>(
                        <li key={i}className='flex items-start gap-2 py-1'>
                          <img src={assets.play_icon} alt="play icon"className='w-4
                          h-4 '/>
                          <div className='flex items-center justify-between w-full 
                          text-gray-800 text-xs md:text-default'>
                            <p>{lecture.lectureTitle}</p>
                            <div className='flex gap-2'>
                            {lecture.isPreviewFree &&<p 
                            onClick={()=>setPlayerData(
                              {videoId:lecture.lectureUrl.split('/').pop()}

                            )}
                            
                            className='text-blue-500
                            cursor-pointer'>Preview</p>}
                              <p>{humanizeDuration(lecture.lectureDuration*60*1000,{units:["h","m"]})}</p>
                            </div>
                          </div>
                        </li>

                      ))}
                    </ul>
                  </div>
                </div>
              ))}

            </div>
        </div>
        <div className='py-3.5 text-sm md:text-default'>
              <h3 className='text-xl font-semibold text-gray-800'>Course Description</h3>
          <p className='pt-3 md;text-base text-sm'dangerouslySetInnerHTML=
          {{__html:courseData.courseDescription}}></p>
        </div>
      </div>
      {/* right column*/}
      <div className='max-w-course-card z-10 shadow p-2
        rounded md:rounded-none overflow-hidden bg-white min-w-[300px]
        w-[420px]'>

          {
            playerData ?
            <YouTube videoId={playerData.videoId} opts={{playerVars:{
              autoplay:1
            }}} iframeClassName='w-full aspect-video'/>
          :  <img src={courseData.courseThumbnail} alt=""/>
          }
      
        <div className='p-2'>
          <div className='flex items-center gap-2'>
             <img className='w-3.5'src={assets.time_left_clock_icon}
            alt="time left clock icon"/>  
            <p className='text-red-500 mb-0'>
              <span className='font-medium'>5 days</span>left at this price!</p>
            </div>
            <div class = "flex gap-4">
              <p className='text-gray-800 md:text-4xl text-2xl font-semibold'>${(courseData.coursePrice -courseData.discount*
                courseData.coursePrice/100).toFixed(2)}</p>
                <p className='md:text-2xl text-1xl text-gray-500 line-through'>${courseData.coursePrice}</p>
                <p className='md:text-2xl text-1xl text-gray-500'>{courseData.discount}% off</p>
            </div>
            <div className='flex items-center text-sm md:text-default gap-4 
            md:pt-4 text-gray-500'>
              <div className='flex items-center gap-1'>
                <img src={assets.star}alt="star icon"/>
                <p className='mb-0'>{calculateRating(courseData)}</p>
              </div>
              <div className='h-4 w-px bg-gray-500/40'></div>
              <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon}alt="clock icon"/>
                <p className='mb-0'>{calculateTotalDuration(courseData)}</p>

              </div>
              <div className='h-4 w-px bg-gray-500/40'></div>
              <div className='flex items-center gap-1'>
                <img src={assets.time_clock_icon}alt="clock icon"/>
                <p className='mb-0'>{calculateNoOfLectures(courseData)}lessons</p>

              </div>

            </div>
            <div className='d-flex'>
            <button className='md:mt-6 mt-4 w-80 py-3 rounded border-2 border-violet-700  text-violet-600 font-bold me-3
             ' onClick={()=>{
                addToCart(courseData)
                navigate("./cart")   }} >{isInCart(courseData)?'Go To Cart':'Add To Cart'}</button><div className='w-14 h-14 flex items-center justify-center md:mt-6 mt-4 rounded-lg border-1 border-violet-700 shadow-md cursor-pointer' 
             onClick={() => {
              setFavouriteItems(prev =>
                  prev.includes(courseData) 
                      ? prev.filter(item => item !== courseData) // Remove item (returns new array)
                      : [...prev, courseData]                   // Add item (returns new array)
              );
          }}
              >{FavouriteItems.includes(courseData)?(<FaHeart className='fill-violet-700 w-7 h-7'/> 
          ):(<IoMdHeartEmpty className='fill-violet-700 w-7 h-7'/>)}</div>
            </div>
            <button className='md:mt-6 mt-4 w-full py-3 rounded bg-violet-700 font-bold
            text-white'>
              {isAlreadyEnrolled ?'Already Enrolled':'Enroll now'}</button>
              <div className='pt-6'>
                <p className='md:text-xl text-lg font-medium text-gray-800'>What's in the course?</p>
                <ul >
                  <li>Lifetime access with free updates.</li>
                  <li>Step-by-step,hands-on project guidance.</li>
                  <li>Downloadable resources and source code.</li>
                  <li>Quizzes to test your knowlwdge.</li>
                  <li>Certificate of completion</li>
                </ul>
              </div>
        </div>
      </div>
    </div>

    </>
  ):<Loading />
}

export default CourseDetails