import React, { useState } from 'react';
import SelectCategory from '../../Components/TutorSide/TutorAddCourse/SelectCategory';
import AddCourse from '../../Components/TutorSide/TutorAddCourse/AddCourse';
import { Col, Container, Row } from 'react-bootstrap';
import TutorHeader from '../../Components/TutorSide/TutorHeader/TutorHeader';
import TutorSidebar from '../../Components/TutorSide/TutorSidebar/TutorSidebar';


function TutorAddCourse() {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [courseAdded, setCourseAdded] = useState(false);

  // Callback function to receive the selected category and update state
  const handleCategorySelect = (category) => {
    setSelectedCategory(category);
  };

  const handleCourseAdded = () => {
    setCourseAdded(true);
  };

  return (
    <>
    
  <Col>
  <TutorHeader/>
    <TutorSidebar/>
  </Col>
 
  <Col>
  
  <Container className="d-flex justify-content-center align-items-center vh-100">
    
    <Row>
      
    <Col >
    
       {courseAdded==false ? (
        selectedCategory === null ? (
          <SelectCategory onSelectCategory={handleCategorySelect} />
        ) : (
          <AddCourse selectedCategory={selectedCategory} onCourseAdded={handleCourseAdded} />
        )
      ) : null}
       </Col>

    </Row>
  </Container>
  </Col>
</>

  );
}

export default TutorAddCourse;
