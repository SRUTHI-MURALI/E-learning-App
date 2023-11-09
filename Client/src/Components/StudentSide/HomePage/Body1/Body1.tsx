
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./Body1.css";
import a1 from "../../../../Assets/Images/about2.avif";

function WithHeaderExample() {
  return (
    <Container className="mt-5">
     <h1
          className="text-center  m-5"
          style={{ textDecoration: "underline", color:' aqua'}}
        >
          About Us
        </h1>
        <Row>
          <Col xs={12} md={6} className="m-4">
            
           
            <p style={{ textAlign: "center", color:'#fff' }}>
            An electronic learning platform is an integrated set of interactive online services that provide trainers, learners, and others involved in education with information, tools, and resources to support and enhance education delivery and management. One type of eLearning platform is a learning management system (LMS).An electronic learning platform is an integrated set of interactive online services that provide trainers, learners, and others involved in education with information, tools, and resources to support and enhance education delivery and management. One type of eLearning platform is a learning management system (LMS).
            </p>
          </Col>
          <Col xs={12} md={5}>
            <img className="aboutCardimg" style={{height:'15rem'}} src={a1} />
           
            
            
          </Col>
        </Row>
      
    </Container>
  );
}

export default WithHeaderExample;
