import { Container, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";
import { Video_Url } from "../../../Config/Config";

interface CourseLesson {
  _id: string;
  title: string;
  description: string;
  duration: number;
  video: string;
}

interface StudentCourseLessonsProps {
  courseData: {
    courseLessons: CourseLesson[];
  };
  show: boolean;
}

function StudentCourseLessons({ courseData, show }: StudentCourseLessonsProps) {
  return (
    <div>
      <Container>
        <h2
          className="m-3"
          style={{
            color: "rgb(139, 179, 198)",
            fontWeight: "bolder",
            fontSize: "30px",
          }}
        >
          Course Highlights
        </h2>
        {courseData?.courseLessons?.map((courses, index) => (
          <Row className="m-3" key={courses?._id}>
            <Accordion>
              <Accordion.Item eventKey={courses?._id}>
                <Accordion.Header>Lesson: {index + 1}</Accordion.Header>
                <Accordion.Body>Title : {courses?.title}</Accordion.Body>
                <Accordion.Body>
                  Description : {courses?.description}
                </Accordion.Body>
                <Accordion.Body>
                  Duration : {courses?.duration} Hours
                </Accordion.Body>
                {show && (
                  <Accordion.Body>
                    <video
                      src={`${Video_Url}/${courses?.video}`}
                      controls
                      style={{ width: "50%", height: "100px" }}
                    ></video>
                  </Accordion.Body>
                )}
              </Accordion.Item>
            </Accordion>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default StudentCourseLessons;
