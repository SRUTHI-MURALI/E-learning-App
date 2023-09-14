import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Lessons_Upload_Url,Base_Url } from '../../../Config/Config';

function AddLesson({courseId}) {
 
  
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const navigate=useNavigate()
  const [video, setVideo] = useState<File | null>(null)
    const [cloudinaryURL, setCloudinaryURL] = useState('');

  const handleAdd = async () => {
    if (title.trim() === '' || 
    duration.trim() === '' || 
    description.trim() === '') 
    {
      alert('Please fill in all fields before adding a lesson.');
      return;
    }
    await videoHandler()

    if (!cloudinaryURL) {
      
      
      alert("Error uploading photo");
      return;
    }

    const newLesson = {
      title: title,
      duration: duration,
      description: description,
      video:cloudinaryURL,
    };

   

    setLessons([...lessons, newLesson]);
    // Clear the form fields
    setTitle('');
    setDuration('');
    setDescription('');
    setVideo(null)

   
  };

    
  const handleMainSubmit = async () => {
   
    // Handle the submission of all lessons here
    console.log('All lessons:', lessons);
    try {
      await axios.post(`${Base_Url}/tutor/addlessons`,
     { lessons,
      courseId}
      ).then
      alert('success')
      navigate('/tutorhome')
    } catch (error) {
      console.log(error)
    }
  };

  const videoHandler= async ()=>{
    const formData = new FormData()
    formData.append("file",video)
    formData.append("upload_preset","lessonlist")
    formData.append("cloud_name","dnkc0odiw")
    const response = await axios.post(
      `${Lessons_Upload_Url } `,
      formData
      
    )
   
    setCloudinaryURL(response.data.public_id);


  }

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

            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label></Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const inputElement = e.target as HTMLInputElement;
                if (inputElement && inputElement.files) {
                  const selectedFile = inputElement.files[0];
                  setVideo(selectedFile);
                }
              }}
            />
          </Form.Group>

            <Row>
            <Col>
                <Button onClick={handleAdd}>submit</Button>
              </Col>
              
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
