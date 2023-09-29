import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "react-bootstrap/Navbar";
import logo from "../../../Assets/Images/carouselBody/l1.jpeg";
import { Button } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./StudentHeader.css";
import { logout } from "../../ReduxComponents/StudentSlice";
import { useDispatch } from "react-redux";

function StudentHeader() {
  const studentData = localStorage.getItem("studentData");
  const parseData = JSON.parse(studentData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("studentData");
    await dispatch(logout);
    navigate("/");
  };
  return (
    <Navbar expand="lg">
      <Container>
        <img className="logo" src={logo} />

        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "80px" }}
            navbarScroll
          >
            {parseData ? (
              <Nav.Link
                className="nav-header-student"
                href="/studentlandingpage"
              >
                Home
              </Nav.Link>
            ) : (
              <Nav.Link className="nav-header-student" href="/">
                Home
              </Nav.Link>
            )}

            <Nav.Link
              className="nav-header-student"
              href="/studentallcourselist"
            >
              Courses
            </Nav.Link>
            <Nav.Link className="nav-header-student" href="#action2">
              Contacts
            </Nav.Link>
            <Nav.Link className="nav-header-student" href="/studentprofile">
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
      </Container>
    </Navbar>
  );
}

export default StudentHeader;
