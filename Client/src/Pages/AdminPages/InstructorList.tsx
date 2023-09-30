import { Row, Col } from "react-bootstrap";
import {useEffect} from 'react'
import InstructorTable from "../../Components/AdminSIde/InstructorDetails/InstructorTable";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import { useNavigate } from "react-router-dom";

function InstructorList() {
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
          <InstructorTable />
        </Col>
      </Row>
    </div>
    )}
    </>
    
  );
}

export default InstructorList;
