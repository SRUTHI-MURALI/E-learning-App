import  { useState, useEffect } from "react";
import { Row, Form, Card, Button, Container } from "react-bootstrap";
import "./TutorAddCourse.css";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getAllCategory } from "../AxiosConfigInstructors/AxiosConfig";

interface SelectCategoryProps {
  onSelectCategory: (category: string) => void;
}

function SelectCategory({ onSelectCategory }: SelectCategoryProps) {
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getAllCategory();
        setCategories(response?.data.Category);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);

  const handleCategorySelection = () => {
    if (selectedCategory === "") {
      return toast.error("Please Select a Category");
    }
    // Call the callback function to pass back the selected category
    onSelectCategory(selectedCategory);
  };

  return (
    <div>
      <Card className="selectcategorycard">
        <Row>
          <Container>
            <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
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
