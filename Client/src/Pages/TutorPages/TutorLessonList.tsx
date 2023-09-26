import React from "react";
import { Col, Row } from "react-bootstrap";
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorLessonsTable from "../../Components/TutorSide/TutorLessonsDetails/TutorLessonsTable";

function TutorLessonList() {
  return (
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
  );
}

export default TutorLessonList;
