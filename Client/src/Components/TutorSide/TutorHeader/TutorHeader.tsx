import { BsPersonCircle } from "react-icons/bs";
import "../Css/Tutor.css";
import { logout } from "../../ReduxComponents/TutorSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import l1 from "../../../Assets/Images/carouselBody/l1.jpeg";
import { Nav, Navbar } from "react-bootstrap";

function TutorHeader() {
  const tutorData = localStorage.getItem("tutorData");
  const parseData = JSON.parse(tutorData);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem("tutorData");
    await dispatch(logout);
    navigate("/tutorlogin");
  };
  return (
    <Navbar fixed="top" expand="lg" className="navbar-student">
      
    <img className="logo"style={{ height: "4rem" }} src={l1} />
    <Navbar.Toggle aria-controls="navbarScroll"  className="custom-navbar-toggle " style={{backgroundColor:'white'}} />

    <Navbar.Collapse id="navbarScroll" >
      
      <Nav>
      
       <div className="header-left ">
         <h3 style={{ color: "#fff" }}>{parseData?.name}</h3>
      </div>
      
      <div >
         <Link to="" onClick={handleLogout}>
           {" "}
           <BsPersonCircle className="icon" />
           Logout
         </Link>
       </div>
       </Nav>
    </Navbar.Collapse>
 
</Navbar>


  );
}

export default TutorHeader;
