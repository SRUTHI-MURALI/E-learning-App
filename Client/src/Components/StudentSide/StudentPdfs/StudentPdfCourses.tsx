import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import { getAllCourses } from "../AxiosConfigStudents/AxiosConfig";
import StudentPdfLessons from "./StudentPdfLessons";

function StudentPdfCourses() {
  const [allCourseList, setAllCourseList] = useState([]);
  const [show, setShow] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState([]);

  useEffect(() => {
    const getCourses = async ()=>{
      try {
        const response=await getAllCourses();
        setAllCourseList(response.data.allCourses);
        console.log(allCourseList,'ooo');
        
      } catch (error) {
        console.log(error);
        
      }
    }
   
   getCourses()
  }, []);

  

  const handleQuiz = async (id) => {
    setSelectedCourseId(id);
    setShow(true);
  };
  return (
    <Row>
      <Container style={{marginTop:'120px'}}>
      <h4 style={{fontFamily:"Vollkorn serif",color:'white',fontStyle:'italic'}} className="m-3">PDF Downloads</h4>
        {show == false ? (
          <>
           <div className="row" >
           <div style={{cursor:'pointer'}}  className="row mt-3">
            {allCourseList.map((courses, index) => (
             
              <>
                    <div className="col-md-2 mt-4">
                        <img className="bg-white mt-2"
                            src={`${Image_Url}/${courses?.photo}`} style={{width:'10rem'}}
                            alt=""
                            onClick={() => {
                              handleQuiz(courses?.courseLessons);
                            }}
                        />
                    </div>
                    <div  onClick={() => {
                     handleQuiz(courses?.courseLessons);
                   }} className="col-lg-2 mt-5">
                    <h5 style={{fontFamily:"Vollkorn serif",color:'white'}}>Title: {courses?.title}</h5>
                    <h6 style={{fontFamily:"Vollkorn serif",color:'white'}}> By : {courses?.instructor?.name}</h6>
                    </div>
                    
                 
                    </>
                  
            ))}
            </div>
            </div>
             
          </>
        ) : (
          <StudentPdfLessons
          courseId={selectedCourseId}
           
          />
        )}
      </Container>
    </Row>
  );
}

export default StudentPdfCourses;


