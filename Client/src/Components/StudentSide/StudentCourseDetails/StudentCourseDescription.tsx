import React from "react";
import { Card, Col, Container, Row } from "react-bootstrap";

function StudentCourseDescription({ data }) {
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
                What you will learn{" "}
              </Card.Title>
              <Card.Text style={{ color: "#fff" }}>
                With supporting text below as a natural lead-in to additional
                content. With supporting text below as a natural lead-in to
                additional content. With supporting text below as a natural
                lead-in to additional content. With supporting text below as a
                natural lead-in to additional content. With supporting text
                below as a natural lead-in to additional content. With
                supporting text below as a natural lead-in to additional
                content. With supporting text below as a natural lead-in to
                additional content. With supporting text below as a natural
                lead-in to additional content.
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
