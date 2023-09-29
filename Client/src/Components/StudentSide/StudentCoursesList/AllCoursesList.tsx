import React, { useEffect, useState } from "react";
import {  Card, Col, Container, Row } from "react-bootstrap";
import "./StudentCoursesList.css";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Image_Url } from "../../../Config/Config";
import { getAllCourses } from "../AxiosConfigStudents/AxiosConfig";

function AllCoursesList() {
  const [allCourseList, setAllCourseList] = useState([]);

  useEffect(() => {
    const getCourses = async ()=>{
      try {
        const response= await getAllCourses()
        setAllCourseList(response.data.allCourses);
      } catch (error) {
        console.error(error);
      }
    }
    getCourses();
    
  }, []);
  return (
    <div>
      <Container className="mt-5 ">
        <p className="allcourses-header">All Courses</p>
        <Row>
          {allCourseList.map((courses, index) => (
            <Col md={4} key={courses._id}>
              <Link
                style={{ textDecoration: "none" }}
                to={`/studentcoursedetails/${courses._id}`}
              >
                <Card
                  style={{ width: "16vw", height: "25rem" }}
                  className="m-2 "
                >
                  <Card.Img
                    style={{ height: "200px" }}
                    variant="top"
                    src={`${Image_Url}/${courses.photo}`}
                  />
                  <Card.Body className="mt-4 justify-content-center align-items-center">
                    <Card.Title className="text-center">
                      Course:{courses.title}
                    </Card.Title>
                    <Card.Text className="text-center">
                      By {courses?.instructor?.name}
                    </Card.Text>
                    <Card.Link>Enroll Now</Card.Link>
                    <Card.Text style={{ float: "right" }}>
                      <FaRupeeSign /> {courses.price}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
}

export default AllCoursesList;
