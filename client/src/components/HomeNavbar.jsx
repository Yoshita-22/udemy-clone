import React from 'react';
import { Navbar, Nav, Container, Button, Form, FormControl } from 'react-bootstrap';
import { FaUserCircle, FaShoppingCart } from 'react-icons/fa';
import { assets } from '../assets/assets';
import { useClerk,UserButton,useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './student/SearchBar';

function HomeNavbar() {
  const navigate = useNavigate();
  const {openSignIn} = useClerk();
  const { isSignedIn } = useUser(); // Clerk hook

  const handleEducatorClick = () => {
    if (isSignedIn) {
      navigate("/educator");
    } else {
      // Optionally redirect to sign-in page or show an alert
      navigate("/sign-in"); // or use Clerk's modal: openSignIn()
    }
  };
  const {user} = useUser();
  

  return (
    <Navbar expand="lg" bg="light" variant="light" className="py-3 shadow-sm border-bottom">
      <Container fluid>

        {/* Brand Logo */}
        <Navbar.Brand href="#" className="fw-bold fs-4 text-dark"> <img src={assets.logo} alt="logo" className="w-28 lg:w-32" /></Navbar.Brand>

        {/* Toggle for Mobile View */}
        <Navbar.Toggle aria-controls="navbarScroll" />

        <Navbar.Collapse id="navbarScroll" className="justify-content-between">

          {/* Middle Section - Search Bar */}
          <div className=" mx-auto w-50">
          <SearchBar/>
          </div>
          

          {/* Left Section - Teach Button */}
          {
            user ? (
              <><Nav className="align-items-center">
              <Button
                variant="outline-dark"
                className="m-2 fw-semibold"
                style={{ borderWidth: '1.5px' }} onClick = {()=>navigate("/educator")}
              >
                Instructor
              </Button>
            </Nav></>
            ):(
            <Nav className="align-items-center">
              <Button
                variant="outline-dark"
                className="m-2 fw-semibold"
                style={{ borderWidth: '1.5px' }}  onClick = {()=>navigate("/")}
              >
                Teach On Udemy
              </Button>
            </Nav>
            )
          }

          {/* myleanrning and wishlist */}
          {user && (<>
          <Nav className="align-items-center">
            <Button variant="outline-dark" className="m-2 fw-semibold"
                  style={{ borderWidth: '1.5px' }} onClick = {()=>navigate("/my-enrollments")}
                >
                  My Learning
                </Button>
              
          </Nav>

            </>)}
            
          
          {/* Right Section - Icons and Buttons */}
          <Nav className="align-items-center">
           
            {user ? (
        <UserButton />
          ) : (
  <>
    <Button variant="outline-dark" className="m-2 fw-semibold"
      style={{ borderWidth: '1.5px' }} 
      onClick={() => openSignIn()}
    >
      Login
    </Button>
    <Button className="fw-semibold"
      style={{ backgroundColor: '#A435F0', borderColor: '#A435F0', color: '#fff' }} 
      onClick={() => openSignIn()}
    >
      Sign Up
    </Button>
  </>
)}
          </Nav>

        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;
