import React, { useState, useEffect } from "react";
import { Col, Row, Form, Card, Button, Container } from "react-bootstrap";
import "./TutorAddCourse.css";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Base_Url } from "../../../Config/Config";

function SelectCategory({ onSelectCategory }) {
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    axios
      .get(`${Base_Url}/tutor/getCourseCategory`)
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.Category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleCategorySelection = () => {
    if (selectedCategory === "") {
      {
        return toast.error("Please Select a Category");
      }
    }
    // Call the callback function to pass back the selected category
    onSelectCategory(selectedCategory);
  };

  return (
    <div className="mt-5">
      <Card className="selectcategorycard">
        <Row>
          <Container>
            <ToastContainer
              position="top-center"
              autoClose={3000}
            ></ToastContainer>
            <Form.Select
              aria-label="Default select example"
              onChange={(e) => setSelectedCategory(e.target.value)}
              value={selectedCategory}
            >
              <option>Select Category</option>
              {categories.map((category: any) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </Form.Select>
          </Container>
        </Row>
        <Button onClick={handleCategorySelection} className="mt-3">
          next
        </Button>
      </Card>
    </div>
  );
}

export default SelectCategory;
