
import { Col, Row } from 'react-bootstrap'
import TutorCreateCourseForm from '../../Components/TutorSide/TutorCreateCoursePage/TutorCreateCourseForm'
import TutorSideBar from '../../Components/TutorSide/TutorHomePage/TutorSideBar/TutorSideBar'
import TutorHeader from '../../Components/TutorSide/TutorHomePage/TutorHeader/TutorHeader'

function TutorCreateCourse() {
  return (
    <div style={{ height: '100vh', overflowX:'hidden', backgroundColor:"rgb(139, 179, 198)"}}>
    <Row style={{ height: '100%' }}>
      <Col xs={12} md={2} style={{ padding: 0 }}>
        <TutorSideBar />
      </Col>
      <Col  xs={12} md={10} style={{ padding: 0 }}>
        <Row>
        <TutorHeader />
        </Row>
        <Row style={{width:'50%'}} >
        <TutorCreateCourseForm/>
        </Row>
        
      </Col>
    </Row>
  </div>
  )
}

export default TutorCreateCourse
