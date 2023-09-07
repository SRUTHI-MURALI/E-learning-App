import Form from 'react-bootstrap/Form';
import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

function OtpVerifyForm() {
    const [phone, setPhone] = useState('');
    const [otp, setotp] = useState('');
  return (
    <Form  onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" 
        value={otp}
        onChange={(e) => setotp(e.target.value)}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formGroupPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" 
        value={phone}
        onChange={(e) => setPhone(e.target.value)}/>
      </Form.Group>
      <div className="d-flex justify-content-center mt-5">
                <Button variant="primary" type="submit">
                 New Register
                </Button>
              </div>
    </Form>
  );
}

export default OtpVerifyForm;