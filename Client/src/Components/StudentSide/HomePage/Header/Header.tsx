
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../../Assets/Images/carouselBody/l1.jpeg'
import { Link } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import './Header.css'

function NavScrollExample() {
  return (
    <Navbar expand="lg" >
      <Container >
        <img className='logo' src={logo} />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '80px' }}
            navbarScroll
          >
            <Nav.Link className="nav-student" href="#action1">Home</Nav.Link>
            <Nav.Link className="nav-student" href="#action2">Courses</Nav.Link>
            <Nav.Link className="nav-student" href="#action2">Contacts</Nav.Link>
            <Nav.Link className="nav-student" href="#action2">Profile</Nav.Link>
            
          </Nav>
          <Link to="/studentregister"><Button >Sign Up</Button></Link>
          <Link to="/studentlogin"><Button className='m-3'>Login</Button></Link>
          <Link to="/tutorregister"><Button>Instructor</Button></Link>
          
        
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default NavScrollExample;