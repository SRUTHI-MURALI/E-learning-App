import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row } from "react-bootstrap";
import axios from "axios";
import "./StudentCoursesList.css";
import { Base_Url, Image_Url } from "../../../Config/Config";

function EnrolledCoursesList() {
  const [allCourseList, setAllCourseList] = useState([]);

  const student = localStorage.getItem("studentData");
  const parseData = JSON.parse(student);

  useEffect(() => {
    axios
      .get(`${Base_Url}/student/getenrolledcourses/${parseData?._id}`)
      .then((response) => {
        setAllCourseList(response.data.enrolledCourses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <Container className="mt-5">
        <p className="allcourses-header">Enrolled Courses</p>
        <Row>
          {allCourseList.length !== 0 ? (
            allCourseList.map((course) => (
              <Col key={course._id}>
                <Card
                  style={{ width: "16vw", height: "25rem" }}
                  className="mt-4 justify-content-center align-items-center"
                >
                  <Card.Img
                    style={{ height: "15rem" }}
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
              </Col>
            ))
          ) : (
            <h2 style={{ color: "red", fontStyle: "italic" }}>
              Sorry No enrolled courses available !{" "}
            </h2>
          )}
        </Row>
      </Container>
    </div>
  );
}

export default EnrolledCoursesList;
