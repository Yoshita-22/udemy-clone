import { useContext } from "react";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import { Link } from "react-router-dom";


const CourseCard = ({ course }) => {
  const { calculateRating } = useContext(AppContext);

  return (
    <div className="card border shadow-sm mb-3">
      <Link
        to={"/course/" + course._id}
        onClick={() => scrollTo(0, 0)}
        className="text-decoration-none"
      >
        <img
          className="card-img-top img-fluid"
          src={course.courseThumbnail}
          alt=""
        />
        <div className="card-body text-start">
          <h3 className="card-title text-muted fs-7">{course.courseTitle}</h3>

          <div>
            
          <div className="d-flex align-items-center">
          <p className="mb-0 me-2 text-dark">{calculateRating(course)}</p>
          {[...Array(5)].map((_, i) => (
            <img
              key={i}
              src={i < Math.floor(calculateRating(course)) ? assets.star : assets.star_blank}
              alt=""
              className="star-icon"
            />
          ))}
        </div>

          </div>

          <p className="text-dark fw-bold">
            ${(
              course.coursePrice -
              (course.discount * course.coursePrice) / 100
            ).toFixed(2)}
          </p>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
