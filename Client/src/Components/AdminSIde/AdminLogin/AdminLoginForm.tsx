import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./AdminLoginForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import tutorlog from "../../../Assets/Images/carouselBody/hb3.avif";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { Base_Url } from "../../../Config/Config";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill all fields");
      return;
    }

    const adminLogin = async (email: string,password: string)=>{
      try {
        
           await adminLogin(email,password)
          toast.success("successfully logged in");
          navigate("/adminhome");
        }
       catch (error) {
        toast.error("logging error");
        return;
        
      }
    }
    adminLogin(trimmedEmail,trimmedPassword);

   
  };
  return (
    <Container className="mt-5">
      <Card className="logCard">
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
        <Row>
          <Col xs={12} md={6}>
            <img className="logCardimg" src={tutorlog} />
          </Col>
          <Col xs={12} md={5}>
            <h1 style={{ textAlign: "center" }} className="mt-5">
              Admin Login Form
            </h1>
            <Form onSubmit={handleSubmit} className="mt-5 ">
              <Form.Group className="mb-3 mt-5" controlId="formGridAddress1">
                <Form.Label>Registered Email</Form.Label>
                <Form.Control
                  placeholder="123@gmail.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                />
              </Form.Group>

              <Form.Group className="mb-3 mt-5" controlId="formGridAddress2">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  placeholder="Password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
              </Form.Group>
              <Row></Row>
              <div className="d-flex justify-content-center ">
                <Button variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginForm;
