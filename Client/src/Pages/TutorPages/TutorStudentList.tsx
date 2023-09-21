
import TutorHeader from '../../Components/TutorSide/TutorHeader/TutorHeader'
import { Col, Row } from 'react-bootstrap'
import TutorSidebar from '../../Components/TutorSide/TutorSidebar/TutorSidebar'
import TutorStudentTable from '../../Components/TutorSide/TutorStudentDetails/TutorStudentTable'

function TutorStudentList() {
  return (
    <>
   <Row>
   <TutorHeader/>
   </Row>
   <Row>
    <Col xs={12} md={2}>
    <TutorSidebar/>
     
    </Col>
    <Col xs={12} md={8}>
    <TutorStudentTable/>
    </Col>

   </Row>
    </>
  )
}

export default TutorStudentList
