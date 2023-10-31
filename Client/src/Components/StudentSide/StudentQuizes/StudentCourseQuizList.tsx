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
      return quiz?.course === course?._id;
    });
  });
  
  return (
    <>
      <Container style={{ marginTop: '120px' }}>
        {showQuiz === false ? (
          <>
            {quizCourses.map((courses, index) => (
              <div className="row mt-3" key={courses?._id}>
                <>
                  <div className="col-md-4">
                    <img
                      style={{ height: "200px" }}
                      onClick={() => {
                        handleQuiz(courses._id);
                      }}
                      src={`${Image_Url}/${courses?.photo}`}
                      alt=""
                    />
                  </div>
                  <div className="col-lg-2" onClick={() => {
                    handleQuiz(courses._id);
                  }}>
                    <h5 style={{ fontFamily: "Vollkorn serif", color: 'white' }}>Title: {courses?.title}</h5>
                    <h5 style={{ fontFamily: "Vollkorn serif", color: 'white' }}>By :  {courses?.instructor?.name}</h5>
                  </div>
                </>
              </div>
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


{/* <Row>
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
</Row> */}