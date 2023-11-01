
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
      
        <img className="logo"style={{ height: "8rem",width:'20rem' }} src={logo} />
        <Navbar.Toggle aria-controls="navbarScroll"  className="custom-navbar-toggle " style={{backgroundColor:'white'}} />

        <Navbar.Collapse id="navbarScroll" >
          <Nav
            
          >
            
            {/* <Nav.Link className="nav-student" href="/studentallcourselist">
              Courses
            </Nav.Link>
            */}
            
          </Nav>
          <div >
          <Link to="/studentregister">
            <Button className="m-2" variant="info">Sign Up</Button>
          </Link>
          <Link to="/studentlogin">
            <Button variant="info" className="m-3">Student</Button>
          </Link>
          <Link to="/tutorregister">
            <Button className="m-3" variant="info">Instructor</Button>
          </Link>
          </div>
        </Navbar.Collapse>
     
    </Navbar>
  );
}

export default NavScrollExample;
