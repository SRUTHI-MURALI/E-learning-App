
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../Assets/Images/carouselBody/l1.jpeg";
import { Button } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "./StudentHeader.css";
import { logout } from "../../ReduxComponents/StudentSlice";
import { useDispatch } from "react-redux";

function StudentHeader() {
  const studentData = localStorage.getItem("studentData");
  const parseData = studentData ? JSON.parse(studentData) : null;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation()
  const isHome = location.pathname === "/studentlandingpage"
  const isCourses = location.pathname === "/studentallcourselist"
  const isInstructors = location.pathname === "/studentinstructorlist"
  const isProfile = location.pathname === "/studentprofile"

  const handleLogout = async () => {
    localStorage.removeItem("studentData");
    await dispatch(logout);
    navigate("/");
  };
  return (
    <Navbar className="navbar-student" fixed="top" expand="lg">
  
        <img className="logo m-4" style={{ height: "4rem",width:'10rem' }} src={logo} />
        <Navbar.Toggle aria-controls="navbarScroll"  className="custom-navbar-toggle " style={{backgroundColor:'white'}} />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0 "
            style={{ maxHeight: "80px" }}
            navbarScroll
          >
            {parseData ? (
              <Nav.Link
              className={`nav-header-student ${isHome ? "highlight" : ""}`}


                href="/studentlandingpage"
              >
                Home
              </Nav.Link>
            ) : (
              <Nav.Link className={`nav-header-student `} href="/">
                Home
              </Nav.Link>
            )}

            <Nav.Link
              className={`nav-header-student ${isCourses ? "highlight" : ""}`}
              href="/studentallcourselist"
            >
              Courses
            </Nav.Link>

            <Nav.Link
              className={`nav-header-student ${isInstructors ? "highlight" : ""}`}
              href="/studentinstructorlist"
            >
              Instructors
            </Nav.Link>
            
            <Nav.Link   className={`nav-header-student ${isProfile ? "highlight" : ""}`}href="/studentprofile">
              Profile
            </Nav.Link>

            
            
          </Nav>

          

          <h1
            style={{
              fontSize: "larger",
              color: "white",
              fontWeight: "bold",
              fontStyle: "italic",
            }}
          >
            Welcome {parseData?.name}{" "}
          </h1>

          <Link to="" onClick={handleLogout}>
            <Button className="m-3">Logout</Button>
          </Link>
        </Navbar.Collapse>
      
    </Navbar>
  );
}

export default StudentHeader;
