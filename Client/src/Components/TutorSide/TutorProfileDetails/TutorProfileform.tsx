import React, { useState, useEffect } from "react";
import { ImArrowRight } from "react-icons/im";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import TutorProfileImage from "./TutorProfileImage";
import TutorEditProfileForm from "./TutorEditProfileForm";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getTutorProfile } from "../AxiosConfigInstructors/AxiosConfig";

interface TutorProfileFormProps {
  tutor: { _id: string };
}

const TutorProfileForm: React.FC<TutorProfileFormProps> = ({ tutor }) => {
  const [user, setUser] = useState<any>([]); 
  const [showEdit, setShowEdit] = useState<boolean>(false);
  const [courses, setCourses] = useState<number>(0);

  useEffect(() => {
    const getProfileData = async () => {
      try {
        const response = await getTutorProfile(tutor._id);
        setUser(response.data.tutorDetails);
        setCourses(response.data.courseCount);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, [showEdit]);

  const handleEditProfile = async () => {
    setShowEdit(true);
  };

  const handleClose = async () => {
    setShowEdit(false);
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
      {showEdit === false ? (
        <>
          <Row style={{ marginTop: "7rem" }}>
            <Col>
              <p className="studentlistheading">
                <ImArrowRight /> <u>Tutor Profile</u>
              </p>
            </Col>
            <Col>
              <Button
                className="studentlistheading"
                onClick={handleEditProfile}
                style={{ float: "right" }}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>

          <Container>
            <Card className="m-5">
              <Row>
                <Col xs={12} md={6}>
                  <div className="body">
                    <p>Name: {user?.name}</p>
                    <p>Email: {user?.email}</p>
                    <p>Contact: {user?.phone}</p>
                    <p>
                      Online Time: {user?.startOnline} am to {user?.onlineEnd} am
                    </p>
                    <p>Experience: {user?.experience} Years</p>
                    <p>Qualification: {user?.qualification}</p>
                    <p>About: {user?.about}</p>
                    <p>Courses: {courses} </p>
                    <p>
                      Account created at:{" "}
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  <TutorProfileImage tutor={tutor} onClose={handleClose} />
                </Col>
              </Row>
            </Card>
          </Container>
        </>
      ) : (
        <TutorEditProfileForm tutor={tutor} onClose={handleClose} />
      )}
    </>
  );
};

export default TutorProfileForm;
