import { useContext } from "react";
import { Link } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import CourseCard from "./CourseCard";

const CoursesSection = () => {
  const { allCourses } = useContext(AppContext);

  return (
    <div className="py-5 container ">
      <div>
      <h2 className="fs-2 fw-medium text-dark text-center">Learn from the best</h2>
      <p className="text-muted mt-3 text-center">
        Discover our top-rated courses across various categories. From coding<br/>
        and design to business and wellness, our courses are crafted to deliver<br/>
        results.
      </p>
      </div>

      {/* Grid Layout for Large Screens (lg & xl) */}
      <div className="d-none d-lg-block">
        <div className="row row-cols-1 row-cols-md-2 row-cols-lg-4 g-4">
          {allCourses.slice(0, 4).map((course, index) => (
            <div key={index} className="col">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>

      {/* Horizontal Scrolling for Small & Medium Devices */}
      <div className="d-lg-none">
        <div className="scroll-container">
          {allCourses.slice(0, 4).map((course, index) => (
            <div key={index} className="scroll-item">
              <CourseCard course={course} />
            </div>
          ))}
        </div>
      </div>

      <div className="d-flex justify-content-center">
      <Link
        to={"/course-list"}
        onClick={() => scrollTo(0, 0)}
        className="btn btn-secondary mt-3"
      >
        Show all courses
      </Link>
      </div>
    </div>
  );
};

export default CoursesSection;
