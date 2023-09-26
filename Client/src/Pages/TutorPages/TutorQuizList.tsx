import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import TutorQuizTable from "../../Components/TutorSide/TutorAddQuiz/TutorQuizTable";
import { Col, Row } from "react-bootstrap";

function TutorQuizList() {
  return (
    <>
      <Row>
        <TutorHeader />
      </Row>
      <Row>
        <Col xs={12} md={2}>
          <TutorSidebar />
        </Col>
        <Col xs={12} md={8}>
          <TutorQuizTable />
        </Col>
      </Row>
    </>
  );
}

export default TutorQuizList;
