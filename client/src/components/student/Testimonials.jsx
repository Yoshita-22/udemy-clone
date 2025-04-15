import React from 'react';
import { Card } from 'react-bootstrap';
import { dummyTestimonial } from '../../assets/assets';
import { assets } from '../../assets/assets';
const Testimonials = () => {
  
  const renderStars = (rating) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const totalStars = 5
  
    for (let i = 0; i < fullStars; i++) {
      stars.push(<img key={i} src={assets.star} alt="star" style={{ width: 20 }} />);
    }
    for (let i = fullStars;i < totalStars; i++) {
      stars.push(<img key={i} src={assets.star_blank} alt="star_dull" style={{ width: 20 }} />);

    }  
    return stars;
  };
  
  return (
    <div className="text-center my-4">
      <h3 className="fw-semibold mb-2">Testimonials</h3>
      <p className="mb-4">
        Hear from our learners as they share their journeys of transformation, success,
        and how our platform made a difference in their lives.
      </p>

      <div className="container">
        <div className="row">
          {dummyTestimonial.map((testimonial)=>{
               return (
                <div className=" col-lg-4 mb-3">
               <Card className="p-3 text-start shadow-sm">
                 <div className="d-flex align-items-center mb-2 bg-gray-100 rounded-1xl p-2">
                   <img
                     src={testimonial.image}
                     alt={testimonial.name}
                     className="me-3"
                     style={{ width: '60px', height: '60px', objectFit: 'cover' }}
                   />
                   <div>
                     <h5 className="mb-0 font-bold">{testimonial.name}</h5>
                     <small className="text-muted">{testimonial.role}</small>
                   </div>
                 </div>
                 <div className="d-flex  mt-1">{renderStars(testimonial.rating)}</div>
                 <p className="mb-2">{testimonial.feedback}</p>
                 <a href="#" className="text-primary">Read more</a>
               </Card>
             </div>
               )
          })}
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
