import React from "react";
import { Col, Row } from "react-bootstrap";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import CourseTable from "../../Components/AdminSIde/CourseDetails/CourseTable";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";

function CoursesList() {
  return (
    <div>
      <Row>
        <AdminHeader />
        <Col xs={12} md={2}>
          <AdminSidebar />
        </Col>
        <Col xs={12} md={8}>
          <CourseTable />
        </Col>
      </Row>
    </div>
  );
}

export default CoursesList;
