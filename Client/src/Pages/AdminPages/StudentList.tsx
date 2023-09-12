
import { Row,Col  } from 'react-bootstrap'

import StudentTable from '../../Components/AdminSIde/StudentDetails/StudentTable'
import AdminSidebar from '../../Components/AdminSIde/AdminSidebar/AdminSidebar'
import AdminHeader from '../../Components/AdminSIde/AdminHeader/AdminHeader'



function StudentList() {
  return (
    <div style={{overflowX:'hidden'}}>
       <Row>
        <AdminHeader/>
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
