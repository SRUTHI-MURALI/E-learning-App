import {useEffect} from "react";
import { Container, Row } from "react-bootstrap";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";

import AllCoursesList from "../../Components/StudentSide/StudentCoursesList/AllCoursesList";
import EnrolledCoursesList from "../../Components/StudentSide/StudentCoursesList/EnrolledCoursesList";
import Footer from "../../Components/StudentSide/StudentFooter/Footer";
import { useNavigate } from "react-router-dom";


function StudentCourseList() {
  const studentData = localStorage.getItem("studentData");
  const parseData = studentData ? JSON.parse(studentData) : null;

  const navigate = useNavigate()

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
  const parseData = studentData ? JSON.parse(studentData) : null;
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
