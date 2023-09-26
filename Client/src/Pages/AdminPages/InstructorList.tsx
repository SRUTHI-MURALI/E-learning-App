import { Row, Col } from "react-bootstrap";

import InstructorTable from "../../Components/AdminSIde/InstructorDetails/InstructorTable";
import AdminSidebar from "../../Components/AdminSIde/AdminSidebar/AdminSidebar";
import AdminHeader from "../../Components/AdminSIde/AdminHeader/AdminHeader";

function InstructorList() {
  return (
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
  );
}

export default InstructorList;
