import React from 'react'
import { Row,Col } from 'react-bootstrap'
import AdminHeader from '../../Components/AdminSIde/AdminHeader/AdminHeader'
import AdminSidebar from '../../Components/AdminSIde/AdminSidebar/AdminSidebar'
import AdminOrderTable from '../../Components/AdminSIde/AdminOrderDetails/AdminOrderTable'

function AdminOrderList() {
  return (
    <Row>
        <AdminHeader/>
       
            <Col xs={12} md={2}>
                <AdminSidebar/>
            </Col>
            <Col  xs={12} md={8}>
                <AdminOrderTable/>
            </Col>
       
    </Row>
  )
}

export default AdminOrderList
