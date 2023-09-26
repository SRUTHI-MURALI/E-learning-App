import { BsPersonCircle,} from "react-icons/bs";
import "../Css/Tutor.css";
import { logout } from "../../ReduxComponents/TutorSlice";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

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
    <header className="header">
      <div className="header-left">
        <h3 style={{ color: "#fff" }}>{parseData?.name}</h3>
      </div>
      <div className="header-right">
        <Link to="" onClick={handleLogout}>
          {" "}
          <BsPersonCircle className="icon" />
          Logout
        </Link>
      </div>
    </header>
  );
}

export default TutorHeader;
