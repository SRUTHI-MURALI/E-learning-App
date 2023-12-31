import Form from "react-bootstrap/Form";
import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Card, Container } from "react-bootstrap";
import r1 from "../../Assets/Images/otp1.avif";
import { Base_Url } from "../../Config/Config";
import { toast, ToastContainer } from "react-toastify";

interface StudentOtpVerifyFormProps {
  email: string| null;
}

function StudentOtpVerifyForm({ email }: StudentOtpVerifyFormProps) {
  const [otp, setOtp] = useState<string>("");
  const [count, setCount] = useState<number>(8);
  const [otpSent] = useState<boolean>(true);

  const handleResendOtp = async () => {
   
    
    await axios.post(`${Base_Url}/otp/sendmobileotp`, {
      email,
    });
  };

  const navigate = useNavigate();


  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedOtp = otp.trim();
    if (trimmedOtp === "") {
      return;
    }

    try {
    
      axios
        .post(`${Base_Url}/student/verifyotp`, {
          verificationCode: trimmedOtp,
          email,
        })
        .then(() => {
          alert("Otp verified successfully");
          navigate("/studentlogin");
        })
        .catch((error) => {
          error.response &&
            error.response.data &&
            error.response.data.message &&
            toast.error("otp verification failed");
        });
    } catch (error) {
      // Handle the error here
      console.error("An error occurred:", error);
      // You can display an error message to the user or take other actions as needed
    }
  };

  useEffect(() => {
    let countdownInterval: any;

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
    <div
      className="d-grid justify-content-center align-items-center"
      style={{ minHeight: "100vh", backgroundImage: `url(${r1})` }}
    >
      <Container>
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
        <Card style={{ width: "18rem" }} className="text-center">
          {otpSent ? (
            <>
              <Form onSubmit={handleSubmit}>
                <Card.Body>
                  <Card.Title> Enter Otp Send to the email : {email}</Card.Title>
                  <Card.Img variant="top" />
                  <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
                    <Form.Control
                      placeholder="Enter otp"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </Form.Group>
                  <Button variant="primary" type="submit">
                    Verify
                  </Button>
                </Card.Body>
              </Form>
              {count > 0 ? (
                <h6>Countdown: {count} seconds</h6>
              ) : (
                <Form onSubmit={handleResendOtp}>
                  <Button type="submit">Resend OTP</Button>
                </Form>
              )}
            </>
          ) : null}
        </Card>
      </Container>
    </div>
  );
}

export default StudentOtpVerifyForm;
