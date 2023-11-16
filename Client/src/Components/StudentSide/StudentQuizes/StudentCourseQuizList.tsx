import  { useState, useEffect } from "react";
import {  Col, Container, Row } from "react-bootstrap";
import {  Image_Url } from "../../../Config/Config";
import StudentQuizForm from "./StudentQuizForm";
import { getAllCourses } from "../AxiosConfigStudents/AxiosConfig";

interface StudentCourseQuizListProps {}

const StudentCourseQuizList: React.FC<StudentCourseQuizListProps> = () => {
  const [allCourseList, setAllCourseList] = useState<any[]>([]);
  const [showQuiz, setShowQuiz] = useState<boolean>(false);
  const [selectedCourseId, setSelectedCourseId] = useState<string | null>(null);
  const [quiz, setQuiz] = useState<any[]>([]);

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

  const handleQuiz = async (id: string) => {
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
    <Row style={{ marginTop: "140px" }}>
      
      {showQuiz === false ? (
        <>
        <h2 style={{  color: "aqua",margin:'2rem' }}>Choose a Topic to start with...</h2>
          {quizCourses.map((courses) => (
            <Col xs={12} md={4} key={courses?._id} className="text-center" >
              <div className="mt-3">
                <img
                  style={{ height: "200px",width:'250px', cursor: "pointer" }}
                  onClick={() => {
                    handleQuiz(courses._id);
                  }}
                  src={`${Image_Url}/${courses?.photo}`}
                  alt=""
                />
                <div style={{ marginTop: "1rem" }}>
                  <h5 style={{ fontFamily: "Vollkorn serif", color: "white" }}>
                    Title: {courses?.title}
                  </h5>
                  <h5
                    style={{ fontFamily: "Vollkorn serif", color: "white" }}
                  >
                    By: {courses?.instructor?.name}
                  </h5>
                </div>
              </div>
            </Col>
          ))}
        </>
      ) : (
        <StudentQuizForm
          courseId={selectedCourseId}
          onClose={() => setShowQuiz(false)}
        />
      )}
    </Row>
  </>
  );
}

export default StudentCourseQuizList;


