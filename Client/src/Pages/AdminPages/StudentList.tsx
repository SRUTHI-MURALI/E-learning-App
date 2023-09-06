
import { Row,Col  } from 'react-bootstrap'
import AdminHome from './AdminHome'
import StudentTable from '../../Components/AdminSIde/StudentDetails/StudentTable'



function StudentList() {
  return (
    <div style={{overflow:'hidden',backgroundColor:"rgb(139, 179, 198)"}}>
  <Row>
    <Col xs={12} md={2}>
        <AdminHome/>
    </Col>
    <Col xs={12} md={8}>
   
    <StudentTable/>
    </Col>
  </Row>
      
    </div>
  )
}

export default StudentList
