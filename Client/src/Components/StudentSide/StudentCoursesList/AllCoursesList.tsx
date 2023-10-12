import React, { useEffect, useState } from "react";
import {  Card, Col, Container, Row } from "react-bootstrap";
import Carousel from 'react-multi-carousel'
import "./StudentCoursesList.css";
import { FaRupeeSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import { Image_Url } from "../../../Config/Config";
import { getAllCourses, getEnrolledCourses } from "../AxiosConfigStudents/AxiosConfig";

function AllCoursesList() {
  const [allCourseList, setAllCourseList] = useState([]);
  const [enrolledCourses,setEnrolledCourses] = useState([])
  const student = localStorage.getItem("studentData");
  const parseData = JSON.parse(student);

  useEffect(() => {
    const getCourses = async ()=>{
      try {
        const response= await getAllCourses()
        setAllCourseList(response.data.allCourses);
      } catch (error) {
        console.error(error);
      }
    }
    getCourses();
    
  }, []);

  useEffect(() => {

    const enrolledCourses = async (id)=>{
      try {
        const response = await getEnrolledCourses(id)
        
        
        setEnrolledCourses(response.data.enrolledCourses);
      } catch (error) {
        console.error(error);
      }
     
    }
  
    

    enrolledCourses(parseData?._id)
    
  }, []);

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 3,
      slidesToSlide: 3,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 2,
      slidesToSlide: 2,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 1,
      slidesToSlide: 1,
    },
  };

  const filteredCourses = allCourseList.filter((course) => {
    return !enrolledCourses.some((enrolledCourse) => enrolledCourse._id === course._id);
  });
  return (
    <>
    
      <Container className="mt-5 ">
      <p className="allcourses-header">All Courses</p>
      
      <Carousel
          swipeable={false}
          draggable={false}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={false}
          autoPlaySpeed={1000}
          keyBoardControl={true}
          customTransition="all .5"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="carousel-item-padding-40-px"
          
        >
            
       
        
        <div>
       
          {filteredCourses.map((courses, index) => (
           
            <Col  key={courses._id}>
              
              <Link
                style={{ textDecoration: "none" }}
                to={`/studentcoursedetails/${courses._id}`}
              >
               
                <Card
                  style={{ width: "16vw", height: "25rem" }}
                  className="m-2 "
                >
                 
                  <Card.Img
                    style={{ height: "200px" }}
                    variant="top"
                    src={`${Image_Url}/${courses.photo}`}
                  />
                  <Card.Body className="mt-4 justify-content-center align-items-center">
                    <Card.Title className="text-center">
                      Course:{courses.title}
                    </Card.Title>
                    <Card.Text className="text-center">
                      By {courses?.instructor?.name}
                    </Card.Text>
                    <Card.Link>Enroll Now</Card.Link>
                    <Card.Text style={{ float: "right" }}>
                      <FaRupeeSign /> {courses.price}
                    </Card.Text>
                  </Card.Body>
                 
                </Card>
               
              </Link>
             
            </Col>
            
          ))
          }
         
        </div>
        </Carousel>
        </Container>
        
     
     
    </>
  );
}

export default AllCoursesList;
