import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import StudentCourseQuizList from "../../Components/StudentSide/StudentQuizes/StudentCourseQuizList";
import { useNavigate } from "react-router-dom";

function StudentQuizPage() {
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
    < >
      {parseData && (
        <Container >
          <Row>
            <StudentHeader />
          </Row>
          <Row>
            <StudentCourseQuizList />
          </Row>
        </Container>
      )}
    </>
  );
}

export default StudentQuizPage;
