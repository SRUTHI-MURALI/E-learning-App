import axios from "axios";
import React, { useState ,useRef} from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Lessons_Upload_Url } from "../../../Config/Config";
import AddQuiz from "../TutorAddQuiz/AddQuiz";
import { addNewLesson } from "../AxiosConfigInstructors/AxiosConfig";

function AddLesson({ courseId, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");
  const [count, setCount] = useState(0);
  const pdfInputRef = useRef<HTMLInputElement | null>(null);
  const videoInputRef = useRef<HTMLInputElement | null>(null);
  const [pdf, setPdf] = useState(null); // Change to null for file handling

  const handleAdd = async () => {
    
    if (
      title.trim() === "" ||
      duration.trim() === "" ||
      description.trim() === ""
    ) {
      return alert("Please fill in all fields before adding a lesson.");
    }
    if (video) {
      const allowedVideoFormats = ["video/mp4", "video/avi"]; // Add allowed video formats
      if (!allowedVideoFormats.includes(video.type)) {
        toast.error("Invalid video format. Please select a MP4 or AVI video.");
        return;
      }
    } else {
      toast.error("Please select a video for the lesson.");
      return;
    }
    if (pdf) {
      const allowedPdfFormats = ["application/pdf"]; // Add allowed PDF formats
      if (!allowedPdfFormats.includes(pdf.type)) {
        toast.error("Invalid PDF format. Please select a PDF file.");
        return;
      }
    } else {
      toast.error("Please select a PDF for the lesson.");
      return;
    }
    await videoHandler();
    
    if (cloudinaryURL) {
      

    const newLesson = {
      title: title,
      duration: duration,
      description: description,
      video: cloudinaryURL,
      pdf: pdf ? URL.createObjectURL(pdf) : "", // Store the PDF file as a URL
    };
    toast.success("successfully added lesson ");
   
    setLessons([...lessons, newLesson]);
    // Clear the form fields
    if (pdfInputRef.current) {
      pdfInputRef.current.value = "";
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = "";
    }
    setCount(count + 1);
    setTitle("");
    setDuration("");
    setDescription("");
    setVideo(null);
    setPdf(null);
    setCloudinaryURL("");
   
  }
  };

  const handleMainSubmit = async  () => {
   
    try {
      await addNewLesson(lessons, courseId);
      onClose(false);
      alert("Success");
      navigate("/tutorallcourses");
    } catch (error) {
      console.log(error);
    }
  };

  const videoHandler = async () => {
    const formData = new FormData();
    formData.append("file", video);
    formData.append("upload_preset", "lessonlist");
    formData.append("cloud_name", "dnkc0odiw");
    try {
      const response = await axios.post(`${Lessons_Upload_Url}`, formData);
      setCloudinaryURL(response.data.public_id);
    } catch (error) {
      console.error("Error uploading video", error);
    }
  };

  const handleAddQuiz = () => {
    setShowAddQuiz(true);
  };

  return (
    <div>
      <Button
        style={{ float: "right" }}
        type="submit"
        onClick={handleMainSubmit}
      >
        Submit lessons
      </Button>
      <ToastContainer
                position="top-center"
                autoClose={3000}
              ></ToastContainer>

      <h3 className="mt-4">Add a Lesson ?</h3>
      <h4> Lesson: {count + 1}</h4>
      {showAddQuiz === false ? (
        <div>
          <Container>
            <Card className="justify-content-center m-2">
              <Form className="mt-2 mb-2">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Course Title"
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridPassword">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      type="number"
                      placeholder="Course Duration"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder="Course Description"
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Video</Form.Label>
                  <Form.Control
                    type="file"
                    ref={(input) => {
                      videoInputRef.current = input;
                    }}
                    onChange={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      if (inputElement && inputElement.files) {
                        const selectedFile = inputElement.files[0];
                        setVideo(selectedFile);
                      }
                    }}
                  />
                  <Form.Label>Allowed formats: MP4, AVI</Form.Label>
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                      <Form.Label>Add PDF</Form.Label>
                      <Form.Control
                        type="file"
                        ref={(input) => {
                          pdfInputRef.current = input;
                        }}
                        onChange={(e) => {
                          const inputElement = e.target as HTMLInputElement;
                          if (inputElement && inputElement.files) {
                            const selectedFile = inputElement.files[0];
                            setPdf(selectedFile); // Update the PDF state
                          }
                        }}
                      />
                      <Form.Label>Allowed formats: PDF</Form.Label>
                    </Form.Group>


                <Row>
                  <Col>
                    <Button onClick={handleAdd}>Add Lesson</Button>
                  </Col>
                  <Col>
                    <Button style={{ float: "right" }} onClick={handleAddQuiz}>
                      Add Quiz
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Container>
        </div>
      ) : (
        <AddQuiz courseId={courseId} onClose={() => setShowAddQuiz(false)} />
      )}
    </div>
  );
}

export default AddLesson;
