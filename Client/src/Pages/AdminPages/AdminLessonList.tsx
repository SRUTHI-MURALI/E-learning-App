import {useEffect} from "react";
import { Col, Row } from "react-bootstrap";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminLessonsTable from "../../Components/AdminSIde/AdminLessonDetails/AdminLessonsTable";
import { useNavigate } from "react-router-dom";

function AdminLessonList() {
  const adminData = localStorage.getItem("adminData");
  const parseData = adminData ? JSON.parse(adminData) : null;

  const navigate = useNavigate()

  useEffect(() => {
    const adminData = localStorage.getItem("adminData");
    const parseData = adminData ? JSON.parse(adminData) : null;
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
          <AdminLessonsTable />
        </Col>
      </Row>
    </div>
    )}
   </> 
  );
}

export default AdminLessonList;
