import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import { Card, Container,} from 'react-bootstrap';
import r1 from '../../Assets/Images/otp1.avif'


function StudentOtpVerifyForm() {
    
    const [otp, setotp] = useState('');

    const navigate=useNavigate()

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedOtp = otp.trim();
    if (
        trimmedOtp === '' 
      ) {
        
        return;
      }

      axios.post('http://localhost:3002/student/verifyotp', {
        verificationCode: trimmedOtp,
        
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
  <Form onSubmit={handleSubmit}>
      <Card.Body>
        <Card.Title > Otp Verification</Card.Title>
        <Card.Img variant="top" />
        <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                
                <Form.Control
                  placeholder="Enter otp"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                />
              </Form.Group>
        <Button variant="primary" type="submit">Verify</Button>
      </Card.Body>
      </Form>
    </Card>
    
  </Container>
</div>

  );
}

export default StudentOtpVerifyForm;