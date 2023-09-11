import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';



function AddLesson({courseId}) {
  console.log(courseId,"sruthy");
  
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const[showAddLesson,setShowAddLesson]= useState(false)

  const handleAdd = () => {
    if (title.trim() === '' || 
    duration.trim() === '' || 
    description.trim() === '') 
    {
      alert('Please fill in all fields before adding a lesson.');
      return;
    }


    const newLesson = {
      title: title,
      duration: duration,
      description: description,
    };


    setLessons([...lessons, newLesson]);
    // Clear the form fields
    setTitle('');
    setDuration('');
    setDescription('');

    setShowAddLesson(true)
  };

    const handleAddlessonButton= ()=>{
      setShowAddLesson(false)
    }
  const handleMainSubmit = async () => {
   
    // Handle the submission of all lessons here
    console.log('All lessons:', lessons);
    try {
      await axios.post('http://localhost:3002/tutor/addlessons',
     { lessons,
      courseId}
      ).then
      alert('success')
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div>
         {/* Render individual forms for each lesson */}
      {lessons.map((lesson, index) => (
        <>
        <h2>Lesson:{index+1}</h2>
        <LessonForm key={index} lesson={lesson} />
        </>
        
      ))}
      <Container>
        <Card className='justify-content-center m-2'>
          <Form className='mt-2 mb-2'>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridEmail">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Course Title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridPassword">
                <Form.Label>Duration</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Course Duration"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                />
              </Form.Group>
            </Row>

            <Form.Group className="mb-3" controlId="formGridAddress1">
              <Form.Label>Description</Form.Label>
              <Form.Control
                placeholder="Course Description"
                type="text"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>

            <Row>
              {showAddLesson=== true ?(
                 <Col>
                 <Button onClick={handleAddlessonButton}>AddLesson</Button>
               </Col>             
              ):(
                <Col>
                <Button onClick={handleAdd}>submit</Button>
              </Col>
              )}
              
              <Col>
                <Button onClick={handleAdd}>Add Quiz</Button>
              </Col>
              <Col>
                <Button onClick={handleAdd}>Add Pdf</Button>
              </Col>
              
              <Col>
                <Button onClick={handleMainSubmit}>Submit All Lessons</Button>
              </Col>
            </Row>
          </Form>
        </Card>
      </Container>

     
    </div>
  );
}

function LessonForm({ lesson }) {
    return (
      <Container key={lesson.title}>
        <Card className='justify-content-center m-2'>
          <Form className='mt-2 mb-2'>

            <h4>Title: {lesson.title}</h4>
            <p>Duration: {lesson.duration}</p>
            <p>Description: {lesson.description}</p>
            <p>Quiz:{lesson?.quiz}</p>
            <p>pdf:{lesson?.pdf}</p>
           <img></img>
          </Form>
        </Card>
      </Container>
    );
  }


export default AddLesson;
