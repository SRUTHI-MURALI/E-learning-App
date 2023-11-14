import React, { useEffect, useState } from "react";
import { Card, Container, Row, Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Course_Upload_Url, Image_Url } from "../../../Config/Config";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStudentEditProfile,
  getStudentProfile,
} from "../AxiosConfigStudents/AxiosConfig";
import PropTypes from "prop-types";

interface StudentEditProfileFormProps {
  student: {
    _id: string;
    name: string;
    email: string;
    password: string;
    gender: string;
    phone: string;
    age: string;
    country: string;
    photo: string;
  };
  onClose: (value: boolean) => void;
}

function StudentEditProfileForm({ student, onClose }: StudentEditProfileFormProps) {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phone, setPhone] = useState<string>('');
  const [gender, setGender] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [age, setAge] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState<string>("");
  const [existingImage, setExistingImage] = useState<string>("");
  const [photo, setPhoto] = useState<string>("");

  useEffect(() => {
    const getProfileData = async (id: string) => {
      try {
        const response = await getStudentProfile(id);
        const profile = response.data.studentDetails;

        setName(profile?.name || "");
        setEmail(profile?.email || "");
        setPassword(profile?.password || "");
        setGender(profile?.gender || "");
        setPhone(profile?.phone || "");
        setAge(profile?.age || "");
        setCountry(profile?.country || "");
        setExistingImage(profile?.photo || "");
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(student._id);
  }, []);

  const handleEditStudentProfile = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (image) {
      await imageHandler();
    } else if (existingImage) {
      setPhoto(existingImage);
    } else {
      setPhoto("No Pic");
    }
    const namePattern = /^[A-Za-z\s.]+$/;
    if (name === "") {
      setName("No Name");
    } else {
      if (!namePattern.test(name)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (gender === "") {
      setGender("No Gender");
    } else {
      if (!namePattern.test(gender)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (country === "") {
      setCountry("No Country");
    } else {
      if (!namePattern.test(country)) {
        toast.error("Username can only contain letters and spaces");
        return;
      }
    }
    if (age === "") {
      setAge("No Age");
    }
    if (phone === '') {
      setPhone('No number');
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

    if (photo) {
      try {
        await getStudentEditProfile(
          student._id,
          name,
          phone,
          email,
          password,
          gender,
          photo,
          age,
          country
        );
        toast.success("successfully edited");
        onClose(false);
      } catch (error) {
        return;
      }
    }
  };

  const handleClose = () => {
    toast.success("successfully closed edit page");
    onClose(false);
  };

  const imageHandler = async () => {
    const formData = new FormData();
    formData.append("file", image as Blob);
    formData.append("upload_preset", "studentImage");
    formData.append("cloud_name", "dnkc0odiw");
    await axios
      .post(`${Course_Upload_Url}`, formData)
      .then((response) => {
        setCloudinaryURL(response.data.public_id);
        setPhoto(cloudinaryURL);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      <Container className="m-5">
        <p className="allcourses-header mt-3">Edit Profile Details</p>

        <Card className="m-5">
          <Row>
            <Col>
              <Form onSubmit={handleEditStudentProfile}>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Name:
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder={name}
                      value={name}
                      onChange={(e) => {
                        const trimmedName = e.target.value.trim();
                        setName(trimmedName);
                      }}
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
                      placeholder={email}
                      value={email}
                      onChange={(e) => {
                        const trimmedEmail = e.target.value.trim();
                        setEmail(trimmedEmail);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Phone
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      placeholder={phone}
                      value={phone}
                      onChange={(e) => {
                        const trimmedPhone = e.target.value.trim();
                        setPhone(trimmedPhone);
                      }}
                    />
                  </Col>
                </Form.Group>

                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Gender
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder={gender}
                      value={gender}
                      onChange={(e) => {
                        const trimmedGender = e.target.value.trim();

                        setGender(trimmedGender);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Age
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="number"
                      placeholder={age}
                      value={age}
                      onChange={(e) => {
                        const trimmedAge = e.target.value.trim();
                        setAge(trimmedAge);
                      }}
                    />
                  </Col>
                </Form.Group>
                <Form.Group as={Row} className="mb-3">
                  <Form.Label column sm="2">
                    Country
                  </Form.Label>
                  <Col sm="10">
                    <Form.Control
                      type="text"
                      placeholder={country}
                      value={country}
                      onChange={(e) => {
                        const trimmedCountry = e.target.value.trim();
                        setCountry(trimmedCountry);
                      }}
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
            </Col>
            <Col xs={12} md={6}>
              <Form.Group controlId="formFile" className="mb-3">
                <Form.Label className="m-5"></Form.Label>
                <img
                  style={{ maxWidth: "50%" }}
                  src={`${Image_Url}/${existingImage}`}
                  alt="profile"
                  className="rounded-circle img-fluid"
                />
                <Form.Control
                  className="mt-5"
                  type="file"
                  onChange={(e) => {
                    const inputElement = e.target as HTMLInputElement;
                    if (inputElement && inputElement.files) {
                      const selectedFile = inputElement.files[0];
                      setImage(selectedFile);
                    }
                  }}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
}

StudentEditProfileForm.propTypes = {
  student: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    gender: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
    age: PropTypes.string.isRequired,
    country: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default StudentEditProfileForm;
