import React, { useState, useEffect } from "react";
import { Card, Row, Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";
import { editCourse, getEditCourse } from "../AxiosConfigAdmin/AxiosConfig";
interface EditCourseFormProps {
  courseId: object;
  onCloseEdit: () => void;
}

function EditCourseForm({ onCloseEdit, courseId }: EditCourseFormProps) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState("");

  useEffect(() => {
    const getCourses = async (courseId: string | undefined) => {
      try {
        const response = await getEditCourse(courseId);
        const course = response.data.editCourse;
        setTitle(course.title);
        setDuration(course.duration);
        setPrice(course.price);
      } catch (error) {
        console.error(error);
      }
    };
    getCourses(courseId);
  }, [courseId]); // Make sure to include courseId as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const trimmedTitle = title.trim();
    const trimmedDuration = duration.trim();

    const editCourseList = async (
      id: string | undefined,
      title: string,
      duration: string,
      price: number
    ) => {
      try {
        await editCourse(id, title, duration, price);
        toast.success("Successfully updated");
        window.location.reload();
        onCloseEdit(false);
      } catch (error) {
        toast.error("Error");
      }
    };

    editCourseList(courseId, trimmedTitle, trimmedDuration, price);
  };

  const handleClose = () => {
    onCloseEdit(false);
  };

  return (
    <div>
      <Container className="d-flex align-item-center justify-content-center mt-5">
        <Row>
          <Card className="responsive-card">
            <Form onSubmit={handleSubmit}>
              <Form.Label style={{ color: "black" }}>Edit Course</Form.Label>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button type="submit">Submit</Button>
                <Button onClick={handleClose}>Close</Button>
              </div>
            </Form>
          </Card>
        </Row>
      </Container>
    </div>
  );
}

export default EditCourseForm;
