
import { Row,Col  } from 'react-bootstrap'

import InstructorTable from '../../Components/AdminSIde/InstructorDetails/InstructorTable'
import AdminSidebar from '../../Components/AdminSIde/AdminSidebar/AdminSidebar'




function InstructorList() {
  return (
    <div style={{overflowX:'hidden'}}>
      <Row>
    <Col xs={12} md={2}>
        <AdminSidebar/>
    </Col>
    <Col xs={12} md={8}>
   
    <InstructorTable/>
    </Col>
  </Row>
    </div>
  
      
  
  )
}

export default InstructorList
