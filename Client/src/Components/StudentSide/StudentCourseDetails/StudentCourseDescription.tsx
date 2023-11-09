
import { Card, Col, Container, Row } from "react-bootstrap";

interface StudentCourseDescriptionProps {
  courseData: object;
}

function StudentCourseDescription({
  courseData,
}: StudentCourseDescriptionProps) {
  return (
    <div>
      <Container className="d-flex text-center bg-transparent   justify-content-center align-item-center m-3">
        <Row>
          <Card className="bg-transparent">
            <Card.Body>
              <Card.Title
                style={{
                  color: "rgb(139, 179, 198)",
                  fontWeight: "bolder",
                  fontSize: "30px",
                }}
              >
                Know about the course{" "}
              </Card.Title>
              <Card.Text style={{ color: "#fff" }}>
                {courseData?.description}
              </Card.Text>
              <Row>
                <Col>
                  <Card.Text style={{ color: "#fff" }}></Card.Text>
                </Col>
                <Col>
                  <Card.Text style={{ color: "#fff" }}></Card.Text>
                </Col>
                <Col>
                  <Card.Text style={{ color: "#fff" }}></Card.Text>
                </Col>
              </Row>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default StudentCourseDescription;
