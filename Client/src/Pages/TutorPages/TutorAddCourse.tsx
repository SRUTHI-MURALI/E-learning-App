import React, { useState } from 'react';
import SelectCategory from '../../Components/TutorSide/TutorAddCourse/SelectCategory';
import AddCourse from '../../Components/TutorSide/TutorAddCourse/AddCourse';
import TutorHome from './TutorHome';

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
    <div>
      {courseAdded==false ? (
        selectedCategory === null ? (
          <SelectCategory onSelectCategory={handleCategorySelect} />
        ) : (
          <AddCourse selectedCategory={selectedCategory} onCourseAdded={handleCourseAdded} />
        )
      ) : (
        <TutorHome/>
      )}
      
    </div>
  );
}

export default TutorAddCourse;
