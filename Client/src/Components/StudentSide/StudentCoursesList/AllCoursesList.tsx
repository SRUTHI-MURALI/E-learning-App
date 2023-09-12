import React, { useEffect, useState } from 'react'
import { Button, Card, Col, Container, Row } from 'react-bootstrap'
import img from '../../../Assets/Images/carouselBody/hb2.avif'
import axios from 'axios';
import './StudentCoursesList.css'
import { FaRupeeSign } from 'react-icons/fa';

function AllCoursesList() {
    const[allCourseList,setAllCourseList]=useState([])
    const baseUrl="https://res.cloudinary.com/dnkc0odiw/image/upload/v1694423417/"

    useEffect(() => {
        axios.get('http://localhost:3002/admin/getallcourses')
          .then((response) => {
           
            setAllCourseList(response.data.allCourses);
          })
          .catch((error) => {
            console.error(error);
          });
      }, []);
  return (
    <div>

        <Container className='mt-5 '>
            <p className='allcourses-header'>All Courses</p>
            <Row>
                
            {allCourseList.map((courses, index) => (       
        <Col >
        <Card style={{ width: '16vw',height:'25rem'  }} className='m-2 '>
      <Card.Img style={{height:'200px'  }} variant="top" src={`${baseUrl}/${courses.photo}`} />
      <Card.Body className='mt-4 justify-content-center align-items-center'>
        <Card.Title className='text-center'>{courses.title}</Card.Title>
       <Card.Text className='text-center'>By Tutors name</Card.Text>
       <Card.Link >Enroll Now</Card.Link>
        <Card.Text style={{float:'right'}}><FaRupeeSign/> {courses.price}</Card.Text>        
      </Card.Body>
    </Card>
        </Col>
            ))}
        </Row>
        </Container>
     
    </div>
  )
}

export default AllCoursesList
