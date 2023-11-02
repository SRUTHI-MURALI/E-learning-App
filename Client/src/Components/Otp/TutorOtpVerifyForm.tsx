import Form from "react-bootstrap/Form";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import r1 from "../../Assets/Images/otp1.avif";
import { Base_Url } from "../../Config/Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function TutorOtpVerifyForm() {
  const [otp, setotp] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const trimmedOtp = otp.trim();
    if (trimmedOtp === "") {
      return;
    }
  
    try {
    await axios.post(`${Base_Url}/tutor/verifyotp`, {
        verificationCode: trimmedOtp,
      }).then(() => {
        alert("Otp verified successfully");
        navigate("/tutorlogin");
      })
      .catch((error) => {
        error.response &&
        error.response.data &&
        error.response.data.message
        toast.error("otp verification failed");
      });
  
      
    } catch (error) {
      // Handle other errors
      console.log("Error: Something went wrong", error);
    }
  };
  
  return (
    <div
      className="d-grid justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundImage: `url(${r1})` }}
    >
      <Container>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
        <Card style={{ width: "18rem" }} className="text-center">
          <Form onSubmit={handleSubmit}>
            <Card.Body>
              <Card.Title> Enter Otp Send to the PhoneNumber</Card.Title>
              <Card.Img variant="top" />
              <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                <Form.Control
                  placeholder="Enter otp"
                  value={otp}
                  onChange={(e) => setotp(e.target.value)}
                />
              </Form.Group>
              <Button variant="primary" type="submit">
                Verify
              </Button>
            </Card.Body>
          </Form>
        </Card>
      </Container>
    </div>
  );
}

export default TutorOtpVerifyForm;
