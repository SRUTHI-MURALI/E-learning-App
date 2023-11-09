import { useState } from "react";
import { Button, Card, FormLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast, } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CourseCategoriesTable.css"; 
import { addCategory } from "../AxiosConfigAdmin/AxiosConfig";


interface addCategoryProps {
  onClose: () => void;
}

function AddCategory({ onClose }: addCategoryProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedCategory = category.trim();
    const trimmedDescription = description.trim();
  
    const namePattern = /^[A-Za-z\s.,]+$/;
  
    if (trimmedCategory === "" || trimmedDescription === "") {
      toast.error("Category name and description cannot be empty.");
    } else if (!namePattern.test(trimmedCategory) ) {
      toast.error("Category and description can only contain letters, spaces, periods, and commas.");
    } else {
    try {
      const response = await addCategory(trimmedCategory, trimmedDescription);

      if (response.status === 201) {
      
         toast.success("category added");
        onClose(false);
       
        
      } else if (response.status == 400) {
        toast.error("Category already exists");
      }
    } catch (error) {
      if (
        error.response &&
        error.response.data &&
        error.response.data.message
      ) {
        // Display the error message from the response if available
        toast.error(error.response.data.message);
      } else {
        // Handle unexpected errors
        toast.error("Category already exists");
      }
    }
  }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div className="add-category-form-container">
      
      <Card className="responsive-card">
      
        <Form onSubmit={handleSubmit}>
          <FormLabel style={{ color: "black" }}>Add Category</FormLabel>
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
            <Button type="submit">Submit</Button>
            <Button onClick={handleClose}>Close</Button>
          </div>
        </Form>
      </Card>
    </div>
  );
}

export default AddCategory;
