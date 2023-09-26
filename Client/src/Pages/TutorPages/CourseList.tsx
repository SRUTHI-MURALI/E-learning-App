import React from "react";
import { Row, Col } from "react-bootstrap";
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorCourseTable from "../../Components/TutorSide/TutorCourseDetails/TutorCourseTable";

function CourseList() {
  const tutorName = localStorage.getItem("name");
  return (
    <div>
      <Row>
        <TutorHeader />
        <Col xs={12} md={2}>
          <TutorSidebar />
        </Col>
        <Col xs={12} md={8}>
          <TutorCourseTable tutorname={tutorName} />
        </Col>
      </Row>
    </div>
  );
}

export default CourseList;
