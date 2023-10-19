import { useState } from "react";
import { Button, Card, FormLabel } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { toast, ToastContainer } from "react-toastify";
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

    if (trimmedCategory === "" || trimmedDescription === "") {
      toast.error("Please fill in all fields");
      return;
    
    }

    const usernamePattern = /^[A-Za-z0-9\s]+/;
    if (!usernamePattern.test(trimmedCategory.trim())) {
      toast.error("category name can only contain letters ,numbers and spaces");
      return;
    }

    try {
      const response = await addCategory(trimmedCategory, trimmedDescription);

      if (response.status === 201) {
       
        toast.success("category added");
        
        onClose(false);
        window.location.reload()
        
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
        toast.error("An error occurred while adding category");
      }
    }
  };

  const handleClose = () => {
    onClose(false);
  };

  return (
    <div className="add-category-form-container">
      
      <Card className="responsive-card">
      <ToastContainer position="top-center"></ToastContainer>
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
