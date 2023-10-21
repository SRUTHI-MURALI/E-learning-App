
import { BsFillArchiveFill, BsPeopleFill } from "react-icons/bs";
import l1 from "../../../Assets/Images/carouselBody/l1.jpeg";
import "../Css/Tutor.css";
import { Row, Col } from "react-bootstrap";
import { useLocation } from "react-router-dom";

function TutorSidebar() {
  
  const location = useLocation()
  const isCourses = location.pathname === "/tutorallcourses"
  const isStudents = location.pathname === "/tutorstudentslist"
  const isAddCourse = location.pathname === "/addcourse"
  const isQuizzes = location.pathname === "/tutorquizlist"
  const isProfile = location.pathname === "/tutorprofile"
  const isOnline = location.pathname === "/room"
  const isChats = location.pathname === "/tutorchat"

  

  return (
    <Row>
      <Col   >
        <aside  id="sidebar" className="sidebar-responsive">
          <div className="sidebar-title">
            <div className="sidebar-brand">
              <img style={{ height: "150px" }} src={l1} alt="Logo" />
            </div>
          </div>

          <ul className="sidebar-list">
            <li
              className={`sidebar-list-item ${
                isCourses ? "bg-white" : "#1d2634"
              }`}
              
            >
              <a href="/tutorallcourses" >
                <BsFillArchiveFill className="icon" /> Courses
              </a>
            </li>

            <li
               className={`sidebar-list-item ${
                isStudents ? "bg-white" : "#1d2634"
              }`}
             
            >
              <a href="/tutorstudentslist">
                <BsPeopleFill className="icon" /> Students
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                isAddCourse ? "bg-white" : "#1d2634"
              }`}
           
            >
              <a href="/addcourse">
                <BsFillArchiveFill className="icon" /> Add Course
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                isQuizzes ? "bg-white" : "#1d2634"
              }`}
             
            >
              <a href="/tutorquizlist">
                <BsPeopleFill className="icon" /> Quizzes
              </a>
            </li>
            <li
              className={`sidebar-list-item ${
                isProfile ? "bg-white" : "#1d2634"
              }`}
              
            >
              <a href="/tutorprofile">
                <BsPeopleFill className="icon" /> Profile
              </a>
            </li>
            <li
               className={`sidebar-list-item ${
                isOnline ? "bg-white" : "#1d2634"
              }`}
              
            >
              <a href="/room">
                <BsPeopleFill className="icon" /> Online
              </a>
            </li>
            <li
             className={`sidebar-list-item ${
              isChats ? "bg-white" : "#1d2634"
            }`}
             
            >
              <a href="/tutorchat">
                <BsPeopleFill className="icon" /> Chats
              </a>
            </li>
          </ul>
        </aside>
      </Col>
    </Row>
  );
}

export default TutorSidebar;
