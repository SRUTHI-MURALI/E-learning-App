import React, { useEffect, useState } from 'react'
import { Row,Col,Container } from 'react-bootstrap';

import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { FaRupeeSign } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { Base_Url, Image_Url } from '../../../Config/Config';



function StudentCourseAbout({data}) {
  const[allCourseList,setAllCourseList]=useState([])
 
  useEffect(() => {
    axios.get(`${Base_Url}/admin/getallcourses`)
      .then((response) => {
       
        setAllCourseList(response?.data?.allCourses);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <Container className='mt-5 cardLayout '>
       <h2 className='m-3' style={{color:'rgb(139, 179, 198)',fontWeight:'bolder',fontSize:'30px'}}>Explore More...</h2>
  <Row className='m-3'>
    {allCourseList.map((courses, index) => {
      if (data?._id !== courses?._id) {
        return (
          <Col key={courses?._id}>
            <Link to={`/studentcoursedetails/${courses?._id}`}>
              <Card style={{ width: '16vw', height: '25rem' }} className='m-2 '>
                <Card.Img style={{ height: '200px' }} variant="top" src={`${Image_Url}/${courses?.photo}`} />
                <Card.Body className='mt-4 justify-content-center align-items-center'>
                  <Card.Title className='text-center'>{courses?.title}</Card.Title>
                  <Card.Text className='text-center'>By Tutor's name</Card.Text>
                  <Card.Link>Enroll Now</Card.Link>
                  <Card.Text style={{ float: 'right' }}><FaRupeeSign /> {courses?.price}</Card.Text>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        );
      } else {
        return null; // Skip rendering when the condition is not met
      }
    })}
  </Row>
</Container>

  );
}

export default StudentCourseAbout;