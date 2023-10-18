
import { Container, Row } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";

interface StudentCourseImageProps {
  courseData: object;
}

function StudentCourseimage({ courseData }: StudentCourseImageProps) {
  return (
    <div>
      <Container className="d-flex justify-content-center align-item-center">
        <Row>
          <img
            style={{ height: "450px", width: "100%" }}
            src={`${Image_Url}/${courseData?.photo}`}
          />
        </Row>
      </Container>
    </div>
  );
}

export default StudentCourseimage;
