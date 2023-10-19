import {useEffect} from 'react'
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import { Col, Row } from "react-bootstrap";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorStudentTable from "../../Components/TutorSide/TutorStudentDetails/TutorStudentTable";
import { useNavigate } from 'react-router-dom';

function TutorStudentList() {
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
    <>
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
           <TutorStudentTable />
         </Col>
       </Row>
     </>
    )}
    </>
   
  );
}

export default TutorStudentList;
