import React from 'react'
import CourseCarousels from '../../components/CourseCarousels'
import Testimonials from '../../components/student/Testimonials'
import CoursesSection from '../../components/student/CoursesSection'
import Companies from '../../components/student/Companies'
import Footer from '../../components/student/Footer'
const Home = () => {
  return (
    <div>  
      <CourseCarousels/>
      <Companies/>
      <CoursesSection/>
      <Testimonials/>
      <Footer/>
    </div>
  )
}

export default Home
