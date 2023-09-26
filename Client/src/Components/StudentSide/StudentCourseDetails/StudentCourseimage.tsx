import React from "react";
import { Container, Row } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";

function StudentCourseimage({ data }) {
  console.log(data, "data2");

  return (
    <div>
      <Container className="d-flex justify-content-center align-item-center">
        <Row>
          <img
            style={{ height: "450px", width: "100%" }}
            src={`${Image_Url}/${data?.photo}`}
          />
        </Row>
      </Container>
    </div>
  );
}

export default StudentCourseimage;
