import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/Container";
import { Col, Row } from "react-bootstrap";
import "./Body1.css";
import a1 from "../../../../Assets/Images/about2.avif";

function WithHeaderExample() {
  return (
    <Container className="mt-5">
     <h1
          className="text-center text-white m-5"
          style={{ textDecoration: "underline"}}
        >
          About Us
        </h1>
        <Row>
          <Col xs={12} md={6} className="m-4">
            
           
            <p style={{ textAlign: "center", color:'#fff' }}>
              Some quick example text to build on the card title and make up the
              bulk of the card's content.Some quick example text to build on the
              card title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.Some quick example text to build on the card
              title and make up the bulk of the card's content.Some quick
              example text to build on the card title and make up the bulk of
              the card's content.
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
