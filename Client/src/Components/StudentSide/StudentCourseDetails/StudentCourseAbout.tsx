import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Image_Url } from "../../../Config/Config";
import {
  getAllCourses,
  getEnrolledCourses,
} from "../AxiosConfigStudents/AxiosConfig";

interface StudentCourseAboutProps {
  courseData: object;
}

function StudentCourseAbout({ courseData }: StudentCourseAboutProps) {
  const [allCourseList, setAllCourseList] = useState([]);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  useEffect(() => {
    const getCourses = async () => {
      try {
        const response = await getAllCourses();
        setAllCourseList(response.data.allCourses);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses();
  }, []);

  const studentData = localStorage.getItem("studentData");
  const parseData = JSON.parse(studentData);

  useEffect(() => {
    const enrolledCourses = async (id) => {
      try {
        const response = await getEnrolledCourses(id);

        setEnrolledCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error(error);
      }
    };

    enrolledCourses(parseData?._id);
  }, []);

  const filteredCourses = allCourseList.filter((course) => {
    return !enrolledCourses.some(
      (enrolledCourse) => enrolledCourse._id === course._id
    );
  });
  
  return (
    <Container className="mt-5 cardLayout ">
      <h2
        className="m-3"
        style={{
          color: "rgb(139, 179, 198)",
          fontWeight: "bolder",
          fontSize: "30px",
        }}
      >
        Explore More...
      </h2>
      <Row className="m-3">
  {filteredCourses.map((courses, index) => (
    courseData?._id !== courses?._id ? (
      <Col xs={12} sm={6} md={4} lg={3} key={courses?._id}>
        <Link  to={`/studentcoursedetails/${courses?._id}`} style={{ textDecoration: 'none' }}>
          <Card style={{ width: "100%" }} className="m-2">
            <Card.Img style={{ height: "200px" }} variant="top" src={`${Image_Url}/${courses?.photo}`} />
            <Card.Body className="mt-4 justify-content-center align-items-center">
              <Card.Title className="text-center">
                {courses?.title}
              </Card.Title>
              <Card.Text className="text-center">
                By Tutor's name
              </Card.Text>
              <Card.Link>Enroll Now</Card.Link>
              <Card.Text style={{ float: "right" }}>
                <FaRupeeSign /> {courses?.price}
              </Card.Text>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    ) : null
  ))}
</Row>



    </Container>
  );
}

export default StudentCourseAbout;
