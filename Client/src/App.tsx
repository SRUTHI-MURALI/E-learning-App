import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

//Student imports
import StudentHome from "./Pages/StudentPages/StudentHome";
import StudentRegister from "./Pages/StudentPages/StudentRegister";
import StudentLogin from "./Pages/StudentPages/StudentLogin";
import StudentLandingPage from "./Pages/StudentPages/StudentLandingPage";
import StudentCourseList from "./Pages/StudentPages/StudentCourseList";
import StudentCourseDetails from "./Pages/StudentPages/StudentCourseDetails";

//Tutor imports
import TutorRegister from "./Pages/TutorPages/TutorRegister";
import TutorLogin from "./Pages/TutorPages/TutorLogin";
import TutorHome from "./Pages/TutorPages/TutorHome";
import TutorAddCourse from "./Pages/TutorPages/TutorAddCourse";
import CourseList from "./Pages/TutorPages/CourseList";
import TutorStudentList from "./Pages/TutorPages/TutorStudentList";
import TutorLessonList from "./Pages/TutorPages/TutorLessonList";

//Admin imports
import AdminLogin from "./Pages/AdminPages/AdminLogin";
import AdminHome from "./Pages/AdminPages/AdminHome";
import StudentList from "./Pages/AdminPages/StudentList";
import InstructorList from "./Pages/AdminPages/InstructorList";
import CourseCategoryList from "./Pages/AdminPages/CourseCategoryList";
import AddCategory from "./Components/AdminSIde/CourseCategory/AddCategory";
import CoursesList from "./Pages/AdminPages/CoursesList";
import AdminLessonList from "./Pages/AdminPages/AdminLessonList";

//Verify Otp import
import StudentVerifyOtp from "./Pages/Otp/StudentVerifyOtp";
import TutorVerifyOtp from "./Pages/Otp/TutorVerifyOtp";

// forgot password import
import ForgotPassword from "./Pages/ForgotPassword/ForgotPassword";
import AdminOrderList from "./Pages/AdminPages/AdminOrderList";
import StudentQuizPage from "./Pages/StudentPages/StudentQuizPage";

import TutorQuizList from "./Pages/TutorPages/TutorQuizList";
import TutorProfile from "./Pages/TutorPages/TutorProfile";
import TutorDetailsPage from "./Pages/StudentPages/TutorDetailsPage";
import StudentProfile from "./Pages/StudentPages/StudentProfile";
import TutorForgotPassword from "./Components/ForgotPassword/TutorForgotPassword";
import Room from "./Pages/room";
import StudentMentors from "./Pages/StudentPages/StudentMentors";
import StudentCoureseView from "./Pages/StudentPages/StudentCoureseView";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<StudentHome />} />

          {/* student Routes */}

          <Route path="/studentregister" element={<StudentRegister />} />
          <Route path="/studentlogin" element={<StudentLogin />} />
          <Route path="/studentlandingpage" element={<StudentLandingPage />} />
          <Route path="/studentallcourselist" element={<StudentCourseList />} />
          <Route
            path="/studentcoursedetails/:id"
            element={<StudentCourseDetails />}  
          />
          <Route
            path="/studentviewcourse/:id"
            element={<StudentCoureseView />}  
          />
          <Route path="/studentquizpage" element={<StudentQuizPage />} />
          <Route path="/tutordetails/:id" element={<TutorDetailsPage />} />
          <Route path="/studentprofile" element={<StudentProfile />} />
          <Route path="/mentoring" element={<StudentMentors/>}/>
          

          {/* tutor Routes */}

          <Route path="/tutorregister" element={<TutorRegister />} />
          <Route path="/tutorlogin" element={<TutorLogin />} />
          <Route path="/tutorhome" element={<TutorHome />} />
          <Route path="/addcourse" element={<TutorAddCourse />} />
          <Route path="/tutorallcourses" element={<CourseList />} />
          <Route path="/tutorstudentslist" element={<TutorStudentList />} />
          <Route path="/tutorlessonslist/:id" element={<TutorLessonList />} />
          <Route path="/tutorquizlist" element={<TutorQuizList />} />
          <Route path="/tutorprofile" element={<TutorProfile />} />

          {/* admin Routes */}

          <Route path="/adminlogin" element={<AdminLogin />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/studentsList" element={<StudentList />} />
          <Route path="/instructorsList" element={<InstructorList />} />
          <Route path="/courseCategoryList" element={<CourseCategoryList />} />
          <Route
            path="/addCategory"
            element={<AddCategory onClose={undefined} />}
          />
          <Route path="/allCoursesList" element={<CoursesList />} />
          <Route path="/adminlessonslist/:id" element={<AdminLessonList />} />
          <Route path="/orderhistory" element={<AdminOrderList />} />

          {/* otp */}

          <Route
            path="/studentverifyOtp/:phone"
            element={<StudentVerifyOtp />}
          />
          <Route path="/tutorverifyOtp" element={<TutorVerifyOtp />} />

          {/* forgot password  */}

          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/tutorforgotpassword" element={<TutorForgotPassword/>} />

          <Route path="/room" element={<Room/>} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
