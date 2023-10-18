import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import { getAllCourses } from "../AxiosConfigStudents/AxiosConfig";
import StudentPdfLessons from "./StudentPdfLessons";

function StudentPdfCourses() {
  const [allCourseList, setAllCourseList] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState([]);

  useEffect(() => {
    const getCourses = async ()=>{
      try {
        const response=await getAllCourses();
        setAllCourseList(response.data.allCourses);
        console.log(allCourseList,'ooo');
        
      } catch (error) {
        console.log(error);
        
      }
    }
   
   getCourses()
  }, []);

  

  const handleQuiz = async (id) => {
    setSelectedCourseId(id);
    setShow(true);
  };
  return (
    <Row>
      <Container>
        {show == false ? (
          <>
            {allCourseList.map((courses, index) => (
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
                          onClick={() => {
                            handleQuiz(courses?.courseLessons);
                          }}
                        >
                          Get Lessons
                        </Button>
                      </Card.Body>
                    </Col>
                  </Row>
                </>
              </Card>
            ))}
          </>
        ) : (
          <StudentPdfLessons
          courseId={selectedCourseId}
           
          />
        )}
      </Container>
    </Row>
  );
}

export default StudentPdfCourses;
