import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Base_Url, Image_Url } from "../../../Config/Config";
import axios from "axios";
import StudentQuizForm from "./StudentQuizForm";

function StudentCourseQuizList() {
  const [allCourseList, setAllCourseList] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);

  useEffect(() => {
    axios
      .get(`${Base_Url}/admin/getallcourses`)
      .then((response) => {
        setAllCourseList(response.data.allCourses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleQuiz = async (id) => {
    setSelectedCourseId(id);
    setShowQuiz(true);
  };
  return (
    <Row>
      <Container>
        {showQuiz == false ? (
          <>
            {allCourseList.map((courses, index) => (
              <Card className="m-5">
                <>
                  <Row>
                    <Col key={courses?._id} xs={12} md={4}>
                      <Card.Img
                        style={{ height: "200px" }}
                        variant="top"
                        src={`${Image_Url}/${courses.photo}`}
                      />
                    </Col>
                    <Col xs={12} md={8}>
                      <Card.Body>
                        <Card.Title>Title: {courses?.title}</Card.Title>
                        <Card.Text>
                          Number of Questions: {courses?.quizQuestions}
                        </Card.Text>
                        <Card.Text>
                          Name of Tutor: {courses?.instructor?.name}
                        </Card.Text>
                        <Button
                          variant="primary"
                          type="submit"
                          onClick={() => {
                            handleQuiz(courses._id);
                          }}
                        >
                          Attempt Quiz
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </>
              </Card>
            ))}
          </>
        ) : (
          <StudentQuizForm courseId={selectedCourseId} onClose={()=>setShowQuiz(false)}/>
        )}
      </Container>
    </Row>
  );
}

export default StudentCourseQuizList;