import React, { useState, useEffect } from "react";
import { Row, Col, Form, Container, Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getTutorProfile,
  tutorEditProfile,
} from "../AxiosConfigInstructors/AxiosConfig";

function TutorEditProfileForm({ tutor, onClose }) {
  const [tutorDetails, setTutorDetails] = useState([]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [qualification, setQualification] = useState("");
  const [experience, setExperience] = useState("");
  const [about, setAbout] = useState("");
  const [startOnline, setStartOnline] = useState(0);
  const [onlineEnd, setOnlineEnd] = useState(0);


  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await getTutorProfile(tutor._id);

        const profile = response.data.tutorDetails;
        setTutorDetails(response.data.tutorDetails);
        setAbout(profile?.about);
        setEmail(profile?.email);
        setExperience(profile?.experience);
        setName(profile?.name);
        setQualification(profile?.qualification);
        setPhone(profile?.phone);
        setPassword(profile?.password);
        setStartOnline(profile?.startOnline)
        setOnlineEnd(profile?.onlineEnd)
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, []);

  const handleEditTutor = async (e) => {
    e.preventDefault();
   
    
    const namePattern = /^[A-Za-z\s.]+$/;
    if(name === ''){
      setName("No Name")
    }else{
      
      if (!namePattern.test(name)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }

    if(about === ''){
      setAbout("No Description")
    }else{
      
      if (!namePattern.test(about)) {
        toast.error("About can only contain letters and spaces");
        return;
      }
    }

    if(qualification === ''){
      setQualification("Not Specified")
    }else{
      
      if (!namePattern.test(qualification)) {
        toast.error("Qualification can only contain letters and spaces");
        return;
      }
    }
   
    if(experience === ''){
      setExperience("No Experience")
    }
    if(phone === ''){
      setPhone("No Number")
    }else{
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phone.toString().trim())) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }
      
    }
    if(email === ''){
      setEmail("No Mail")
    }else{
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailPattern.test(email.trim())) {
        toast.error("Please enter a valid email address");
        return;
      }
  
    }
    
    
  
    try {
      await tutorEditProfile(
        tutor._id,
        name,
        phone,
        email,
        experience,
        qualification,
        password,
        about,
        startOnline,
        onlineEnd
      );

      toast.success("Successfully updated the profile");
      onClose(false);
    } catch (error) {
      toast.error("edit error");
      return;
    }
  };

  const handleClose = () => {
    toast.success("Edit profile page exited");
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
              <Form.Label column sm="2">
                 Number :
              </Form.Label>
              <Col sm="10">
                <Form.Control
                  type="number"
                  placeholder={tutorDetails?.phone}
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Col>
            </Form.Group>
           
           <Row>
              <Col>
              <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                 Online Time :
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="number"
                  placeholder={tutorDetails?.start}
                  value={startOnline}
                  onChange={(e) => setStartOnline(e.target.value)}
                />
                
              </Col>
              </Form.Group>
              </Col>
              <Col>
              <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="4">
                to
              </Form.Label>
              <Col sm="5">
                <Form.Control
                  type="number"
                  placeholder={tutorDetails?.end}
                  value={onlineEnd}
                  onChange={(e) => setOnlineEnd(e.target.value)}
                />
                
              </Col>
              </Form.Group>
              </Col>
              </Row>
           
           
           
           
            <Form.Group as={Row} className="mb-3">
              <Form.Label column sm="2">
                Qualification :
              </Form.Label>
              <Col sm="10">
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
