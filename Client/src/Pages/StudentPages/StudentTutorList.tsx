import { useState,useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import Footer from "../../Components/StudentSide/StudentFooter/Footer";
import { getInstructors } from "../../Components/StudentSide/AxiosConfigStudents/AxiosConfig";
import AllTeachersList from "../../Components/StudentSide/StudentTeachersList/AllTeachersList";



function StudentTutorList() {
    const [teachers,setTeachers]= useState([])
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

  useEffect(()=>{
    const getTutor= async ()=>{
      const response=  await getInstructors()
      setTeachers(response.data.tutorDetails)
    }
    getTutor()
  },[])

  return (
    <>
    {parseData && (
       <div>
       <Container>
         <Row>
           <StudentHeader />
          
           <AllTeachersList tearcherData={teachers} />
          
           
           <Footer />
         </Row>
       </Container>
     </div>
    )}
    </>
   
  );
}

export default StudentTutorList
