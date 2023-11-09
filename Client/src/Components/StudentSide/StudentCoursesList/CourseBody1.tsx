import {  Row } from "react-bootstrap";
import img from "../../../Assets/Images/ci4.jpg";
import "./StudentCoursesList.css";

function CourseBody1() {
  return (
    <div style={{marginTop:'10px'}}>
      
        <Row className="bodyContainer">
          <img className="courseBodyimg " style={{height:'40rem'}} src={img} />
        </Row>
   
    </div>
  );
}

export default CourseBody1;
