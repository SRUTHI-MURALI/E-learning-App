import React from "react";
import { Container, Row } from "react-bootstrap";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
// import StudentQuizForm from '../../Components/StudentSide/StudentQuizes/StudentQuizForm'
import StudentCourseQuizList from "../../Components/StudentSide/StudentQuizes/StudentCourseQuizList";

function StudentQuizPage() {
  return (
    <Container>
      <Row>
        <StudentHeader />
      </Row>
      <Row>
        <StudentCourseQuizList />
      </Row>
    </Container>
  );
}

export default StudentQuizPage;
