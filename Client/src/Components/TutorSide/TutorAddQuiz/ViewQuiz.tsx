import { Accordion, Col, Row } from "react-bootstrap";
import { AiTwotoneDelete } from "react-icons/ai";
import Swal from "sweetalert2";
import { toast, ToastContainer } from "react-toastify";
import { HiPlus } from "react-icons/hi";
import "react-toastify/dist/ReactToastify.css";

import { activateQuiz, removeQuiz } from "../AxiosConfigInstructors/AxiosConfig";
import { QuizQuestion } from "./TutorQuizTable";
import { ReactNode } from "react";


interface Question {
  _id: string;
  question: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  answerOption: string;
  isActive: boolean;
}

interface Quiz {
  question: ReactNode;
  option2: ReactNode;
  option3: ReactNode;
  option4: ReactNode;
  answerOption: ReactNode;
  option1: any;
  _id: string;
  isActive: any;
  questionset: Question[];
}

interface ViewQuizProps {
  quiz: QuizQuestion[];
  onClose: () => void;
}

function ViewQuiz({ quiz }: ViewQuizProps) {
  const handleDelete = async (question: Quiz) => {
    try {
      const result = await Swal.fire({
        title: `Are you sure you want to ${
          question.isActive ? "remove" : "activate"
        } the question ?`,
        icon: "question",
        showCancelButton: true,
        confirmButtonText: "Yes",
        cancelButtonText: "No",
      });

      if (result.isConfirmed) {
        if (question.isActive === true) {
          await removeQuiz(question._id);
          question.isActive = false;
          toast.success("Successfully removed");
          window.location.reload();
        } else {
          await activateQuiz(question._id);
          question.isActive = true;
          toast.success("Successfully activated");
          window.location.reload();
        }
      }
    } catch (error) {
      toast.error("Error");
    }
  };

  return (
    <>
      <ToastContainer position="top-center" autoClose={3000} />

      {quiz?.map((questions) => (
        questions?.questionset.map((question: Quiz, innerIndex: any ) => {
          
          return (
            <div key={innerIndex}>
              <Accordion>
                <Accordion.Item className="m-3" eventKey={question?._id}>
                  <Row>
                    {question?.isActive ? (
                      <Accordion.Header>
                        Question {innerIndex + 1} : Active
                      </Accordion.Header>
                    ) : (
                      <Accordion.Header>
                        Question {innerIndex + 1} : Removed
                      </Accordion.Header>
                    )}
                    <Col xs={12} md={8}>
                      <Accordion.Body>
                        Question {innerIndex + 1}: {question?.question}
                      </Accordion.Body>
                      <Accordion.Body>
                        Option 1: {question?.option1}
                      </Accordion.Body>
                      <Accordion.Body>
                        Option 2: {question?.option2}
                      </Accordion.Body>
                      <Accordion.Body>
                        Option 3: {question?.option3}
                      </Accordion.Body>
                      <Accordion.Body>
                        Option 4: {question?.option4}
                      </Accordion.Body>
                      <Accordion.Body>
                        Right Answer: {question.answerOption}
                      </Accordion.Body>
                    </Col>
                    <Col xs={12} md={4}>
                      <Accordion.Body onClick={() => handleDelete(question)}>
                        {question?.isActive ? (
                          <>
                            <AiTwotoneDelete /> Remove Quiz{" "}
                            <AiTwotoneDelete />
                          </>
                        ) : (
                          <>
                            <HiPlus /> add quiz <HiPlus />
                          </>
                        )}
                      </Accordion.Body>
                    </Col>
                  </Row>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        })
      ))}
    </>
  );
}

export default ViewQuiz;
