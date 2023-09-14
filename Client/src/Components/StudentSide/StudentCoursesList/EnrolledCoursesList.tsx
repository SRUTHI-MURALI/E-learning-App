import React, { useEffect, useState } from 'react'
import { Card, Col, Container, Row } from 'react-bootstrap'
import img from '../../../Assets/Images/carouselBody/hb2.avif'
import axios from 'axios';
import './StudentCoursesList.css'
import { Base_Url } from '../../../Config/Config';

function EnrolledCoursesList() {
    const[allCourseList,setAllCourseList]=useState([])

    useEffect(() => {
        axios.get(`${Base_Url}/admin/getallcourses`)
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
            <p className='allcourses-header'>Enrolled Courses</p>
            <Row>
                
            {allCourseList.map((courses) => (       
        <Col >
        <Card style={{ width: '16vw',height:'20rem'  }} className='m-2 justify-content-center align-items-center'>
      <Card.Img style={{height:'15rem'  }} variant="top" src={img} />
      <Card.Body>
        <Card.Title>{courses.title}</Card.Title>
       
        <Card.Text>By Tutors name</Card.Text>
      </Card.Body>
    </Card>
        </Col>
            ))}
        </Row>
        </Container>
     
    </div>
  )
}

export default EnrolledCoursesList
