import React, { useState, useEffect } from "react";
import axios from "axios";
import t1 from "../../../Assets/Images/tutors/t1.avif";
import { Link, useParams } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Base_Url, Image_Url } from "../../../Config/Config";

export default function TutorProfile() {
  const [tutorDetails, setTutorDetails] = useState([]);
  const [tutorCourses, setTutorCourses] = useState([]);
  const { id } = useParams();
  console.log(id, "idd");

  useEffect(() => {
    const getTutorData = async () => {
      try {
        const response = await axios.get(
          `${Base_Url}/student/gettutordetails/${id}`
        );
        setTutorDetails(response.data.tutorDetails);
        setTutorCourses(response.data.tutorCourses);
        console.log(response.data.tutorDetails, "lklklk");
      } catch (error) {
        console.log({ error });
      }
    };
    getTutorData();
  }, []);

  return (
    <section>
      <Container className="py-5">
        <Row>
          {tutorDetails && (
            <>
              <Col lg="4" key={tutorDetails?._id}>
                <Card className="mb-4">
                  <Card.Body className="text-center">
                    <Card.Img
                      src={t1}
                      className="rounded-circle"
                      style={{ width: "150px" }}
                    />
                    <p className="text-muted mb-1">{tutorDetails?.name}</p>
                    <p className="text-muted mb-1">
                      {tutorDetails?.qualification}
                    </p>
                  </Card.Body>
                </Card>
              </Col>
              <Col lg="8">
                <Card className="mb-4">
                  <Card.Body>
                    <Row>
                      <Col sm="3">
                        <Card.Text>Full Name</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">
                          {tutorDetails?.name}
                        </Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Email</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">
                          {tutorDetails?.email}
                        </Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Phone</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">
                          {tutorDetails?.phone}
                        </Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Experience</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">
                          {tutorDetails?.experience} Years
                        </Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>Specialisations</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">
                          {tutorDetails?.qualification}
                        </Card.Text>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <Col sm="3">
                        <Card.Text>About</Card.Text>
                      </Col>
                      <Col sm="9">
                        <Card.Text className="text-muted">
                          {tutorDetails?.about}
                        </Card.Text>
                      </Col>
                    </Row>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )}
        </Row>
        <Row>
          <p className="allcourses-header"> Courses By {tutorDetails?.name}</p>
          {tutorCourses.map((course, index) => (
            <Col md={3}>
              <Link to={`/studentcoursedetails/${course._id}`}>
                <Card className="mb-4" style={{ height: "400px" }}>
                  <Card.Body className="text-center">
                    <Card.Img
                      style={{ height: "250px" }}
                      variant="top"
                      src={`${Image_Url}/${course?.photo}`}
                    />
                    <p className="text-muted mb-1 mt-4">
                      Title:{course?.title}
                    </p>
                    <p className="text-muted mb-1 mt-2">
                      Duration:{course?.duration} Hours
                    </p>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
