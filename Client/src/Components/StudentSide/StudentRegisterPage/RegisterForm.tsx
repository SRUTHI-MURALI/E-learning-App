import React, { useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import { Col, Row } from 'react-bootstrap';
import axios from 'axios';
import './Register.css';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import r1 from '../../../Assets/Images/r1.avif';
import { Link, useNavigate } from 'react-router-dom';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function RegisterForm() {
  const [userName, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const navigate=useNavigate()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedName = userName.trim();
    const trimmedPassword = password.trim();
    const trimmedPhone = phone.trim();
    const trimmedEmail = email.trim();
  
    if (
      trimmedName === '' ||
      trimmedEmail === '' ||
      trimmedPhone === '' ||
      trimmedPassword === ''
    ) {
      toast.error("Please fill all fields");
      return;
    }
  
    try {
      await axios.post('http://localhost:3002/student/sendotp', {
        name: trimmedName,
        email: trimmedEmail,
        phone: trimmedPhone,
        password: trimmedPassword,
      });
  
      // Display success toast
      toast.success("Successfully registered");
  
      // Navigate after toast is displayed
      navigate('/verifyOtp');
    } catch (error) {
      toast.error("Registration error");
      return;
    }
  };
  

  return (
    <Container className="mt-5">
      <Card className="regCard">
        <ToastContainer position='top-center'></ToastContainer>
        <Row>
          <Col xs={12} md={6}>
            <img className="regCardimg" src={r1} alt="Registration" />
          </Col>
          <Col xs={12} md={5}>
            <h1 style={{ textAlign: 'center' }} className="mt-5">
              Student Register Form
            </h1>
            <Form onSubmit={handleSubmit} className="mt-5 ">
              <Form.Group className="mb-3 mt-5" controlId="formGridAddress1">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  placeholder="Angelina"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-5" controlId="formGridAddress2">
                <Form.Label>Phone Number</Form.Label>
                <Form.Control
                  placeholder="123456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>

              <Row className="mb-3 mt-4">
                <Form.Group as={Col} controlId="formGridEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="123@gmail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group as={Col} controlId="formGridPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
              </Row>

              <div className="d-flex justify-content-center mt-5">
                <Button variant="primary" type="submit">
                 New Register
                </Button>
              </div>
            </Form>
            <h6 className="mt-5" style={{ textAlign: 'right' }}>
              Have you already registered? <Link to="/studentlogin">Login</Link>
            </h6>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default RegisterForm;
