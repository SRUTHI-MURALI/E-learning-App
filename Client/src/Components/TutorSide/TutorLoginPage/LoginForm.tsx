import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./LoginForm.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import tutorlog from "../../../Assets/Images/tutorside/tutorlog.avif";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../ReduxComponents/TutorSlice";
import { tutorLogin } from "../AxiosConfigInstructors/AxiosConfig";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
      const response = await tutorLogin(trimmedEmail, trimmedPassword);

      const tutorData = response.data;

      localStorage.setItem("tutorData", JSON.stringify(tutorData));

      dispatch(login(tutorData));
      toast.success("successfully logged in");
      navigate("/tutorallcourses");
    } catch (error:any) {
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
    const tutorData = localStorage.getItem("tutorData");
    const parseData = tutorData ? JSON.parse(tutorData) : null;
    if (parseData) {
      navigate("/tutorhome");
    }
  }, [navigate]);
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
              Tutor Login Form
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
              <Col xs={12} md={4}>
                 
                 </Col>
                <Col xs={12} md={6}>
                  <Button variant="primary" type="submit">
                    Login as Tutor
                  </Button>
                </Col>
               
              </Row>
            </Form>
            <Row>
              <Col>
                <h6 className="mt-3 ">
                  {" "}
                  <Link to="/tutorforgotpassword">Forgot Password</Link>
                </h6>
              </Col>
              <Col>
                <h6 className="mt-3 ">
                  {" "}
                  If you are a new user?{" "}
                  <Link to="/tutorregister">Register</Link>
                </h6>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default LoginForm;
