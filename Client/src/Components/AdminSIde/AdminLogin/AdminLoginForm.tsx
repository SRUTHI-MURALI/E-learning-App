import "./AdminLoginForm.css";
import { Container, Form, Button, Col, Row, Card } from "react-bootstrap";
import tutorlog from "../../../Assets/Images/carouselBody/hb3.avif";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { login } from "../../ReduxComponents/AdminSlice";
import { adminLogin } from "../AxiosConfigAdmin/AxiosConfig";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const trimmedPassword = password.trim();
    const trimmedEmail = email.trim();

    if (trimmedEmail === "" || trimmedPassword === "") {
      toast.error("Please fill all fields");
      return;
    }

    try {
      const response = await adminLogin(trimmedEmail, trimmedPassword);

      const adminData = response.data;

      localStorage.setItem("adminData", JSON.stringify(adminData));
      
      dispatch(login(adminData));

      toast.success("successfully logged in");
      navigate("/adminhome");
    } catch (error) {
      toast.error("logging error");
      return;
    }
  };
  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    const parseData = adminData ? JSON.parse(adminData) : null;
    if (parseData) {
      navigate("/adminhome");
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
                 type="password"
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
