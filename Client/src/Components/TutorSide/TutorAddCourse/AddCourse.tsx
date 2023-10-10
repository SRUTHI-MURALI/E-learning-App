import React, { useState } from "react";
import { Row, Container, Form, Col, Button, Card } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import AddLesson from "./AddLesson";
import { Course_Upload_Url } from "../../../Config/Config";
import { addCourse } from "../AxiosConfigInstructors/AxiosConfig";

interface AddCourseProps {
  selectedCategory: string;
  onCourseAdded: (added: boolean) => void;
}

function AddCourse({ selectedCategory, onCourseAdded }: AddCourseProps) {
  const tutorData = localStorage.getItem("tutorData");
  const parseData = JSON.parse(tutorData);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const [show, setShow] = useState(null);
  const [showLesson, setShowLesson] = useState(false);

  const submitHandler = async () => {
    const trimmedTitle = title.trim();
    const trimmedPrice = price;
    const trimmedDuration = duration.trim();
    const trimmedDescription = description.trim();

    if (
      trimmedTitle === "" ||
      trimmedDuration === "" ||
      trimmedDescription === ""
    ) {
      return toast.error("Please fill all fields");
    }

    // Validate username format (only letters and spaces allowed)
    const usernamePattern = /^[A-Za-z\s.]+$/;
    if (!usernamePattern.test(trimmedTitle.trim())) {
      alert("title can only contain letters and spaces");
      return;
    }

    await imageHandler();

    if (!cloudinaryURL) {
      toast.error("Error uploading photo");
      return;
    }

    try {
      const response = await addCourse(
        trimmedTitle,
        trimmedPrice,
        trimmedDuration,
        trimmedDescription,
        selectedCategory,
        cloudinaryURL,
        parseData?._id
      );
      setSelectedCourse(response.data._id);

      setShow(true);
      toast.success("successfully added course");
    } catch (error) {
      toast.error("registration error");
      return;
    }
  };

  const addLessonHandler = async () => {
    setShowLesson(true);
  };

  const exitHandler = async () => {
    onCourseAdded(true);
  };

  const imageHandler = async () => {
    const formData = new FormData();
    formData.append("file", image);
    formData.append("upload_preset", "courselist");
    formData.append("cloud_name", "dnkc0odiw");
    const response = await axios.post(`${Course_Upload_Url}`, formData);

    setCloudinaryURL(response.data.public_id);
  };

  const handleOnClose = async () => {
    setShowLesson(false);
  };

  return (
    <div>
      {showLesson == false ? (
        <Container>
          <Card className=" justify-content-center">
            <Row>
              <ToastContainer
                position="top-center"
                autoClose={3000}
              ></ToastContainer>

              <Form className="mt-2 mb-2">
                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridEmail">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Course Title"
                      value={title}
                      onChange={(e) => {
                        setTitle(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>

                <Row className="mb-3">
                  <Form.Group as={Col} controlId="formGridCity">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      value={price}
                      onChange={(e) => {
                        setPrice(e.target.value);
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      value={duration}
                      onChange={(e) => {
                        setDuration(e.target.value);
                      }}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3" controlId="formGridAddress1">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    placeholder="course description"
                    value={description}
                    onChange={(e) => {
                      setDescription(e.target.value);
                    }}
                  />
                </Form.Group>

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label></Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      if (inputElement && inputElement.files) {
                        const selectedFile = inputElement.files[0];
                        setImage(selectedFile);
                      }
                    }}
                  />
                </Form.Group>
                <Row>
                  {show ? (
                    <Col>
                      <Button
                        variant="primary"
                        style={{ float: "right" }}
                        onClick={addLessonHandler}
                      >
                        Add Lesson
                      </Button>
                    </Col>
                  ) : show === null ? (
                    <Col>
                      <Button variant="primary" onClick={submitHandler}>
                        Submit
                      </Button>
                    </Col>
                  ) : null}

                  <Col>
                    <Button
                      variant="primary"
                      onClick={exitHandler}
                      style={{ float: "right" }}
                    >
                      Exit
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Row>
          </Card>
        </Container>
      ) : (
        <Row>
          <AddLesson courseId={selectedCourse} onClose={handleOnClose} />
        </Row>
      )}
    </div>
  );
}

export default AddCourse;
