import  { useState, useEffect } from "react";
import { Card, Row, Form, Button, Container } from "react-bootstrap";
import { toast,  } from "react-toastify";

import { editCategory, getEditCategory } from "../AxiosConfigAdmin/AxiosConfig";

interface EditCategoryFormProps {
  categoryId: string;
  onCloseEdit: () => void;
}

function EditCategoryForm({ onCloseEdit, categoryId }: EditCategoryFormProps) {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    const getCategory = async (id: string | undefined) => {
      try {
        const response = await getEditCategory(id);
        const category = response.data.editCategory;
        setCategory(category.title);
        setDescription(category.description);
      } catch (error) {
        console.log(error);
      }
    };
    getCategory(categoryId);
  }, [categoryId]);

  const handleSubmit = async (e:React.FormEvent) => {
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
        await editCategory(categoryId, trimmedCategory, trimmedDescription);
        toast.success("Successfully edited.");
        onCloseEdit()
      } catch (error:any) {
        if (error.response && error.response.data && error.response.data.message) {
          toast.error(error.response.data.message);
        } else {
          toast.error("An error occurred while editing the category.");
        }
      }
    }
  };
  
  const handleClose = () => {
    onCloseEdit();
  };

  return (
    <div>
      <Container className="d-flex align-item-center justify-content-center mt-5">
       
        <Row>
          <Card className="responsive-card">
            <Form onSubmit={handleSubmit}>
              <Form.Label style={{ color: "black" }}>Edit Category</Form.Label>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlInput1"
              >
                <Form.Label>Category Title</Form.Label>
                <Form.Control
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                />
              </Form.Group>
              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
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
        </Row>
      </Container>
    </div>
  );
}

export default EditCategoryForm;
