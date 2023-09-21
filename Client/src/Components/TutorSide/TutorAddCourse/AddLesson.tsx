import axios from 'axios';
import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { Lessons_Upload_Url, Base_Url } from '../../../Config/Config';
import AddQuiz from '../TutorAddQuiz/AddQuiz';

function AddLesson({ courseId, onClose }) {
  const [lessons, setLessons] = useState([]);
  const [title, setTitle] = useState('');
  const [duration, setDuration] = useState('');
  const [description, setDescription] = useState('');
  const [showAddQuiz, setShowAddQuiz] = useState(false);
  const navigate = useNavigate();
  const [video, setVideo] = useState(null);
  const [cloudinaryURL, setCloudinaryURL] = useState('');
  const [count, setCount] = useState(0);
  const [pdf, setPdf] = useState(null); // Change to null for file handling

  const handleAdd = async () => {
    if (title.trim() === '' || duration.trim() === '' || description.trim() === '') {
      return alert('Please fill in all fields before adding a lesson.');
    }
    await videoHandler();

    if (!cloudinaryURL) {
      return alert('Error uploading video');
    }

    const newLesson = {
      title: title,
      duration: duration,
      description: description,
      video: cloudinaryURL,
      pdf: pdf ? URL.createObjectURL(pdf) : '', // Store the PDF file as a URL
    };
    setCount(count + 1);
    setLessons([...lessons, newLesson]);
    // Clear the form fields
    setTitle('');
    setDuration('');
    setDescription('');
    setVideo(null);
    setCloudinaryURL('');
    setPdf(null); // Reset the PDF state
  };

  const handleMainSubmit = async () => {
    try {
      await axios.post(`${Base_Url}/tutor/addlessons`, {
        lessons,
        courseId,
      });
      onClose(false);
      alert('Success');
      navigate('/tutorallcourses');
    } catch (error) {
      console.log(error);
    }
  };

  const videoHandler = async () => {
    const formData = new FormData();
    formData.append('file', video);
    formData.append('upload_preset', 'lessonlist');
    formData.append('cloud_name', 'dnkc0odiw');
    try {
      const response = await axios.post(`${Lessons_Upload_Url}`, formData);
      setCloudinaryURL(response.data.public_id);
    } catch (error) {
      console.error('Error uploading video', error);
    }
  };

  const handleAddQuiz = () => {
    setShowAddQuiz(true);
  };

  return (
    <div>
      <Button style={{ float: 'right' }} type="submit" onClick={handleMainSubmit}>
        Submit lessons
      </Button>
      <h3 className="mt-4">Add a Lesson ?</h3>
      <h4> Lesson: {count + 1}</h4>
      {showAddQuiz === false ? (
        <div>
          
          <Container>
            <Card className="justify-content-center m-2">
              <Form className="mt-2 mb-2">
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
                  <Form.Label>Video</Form.Label>
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

                <Form.Group controlId="formFile" className="mb-3">
                  <Form.Label>Add PDF</Form.Label>
                  <Form.Control
                    type="file"
                    onChange={(e) => {
                      const inputElement = e.target as HTMLInputElement;
                      if (inputElement && inputElement.files) {
                        const selectedFile = inputElement.files[0];
                        setPdf(selectedFile); // Update the PDF state
                      }
                    }}
                  />
                </Form.Group>

                <Row>
                  <Col>
                    <Button onClick={handleAdd}>Add Lesson</Button>
                  </Col>
                  <Col>
                    <Button style={{float:'right'}} onClick={handleAddQuiz}>Add Quiz</Button>
                  </Col>
                </Row>
              </Form>
            </Card>
          </Container>
        </div>
      ) : (
        <AddQuiz courseId={courseId} onClose={() => setShowAddQuiz(false)} />
      )}
    </div>
  );
}


export default AddLesson;
