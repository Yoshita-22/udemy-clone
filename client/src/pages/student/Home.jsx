import React from 'react'
import HomeNavbar from '../../components/HomeNavbar'
import { Carousel } from 'bootstrap'
import CourseCarousels from '../../components/CourseCarousels'
import Testimonials from '../../components/student/Testimonials'
import CoursesSection from '../../components/student/CoursesSection'

const Home = () => {
  return (
    <div>
      
      
      <CourseCarousels/>
      <Testimonials/>
      <CoursesSection/>
    </div>
  )
}

export default Home
