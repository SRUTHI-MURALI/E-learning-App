import  { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import StudentHeader from '../../Components/StudentSide/StudentHeader/StudentHeader';
import StudentMentorList from '../../Components/StudentSide/StudentMentorsDetails/StudentMentorList';

function StudentMentors() {
    
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
      <StudentHeader/>
      <StudentMentorList studentData={parseData}/>
    </div>
    )}
    </>
  )
}

export default StudentMentors
