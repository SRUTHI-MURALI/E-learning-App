import axios from "axios";
import React, { useState, useEffect } from "react";

import { ImArrowRight } from "react-icons/im";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Base_Url } from "../../../Config/Config";
import TutorProfileImage from "./TutorProfileImage";
import TutorEditProfileForm from "./TutorEditProfileForm";
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function TutorProfileform({ tutor }) {
  const [user, setUser] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  useEffect(() => {
    
    const getProfileData = async () => {
      try {
        const response = await axios.get(
          `${Base_Url}/tutor/gettutorprofile/${tutor._id}`
        );
        setUser(response.data.tutorDetails);
        console.log(response.data.tutorDetails); // Use response.data.tutorDetails instead of 'user'
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData();
  }, []); // Add 'tutor' as a dependency to re-fetch data when it changes

  const handleEditProfile = async () => {
    
    
    setShowEdit(true);
  };

  const handleClose=async ()=>{
    toast.success("successfully edited profile")
    setShowEdit(false)
  }

  return (
    <>
    <ToastContainer position='top-center' autoClose={3000}></ToastContainer>
      {showEdit === false ? (
        <>
          <Row>
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
                    <p>Gender: {user?.gender}</p>
                    <p>Experience: {user?.experience}</p>
                    <p>Qualification: {user?.qualification}</p>
                    <p>About: {user?.about}</p>
                    <p>Courses: {user?.courses}</p>
                    <p>
                      Account created at:{" "}
                      {new Date(user?.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </Col>

                <Col xs={12} md={4}>
                  
                    <TutorProfileImage tutor={tutor} />
                 
                </Col>
              </Row>
            </Card>
          </Container>
        </>
      ) : 
      (
        <TutorEditProfileForm tutor={tutor} onClose={handleClose}/>
      )}
    </>
  );
}

export default TutorProfileform;
