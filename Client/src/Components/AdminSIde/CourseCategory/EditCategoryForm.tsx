import React, { useState, useEffect } from 'react';
import { Card, Row, Form, Button, Container } from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import axios from 'axios';
import { Base_Url } from '../../../Config/Config';

function EditCategoryForm({ onCloseEdit, categoryId }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');


  useEffect(() => {
    axios
      .get(`${Base_Url}/admin/geteditcategorylist/${categoryId}`)
      .then((response) => {
        const category = response.data.editCategory; // Assuming your response contains the course data
        setCategory(category.title);
        setDescription(category.description)
       
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async () => {
   
    const trimmedCategory = category.trim();
    const trimmedDescription = description.trim();

   
    
    try {
      await axios.put(`${Base_Url}/admin/editcategory/${categoryId}`, {
        category: trimmedCategory,
        description: trimmedDescription,
     
      });

      toast.success('Successfully edited');
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred while logging in");
      }
    }
  };

  const handleClose = () => {
    onCloseEdit(false);
  };

  return (
    <div>
        <Container className='d-flex align-item-center justify-content-center mt-5'>
        <ToastContainer position='top-center' autoClose={3000}></ToastContainer>
      <Row>
        <Card className="responsive-card" >
          <Form onSubmit={handleSubmit}>
            <Form.Label style={{ color: 'black' }}>Edit Category</Form.Label>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Category Title</Form.Label>
              <Form.Control
                type="text"
                placeholder={category}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
              <Form.Label>Description</Form.Label>
              <Form.Control
              type="text"
              placeholder={description}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
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

export default EditCategoryForm;
