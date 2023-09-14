import React, { useState, useEffect } from 'react';
import { Card, Row, Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Base_Url } from '../../../Config/Config';

function EditCourseForm({ onCloseEdit, courseId }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');


  useEffect(() => {
    axios
      .get(`${Base_Url}/admin/geteditcourse/${courseId}`)
      .then((response) => {
        const course = response.data.editCourse; // Assuming your response contains the course data
        setTitle(course.title);
        setDuration(course.duration);
       
        setPrice(course.price);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId]);

  const handleSubmit = async () => {
    const trimmedTitle = title.trim();
    const trimmedDuration = duration.trim();
    const trimmedPrice = price.trim();
    

    if (
      trimmedTitle === '' ||
      trimmedDuration === '' ||
      trimmedPrice === '' 
      
    ) {
      return toast.error('Please fill all fields');
    }

    try {
      await axios.put(`${Base_Url}/admin/editcourselist${courseId}`, {
        title: trimmedTitle,
        duration: trimmedDuration,
        price: trimmedPrice,
      
      });

      toast.success('Successfully added');
    } catch (error) {
      toast.error('Error');
    }
  };

  const handleClose = () => {
    onCloseEdit(false);
  };

  return (
    <div>
        <Container className='d-flex align-item-center justify-content-center mt-5'>

       
      <Row>
        <Card className="responsive-card" >
          <Form>
            <Form.Label style={{ color: 'black' }}>Edit Course</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Course Title</Form.Label>
              <Form.Control
                type="text"
                placeholder={title}
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Duration</Form.Label>
              <Form.Control
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Price</Form.Label>
              <Form.Control
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>
            
            <div className="d-flex justify-content-between">
              <Button type="submit" onClick={handleSubmit}>
                Submit
              </Button>
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
