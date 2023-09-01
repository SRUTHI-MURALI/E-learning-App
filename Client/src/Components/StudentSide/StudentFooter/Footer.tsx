

import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Col,Row} from 'react-bootstrap'
import './Footer.css'
import l1 from '../../../Assets/Images/carouselBody/l1.jpeg'

function Footer() {
  return (
   
        <Container className='mt-5'>
        <Card className='footerCard'>
        <Row>
            
        <Col xs={12} md={2}>
            <h4 style={{textAlign:'center'}} className='mt-5'>Quick Links</h4>
            <h6 style={{textAlign:'center'}}>About Us </h6>
            <h6 style={{textAlign:'center'}} >Contact Us</h6>
            <h6 style={{textAlign:'center'}} >Privacy Policy</h6>
            <h6 style={{textAlign:'center'}} >Terms &  Conditions</h6>
            <h6 style={{textAlign:'center'}} >Help</h6>
        </Col>
        <Col xs={12} md={2}>
        <h4 style={{textAlign:'center'}} className='mt-5'>Contacts</h4>
            <h6 style={{textAlign:'center'}} className='mt-1'>123 Street, New York</h6>
            <h6 style={{textAlign:'center'}} className='mt-1'>USA</h6>
            <h6 style={{textAlign:'center'}} className='mt-1'>+123 02 32145</h6>
            <h6 style={{textAlign:'center'}} className='mt-1'>tuto@gmil.com</h6>
           
        </Col>
       
        
        <Col xs={12} md={5}>
        <h4 style={{textAlign:'center'}} className='mt-5'>Subscribe to our Channel</h4>
            <h6 style={{textAlign:'center'}} className='mt-1'>Quick Links</h6>
            <h6 style={{textAlign:'center'}} className='mt-1'>Quick Links</h6>
            <h6 style={{textAlign:'center'}} className='mt-1'>Quick Links</h6>
            <h6 style={{textAlign:'center'}} className='mt-1'>Quick Links</h6>
            <h6 style={{textAlign:'center'}} className='mt-1'>Quick Links</h6>
        </Col>
        <Col xs={12} md={3}>
        <img className='footerimg' src={l1} />
           
        </Col>
        </Row>
        </Card>
        </Container>
   
    
   
  );
}

export default Footer;