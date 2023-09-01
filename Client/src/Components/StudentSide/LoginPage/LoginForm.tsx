
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Col,Row} from 'react-bootstrap'
import './Login.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import log1 from '../../Assets/Images/log1.avif'
import { Link } from 'react-router-dom';

function LoginForm() {
  return (
   
        <Container className='mt-5'>
        <Card className='logCard'>
        <Row>
        <Col xs={12} md={6}>
            <img className='logCardimg' src={log1}/>
        </Col>
        <Col xs={12} md={5}>
            <h1 style={{textAlign:'center'}} className='mt-5'>Login Form</h1>
        <Form className='mt-5 '>
      

      <Form.Group className="mb-3 mt-5" controlId="formGridAddress1">
        <Form.Label>Registered Email</Form.Label>
        <Form.Control placeholder="123@gmail.com" />
      </Form.Group>

      <Form.Group className="mb-3 mt-5" controlId="formGridAddress2">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password" />
      </Form.Group>
     <Row>
     <Col xs={12} md={6}>
      <Button variant="primary" type="submit"  >
        Login
      </Button>
      </Col>
      <Col xs={12} md={6}>
      <Button variant="primary" type="submit"  >
        LoginWithOtp
      </Button>
     
      </Col>
     </Row>
      
    </Form>
    <h6 className='mt-5' style={{textAlign:'right'}}> If you are a new user? <Link to='/register'>Register</Link></h6>  
        </Col>
        
        </Row>
        
        </Card>
        </Container>
   
    
   
  );
}

export default LoginForm;



