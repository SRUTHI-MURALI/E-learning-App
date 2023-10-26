import React, { useState, useEffect } from "react";
import { Card, Row, Form, Button, Container } from "react-bootstrap";
import { toast } from "react-toastify";

import {
  editCourseList,
  getEditCourse,
} from "../AxiosConfigInstructors/AxiosConfig";

function EditCourseTutorForm({ onCloseEdit, courseId }) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState(0);
  const [duration, setDuration] = useState(0);
  const [category, setCategory] = useState("");
  const [categoryName,setCategoryName]= useState('')
  const [allCategories, setAllCategories] = useState([]);

  useEffect(() => {
    const getcourse = async () => {
      try {
        const response = await getEditCourse(courseId);
        const course = response.data.editCourse;
        setAllCategories(response.data.allcategories);
        setTitle(course.title);
        setDuration(course.duration);
        setCategory(course.category._id);
        setCategoryName(course.category.title)
        setPrice(course.price);
      } catch (error) {
        console.log(error);
      }
    };
    getcourse();
  }, []);


    const handleSubmit = async (e) => {
      e.preventDefault();
    
      // Trim values and parse numeric fields
      const trimmedTitle = title.trim();
      const trimmedDuration = parseInt(duration, 10);
      const trimmedPrice = parseFloat(price);
      const trimmedCategory = category.trim();
    
      
      if (
        !trimmedTitle || 
        !trimmedCategory || 
        isNaN(trimmedDuration) || 
        isNaN(trimmedPrice) ||     
        trimmedDuration <= 0 ||     
        trimmedPrice <= 0           
      ) {
        toast.error("Please fill in all required fields and ensure non-negative numeric values greater than 0.");
        return;
      }
      try {
        
        await editCourseList(courseId, trimmedTitle, trimmedDuration, trimmedCategory, trimmedPrice);
        toast.success("Course successfully edited.");
        
        onCloseEdit(false);
      } catch (error) {
      console.log(error,'ddd');
      
        toast.error("An error occurred while editing the course.");
      }
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
                  placeholder={title}
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
                  type="number"
                  placeholder={duration}
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
                  placeholder={price}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Category</Form.Label>
                <Form.Select onChange={(e) => setCategory(e.target.value)}>
                  <option value={category._id}>{categoryName}</option>
                  {allCategories
                    .filter((categoryItem) => categoryItem._id !== category._id)
                    .map((categoryItem) => (
                      <option key={categoryItem._id} value={categoryItem._id}>
                        {categoryItem.title}
                      </option>
                    ))}
                </Form.Select>
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

export default EditCourseTutorForm;
