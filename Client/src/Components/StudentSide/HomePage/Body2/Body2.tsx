import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./Body2.css";
import { Link } from "react-router-dom";
import { getInstructors } from "../../AxiosConfigStudents/AxiosConfig";
import { Image_Url } from "../../../../Config/Config";

function BasicExample() {
  const [tutorDetails, setTutorDetails] = useState([]);

  useEffect(() => {
    const getTutorData = async () => {
      try {
        const response = await getInstructors();
        setTutorDetails(response.data.tutorDetails);
      } catch (error) {
        console.log({ error });
      }
    };
    getTutorData();
  }, []);

  return (
    <Container className="mt-5 cardLayout ">
      <Row>
        {tutorDetails.map((tutor, index) => (
          <Col md={4} key={tutor._id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/tutordetails/${tutor?._id}`}
            >
              <Card style={{ width: "18rem" }}>
                <Card.Img style={{ height: "240px" }} variant="top" src={`${Image_Url}/${tutor?.photo}`} />
                <Card.Body>
                  <Card.Title> Name:{tutor?.name}</Card.Title>
                  <Card.Text>
                    Experience:
                    {tutor?.experience} Years
                  </Card.Text>
                  <Card.Text>
                    specializations:
                    {tutor?.qualification}
                  </Card.Text>

                  <Link to={`/tutordetails/${tutor?._id}`}>Know More </Link>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default BasicExample;
