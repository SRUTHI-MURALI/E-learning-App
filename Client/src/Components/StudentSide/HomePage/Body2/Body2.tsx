import React, { useState, useEffect } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import t1 from "../../../../Assets/Images/tutors/t1.avif";
import { Base_Url } from "../../../../Config/Config";
import "./Body2.css";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function BasicExample() {
  const [tutorDetails, setTutorDetails] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const getTutorData = async () => {
      try {
        const response = await axios.get(`${Base_Url}/student/getalltutors`);
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
                <Card.Img style={{ height: "240px" }} variant="top" src={t1} />
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
