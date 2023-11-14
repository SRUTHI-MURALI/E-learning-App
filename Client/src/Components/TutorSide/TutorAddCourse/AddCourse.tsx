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
  const parseData = tutorData ? JSON.parse(tutorData) : null;

  const [title, setTitle] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [duration, setDuration] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [image, setImage] = useState<File | null>(null);
  const [cloudinaryURL, setCloudinaryURL] = useState<string>("");
  const [selectedCourse, setSelectedCourse] = useState<string>("");
  const [show, setShow] = useState<boolean | null>(null);
  const [showLesson, setShowLesson] = useState<boolean>(false);

  const submitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedPrice = price;
    const trimmedDuration = duration;
    const trimmedDescription = description.trim();

    if (
      trimmedTitle === "" ||
      trimmedDescription === "" ||
      isNaN(trimmedDuration) ||
      isNaN(trimmedPrice) ||
      trimmedDuration <= 0 ||
      trimmedPrice <= 0
    ) {
      return toast.error(
        "Please fill in all required fields and ensure non-negative numeric values greater than 0."
      );
    }

    const usernamePattern = /^[A-Za-z\s.]+$/;
    if (!usernamePattern.test(trimmedTitle.trim())) {
      alert("title can only contain letters and spaces");
      return;
    }
    if (image) {
      const allowedFormats = ["image/jpeg", "image/png"];
      if (!allowedFormats.includes(image.type)) {
        toast.error(
          "Invalid image format. Please select a JPEG or PNG image."
        );
        return;
      }
    } else {
      toast.error("Please select an image for the course.");
      return;
    }

    await imageHandler();

    if (cloudinaryURL) {
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
        toast.error(" error");
        return;
      }
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
    formData.append("file", image as Blob);
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
      {!showLesson ? (
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
                        const inputValue = e.target.value;
                        setPrice(Number(inputValue));
                      }}
                    />
                  </Form.Group>

                  <Form.Group as={Col} controlId="formGridState">
                    <Form.Label>Duration</Form.Label>
                    <Form.Control
                      value={duration}
                      onChange={(e) => {
                        const inputValue = e.target.value;
                        setDuration(Number(inputValue));
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
                  <Form.Label>Image</Form.Label>
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
                  <Form.Label>Allowed formats: JPEG, PNG</Form.Label>
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
