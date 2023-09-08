import React,{useState} from 'react'
import SelectCategory from '../../Components/TutorSide/TutorAddCourse/SelectCategory'
import AddCourse from '../../Components/TutorSide/TutorAddCourse/AddCourse'

function TutorAddCourse() {
    const [selectedCategory, setSelectedCategory] = useState(null);

    // Callback function to receive the selected category and update state
    const handleCategorySelect = (category) => {
      setSelectedCategory(category);
    };
  
  return (
    <div>
    
      {selectedCategory === null ? (
        <SelectCategory onSelectCategory={handleCategorySelect} />
      ) : (
        <AddCourse selectedCategory={selectedCategory} />
      )}
    </div>
  )
}

export default TutorAddCourse
