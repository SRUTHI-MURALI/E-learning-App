
import Container from 'react-bootstrap/Container';

import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../../Assets/Images/carouselBody/l1.jpeg'
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './StudentHeader.css'
import { useSelector } from 'react-redux';
import { selectStudent } from '../../ReduxComponents/StudentSlice';

function StudentHeader() {
  const studentdetails= useSelector(selectStudent)
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
            <Nav.Link className='nav-header-student' href="/studentlandingpage">Home</Nav.Link>
            <Nav.Link className='nav-header-student'  href="studentallcourselist">Courses</Nav.Link>
            <Nav.Link className='nav-header-student'  href="#action2">Contacts</Nav.Link>
            <Nav.Link className='nav-header-student'  href="#action2">Profile</Nav.Link>
            
          </Nav>
          <h1>{studentdetails.name}</h1>
         <Link to='/'><Button>Logout</Button></Link>
          
        
        </Navbar.Collapse>
        
      </Container>
    </Navbar>
  );
}

export default StudentHeader;