import React, { useState, useEffect } from "react";
import { Row, Col, Form, Container, Card, Button } from "react-bootstrap";
import { Base_Url, Course_Upload_Url } from "../../../Config/Config";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function TutorEditProfileForm({ tutor, onClose }) {
  const [tutorDetails, setTutorDetails] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await axios.get(
          `${Base_Url}/tutor/gettutorprofile/${tutor._id}`
        );
        const profile = response.data.tutorDetails;
        setTutorDetails(response.data.tutorDetails);
        setAbout(profile?.about);
        setEmail(profile?.email);
        setExperience(profile?.experience);
        setName(profile?.name);
        setQualification(profile?.qualification);
        setPhone(profile?.phone);
        setPassword(profile?.password);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, []);

  const handleEditTutor = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`${Base_Url}/tutor/tutoreditedprofile/${tutor._id}`, {
        name,
        phone,
        email,
        experience,
        qualification,
        password,
        about,
      });

      window.location.reload();
    } catch (error) {
      toast.error("edit error");
      return;
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <Container className="m-5">
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Card className="m-5">
        <Row>
          <Form onSubmit={handleEditTutor}>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Name :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={tutorDetails?.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Email :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="email"
                  placeholder={tutorDetails?.email}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                Contact Number :
              </Form.Label>
              <Col sm="8">
                <Form.Control
                  type="number"
                  placeholder={tutorDetails?.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="3">
                Qualification :
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  placeholder={tutorDetails?.qualification}
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                About :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="text"
                  placeholder={tutorDetails?.about}
                  value={about}
                  onChange={(e) => setAbout(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Experience :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder={tutorDetails?.experience}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Password :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="password"
                  placeholder={tutorDetails?.password}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Col>
            </Form.Group>
            <Row>
              <Col>
                <Button type="submit">Submit</Button>
              </Col>
              <Col>
                <Button style={{ float: "right" }} onClick={handleClose}>
                  {" "}
                  Exit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Card>
    </Container>
  );
}

export default TutorEditProfileForm;
