import React,{useEffect} from "react";
import { Row, Col } from "react-bootstrap";
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorCourseTable from "../../Components/TutorSide/TutorCourseDetails/TutorCourseTable";
import { useNavigate } from "react-router-dom";

function CourseList() {
  const tutorName = localStorage.getItem("name");
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
       <div style={{overflow:'hidden',}}>
       <Row>
         <TutorHeader />
         <Col xs={12} md={2}  >
           <TutorSidebar />
         </Col>
         <Col xs={12} md={8}>
           <TutorCourseTable tutorname={tutorName} />
         </Col>
       </Row>
     </div>
    )}
    </>
   
  );
}

export default CourseList;
