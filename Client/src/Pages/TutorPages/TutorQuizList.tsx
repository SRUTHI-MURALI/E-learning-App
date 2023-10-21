import {useEffect} from 'react'
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorQuizTable from "../../Components/TutorSide/TutorAddQuiz/TutorQuizTable";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';

function TutorQuizList() {

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
  return (
    <div style={{overflow:'hidden'}}>
     {parseData && (
      <>
      <Row>
        <TutorHeader />
      </Row>
      <Row>
        <Col xs={12} md={2}>
          <TutorSidebar />
        </Col>
        <Col xs={12} md={8}>
          <TutorQuizTable />
        </Col>
      </Row>
    </>
    )}
    </div>
   
   
  );
}

export default TutorQuizList;
