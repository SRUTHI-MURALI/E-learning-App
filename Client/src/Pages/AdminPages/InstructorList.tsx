
import { Row,Col  } from 'react-bootstrap'
import AdminHome from './AdminHome'
import InstructorTable from '../../Components/AdminSIde/InstructorDetails/InstructorTable'




function InstructorList() {
  return (
    <div style={{overflow:'hidden',backgroundColor:"rgb(139, 179, 198)"}}>
  <Row>
    <Col xs={12} md={2}>
        <AdminHome/>
    </Col>
    <Col xs={12} md={8}>
   
    <InstructorTable/>
    </Col>
  </Row>
      
    </div>
  )
}

export default InstructorList
