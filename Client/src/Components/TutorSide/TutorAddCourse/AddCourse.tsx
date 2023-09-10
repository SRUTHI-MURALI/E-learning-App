import React, { useState } from 'react'
import {Row, Container, Form,Col ,Button,Card} from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import AddLesson from './AddLesson';

function AddCourse({selectedCategory,onCourseAdded}) {
    const[title,setTitle]= useState('')
    const[price,setPrice]=useState('')
    const[duration,setDuration]=useState('')
    const[description,setDescription]=useState('')
    const[image,setImage]=useState('')
    const[lessonCount,setLessonCount]=useState(0)
    const[show,setShow]=useState(true)
   

    const submitHandler = async ()  => {
     
      const trimmedTitle = title.trim();
      const trimmedPrice = price.trim();
      const trimmedDuration = duration.trim();
      const trimmedDescription = description.trim();

  
  
      if (
        trimmedTitle === '' ||
        trimmedPrice === '' ||
        trimmedDuration === '' ||
        trimmedDescription === ''
      ) {
        
        
        toast.error("Please fill all fields");
      
      }
      
     
      try {
      
      
         await axios.post('http://localhost:3002/tutor/addcourse', {
          title: trimmedTitle,
          price: trimmedPrice,
          duration: trimmedDuration,
          description: trimmedDescription,
          category:selectedCategory
        });
        onCourseAdded(true)
       toast.success("successfully registered")
       
    
        
      } catch (error) {
       toast.error("registration error");
       return;
      }
    };

      const addLessonHandler = async ()=>{
        setShow(false)
        setLessonCount(lessonCount+1)
      }
    
    
  return (
    <div>
      
      <Container>
      <Card className=' justify-content-center m-3'>
        <Row>
        <ToastContainer position='top-center' autoClose={3000}></ToastContainer>

    <Form className='mt-2 mb-2'>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridEmail">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Course Title" 
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPassword">
          <Form.Label>Category</Form.Label>
          <Form.Control  placeholder={selectedCategory}
           />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridCity">
          <Form.Label>Price</Form.Label>
          <Form.Control  value={price}
          onChange={(e)=>{setPrice(e.target.value)}} />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridState">
          <Form.Label>Duration</Form.Label>
          <Form.Control  value={duration}
          onChange={(e)=>{setDuration(e.target.value)}}/>
        </Form.Group>

       
      </Row>
    
      <Form.Group className="mb-3" controlId="formGridAddress1">
        <Form.Label>Description</Form.Label>
        <Form.Control placeholder="course description"  value={description}
          onChange={(e)=>{setDescription(e.target.value)}} />
      </Form.Group>
      
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label></Form.Label>
        <Form.Control type="file"
        value={image}
        onChange={(e)=>{setImage(e.target.value)}}
         />
      </Form.Group>
      <Row>
        <Col>
        <Button variant="primary" onClick={submitHandler}>
        submit
      </Button> 
        </Col>
        {show && (
           <Col>
           <Button variant="primary" style={{float:'right'}} onClick={addLessonHandler}>
           Add Lesson
         </Button> 
           </Col>
        )}
       
       
        </Row>
    </Form>
        </Row>
        </Card>
        {show==false &&(
           <Row>
           <AddLesson />
         </Row>
        )}
         
        
      </Container>

      
    </div>
  )
}

export default AddCourse
