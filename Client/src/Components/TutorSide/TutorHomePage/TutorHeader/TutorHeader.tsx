
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from 'react-bootstrap/Navbar';

import { Button, Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './TutorHeader.css'

function TutorHeader() {
  return (
    <div className='navBar'>  
    <Row>
    
      <Col>
      <Container  >
      <Navbar  expand="lg" >
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            
            navbarScroll
          >
            <Nav >Hello Tutor</Nav>
          </Nav>
         <Link to='/'><Button className='m-3'>Logout</Button></Link>
        
        </Navbar.Collapse>    
    </Navbar>
    </Container>
    </Col>
    </Row>
    </div>
  );
}

export default TutorHeader;
