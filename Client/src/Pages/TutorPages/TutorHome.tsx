import {useEffect} from "react";
import TutorHeader from "../../Components/TutorSide/TutorHeader/TutorHeader";
import TutorSidebar from "../../Components/TutorSide/TutorSidebar/TutorSidebar";
import { useNavigate } from "react-router-dom";

function TutorHome() {
  const tutorData = localStorage.getItem("tutorData");
  const parseData = tutorData ? JSON.parse(tutorData) : null;
  const navigate = useNavigate()

  useEffect(() => {
    const tutorData = localStorage.getItem("tutorData");
    const parseData = tutorData ? JSON.parse(tutorData) : null;
    if (!parseData) {
      navigate("/tutorlogin");
    }
  }, [navigate]);
  return (
    <>
    {parseData && (
      <div className="grid-container" style={{overflow:'hidden'}}>
      <TutorHeader />
      <TutorSidebar />
    </div>
    )}
    </>
    
  );
}

export default TutorHome;
