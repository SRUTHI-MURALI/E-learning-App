
import { Row,Col  } from 'react-bootstrap'

import StudentTable from '../../Components/AdminSIde/StudentDetails/StudentTable'
import AdminSidebar from '../../Components/AdminSIde/AdminSidebar/AdminSidebar'



function StudentList() {
  return (
    <div style={{overflowX:'hidden'}}>
       <Row>
    <Col xs={12} md={2}>
        <AdminSidebar/>
    </Col>
    <Col xs={12} md={8}>
   
    <StudentTable/>
    </Col>
  </Row>
    </div>
 
      
  
  )
}

export default StudentList
