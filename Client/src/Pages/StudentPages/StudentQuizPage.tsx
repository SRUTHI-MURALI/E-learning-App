import React from 'react'
import { Container, Row } from 'react-bootstrap'
import StudentHeader from '../../Components/StudentSide/StudentHeader/StudentHeader'
import StudentQuizForm from '../../Components/StudentSide/StudentQuizes/StudentQuizForm'


function StudentQuizPage() {
  return (
    <Container>
        <Row>
            <StudentHeader/>
        </Row>
        <Row>
            <StudentQuizForm/>
        </Row>
    </Container>
    
  )
}

export default StudentQuizPage