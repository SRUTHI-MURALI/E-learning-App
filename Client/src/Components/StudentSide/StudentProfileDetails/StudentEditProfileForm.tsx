import React, { useState,useEffect } from 'react'
import { Card, Container, Row ,Form, Col, Button} from 'react-bootstrap'
import axios from 'axios'
import { Base_Url,Course_Upload_Url, Image_Url } from '../../../Config/Config'
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { getStudentEditProfile, getStudentProfile } from '../AxiosConfigStudents/AxiosConfig';

function StudentEditProfileForm({student,onClose}) {
    const [name,setName]= useState('')
    const [email,setEmail]= useState('')
    const [phone,setPhone]= useState('')
    const [gender,setGender]= useState('')
    const [password,setPassword]= useState('')
    const [age,setAge]= useState('')
    const [country,setCountry]= useState('')
    const [image, setImage] = useState<File | null>(null);
    const [cloudinaryURL, setCloudinaryURL] = useState("");
    const [existingImage,setExistingImage] = useState('')
    const [photo,setPhoto]= useState('')

    useEffect(() => {
        const getProfileData = async (id: string) => {
          try {
            const response = await getStudentProfile(id)
            const profile = response.data.studentDetails;
           
            setName(profile?.name);
            setEmail(profile?.email);
            setPassword(profile?.password);
            setGender(profile?.gender);
            setPhone(profile?.phone);
            setAge(profile?.age)
            setCountry(profile?.country)
            setExistingImage(profile?.photo)
                
          } catch (error) {
            console.log({ error });
          }
        };
        getProfileData(student._id);
      }, []);

      const handleEditStudentProfile = async (e) => {
        e.preventDefault();
        
       
            await imageHandler()
      
            if (!cloudinaryURL) {
                toast.error("Error uploading photo");
                return;
              }

              setPhoto(image ? cloudinaryURL : existingImage)
        
        try {
          await getStudentEditProfile(student._id,name,phone,email,password,gender,photo,age,country)
            
            window.location.reload();
          
          } catch (error) {
           
            return;
          }
    
      };

      const handleClose = () => {
        onClose(false);
      };

      const imageHandler = async () => {
        const formData = new FormData();
        formData.append("file", image);
        formData.append("upload_preset", "studentImage");
        formData.append("cloud_name", "dnkc0odiw");
       await axios.post(`${Course_Upload_Url}`, formData)
        .then((response)=>{
         
            setCloudinaryURL(response.data.public_id);
            
        })
        .catch((err)=>{
            console.log(err);
            
        })
    
        
      };
    
  return (
    <>
    <ToastContainer
    position="top-center"
    autoClose={3000}
  ></ToastContainer>
    <Container className="m-5">
    <p className="allcourses-header mt-3">Edit Profile Details</p>
   
    <Card className="m-5">
      <Row>
      <Col>
      <Form >
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Name :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder={name}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
              Email :
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="email"
                placeholder={email}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="4">
              Contact Number :
            </Form.Label>
            <Col sm="8">
              <Form.Control
                type="number"
                placeholder={phone}
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="3">
              Password :
            </Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                placeholder={password}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
             Gender
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder={gender}
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
             Age
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder={age}
                value={age}
                onChange={(e) => setAge(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3">
            <Form.Label column sm="2">
             Country
            </Form.Label>
            <Col sm="10">
              <Form.Control
                type="text"
                placeholder={country}
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
            </Col>
          </Form.Group>
          <Row>
            <Col>
              <Button type="submit" onClick={handleEditStudentProfile}>Submit</Button>
            </Col>
            <Col>
              <Button style={{ float: "right" }} onClick={handleClose}>
                Exit
              </Button>
            </Col>
          </Row>
        </Form>
      </Col>
      <Col>
      
      <Form.Group controlId="formFile" className="mb-3">
        <Form.Label className='m-5'></Form.Label>
        <img
            style={{ width: "300px" }}
            src={`${Image_Url}/${existingImage}`}
            alt="profile"
            className="rounded-circle"
          />
            <Form.Control className='mt-5'
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
      </Col>
       
      </Row>
    </Card>
  </Container>
  </>
  )
}

export default StudentEditProfileForm
