import React ,{useEffect}from "react";
import { Row, Col } from "react-bootstrap";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminOrderTable from "../../Components/AdminSIde/AdminOrderDetails/AdminOrderTable";
import { useNavigate } from "react-router-dom";

function AdminOrderList() {
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
      <Row>
      <AdminHeader />

      <Col xs={12} md={2}>
        <AdminSidebar />
      </Col>  
      <Col xs={12} md={8}>  
        <AdminOrderTable />
      </Col>
    </Row>
    )}
    </>
    
  );
}

export default AdminOrderList;
