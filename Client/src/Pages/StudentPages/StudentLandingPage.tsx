import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import BodyCarousel from "../../Components/StudentSide/HomePage/BodyCarousel/BodyCarousel";
import Card from "../../Components/StudentSide/HomePage/Cards/Cards";
import Body1 from "../../Components/StudentSide/HomePage/Body1/Body1";
import Body2 from "../../Components/StudentSide/HomePage/Body2/Body2";
import Footer from "../../Components/StudentSide/StudentFooter/Footer";
import { useNavigate } from "react-router-dom";
import {useEffect} from 'react'

function StudentLandingPage() {
  const studentData = localStorage.getItem("studentData");
   const parseData = studentData ? JSON.parse(studentData) : null;

  const navigate = useNavigate()

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
     const parseData = studentData ? JSON.parse(studentData) : null;
    if (!parseData) {
      navigate("/");
    }
  }, [navigate]);

  
  return (
    <>
    {parseData &&
    <div>
      <StudentHeader />
      <BodyCarousel />
      <Card />
      <Body1 />
      <Body2 />
      <Footer />
    </div>
}
</>
  );
}

export default StudentLandingPage;
