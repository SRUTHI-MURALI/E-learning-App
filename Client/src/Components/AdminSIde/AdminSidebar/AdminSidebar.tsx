import React, { useState } from "react";
import {
  BsGrid1X2Fill,
  BsFillArchiveFill,
  BsFillGrid3X3GapFill,
  BsPeopleFill,
} from "react-icons/bs";
import "../Css/Admin.css";
import l1 from "../../../Assets/Images/carouselBody/l1.jpeg";
import { Row, Col } from "react-bootstrap";

function AdminSidebar() {
  const [selectedItem, setSelectedItem] = useState(null); // Default to 'dashboard'

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  return (
    <Row>
      <Col>
        <aside id="sidebar" className="sidebar-responsive">
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <img style={{ height: "150px" }} src={l1} />
            </div>
          </div>

          <ul className="sidebar-list">
            <li
              className={`sidebar-list-item ${
                selectedItem === "dashboard" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("dashboard")}
            >
              <a href="">
                <BsGrid1X2Fill className="icon" /> Dashboard
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Courses" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Courses")}
            >
              <a href="allCoursesList">
                <BsFillArchiveFill className="icon" /> Courses
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Categories" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Categories")}
            >
              <a href="courseCategoryList">
                <BsFillGrid3X3GapFill className="icon" /> Categories
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Instructors" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Instructors")}
            >
              <a href="instructorsList">
                <BsPeopleFill className="icon" /> Instructors
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Students" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Students")}
            >
              <a href="/studentsList">
                <BsPeopleFill className="icon" /> Students
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Orders" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Orders")}
            >
              <a href="/orderhistory">
                <BsPeopleFill className="icon" /> Orders
              </a>
            </li>
          </ul>
        </aside>
      </Col>
    </Row>
  );
}

export default AdminSidebar;
