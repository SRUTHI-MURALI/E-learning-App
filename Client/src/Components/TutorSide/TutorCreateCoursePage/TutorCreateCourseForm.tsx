/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Col, Container, Row } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import React, { useState,useEffect } from 'react';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

function TutorCreateCourseForm() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('');
  const [lessons, setLessons] = useState('');
  const [categories, setCategories] = useState([]);
 
  

  useEffect(() => {
    axios.get('http://localhost:3002/tutor/getCourseCategory')
      .then((response) => {
        console.log(response.data);
        setCategories(response.data.Category);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const trimmedTitle = title.trim();
    const trimmedDescription = description.trim();
    const trimmedLessons = lessons.trim();
    


    if (
      trimmedTitle === '' ||
      trimmedDescription === '' ||
      trimmedLessons === '' 
    
    ) {
      toast.error("Please fill all fields");
      return;
    }
   
    try {
       await axios.post('http://localhost:3002/tutor/addCourse', {
        title: trimmedTitle,
        description: trimmedDescription,
        lessons: trimmedLessons,
      
      });
     toast.success("successfully added")
      
  
      
    } catch (error) {
     toast.error(" error");
     return;
    }
  };

  return (
  
    <Container className=' ms-5 '>
   <ToastContainer position='top-center' autoClose={3000}></ToastContainer>
    
          
   <h1 style={{ textAlign: 'center' }}>
   Add Course 
 </h1>
 
 <Form onSubmit={handleSubmit} className="mt-3 ">
   <Form.Group className="mb-3 mt-5" controlId="formGridAddress1">
     <Form.Label>Title</Form.Label>
     <Form.Control
       placeholder="Course Name"
       value={title}
       onChange={(e) => setTitle(e.target.value)}
     />
   </Form.Group>

   <Form.Group className="mb-3 mt-3" controlId="formGridAddress2">
     <Form.Label>Description</Form.Label>
     <Form.Control
       placeholder="text"
       value={description}
       onChange={(e) => setDescription(e.target.value)}
     />
   </Form.Group>

   <Row className="mb-3 mt-3">
     <Form.Group as={Col} controlId="formGridEmail">
       <Form.Label>lessons</Form.Label>
       <Form.Control
         type="number"
         placeholder="0"
         value={lessons}
         onChange={(e) => setLessons(e.target.value)}
        
       />
     </Form.Group>
     <Form.Group className="mb-3 mt-3" controlId="formGridAddress1">
     <Form.Label>Category</Form.Label>
     <Form.Select >
     {categories.map((category:any) =>(

     <option>{category.title}</option>
   
    )
    )}
    </Form.Select>
   </Form.Group>
   </Row>
  


   <div className="d-flex justify-content-center ">
                <Button variant="primary" type="submit">
                  Add New Course
                </Button>
              </div>
        
      </Form>
      </Container>
    
 
  

   
  
  );
}

export default TutorCreateCourseForm;