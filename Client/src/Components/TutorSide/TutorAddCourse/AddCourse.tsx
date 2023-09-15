import React, { useState } from 'react'
import {Row, Container, Form,Col ,Button,Card} from 'react-bootstrap';
import { toast,ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios'
import AddLesson from './AddLesson';
import { Base_Url,Course_Upload_Url } from '../../../Config/Config';


function AddCourse({selectedCategory,onCourseAdded}) {

  const tutorData=localStorage.getItem("tutorData")
  const parseData=JSON.parse(tutorData)

    const[title,setTitle]= useState('')
    const[price,setPrice]=useState('')
    const[duration,setDuration]=useState('')
    const[description,setDescription]=useState('')
    const [image, setImage] = useState<File | null>(null)
    const [cloudinaryURL, setCloudinaryURL] = useState('');
    const[selectedCourse,setSelectedCourse]= useState('')
    const[show,setShow]=useState(null)
    
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
        
        
       return toast.error("Please fill all fields");
      
      }

       // Validate username format (only letters and spaces allowed)
     const usernamePattern = /^[A-Za-z\s.]+$/;
     if (!usernamePattern.test(trimmedTitle.trim())) {
       alert('title can only contain letters and spaces');
       return;
     }
   
    

      await imageHandler()

      if (!cloudinaryURL) {
        
        
        toast.error("Error uploading photo");
        return;
      }
  
      
      try {
      
      
       const response=  await axios.post(`${Base_Url}/tutor/addcourse`, {
          title: trimmedTitle,
          price: trimmedPrice,
          duration: trimmedDuration,
          description: trimmedDescription,
          category:selectedCategory,
          photo: cloudinaryURL,
          instructor:parseData?._id
        })
        setSelectedCourse(response.data._id)
        

        setShow(true)
       toast.success("successfully registered")
       
    
        
      } catch (error) {
       toast.error("registration error");
       return;
      }
    };

      const addLessonHandler = async ()=>{

        setShow(false)
        
      }

      const exitHandler = async ()=>{

        onCourseAdded(true)
        
      }

      const imageHandler= async ()=>{
        const formData = new FormData()
        formData.append("file",image)
        formData.append("upload_preset","courselist")
        formData.append("cloud_name","dnkc0odiw")
        const response = await axios.post(
          `${Course_Upload_Url}`,
          formData
          
        )
       
        setCloudinaryURL(response.data.public_id);

  
      }
    
    
  return (
    <div>
      
      <Container>
      <Card className=' justify-content-center' >
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
  <Form.Control
    type="file"
    onChange={(e) => {
      const inputElement = e.target as HTMLInputElement;
      if (inputElement && inputElement.files) {
        const selectedFile = inputElement.files[0];
        setImage(selectedFile);
      }
    }}
  />
</Form.Group>
      <Row>
       
      {show ? (
      
        <Col>
      <Button variant="primary" style={{ float: 'right' }} onClick={addLessonHandler}>
        Add Lesson
      </Button>
    </Col>
  
  ) : show === null ? (
    <Col>
      <Button variant="primary" onClick={submitHandler}>
        Submit
      </Button>
    </Col>
  ) : null}

<Col>
  <Button variant="primary" onClick={exitHandler} style={{ float: 'right' }}>
    Exit
  </Button>
</Col>
       
        </Row>
    </Form>
        </Row>
        </Card>
        {show==false &&(
           <Row>
           <AddLesson courseId={selectedCourse} />
         </Row>
        )}
         
        
      </Container>

      
    </div>
  )
}

export default AddCourse
