
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../Assets/Images/carouselBody/l1.jpeg'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

function StudentHeader() {
  return (
    <Navbar expand="lg" className="bg-white">
      <Container >
        <img className='logo' src={logo} />
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '80px' }}
            navbarScroll
          >
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Courses</Nav.Link>
            <Nav.Link href="#action2">Contacts</Nav.Link>
            <Nav.Link href="#action2">Profile</Nav.Link>
            
          </Nav>
          
         <Link to='/'><Button>Logout</Button></Link>
          
        
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default StudentHeader;