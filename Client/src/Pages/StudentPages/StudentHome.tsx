import Header from "../../Components/StudentSide/HomePage/Header/Header";
import BodyCarousel from "../../Components/StudentSide/HomePage/BodyCarousel/BodyCarousel";
import Card from "../../Components/StudentSide/HomePage/Cards/Cards";
import Body1 from "../../Components/StudentSide/HomePage/Body1/Body1";

import Footer from "../../Components/StudentSide/StudentFooter/Footer";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function StudentHome() {
  

  const navigate = useNavigate()

  useEffect(() => {
    const studentData = localStorage.getItem("studentData");
    const parseData = studentData ? JSON.parse(studentData) : null;
    if (parseData) {
      navigate("/studentlandingpage");
    }
  }, [navigate]);

  
  return (
    <div>
      <Header />
      <BodyCarousel />
      <Card />
      <Body1 />
      
      <Footer />
    </div>
  );
}

export default StudentHome;
