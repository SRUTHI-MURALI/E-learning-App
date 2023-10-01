import React, { useState, useEffect } from "react";
import "./StudentQuiz.css";
import axios from "axios";
import { Base_Url } from "../../../Config/Config";
import { Card, Container, Row,Button } from "react-bootstrap";
import img from "../../../Assets/Images/quizimg.jpeg";

function StudentQuizForm({ courseId,onClose }) {
  const [questionset, setQuestionSet] = useState([]);
 
  const [currentQuestion,setCurrentQuestion]=useState([])
  const [currentAnswer,setCurrentAnswer]=useState('')
  const [score,setScore]=useState(0)
  const [index,setIndex] =useState(1)
  const [showAll,setShowAll]= useState(false)
  const [result,setResult] = useState(false)

  
  useEffect(() => {
    axios
      .get(`${Base_Url}/student/getquiz/${courseId}`)
      .then((response) => {
        setQuestionSet(response.data.allQuizSets);
        setCurrentQuestion(response.data.allQuizSets[0][0])
      
        
       
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  
  

  const handleAnswerOptionClick = (index) => {
    if (currentAnswer === currentQuestion.answerOption) {
      
      setScore(score+1);
    }
    
    console.log(score, ";;");
    
    if (index === questionset[0].length) {
      setResult(true)
      
    } else {
      setCurrentQuestion(questionset[0][index]);
    }
    
    setIndex(index + 1);
  };

  const handleRightOptions=()=>{
    if (index === questionset[0].length) {
      onClose(false)
      
    } else {
      setCurrentQuestion(questionset[0][index]);
    }
    
    setIndex(index + 1);
  }

  const handleRightAnswers=()=>{
    setShowAll(true)
    setResult(false)
    setCurrentQuestion(questionset[0][0])
    setIndex(1)
  }
  

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
          
  {result==false &&           
              <div >
                
              
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                 Question {index }: {currentQuestion?.question} 
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                 <Button onClick={()=>setCurrentAnswer('option1')} >Option 1: {currentQuestion?.option1}</Button>
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                 <Button onClick={()=>setCurrentAnswer('option2')}>Option 2: {currentQuestion?.option2}</Button> 
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                 <Button onClick={()=>setCurrentAnswer('option3')}> Option 3: {currentQuestion?.option3}</Button>
                </Card.Text>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                 <Button onClick={()=>setCurrentAnswer('option4')}> Option 4: {currentQuestion?.option4}</Button>
                </Card.Text>
                {showAll==false ? (
                   <Button  className="m-4 d-flex justify-content-center align-items-center" onClick={()=>handleAnswerOptionClick(index)}> Next</Button>
                ):(
                 <>
                  <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                  <Button > Right answer: {currentQuestion?.answerOption}</Button>
                  </Card.Text>
                  <Button  className="m-4 d-flex justify-content-center align-items-center" onClick={()=>handleRightOptions(index)}> Next</Button>
                 </>
                )}
               
              </div>
}
              {result && 
               <>
                <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                <h1>Your Score: {score}/{questionset[0].length}</h1>
                <Button onClick={handleRightAnswers}>Right Answers</Button>
              </Card.Text>
              
               </>
              }          
 
          </Card.ImgOverlay>
        </Card>
      </Container>
    </Row>
    
  );
}

export default StudentQuizForm;
