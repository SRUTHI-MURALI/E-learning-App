
import { Container, Row } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";

interface StudentCourseImageProps {
  courseData: any;
}

function StudentCourseimage({ courseData }: StudentCourseImageProps) {
  return (
    <div>
      <Container style={{marginTop:'120px'}} className="d-flex justify-content-center align-item-center">
        <Row>
        <h1
          className="text-center text-white mb-4"
          style={{fontStyle:'italic'}}
        >
       {courseData?.title}
        </h1>
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
