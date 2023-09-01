
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Col,Row} from 'react-bootstrap'
import './Register.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import r1 from '../../Assets/Images/r1.avif'
import { Link } from 'react-router-dom';

function RegisterForm() {
  return (
   
        <Container className='mt-5'>
        <Card className='regCard'>
        <Row>
        <Col xs={12} md={6}>
            <img className='regCardimg' src={r1}/>
        </Col>
        <Col xs={12} md={5}>
            <h1 style={{textAlign:'center'}} className='mt-5'>Register Form</h1>
        <Form className='mt-5 '>
      

      <Form.Group className="mb-3 mt-5" controlId="formGridAddress1">
        <Form.Label>Username</Form.Label>
        <Form.Control placeholder="Angelina" />
      </Form.Group>

      <Form.Group className="mb-3 mt-5" controlId="formGridAddress2">
        <Form.Label>Phone Number</Form.Label>
        <Form.Control placeholder="123456789" />
      </Form.Group>
      <Row className="mb-3 mt-4">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control type="email" placeholder="123@gmail.com" />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="Password" />
        </Form.Group>
      </Row>

      <Button variant="primary" type="submit"  >
        Register
      </Button>
     
    </Form>
    <h6 className='mt-5' style={{textAlign:'right'}}> Have you are already registered? <Link to='/login'>Login</Link></h6>  
        </Col>
        
        </Row>
        
        </Card>
        </Container>
   
    
   
  );
}

export default RegisterForm;



