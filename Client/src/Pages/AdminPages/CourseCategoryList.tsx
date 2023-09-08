import React from 'react'

import AdminSidebar from '../../Components/AdminSIde/AdminSidebar/AdminSidebar'
import { Col, Row } from 'react-bootstrap'
import CourseCategoriesTable from '../../Components/AdminSIde/CourseCategory/CourseCategoriesTable'

function CourseCategoryList() {
  return (
    <div style={{overflowX:'hidden'}}>
    <Row >
    <Col xs={12} md={2}>
    <AdminSidebar/>
    </Col>
    <Col xs={12} md={8}>
      <CourseCategoriesTable/>
    </Col>
  </Row>
  </div>
  )
}

export default CourseCategoryList
