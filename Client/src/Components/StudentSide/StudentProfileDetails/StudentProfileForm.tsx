import React, { useState, useEffect } from "react";
import "./Profile.css";
import pic from "../../../Assets/Images/pic2.png";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import StudentEditProfileForm from "./StudentEditProfileForm";
import {
  getEnrolledCourses,
  getStudentProfile,
} from "../AxiosConfigStudents/AxiosConfig";

const StudentProfileForm = () => {
  const studentInfo = localStorage.getItem("studentData");
  const info = JSON.parse(studentInfo);

  const [student, setStudent] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const [allCourseList, setAllCourseList] = useState([]);

  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getStudentProfile(id);

        setStudent(response.data.studentDetails);
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(info._id);
  }, []);

  useEffect(() => {
    const enrolledCourses = async (id) => {
      try {
        const response = await getEnrolledCourses(id);
        setAllCourseList(response.data.enrolledCourses);
      } catch (error) {
        console.error(error);
      }
    };

    enrolledCourses(info?._id);
  }, []);

  const handleEditStudentProfile = async () => {
    setShowEdit(true);
  };

  const handleClose = async () => {
    setShowEdit(false);
  };

  return (
    <Container>
  {!showEdit ? (
    <Row>
      <div className="col-lg-6 col-md-12">
        <p className="allcourses-header mt-3">Profile Details</p>
        <div className="profileContainer">
        <div className="profile-pic-area">
        {student?.photo !=="No Pic"  ? (
          <img
            style={{ width: "200px" }}
            src={`${Image_Url}/${student?.photo}`}
            alt="profile"
            className="rounded-circle"
          />
        ) : (
          <img style={{ width: "200px" }} src={pic}  className="rounded-circle" />
        )}

        <h4>{student?.name}</h4>
      </div>
      <Button
        style={{ float: "right" }}
        onClick={handleEditStudentProfile}
      >
        Edit Profile
      </Button>

      <div className="profile-info-area">
        <table>
          <tbody>
            <tr>
              <th>Gender:</th>
              <td>{student?.gender}</td>
            </tr>
            <tr>
              <th>Age:</th>
              <td>{student?.age}</td>
            </tr>
            <tr>
              <th>Country:</th>
              <td>{student?.country}</td>
            </tr>

            <tr>
              <th>Phone Number:</th>
              <td>{student?.phone}</td>
            </tr>
            <tr>
              <th>Email:</th>
              <td>{student?.email}</td>
            </tr>
          </tbody>
        </table>
      </div>
        </div>
      </div>
      <div className="col-lg-6 col-md-12">
        <Row>
          <p className="allcourses-header">Enrolled Courses</p>
          {allCourseList.length !== 0 ? (
            allCourseList.map((course) => (
              <div className="col-12 col-md-4" key={course?._id}>
                <Card
                  style={{ width: "100%" }}
                  className="mt-4 justify-content-center align-items-center"
                >
                  <Card.Img
                  style={{ height: "10rem" }}
                  variant="top"
                  src={`${Image_Url}/${course?.photo}`}
                />

                <Card.Body>
                  <Card.Title>Course:{course?.title}</Card.Title>
                  <Card.Text className="text-center">
                    By {course?.instructor?.name}{" "}
                  </Card.Text>
                </Card.Body>
                </Card>
              </div>
            ))
          ) : (
            <h2 style={{ color: "red", fontStyle: "italic" }}>
              Sorry, no enrolled courses available!
            </h2>
          )}
        </Row>
      </div>
    </Row>
  ) : (
    <StudentEditProfileForm student={info} onClose={handleClose} />
  )}
</Container>

   
  );
};

export default StudentProfileForm;


