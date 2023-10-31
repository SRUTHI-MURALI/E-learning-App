import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import quiz from "../../../../Assets/Images/carouselBody/quiz.jpeg";
import QA from "../../../../Assets/Images/carouselBody/Q&A.jpeg";
import pdf from "../../../../Assets/Images/carouselBody/pdf.png";
import mentor from "../../../../Assets/Images/carouselBody/mentor.webp";
import "./Cards.css";
import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

function BasicExample() {
  return (
<>

    <Container className="mt-5">
      <h1 className="text-center text-white" style={{textDecoration: 'underline'}}>Our Best Services</h1>
      <Row className="cardlayout">
        <Col xs={12} lg={3}>
          <Link to="/chat" style={{textDecoration:'none'}}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={QA} />
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>Chat with Tutor</Card.Title>
            </Card.Body>
          </Card>
          </Link>
        </Col>

        <Col xs={12} lg={3}>
          <Link to={"/studentquizpage"} style={{textDecoration:'none'}}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={quiz} />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>Quizzes</Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>

        <Col xs={12} lg={3}>
          <Link to="/studentpdfs" style={{textDecoration:'none'}}>
          <Card style={{ width: "18rem" }}>
            <Card.Img variant="top" src={pdf} />
            <Card.Body>
              <Card.Title style={{ textAlign: "center" }}>Pdfs</Card.Title>
            </Card.Body>
          </Card>
          </Link>
        </Col>
        <Col xs={12} lg={3}>
          <Link to="/mentoring" style={{textDecoration:'none'}}>
            <Card style={{ width: "18rem" }}>
              <Card.Img variant="top" src={mentor} />
              <Card.Body>
                <Card.Title style={{ textAlign: "center" }}>
                  One-to-One Mentering
                </Card.Title>
              </Card.Body>
            </Card>
          </Link>
        </Col>
      </Row>
    </Container>
    </>
  );
}

export default BasicExample;
