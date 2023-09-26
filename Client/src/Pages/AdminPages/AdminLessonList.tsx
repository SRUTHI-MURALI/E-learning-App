import React from "react";
import { Col, Row } from "react-bootstrap";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminLessonsTable from "../../Components/AdminSIde/AdminLessonDetails/AdminLessonsTable";

function AdminLessonList() {
  return (
    <div>
      <Row>
        <AdminHeader />
        <Col xs={12} md={2}>
          <AdminSidebar />
        </Col>
        <Col xs={12} md={8}>
          <AdminLessonsTable />
        </Col>
      </Row>
    </div>
  );
}

export default AdminLessonList;
