
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import {Col,Row} from 'react-bootstrap'
import './Login.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import log1 from '../../../Assets/Images/log1.avif'
import { Link,useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import { useState } from 'react';


function LoginForm() {
  const [password,setPassword]=useState('')
    const [email,setEmail]=useState('')
    const navigate=useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        
        const trimmedPassword = password.trim();
        const trimmedEmail = email.trim();
    
    
        if (
       
          trimmedEmail === '' ||  
          trimmedPassword === ''
        ) {
          toast.error("Please fill all fields");
          return;
        }
       
        try {
           await axios.post('http://localhost:3002/student/login', {
           
            email: trimmedEmail,
           
            password: trimmedPassword,
          });
         toast.success("successfully logged in")
          navigate('/studentlandingpage')
      
          
        } catch (error) {
         toast.error("logging error");
         return;
        }
      };
  return (
   
        <Container className='mt-5'>
        <Card className='logCard'>
        <ToastContainer position='top-center' autoClose={3000}></ToastContainer>
        <Row>
        <Col xs={12} md={6}>
            <img className='logCardimg' src={log1}/>
        </Col>
        <Col xs={12} md={5}>
            <h1 style={{textAlign:'center'}} className='mt-5'>Student Login Form</h1>
        <Form onSubmit={handleSubmit} className='mt-5 '>
      

      <Form.Group className="mb-3 mt-5" controlId="formGridAddress1">
        <Form.Label>Registered Email</Form.Label>
        <Form.Control placeholder="123@gmail.com" 
        value={email}
        onChange={(e)=>{setEmail(e.target.value)}}/>
      </Form.Group>

      <Form.Group className="mb-3 mt-5" controlId="formGridAddress2">
        <Form.Label>Password</Form.Label>
        <Form.Control placeholder="Password"
        value={password}
        onChange={(e)=>{setPassword(e.target.value)}} />
      </Form.Group>
     <Row>
     <Col xs={12} md={6}>
      <Button variant="primary" type="submit"  >
        Login
      </Button>
      </Col>
      <Col xs={12} md={6}>
      <Button className='float-end ' variant="primary" type="submit"  >
        LoginWithOtp
      </Button>
     
      </Col>
     </Row>
      
    </Form>
    <h6 className='mt-5' style={{textAlign:'right'}}> If you are a new user? <Link to='/studentregister'>Register</Link></h6>  
        </Col>
        
        </Row>
        
        </Card>
        </Container>
   
    
   
  );
}

export default LoginForm;



