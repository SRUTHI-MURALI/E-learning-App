import axios from 'axios';
import{useState,useEffect} from 'react'
import {  useParams } from 'react-router-dom';
import { Base_Url } from '../../Config/Config';
import {  Container, Row } from 'react-bootstrap';
import StudentHeader from '../../Components/StudentSide/StudentHeader/StudentHeader';
import StudentCourseimage from '../../Components/StudentSide/StudentCourseDetails/StudentCourseimage';
import StudentCourseDescription from '../../Components/StudentSide/StudentCourseDetails/StudentCourseDescription';
import StudentCourseLessons from '../../Components/StudentSide/StudentCourseDetails/StudentCourseLessons';
import StudentCourseAbout from '../../Components/StudentSide/StudentCourseDetails/StudentCourseAbout';
import Footer from '../../Components/StudentSide/StudentFooter/Footer';

interface CourseLesson {
  _id: string;
  title: string;
  description: string;
  duration: number;
  video: string;
}



function StudentCoureseView() {
  const [data, setData] = useState<{ courseLessons: CourseLesson[] }>({ courseLessons: [] });

    const { id } = useParams();
    const showVideo=true;
  
   
  
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
      }, []);
    
  return (
    <div>
      <Container>
        <Row className="m-3">
          <StudentHeader />
          <Row className="m-3">
           
              <StudentCourseimage courseData={data} />
              <StudentCourseDescription courseData={data} />
           
            
            
          </Row>

          <StudentCourseLessons courseData={data} show={showVideo} />
          <StudentCourseAbout courseData={data} />
          <Footer />
        </Row>
      </Container>
    </div>
  )
}

export default StudentCoureseView
