
import { Container, Row } from "react-bootstrap";
import img from "../../../Assets/Images/ci4.jpg";
import "./StudentCoursesList.css";

function CourseBody1() {
  return (
    <div>
      <Container>
        <Row>
          <img className="courseBodyimg mt-4" src={img} />
        </Row>
      </Container>
    </div>
  );
}

export default CourseBody1;
