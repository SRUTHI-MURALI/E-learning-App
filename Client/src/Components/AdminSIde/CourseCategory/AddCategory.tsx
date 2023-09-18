import React, { useState } from 'react';
import { Button, Card, FormLabel } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import './CourseCategoriesTable.css'; // Create a CSS file for your component styles
import { Base_Url } from '../../../Config/Config';

function AddCategory({ onClose }) {
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async () => {
    const trimmedCategory = category.trim();
    const trimmedDescription = description.trim();

    if (trimmedCategory === '' || trimmedDescription === '') {
      toast.error('Please fill all fields');
      return;
    }

    const usernamePattern = /^[A-Za-z\s.]+$/;
    if (!usernamePattern.test(trimmedCategory.trim())) {
       alert('category can only contain letters and spaces');
       return
    }
  

    try {
      const response = await axios.post(`${Base_Url}/admin/addcategory`, {
        category: trimmedCategory,
        description: trimmedDescription,
      });

      if (response.status === 201) {
        // OTP sent successfully
        toast.success("category added");
       
      } else if(response.status==400){
        toast.error("Category already exists");
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.message) {
        // Display the error message from the response if available
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("An error occurred while sending OTP");
      }
    }
  };

  const handleClose = () => {
   
    onClose(false);
  };

  return (
    <div className="add-category-form-container">
      <ToastContainer position="top-center"></ToastContainer>
      <Card className="responsive-card" >
        <Form 	onSubmit={handleSubmit}>
          <FormLabel style={{ color: 'black'  }}>Add Category</FormLabel>
          <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
            <Form.Label>Category Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Title"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
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
    </div>
  );
}

export default AddCategory;
