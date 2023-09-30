import React,{useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import CourseTable from "../../Components/AdminSIde/CourseDetails/CourseTable";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import { useNavigate } from "react-router-dom";

function CoursesList() {
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
    )}
    </>
    
  );
}

export default CoursesList;
