import React, { useState, useEffect } from 'react';
import { Card, Row, Form, Button, Container } from 'react-bootstrap';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Base_Url } from '../../../Config/Config';


function EditCourseTutorForm({ onCloseEdit, courseId }) {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const [duration, setDuration] = useState('');
  const[category,setCategory]=useState('')
  const[allCategories,setAllCategories]=useState([])


  useEffect(() => {
    axios
      .get(`${Base_Url}/tutor/geteditcourse/${courseId}`)
      .then((response) => {
        const course = response.data.editCourse;
        setAllCategories(response.data.allcategories)
        setTitle(course.title);
        setDuration(course.duration);
       setCategory(course.category.title)
        setPrice(course.price);
        
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    const trimmedTitle = title.trim();
    const trimmedDuration = duration.trim();


    try {
      await axios.put(`${Base_Url}/tutor/editcourselist/${courseId}`, {
        title: trimmedTitle,
        duration: trimmedDuration,
        price,
        category,
       
      });

      toast.success('Successfully added');
      window.location.reload();
      onCloseEdit(false);
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
          <Form onSubmit={handleSubmit}>
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
              type="number"
              placeholder={duration}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Price</Form.Label>
              <Form.Control
              type="number"
              placeholder={price}
                value={price}
                onChange={(e) => setPrice(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Category</Form.Label>
            <Form.Select
            
             
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value={category._id}>{category}</option>
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
              <Button type="submit" >
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

export default EditCourseTutorForm;
