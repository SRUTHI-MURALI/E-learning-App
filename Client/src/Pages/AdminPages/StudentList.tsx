import { Row, Col } from "react-bootstrap";
import {useEffect} from 'react'
import StudentTable from "../../Components/AdminSIde/StudentDetails/StudentTable";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import { useNavigate } from "react-router-dom";

function StudentList() {

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
           <StudentTable />
         </Col>
       </Row>
     </div>
    )}
    </>
   
  );
}

export default StudentList;
