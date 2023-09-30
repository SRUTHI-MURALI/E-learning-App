import React ,{useEffect}from "react";

import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import { Col, Row } from "react-bootstrap";
import CourseCategoriesTable from "../../Components/AdminSIde/CourseCategory/CourseCategoriesTable";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import { useNavigate } from "react-router-dom";

function CourseCategoryList() {
  const adminData = localStorage.getItem("adminData");
  const parseData= JSON.parse(adminData);

  const navigate = useNavigate()

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    const parseData = JSON.parse(adminData);
    if (!parseData) {
      navigate("/adminlogin");
    }
  }, [navigate]);
 
  return (
    <>
    {parseData && (
      <div style={{ overflowX: "hidden" }}>
      <Row>
        <AdminHeader />
        <Col xs={12} md={2}>
          <AdminSidebar />
        </Col>
        <Col xs={12} md={8}>
          <CourseCategoriesTable />
        </Col>
      </Row>
    </div>
    )}
    </>
    
  );
}

export default CourseCategoryList;
