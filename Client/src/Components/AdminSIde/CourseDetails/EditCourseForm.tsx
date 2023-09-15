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
        const course = response.data.editCourse;
        setTitle(course.title);
        setDuration(course.duration);
        setPrice(course.price);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [courseId]); // Make sure to include courseId as a dependency

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission

    const trimmedTitle = title.trim();
    const trimmedDuration = duration.trim();
    
   

    try {
      await axios.put(`${Base_Url}/admin/editcourselist/${courseId}`, {
        title: trimmedTitle,
        duration: trimmedDuration,
        price
      });

      toast.success('Successfully updated');
      window.location.reload();
      onCloseEdit(false); // Close the edit form after successful update
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
          <Card className='responsive-card'>
            <Form onSubmit={handleSubmit}>
              <Form.Label style={{ color: 'black' }}>Edit Course</Form.Label>
              <Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
                <Form.Label>Course Title</Form.Label>
                <Form.Control
                  type='text'
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type='text'
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
              <Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type='number'
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <div className='d-flex justify-content-between'>
                <Button type='submit'>Submit</Button>
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
