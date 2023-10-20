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
import { useLocation } from "react-router-dom";

function AdminSidebar() {

  
  

  const location = useLocation()
  const isDashboard = location.pathname === "/adminhome"
  const isCourses = location.pathname === "/allCoursesList"
  const isCategories = location.pathname === "/courseCategoryList"
  const isInstructors = location.pathname === "/instructorsList"
  const isStudents = location.pathname === "/studentsList"
  const isOrders = location.pathname === "/orderhistory"
  

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
                isDashboard ? "bg-white" : "#1d2634"
              }`}
             
            >
              <a href="/adminhome">
                <BsGrid1X2Fill className="icon" /> Dashboard
              </a>
            </li>
            <li
             className={`sidebar-list-item ${
              isCourses ? "bg-white" : "#1d2634"
            }`}
              
            >
              <a href="/allCoursesList">
                <BsFillArchiveFill className="icon" /> Courses
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                isCategories ? "bg-white" : "#1d2634"
              }`}
             
            >
              <a href="/courseCategoryList">
                <BsFillGrid3X3GapFill className="icon" /> Categories
              </a>
            </li>
            <li
             className={`sidebar-list-item ${
              isInstructors ? "bg-white" : "#1d2634"
            }`}
             
            >
              <a href="/instructorsList">
                <BsPeopleFill className="icon" /> Instructors
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                isStudents ? "bg-white" : "#1d2634"
              }`}
             
            >
              <a href="/studentsList">
                <BsPeopleFill className="icon" /> Students
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                isOrders ? "bg-white" : "#1d2634"
              }`}
             
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
