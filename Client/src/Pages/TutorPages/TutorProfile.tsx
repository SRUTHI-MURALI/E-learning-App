import {useEffect} from 'react'
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorProfileform from "../../Components/TutorSide/TutorProfileDetails/TutorProfileform";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function TutorProfile() {
  const tutorData = localStorage.getItem("tutorData");
  const parseData= JSON.parse(tutorData);

  const navigate = useNavigate()

  useEffect(() => {
    const tutorData = localStorage.getItem("tutorData");
    const parseData= JSON.parse(tutorData);
    if (!parseData) {
      navigate("/tutorlogin");
    }
  }, [navigate]);
  
  const tutor = parseData;
  return (
    <>
    {parseData && (
      <div style={{ overflow: "hidden" }}>
      <TutorHeader />

      <Row>
        <Col xs={12} md={2}>
          <TutorSidebar />
        </Col>
        <Col xs={12} md={8}>
          <TutorProfileform tutor={tutor} />
        </Col>
      </Row>
    </div>
    )}
    </>
    
  );
}

export default TutorProfile;
