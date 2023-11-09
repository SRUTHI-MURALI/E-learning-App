import React, { useState, useEffect } from "react";
import { Row, Col, Form, Container, Card, Button } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getTutorProfile,
  tutorEditProfile,
} from "../AxiosConfigInstructors/AxiosConfig";

interface TutorDetails {
  name: string;
  email: string;
  phone: number;
  qualification: string;
  experience: number;
  password: any;
  about: string;
  start: number;
  end: number;
}

interface TutorEditProfileFormProps {
  tutor: { _id: string };
  onClose: (value: boolean) => void;
}

const TutorEditProfileForm: React.FC<TutorEditProfileFormProps> = ({
  tutor,
  onClose,
}) => {
  const [tutorDetails, setTutorDetails] = useState<TutorDetails | null>(null);
  const [name, setName] = useState<string>("");
  const [phone, setPhone] = useState<number>(0);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [qualification, setQualification] = useState<string>("");
  const [experience, setExperience] = useState<number>(0);
  const [about, setAbout] = useState<string>("");
  const [startOnline, setStartOnline] = useState<number>(0);
  const [onlineEnd, setOnlineEnd] = useState<number>(0);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await getTutorProfile(tutor._id);

        const profile: TutorDetails = response.data.tutorDetails;
        setTutorDetails(profile);
        setAbout(profile?.about || "");
        setEmail(profile?.email || "");
        setExperience(profile?.experience || 0);
        setName(profile?.name || "");
        setQualification(profile?.qualification || "");
        setPhone(profile?.phone || 0);
        setPassword(profile?.password || "");
        setStartOnline(profile?.start || 0);
        setOnlineEnd(profile?.end || 0);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [tutor._id]);

  const handleEditTutor = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const namePattern = /^[A-Za-z\s.]+$/;
    if (name === "") {
      setName("No Name");
    } else {
      if (!namePattern.test(name)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }

    if (about === "") {
      setAbout("No Description");
    } else {
      if (!namePattern.test(about)) {
        toast.error("About can only contain letters and spaces");
        return;
      }
    }

    if (qualification === "") {
      setQualification("Not Specified");
    } else {
      if (!namePattern.test(qualification)) {
        toast.error("Qualification can only contain letters and spaces");
        return;
      }
    }

    if (isNaN(experience) || experience <= 0) {
      setExperience(0);
    }

    if (isNaN(phone) || phone <= 0) {
      setPhone(0);
    } else {
      const phonePattern = /^\d{10}$/;
      if (!phonePattern.test(phone.toString().trim())) {
        toast.error("Please enter a valid 10-digit phone number");
        return;
      }
    }

    if (email === "") {
      setEmail("No Mail");
    } else {
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
    <Container style={{ marginTop: "10rem" }}>
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
                  placeholder={tutorDetails?.name || ""}
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
                  placeholder={tutorDetails?.email || ""}
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
                  placeholder={String(tutorDetails?.phone) || ""}
                  value={phone}
                  onChange={(e) => setPhone(Number(e.target.value))}
                />
              </Col>
            </Form.Group>

            <Row>
            <Col>
  <Form.Group as={Row} className="mb-3">
    <Form.Label column sm="4">
      Online Time:
    </Form.Label>
    <Col sm="5">
      <Form.Control
        type="number"
        placeholder={String(tutorDetails?.start) || ""}
        value={startOnline}
        onChange={(e) => setStartOnline(Number(e.target.value))}
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
                      placeholder={String(tutorDetails?.end) || ""}
                      value={onlineEnd}
                      onChange={(e) => setOnlineEnd(Number(e.target.value))}
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
                  placeholder={tutorDetails?.qualification || ""}
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
                  placeholder={tutorDetails?.about || ""}
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
                  placeholder={tutorDetails?.experience || 0}
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
                  Exit
                </Button>
              </Col>
            </Row>
          </Form>
        </Row>
      </Card>
    </Container>
  );
};

export default TutorEditProfileForm;
