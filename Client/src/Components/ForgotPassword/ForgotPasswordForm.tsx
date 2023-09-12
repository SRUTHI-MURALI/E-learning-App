import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import { Card, Container,} from 'react-bootstrap';
import r1 from '../../Assets/Images/p2.webp'


function ForgotPasswordForm() {

  const [phone,setPhone]=useState('')
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);

  const navigate=useNavigate()
  const handleNumberSubmit=async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedPhone = phone.trim();
    if (
      trimmedPhone === '' 
      ) {
        
        return;
      }
      console.log(trimmedPhone,"ll");
      

      axios.post('http://localhost:3002/otp/sendmobileotp', {
        phone:trimmedPhone
        
    })
    
    .then(() => {
       
        
      setOtpSent(true);
    })
    .catch(error => {
        // Handle the error here
        console.log(error);
        
    });
  }

  const handleOtpVerification=async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const trimmedOtp = otp.trim();
    if (
      trimmedOtp === '' 
      ) {
        
        return;
      }

      axios.post('http://localhost:3002/otp/verifymobileotp', {
        verificationCode:trimmedOtp,
        phone:phone
        
    })
    .then(() => {
       
      navigate('/studentlandingpage');
    })
    .catch(error => {
        // Handle the error here
        console.log(error);
        
    });
  }
    
  return (
    <div className="d-grid justify-content-center align-items-center" style={{ minHeight: "100vh" ,backgroundImage: `url(${r1})`}}>
  <Container  >
  <Card style={{ width: '18rem' }} className="text-center">
    <Form onSubmit={handleNumberSubmit}>
      <Card.Body>
        <Card.Title > Reset Password</Card.Title>
        <Card.Img variant="top" />
        <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                
                <Form.Control
                value={phone}
                onChange={(e)=>{setPhone(e.target.value)}}
                  placeholder="Enter your phone number"
                 
                />
              </Form.Group>
        <Button variant="primary" type="submit">Send Otp</Button>
      </Card.Body>
    </Form>
    {otpSent && ( 
            <Form onSubmit={handleOtpVerification}>
              <Card.Body>
                <Form.Group className="mb-3" controlId="formGridOTP">
                  <Form.Control
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="Enter OTP"
                  />
                </Form.Group>
                <Button variant="primary" type="submit">Verify OTP</Button>
              </Card.Body>
            </Form>
          )}
  </Card>
    
  </Container>
</div>

  );
}

export default ForgotPasswordForm;