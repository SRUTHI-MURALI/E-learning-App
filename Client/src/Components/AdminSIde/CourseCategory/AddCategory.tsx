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

    try {
      await axios.post(`${Base_Url}/admin/addcategory`, {
        category: trimmedCategory,
        description: trimmedDescription,
      });

      toast.success('Successfully added');
    } catch (error) {
      toast.error('Error');
      return;
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div className="add-category-form-container">
      <ToastContainer position="top-center"></ToastContainer>
      <Card className="responsive-card" >
        <Form>
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
            <Button type="submit" onClick={handleSubmit}>
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
