import { useState, useEffect } from "react";
import { Card, Container, Row, Form, Col, Button } from "react-bootstrap";
import axios from "axios";
import { Course_Upload_Url, Image_Url } from "../../../Config/Config";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  getStudentEditProfile,
  getStudentProfile,
} from "../AxiosConfigStudents/AxiosConfig";
import PropTypes from "prop-types";

interface StudentEditProfileFormProps {
  student: object;
  onClose: () => void;
}
function StudentEditProfileForm({
  student,
  onClose,
}: StudentEditProfileFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [gender, setGender] = useState("")
  const [password, setPassword] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");
  const [existingImage, setExistingImage] = useState("");
  const [photo, setPhoto] = useState("");

  useEffect(() => {
    const getProfileData = async (id: string) => {
      try {
        const response = await getStudentProfile(id);
        const profile = response.data.studentDetails;

        setName(profile?.name);
        setEmail(profile?.email);
        setPassword(profile?.password);
        setGender(profile?.gender);
        setPhone(profile?.phone);
        setAge(profile?.age);
        setCountry(profile?.country);
        setExistingImage(profile?.photo);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(student._id);
  }, []);

  const handleEditStudentProfile = async (e) => {
    e.preventDefault();
    
    if (image) {
      await imageHandler();

    } else if(existingImage) {
      setPhoto(existingImage);
    }else{
      setPhoto("No Pic")
    }

    if(name === ''){
      setName("No Name")
    }
    if(gender === ''){
      setGender("No Gender")
    }
    if(country === ''){
      setCountry("No Country")
    }
    if(age === ''){
      setAge("No Age")
    }
    if(phone === ''){
      setPhone("No Number")
    }
    if(email === ''){
      setEmail("No Mail")
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

        window.location.reload();
      } catch (error) {
        return;
      }
    }
  };

  const handleClose = () => {
    onClose();
  };

  const imageHandler = async () => {
    const formData = new FormData();
    formData.append("file", image);
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
              <Form>
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
                      onChange={(e) => { const trimmedEmail = e.target.value.trim();
                        setEmail(trimmedEmail);}}
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
                      placeholder={phone}
                      value={phone}
                      onChange={(e) => { const trimmedPhone= e.target.value.trim();
                        setPhone(trimmedPhone);}}
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
                      onChange={(e) => { const trimmedGender = e.target.value.trim();
                        
                        setGender(trimmedGender);}}
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
                      onChange={(e) => { const trimmedAge = e.target.value.trim();
                        setAge(trimmedAge);}}
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
                      onChange={(e) => { const trimmedCountry = e.target.value.trim();
                        setCountry(trimmedCountry);}}
                    />
                  </Col>
                </Form.Group>
                <Row>
                  <Col>
                    <Button type="submit" onClick={handleEditStudentProfile}>
                      Submit
                    </Button>
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
      style={{ maxWidth: "100%" }}
      src={`${Image_Url}/${existingImage}`}
      alt="profile"
      className="rounded-circle"
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
  student: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};
export default StudentEditProfileForm;
