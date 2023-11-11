import  { useState, useEffect } from "react";
import StudentHeader from "../../Components/StudentSide/StudentHeader/StudentHeader";
import Footer from "../../Components/StudentSide/StudentFooter/Footer";
import axios from "axios";
import StudentCourseimage from "../../Components/StudentSide/StudentCourseDetails/StudentCourseimage";
import { useNavigate, useParams } from "react-router-dom";
import StudentCourseDescription from "../../Components/StudentSide/StudentCourseDetails/StudentCourseDescription";
import StudentCourseAbout from "../../Components/StudentSide/StudentCourseDetails/StudentCourseAbout";
import { Col, Container, Row } from "react-bootstrap";
import StudenetCoursePurchase from "../../Components/StudentSide/StudentCourseDetails/StudenetCoursePurchase";
import StudentCourseLessons from "../../Components/StudentSide/StudentCourseDetails/StudentCourseLessons";
import { Base_Url } from "../../Config/Config";


interface CourseDetails {
  // Define properties of course details
}


export default function StudentCourseDetails() {
  const [data, setData] = useState<CourseDetails | null>(null);
  const { id } = useParams<{ id: string }>();
  
  const showVideo= false;

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

  useEffect(() => {
    // Make an HTTP request to fetch data from the backend
    axios
      .get(`${Base_Url}/student/getspecificcoursedetails/${id}`)
      .then((response) => {
        setData(response.data.courseDetails); // Store data in state
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [id]);

  return (
    <>
    {parseData && (
      <div>
      <Container>
        <Row className="m-3">
          <StudentHeader />
          <Row className="m-3">
            <Col xs={12} md={8}>
              <StudentCourseimage courseData={data} />
              <StudentCourseDescription courseData={data} />
            </Col>

            <Col xs={12} md={4}>
              <StudenetCoursePurchase courseData={data} />
            </Col>
          </Row>

          <StudentCourseLessons courseData={data} show={showVideo} />
          <StudentCourseAbout courseData={data} />
          <Footer />
        </Row>
      </Container>
    </div>
    )}
    </>
    
  );
}
