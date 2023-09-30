import React,{useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import TutorProfile from "../../Components/StudentSide/TutorDetails/TutorProfile";
import { useNavigate } from "react-router-dom";

function TutorDetailsPage() {
  const studentData = localStorage.getItem("studentData");
  const parseData= JSON.parse(studentData);

  const navigate = useNavigate()

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
  const parseData= JSON.parse(studentData);
    if (!parseData) {
      navigate("/studentlogin");
    }
  }, [navigate]);
  return (
    <>
    {parseData && (
      <Container>
      <Row>
        <StudentHeader />
      </Row>
      <Row>
        <TutorProfile />
      </Row>
    </Container>
    )}
    </>
    
  );
}

export default TutorDetailsPage;
