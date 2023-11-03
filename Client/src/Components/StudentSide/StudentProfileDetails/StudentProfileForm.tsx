import React, { useState, useEffect } from "react";
import "./Profile.css";
import pic from "../../../Assets/Images/nophoto.png";
import { Container, Card, Row, Col, Button } from "react-bootstrap";
import { Image_Url } from "../../../Config/Config";
import StudentEditProfileForm from "./StudentEditProfileForm";
import {
  getEnrolledCourses,
  getStudentProfile,
} from "../AxiosConfigStudents/AxiosConfig";
import { Link } from "react-router-dom";
import {  ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const StudentProfileForm = () => {
  const studentInfo = localStorage.getItem("studentData");
  const info = JSON.parse(studentInfo);


  const [student, setStudent] = useState([]);
  const [showEdit, setShowEdit] = useState(false);

  const [allCourseList, setAllCourseList] = useState([]);

  useEffect(() => {
    const getProfileData = async (id) => {
      try {
        const response = await getStudentProfile(id);

        setStudent(response.data.studentDetails);
     
        
      } catch (error) {
        console.log({ error });
      }
    };
    getProfileData(info._id);
  }, [showEdit]);

  useEffect(() => {
    const enrolledCourses = async (id) => {
      try {
        const response = await getEnrolledCourses(id);
        setAllCourseList(response.data.enrolledCourses);
      } catch (error) {
        console.error(error);
      }
    };

    enrolledCourses(info?._id);
  }, []);

  const handleEditStudentProfile = async () => {
    setShowEdit(true);
  };

  const handleClose = async () => {
    
    setShowEdit(false);
  };
  console.log(student?.photo );

  
  return (
   <Container className="bodyContainer">
    <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
    {!showEdit ? (
      <>
    
    <div className="col-lg-12">
    
            <div className="row mt-3">
            <div className="col-md-3">
              {student?.photo &&student?.photo !=="No Pic"  ? (
               
                <img
                  style={{ width: "200px" }}
                  src={`${Image_Url}/${student?.photo}`}
                  alt="profile"
                  className="rounded-circle"
                />
                
              ) : (
                <img
                  style={{ width: "200px" }}
                  src={pic}
                  className="rounded-circle"
                  alt="default"
                />
              )}
            </div>

                
                <div className="col-lg-6">
                
                    <p style={{color:"#5B5B5B",fontFamily:"Open Sans sans-serif",color:'white'}}>
                    <h4>Name : {student?.name}</h4>
                    <h4>Gender : {student?.gender}</h4>
                    <h4>Age : {student?.age}</h4>
                    <h4>Country : {student?.country}</h4>
                    <h4>Phone : {student?.phone}</h4>
                    <h4>Email : {student?.email}</h4>
                    </p>
                    
                </div>
                <div className="col-lg-2">
                <Button onClick={handleEditStudentProfile} >Update Profile</Button>
                </div>
                
            </div>
       
            
        </div>
        {allCourseList.length !== 0 ? (
  <>
    <h4 style={{ fontFamily: "Vollkorn serif", color: 'white', fontStyle: 'bolder',textDecoration:'underline' }} className="m-3">Enrolled Courses</h4>

    <div className="row">
      {allCourseList.map((course) => (
        <div key={course?._id} className="col-md-6 mt-3">
          <Link to={`/studentcoursedetails/${course?._id}`} style={{ textDecoration: 'none', display: 'block' }}>
            <div className="row">
              <div className="col-md-3 mt-4">
                <img
                  className="bg-white mt-2"
                  src={`${Image_Url}/${course?.photo}`}
                  style={{ width: '8rem', height: '7rem' }}
                  alt=""
                />
              </div>
              <div className="col-md-3 mt-5">
                <h5 style={{ fontFamily: "Vollkorn serif", color: 'white' }}>Course: {course?.title}</h5>
                <h5 style={{ fontFamily: "Vollkorn serif", color: 'white' }}>By {course?.instructor?.name}</h5>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  </>
) 
:(
          <h2 style={{ color: "red", fontStyle: "italic" ,marginTop:"5rem"}}>
                      Sorry, no enrolled courses available!          </h2>
        )}
        
     
      </>
      
    ):(
      <StudentEditProfileForm onClose={handleClose} student={student}/>
    )}
   </Container>
    
  );
};

export default StudentProfileForm;


 // <Container>
    //   <ToastContainer position="top-center" autoClose={3000}></ToastContainer>
    //   {!showEdit ? (
    //     <Row className="bodyContainer">
    //       <div className="col-lg-12 col-md-12">
    //         <p className="allcourses-header mt-3">Profile Details</p>
    //         <div className="profileContainer">
    //           <div className="profile-pic-area">
    //             {student?.photo !== "No Pic" ? (
    //               <img
    //                 style={{ width: "200px" }}
    //                 src={`${Image_Url}/${student?.photo}`}
    //                 alt="profile"
    //                 className="rounded-circle"
    //               />
    //             ) : (
    //               <img style={{ width: "200px" }} src={pic} className="rounded-circle" />
    //             )}

    //             <h4>{student?.name}</h4>
    //           </div>
    //           <Button style={{ float: "right" }} onClick={handleEditStudentProfile}>
    //             Edit Profile
    //           </Button>

    //           <div className="profile-info-area">
    //             <table>
    //               <tbody>
    //                 <tr>
    //                   <th>Gender : </th>
    //                   <td>{student?.gender}</td>
    //                 </tr>
    //                 <tr>
    //                   <th>Age:</th>
    //                   <td>{student?.age}</td>
    //                 </tr>
    //                 <tr>
    //                   <th>Country:</th>
    //                   <td>{student?.country}</td>
    //                 </tr>

    //                 <tr>
    //                   <th>Phone Number:</th>
    //                   <td>{student?.phone}</td>
    //                 </tr>
    //                 <tr>
    //                   <th>Email:</th>
    //                   <td>{student?.email}</td>
    //                 </tr>
    //               </tbody>
    //             </table>
    //           </div>
    //         </div>

    //         {allCourseList.length !== 0 ? (
    //           <>
    //             <p className="allcourses-header">Enrolled Courses</p>
    //             {allCourseList.map((course) => (
    //               <Link to={`/studentcoursedetails/${course?._id}`} style={{ textDecoration: 'none' }} key={course?._id}>
    //                 <div className="col-12 col-md-4">
    //                   <Card style={{ width: "100%" }} className="mt-4 justify-content-center align-items-center">
    //                     <Card.Img style={{ height: "10rem" }} variant="top" src={`${Image_Url}/${course?.photo}`} />
    //                     <Card.Body>
    //                       <Card.Title>Course: {course?.title}</Card.Title>
    //                       <Card.Text className="text-center">By {course?.instructor?.name}</Card.Text>
    //                     </Card.Body>
    //                   </Card>
    //                 </div>
    //               </Link>
    //             ))}
    //           </>
    //         ) : (
    //           <h2 style={{ color: "red", fontStyle: "italic" }}>
    //             Sorry, no enrolled courses available!
    //           </h2>
    //         )}
    //       </div>
    //     </Row>
    //   ) : (
    //     <StudentEditProfileForm student={info} onClose={handleClose} />
    //   )}
    // </Container>