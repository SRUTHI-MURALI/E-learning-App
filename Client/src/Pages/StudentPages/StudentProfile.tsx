import {useEffect} from "react";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import StudentProfileForm from "../../Components/StudentSide/StudentProfileDetails/StudentProfileForm";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const studentData = localStorage.getItem("studentData");
  const parseData = studentData ? JSON.parse(studentData) : null;

  const navigate = useNavigate()

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
    const parseData = studentData ? JSON.parse(studentData) : null;
    if (!parseData) {
      navigate("/studentlogin");
    }
  }, [navigate]);
  return (
    <>
    {parseData && (
      <div>
      <StudentHeader />
      <StudentProfileForm />
    </div>
    )}
    </>
    
  );
}

export default StudentProfile;
