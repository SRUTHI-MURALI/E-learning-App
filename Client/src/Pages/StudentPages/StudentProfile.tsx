import React,{useEffect} from "react";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import StudentProfileForm from "../../Components/StudentSide/StudentProfileDetails/StudentProfileForm";
import { useNavigate } from "react-router-dom";

function StudentProfile() {
  const studentData = localStorage.getItem("studentData");
  const parseData= JSON.parse(studentData);

  const navigate = useNavigate()

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
  const parseData= JSON.parse(studentData);
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
