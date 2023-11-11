import  { useState, useEffect } from "react";
import "./StudentQuiz.css";
import axios from "axios";
import { GrChapterNext } from "react-icons/gr";
import { Base_Url } from "../../../Config/Config";
import { Card, Container, Button } from "react-bootstrap";

interface Question {
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answerOption: string;
}

interface StudentQuizFormProps {
  courseId: string | null;
  onClose: () => void;
}

function StudentQuizForm({ courseId, onClose }: StudentQuizFormProps) {
  const [questionset, setQuestionSet] = useState<Question[][]>([]);
  const [currentQuestion, setCurrentQuestion] = useState<Question | undefined>();
  const [currentAnswer, setCurrentAnswer] = useState<string>("");
  const [score, setScore] = useState<number>(0);
  const [index, setIndex] = useState<number>(1);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [result, setResult] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get(`${Base_Url}/student/getquiz/${courseId}`)
      .then((response) => {
        setQuestionSet(response.data.allQuizSets);
        setCurrentQuestion(response.data.allQuizSets[0][0]);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId]);

  const handleAnswerOptionClick = (index: number) => {
    if (currentAnswer === currentQuestion?.answerOption) {
      setScore(score + 1);
    }

    if (index === questionset[0].length) {
      setResult(true);
    } else {
      setCurrentQuestion(questionset[0][index]);
    }

    setIndex(index + 1);
  };

  const handleRightOptions = (index: number) => {
    if (index === questionset[0].length) {
      onClose();
    } else {
      setCurrentQuestion(questionset[0][index]);
    }

    setIndex(index + 1);
  };

  const handleRightAnswers = () => {
    setShowAll(true);
    setResult(false);
    setCurrentQuestion(questionset[0][0]);
    setIndex(1);
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center mt-2">
        <Card className=" text-white" style={{ width: "100%" }}>
          <div className="col-lg-6 col-md-12">
            <Card.ImgOverlay>
              <Card.Title className="m-4 d-flex justify-content-center align-items-center">
                Quiz Time
              </Card.Title>
              <br />

              {result === false && (
                <div>
                  <section className="question-section d-flex justify-content-center align-items-center">
                    <h1>
                      Question {index}:{currentQuestion?.question}
                    </h1>
                  </section>
                  <section className="answer-section m-5 d-grid justify-content-center align-items-center">
                    <Button
                      variant="transparent"
                      onClick={() => setCurrentAnswer("option1")}
                    >
                      1: {currentQuestion?.option1}
                    </Button>
                    <Button
                      variant="transparent"
                      onClick={() => setCurrentAnswer("option2")}
                    >
                      2: {currentQuestion?.option2}
                    </Button>
                    <Button
                      variant="transparent"
                      onClick={() => setCurrentAnswer("option3")}
                    >
                      3: {currentQuestion?.option3}
                    </Button>
                    <Button
                      variant="transparent"
                      onClick={() => setCurrentAnswer("option4")}
                    >
                      4: {currentQuestion?.option4}
                    </Button>
                  </section>

                  <section className="next d-flex justify-content-center align-items-center">
                    {showAll === false ? (
                      <Button
                        variant="transparent"
                        onClick={() => handleAnswerOptionClick(index)}
                      >
                        {" "}
                        Next
                      </Button>
                    ) : (
                      <>
                        <Card.Text className="m-4 d-flex justify-content-center align-items-center">
                          <Button>
                            {" "}
                            Right answer: {currentQuestion?.answerOption}
                          </Button>
                        </Card.Text>
                        <Button
                          className="m-3 result-button"
                          onClick={() => handleRightOptions(index)}
                        >
                          {" "}
                          <GrChapterNext /> Next
                        </Button>
                      </>
                    )}
                  </section>
                </div>
              )}
              {result && (
                <>
                  <Card.Text className="m-4 d-grid justify-content-center align-items-center">
                    <h1>
                      Your Score: {score}/{questionset[0].length}
                    </h1>
                    <Button onClick={handleRightAnswers}>Right Answers</Button>
                  </Card.Text>
                </>
              )}
            </Card.ImgOverlay>
          </div>
        </Card>
      </Container>
    </>
  );
}

export default StudentQuizForm;
