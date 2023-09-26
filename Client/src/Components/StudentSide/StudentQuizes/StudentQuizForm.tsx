import React, { useState, useEffect } from "react";
import "./StudentQuiz.css";
import axios from "axios";
import { Base_Url } from "../../../Config/Config";
import { Card, Container, Row } from "react-bootstrap";
import img from "../../../Assets/Images/quizimg.jpeg";

function StudentQuizForm({ courseId }) {
  const [questionset, setQuestionSet] = useState([]);
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    axios
      .get(`${Base_Url}/student/getquiz/${courseId}`)
      .then((response) => {
        setQuestionSet(response.data.allQuizSets);
        console.log(response.data, "haiii");
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Row>
      <Container className="d-flex justify-content-center align-items-center mt-2">
        <Card className=" text-white" style={{ width: "65rem" }}>
          <Card.Img
            src={img}
            style={{ width: "60rem", height: "30rem" }}
            className="m-4"
            alt="Card image"
          />
          <Card.ImgOverlay>
            <Card.Title className="m-4 d-flex justify-content-center align-items-center">
              Quiz Time
            </Card.Title>
            <br />
            {questionset.map((quiz, index) => (
              <div key={index}>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                  Question {index + 1}: {quiz[index]?.question}
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                  Option 1: {quiz[index].option1}
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                  Option 2: {quiz[index].option2}
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                  Option 3: {quiz[index].option3}
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                  Option 4: {quiz[index].option4}
                </Card.Text>
              </div>
            ))}
          </Card.ImgOverlay>
        </Card>
      </Container>
    </Row>
  );
}

export default StudentQuizForm;
