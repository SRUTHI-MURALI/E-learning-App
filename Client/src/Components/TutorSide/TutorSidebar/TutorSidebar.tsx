import React, { useState } from "react";
import { BsFillArchiveFill, BsPeopleFill } from "react-icons/bs";
import l1 from "../../../Assets/Images/carouselBody/l1.jpeg";
import "../Css/Tutor.css";
import { Row, Col } from "react-bootstrap";

function TutorSidebar() {
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
              <img style={{ height: "150px" }} src={l1} alt="Logo" />
            </div>
          </div>

          <ul className="sidebar-list">
            <li
              className={`sidebar-list-item ${
                selectedItem === "Courses" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Courses")}
            >
              <a href="/tutorallcourses">
                <BsFillArchiveFill className="icon" /> Courses
              </a>
            </li>

            <li
              className={`sidebar-list-item ${
                selectedItem === "Students" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Students")}
            >
              <a href="/tutorstudentslist">
                <BsPeopleFill className="icon" /> Students
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Add Course" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Add Course")}
            >
              <a href="/addcourse">
                <BsFillArchiveFill className="icon" /> Add Course
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Quizzes" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Quizzes")}
            >
              <a href="/tutorquizlist">
                <BsPeopleFill className="icon" /> Quizzes
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "Profile" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("Profile")}
            >
              <a href="/tutorprofile">
                <BsPeopleFill className="icon" /> Profile
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                selectedItem === "video" ? "selected" : ""
              }`}
              onClick={() => handleItemClick("video")}
            >
              <a href="/room">
                <BsPeopleFill className="icon" /> Online
              </a>
            </li>
          </ul>
        </aside>
      </Col>
    </Row>
  );
}

export default TutorSidebar;
