
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar} from "react-bootstrap";
import logo from "../../../../Assets/Images/carouselBody/l1.jpeg";
import { Link} from "react-router-dom";
import { Button } from "react-bootstrap";
import "./Header.css";

function NavScrollExample() {

 
  return (
    <Navbar fixed="top" expand="lg" className="navbar-student">
      
        <img className="logo"style={{ height: "8rem",width:'13rem' }} src={logo} />
        <Navbar.Toggle aria-controls="navbarScroll"  className="custom-navbar-toggle " style={{backgroundColor:'white'}} />

        <Navbar.Collapse id="navbarScroll" >
          <Nav
          
          >
            <div className="col-lg-8 float-end">
            
            </div>
            {/* <Nav.Link className="nav-student" href="/studentallcourselist">
              Courses
            </Nav.Link>
            */}
            
            
         
          <div className="col-lg-12 mt-4">
          {/* <Link to="/studentregister">
            <Button className="m-2 " variant="info">Sign Up</Button>
          </Link> */}
          {/* <Link to="/studentlogin">
            <Button variant="info" className="m-3">Student</Button>
          </Link>
          <Link to="/tutorlogin">
            <Button className="m-3" variant="info">Instructor</Button>
          </Link> */}
          <h3>Welcome to E-learning</h3>
          </div>
           <div className="col-lg-8">
          {/* <Link to="/studentregister">
            <Button className="m-2 " variant="info">Sign Up</Button>
          </Link> */}
          <Link to="/studentlogin">
            <Button variant="info" className="m-3">Student</Button>
          </Link>
          <Link to="/tutorlogin">
            <Button className="m-3" variant="info">Instructor</Button>
          </Link>
          </div>
          </Nav>
        </Navbar.Collapse>
     
    </Navbar>
  );
}

export default NavScrollExample;
