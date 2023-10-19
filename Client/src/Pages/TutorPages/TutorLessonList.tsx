import React,{useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorLessonsTable from "../../Components/TutorSide/TutorLessonsDetails/TutorLessonsTable";
import { useNavigate } from "react-router-dom";

function TutorLessonList() {

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
       <div>
       <Row>
         <TutorHeader />
         <Col xs={12} md={2}>
           <TutorSidebar />
         </Col>
         <Col xs={12} md={8}>
           <TutorLessonsTable />
         </Col>
       </Row>
     </div>
    )}
    </>
   
  );
}

export default TutorLessonList;
