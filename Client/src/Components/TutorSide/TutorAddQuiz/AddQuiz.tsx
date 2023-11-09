import  { useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { addQuiz } from "../AxiosConfigInstructors/AxiosConfig";

function AddQuiz({ courseId, onClose }) {
  const [questionset, setQuestionset] = useState([]);
  const [question, setQuestion] = useState("");
  const [option1, setOption1] = useState("");
  const [option2, setOption2] = useState("");
  const [option3, setOption3] = useState("");
  const [option4, setOption4] = useState("");
  const [answerOption, setAnswerOption] = useState("option1");
  const [count, setCount] = useState(0);

  const handleAddQuiz = (e) => {
    e.preventDefault();

    if (
      question === "" ||
      option1 === "" ||
      option2 === "" ||
      option3 === "" ||
      option4 === "" ||
      answerOption === ""
    ) {
     toast.error("Please fill all fields")
     return
    }

    const questionPattern = /^[A-Za-z\s.\d!"#$%&'()*+,-./:;<=>?@[\]^_`{|}~]+$/;

    if (
      !questionPattern.test(question.trim()) ||
      !questionPattern.test(option1.trim()) ||
      !questionPattern.test(option2.trim()) ||
      !questionPattern.test(option3.trim()) ||
      !questionPattern.test(option4.trim())
    ) {
      toast.error("question and options can only contain letters,symbols and spaces");
      return;
    }

    const newQuestion = {
      question,
      option1,
      option2,
      option3,
      option4,
      answerOption,
    };

    setCount(count + 1);
    setQuestionset([...questionset, newQuestion]);
    setQuestion("");
    setOption1("");
    setOption2("");
    setOption3("");
    setOption4("");
    setAnswerOption("");
  };
 
  const handleQuizSubmit = async (e) => {
    e.preventDefault();

    try {
      if(questionset.length <=0){
        alert ('No questions to submit')
      }else{
        await addQuiz(questionset, courseId, count);

      alert("Success");
      }
      
    } catch (error) {
      console.log(error);
    }

    onClose(false);
  };

  return (
    <div>
      <Container className="align-items-center justify-content-center ">
        <ToastContainer position="top-center" autoClose={3000}></ToastContainer>

        <Button
          style={{ float: "right" }}
          type="submit"
          onClick={handleQuizSubmit}
        >
          Submit Quiz
        </Button>
        <h3 className="mt-4">Add a Question ?</h3>
        <h4> Question:{count + 1}</h4>
        <Form
          className="m-5 "
          style={{ padding: "25px", border: "2px solid #ccc" }}
        >
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Question </Form.Label>
            <Form.Control
              type="text"
              placeholder="Type your Question Here"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Option 1</Form.Label>
            <Form.Control
              type="text"
              placeholder="Write your Options"
              value={option1}
              onChange={(e) => setOption1(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Option 2</Form.Label>
            <Form.Control
              type="text"
              placeholder="Write your Options"
              value={option2}
              onChange={(e) => setOption2(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Option 3</Form.Label>
            <Form.Control
              type="text"
              placeholder="Write your Options"
              value={option3}
              onChange={(e) => setOption3(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Option 4</Form.Label>
            <Form.Control
              type="text"
              placeholder="Write your Options"
              value={option4}
              onChange={(e) => setOption4(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Correct Answer</Form.Label>
            <Form.Select
              value={answerOption}
              onChange={(e) => setAnswerOption(e.target.value)}
            >
              <option value="option1">Option 1</option>
              <option value="option2">Option 2</option>
              <option value="option3">Option 3</option>
              <option value="option4">Option 4</option>
            </Form.Select>
          </Form.Group>
          <Button type="submit" onClick={handleAddQuiz}>
            Add this question
          </Button>
          <Button
            style={{ float: "right" }}
            type="submit"
            onClick={handleQuizSubmit}
          >
            cancel
          </Button>
        </Form>
      </Container>
    </div>
  );
}

export default AddQuiz;
