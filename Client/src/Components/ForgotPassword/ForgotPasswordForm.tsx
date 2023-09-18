import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import axios from 'axios'
import {  useNavigate } from 'react-router-dom';
import { Card, Container,} from 'react-bootstrap';
import r1 from '../../Assets/Images/p2.webp'
import { Base_Url } from '../../Config/Config';
import { toast,ToastContainer } from 'react-toastify';


function ForgotPasswordForm() {

  const [phone,setPhone]=useState('')
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [count,setCount]=useState(5)
  const [otpVerified,setOtpverified]=useState(false)
  const[password,setPassword]=useState('')
  const[confirmPassword,setConfirmPassword]=useState('')

  const navigate=useNavigate()

 

  const handleNumberSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const trimmedPhone = phone.trim();
    if (trimmedPhone === '') {
      return;
    }
  
    try {
      const response = await axios.post(`${Base_Url}/student/resetpasswordsentotp`, {
        phone: trimmedPhone,
      });
  
      if (response.status === 200) {
        // OTP sent successfully
        toast.success("OTP sent Successfully");
        setOtpSent(true);
      } else {
        toast.error("An error occurred while sending OTP");
      }
    } catch (error) {
      // Handle network errors or other exceptions
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message from the response if available
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("An error occurred while sending OTP");
      }
    }
  };
  
  const handleOtpVerification=async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      const trimmedOtp = otp.trim();
    if (
      trimmedOtp === '' 
      ) {
        
        return;
      }

      axios.post(`${Base_Url}/otp/verifymobileotp`, {
        verificationCode:trimmedOtp,
        phone:phone
        
    })
    .then(() => {
      toast.success("Otp verified successfully")
       setOtpSent(false)
      setOtpverified(true)
    })
    .catch(error => {
        // Handle the error here
        console.log(error);
        
    });
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message from the response if available
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("An error occurred while verifying OTP");
      }
    }
  }
    
  const handlenewPassword=async (e: React.FormEvent<HTMLFormElement>)=>{
    e.preventDefault()
    if(password===confirmPassword){
      await axios.put(`${Base_Url}/student/resetpassword`, {
        password,
        phone
        
    })
    .then((response)=>{
      toast.success("password reset successfully")
      console.log(response);
      
      
    }).catch((error)=>{
      console.log(error);
      
    })
    navigate('/studentlogin')
    }
  }

  useEffect(() => {
    let countdownInterval;

    if (otpSent && count > 0) {
      countdownInterval = setInterval(() => {
        setCount((prevCount) => prevCount - 1);
      }, 1000);
    } else if (count === 0) {
      // Countdown has reached zero, you can show a "Resend OTP" option
      clearInterval(countdownInterval);
    }

    return () => {
      clearInterval(countdownInterval); // Clear the interval when the component unmounts
    };
  }, [otpSent, count]);


  return (
    <div className="d-grid justify-content-center align-items-center" style={{ minHeight: "100vh" ,backgroundColor:'grey'}}>
  <Container  >
  <ToastContainer position='top-center' autoClose={3000}></ToastContainer>
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
    {otpSent ? (
  <>
    <Form onSubmit={handleOtpVerification}>
      <Card.Body>
        <Form.Group className="mb-3" controlId="formGridOTP">
          <Form.Control
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            placeholder="Enter OTP"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Verify OTP
        </Button>
      </Card.Body>
    </Form>
    {count > 0 ? (
      <h6>Countdown: {count} seconds</h6>
    ) : (
      <Form onSubmit={handleNumberSubmit}>
        <Button type="submit">Resend OTP</Button>
      </Form>
    )}
  </>
) : otpVerified ? (
  <>
    <Form onSubmit={handlenewPassword}>
      <Card.Body>
        <Form.Group className="mb-3" controlId="formGridPassword">
          <Form.Control type='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter new Password"
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formGridConfirmPassword">
          <Form.Control  type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm Password"
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Card.Body>
    </Form>
  </>
) : null}

  </Card>
    
  </Container>
</div>

  )
}

export default ForgotPasswordForm;