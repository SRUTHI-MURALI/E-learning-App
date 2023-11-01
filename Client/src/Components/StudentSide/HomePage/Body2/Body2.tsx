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
       <h1
          className="text-center m-5"
          style={{ textDecoration: "underline", color:' aqua'}}
        >
          Our Teachers
        </h1>
      <Row>
        {tutorDetails.map((tutor, index) => (
          <Col md={3} key={tutor._id}>
            <Link
              style={{ textDecoration: "none" }}
              to={`/tutordetails/${tutor?._id}`}
            >
              <Card style={{ width: "18rem" ,height:'25rem'}}>
                <Card.Img style={{ height: "14rem" }} variant="top" src={`${Image_Url}/${tutor?.photo}`} />
                <Card.Body>
                  <Card.Title className="text-center"> {tutor?.name}</Card.Title>
                  <Card.Text>
                    Experience:
                    {tutor?.experience} Years
                  </Card.Text>
                  <Card.Text>
                    Specialized in : 
                     {tutor?.qualification}
                  </Card.Text>

                 
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
