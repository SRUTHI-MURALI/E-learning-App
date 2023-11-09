import  { useEffect } from "react";
import { Container, Row } from "react-bootstrap";


import { useNavigate } from "react-router-dom";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import StudentPdfCourses from "../../Components/StudentSide/StudentPdfs/StudentPdfCourses";

function StudentCoursePdf() {
  const studentData = localStorage.getItem("studentData");
  const parseData = studentData ? JSON.parse(studentData) : null;

  const navigate = useNavigate();

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
        <Container>
          <Row>
            <StudentHeader />
          </Row>
          <Row>
            <StudentPdfCourses/>
          </Row>
        </Container>
      )}
    </>
  );
}

export default StudentCoursePdf;
