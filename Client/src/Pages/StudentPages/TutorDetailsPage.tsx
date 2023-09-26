import React from 'react'
import { Container, Row } from 'react-bootstrap'
import StudentHeader from '../../Components/StudentSide/StudentHeader/StudentHeader'
import TutorProfile from '../../Components/StudentSide/TutorDetails/TutorProfile'

function TutorDetailsPage() {
  return (
    <Container>
        <Row>
            <StudentHeader/>
        </Row>
        <Row>
            <TutorProfile/>
        </Row>
    </Container>
  )
}

export default TutorDetailsPage
