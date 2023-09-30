import React,{useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import CourseBody1 from "../../Components/StudentSide/StudentCoursesList/CourseBody1";
import AllCoursesList from "../../Components/StudentSide/StudentCoursesList/AllCoursesList";
import EnrolledCoursesList from "../../Components/StudentSide/StudentCoursesList/EnrolledCoursesList";
import Footer from "../../Components/StudentSide/StudentFooter/Footer";
import { useNavigate } from "react-router-dom";

function StudentCourseList() {
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
       <div>
       <Container>
         <Row>
           <StudentHeader />
 
           <CourseBody1 />
           <AllCoursesList />
           <EnrolledCoursesList />
           <Footer />
         </Row>
       </Container>
     </div>
    )}
    </>
   
  );
}

export default StudentCourseList;
