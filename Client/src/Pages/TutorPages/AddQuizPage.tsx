import React from 'react'
import TutorHeader from '../../Components/TutorSide/TutorHeader/TutorHeader'
import { Col, Row } from 'react-bootstrap'
import TutorSidebar from '../../Components/TutorSide/TutorSidebar/TutorSidebar'
import AddQuiz from '../../Components/TutorSide/TutorAddCourse/AddQuiz'

function AddQuizPage() {
  return (
    <div>
       <Row>
     
     <TutorHeader/>
   <Col xs={12} md={2}>
       <TutorSidebar/>
   </Col>
   <Col xs={12} md={8}>
      <AddQuiz/>
  </Col>
   
 </Row>
    </div>
  )
}

export default AddQuizPage
