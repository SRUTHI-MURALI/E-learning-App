
import { Container, Row } from "react-bootstrap";
import Accordion from "react-bootstrap/Accordion";


interface StudentCourseLessonsProps {
    courseId: object;
  
}
function StudentPdfLessons({ courseId }: StudentCourseLessonsProps) {
   
    
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
        {courseId?.map((courses, index) => (
          <Row className="m-3">
            <Accordion key={courses?._id}>
              <Accordion.Item eventKey={courses?._id}>
                <Accordion.Header>Lesson: {index + 1}</Accordion.Header>
                <Accordion.Body>Title : {courses?.title}</Accordion.Body>
                <Accordion.Body>
                  Description : {courses?.description}
                </Accordion.Body>
                <Accordion.Body>
                  PDF : {courses?.pdf && (
                          <a
                            href={courses?.pdf}
                            target="_blank"
                            rel="noopener noreferrer"
                            download 
                          >
                            Download PDF
                          </a>
                        )}
                </Accordion.Body>
               
              </Accordion.Item>
            </Accordion>
          </Row>
        ))}
      </Container>
    </div>
  );
}

export default StudentPdfLessons;
