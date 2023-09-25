
import TutorHeader from '../../Components/TutorSide/TutorHeader/TutorHeader'
import TutorSidebar from '../../Components/TutorSide/TutorSidebar/TutorSidebar'
import TutorProfileform from '../../Components/TutorSide/TutorProfileDetails/TutorProfileform'
import { Col, Row } from 'react-bootstrap'

function TutorProfile() {
  const tutorData=localStorage.getItem("tutorData")
  const parseData=JSON.parse(tutorData)
  const tutor= parseData
  return (
    <div style={{overflow:'hidden'}}>
      <TutorHeader/>
      
      <Row>
        <Col xs={12} md={2}>
        <TutorSidebar/>
        </Col>
      <Col xs={12} md={8}>
      <TutorProfileform tutor={tutor}/>
      </Col>
     
      </Row>
     
    </div>
  )
}

export default TutorProfile
