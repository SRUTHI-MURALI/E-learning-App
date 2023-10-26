import  { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import {  Image_Url } from "../../../Config/Config";
import StudentQuizForm from "./StudentQuizForm";
import { getAllCourses } from "../AxiosConfigStudents/AxiosConfig";

function StudentCourseQuizList() {
  const [allCourseList, setAllCourseList] = useState([]);
  const [showQuiz, setShowQuiz] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [quiz,setQuiz]= useState([])

  useEffect(() => {
    const getCourses = async ()=>{
      try {
        const response=await getAllCourses();
        setAllCourseList(response.data.allCourses);
        setQuiz(response.data.quizList)

        
      } catch (error) {
        console.log(error);
        
      }
    }
   
   getCourses()
  }, []);

  const handleQuiz = async (id) => {
    setSelectedCourseId(id);
    setShowQuiz(true);
  };

  const quizCourses = allCourseList.filter((course) => {
    return quiz.some((quiz) => {
      return quiz?.course === course._id;
    });
  });
  
  return (
    <>
      <Container>
        {showQuiz == false ? (
          <>
            {quizCourses.map((courses, index) => (
              <Card className="m-5 ">
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
                          Name of Tutor: {courses?.instructor?.name}
                        </Card.Text>
                        <Button
                          variant="primary"
                          type="submit"
                          className="mt-4"
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
          <StudentQuizForm
            courseId={selectedCourseId}
            onClose={() => setShowQuiz(false)}
          />
        )}
      </Container>
    </>
  );
}

export default StudentCourseQuizList;
