import React from 'react';
import { Carousel } from 'react-bootstrap';
import { assets } from '../assets/assets';

const dummyCourses = [
  {
    title: "Text To Image SAAS App",
    image: assets.course_1_thumbnail,
    instructor: "John Doe",
    rating: 4.8,
    learners: "12,345 students"
  },
  {
    title: "React Router Complete In Video",
    image: assets.course_2_thumbnail,
    instructor: "Jane Smith",
    rating: 4.7,
    learners: "9,876 students"
  },
  {
    title: "AI BG-Removal SAAS App",
    image: assets.course_3_thumbnail,
    instructor: "David Johnson",
    rating: 4.6,
    learners: "10,562 students"
  }
];

const DummyCarousel = () => {
  return (
    <div className="container-fluid my-4">
      <Carousel>
        {dummyCourses.map((course, index) => (
          <Carousel.Item key={index}>
            <img
              className="d-block w-100 "
              src={course.image}
              alt={course.title}
            />
            <Carousel.Caption className="bg-dark bg-opacity-75 rounded p-2 ">
              <h5>{course.title}</h5>
              <p>
                Instructor: {course.instructor} <br />
                ⭐ {course.rating} | 👨‍🎓 {course.learners}
              </p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </div>
  );
};

export default DummyCarousel;
