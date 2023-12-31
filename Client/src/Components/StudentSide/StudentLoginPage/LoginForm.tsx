import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./Login.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import log1 from "../../../Assets/Images/log1.avif";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useState, useEffect } from "react";
import {
  GoogleOAuthProvider,
  GoogleLogin,
  CredentialResponse,
} from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { login } from "../../ReduxComponents/StudentSlice";

import { googleLogin, studentLogin } from "../AxiosConfigStudents/AxiosConfig";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGoogleLogin = async (credentialResponse: CredentialResponse) => {
    try {
      const idToken = credentialResponse.credential;

      const response = await googleLogin(idToken);

      const studentData = response.data;

      localStorage.setItem("studentData", JSON.stringify(studentData));
      dispatch(login(studentData));

      toast.success("successfully logged in");
      navigate("/studentlandingpage");
    } catch (error) {
      console.error("Google authentication error:", error);
      toast.error("Google authentication error");
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill all fields");
      return;
    }

    // Validate email format
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(trimmedEmail.trim())) {
      alert("Please enter a valid email address");
      return;
    }

    try {
      const response = await studentLogin(trimmedEmail, trimmedPassword);

      const studentData = response.data;

      localStorage.setItem("studentData", JSON.stringify(studentData));
      dispatch(login(studentData));
      toast.success("successfully logged in");
      navigate("/studentlandingpage");
    } catch (error: any) {
      // Display the error message from the response
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while logging in");
      }
    }
  };

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
    const parseData = studentData ? JSON.parse(studentData) : null;
    if (parseData) {
      navigate("/studentlandingpage");
    }
  }, [navigate]);

  return (
    <GoogleOAuthProvider clientId="1098563032990-ulbr653b8ln8fte1hndcdsi2ugfnbpud.apps.googleusercontent.com">
      <Container className="mt-5">
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
        <Card className="logCard">
          <ToastContainer
            position="top-center"
            autoClose={3000}
          ></ToastContainer>
          <Row>
            <Col xs={12} md={6}>
              <img className="logCardimg" src={log1} />
            </Col>
            <Col xs={12} md={5}>
              <h1 style={{ textAlign: "center" }} className="mt-5">
                Student Login Form
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
                    type="password"
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                  />
                </Form.Group>
                <Row>
                  <Col xs={12} md={4}></Col>
                  <Col xs={12} md={6}>
                    <Button variant="primary" type="submit">
                      Login as Student
                    </Button>
                  </Col>
                </Row>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    marginTop: "2rem",
                  }}
                >
                  <GoogleLogin
                    text="continue_with"
                    onSuccess={handleGoogleLogin}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                </div>
              </Form>
              <Row>
                <Col>
                  <h6 className="mt-3 ">
                    {" "}
                    <Link to="/forgotpassword">Forgot Password</Link>
                  </h6>
                </Col>
                <Col>
                  <h6 className="mt-3 ">
                    {" "}
                    If you are a new user?{" "}
                    <Link to="/studentregister">Register</Link>
                  </h6>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card>
      </Container>
    </GoogleOAuthProvider>
  );
}

export default LoginForm;
