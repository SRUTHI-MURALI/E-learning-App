
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'


//Student imports
import StudentHome from './Pages/StudentPages/StudentHome'
import StudentRegister from './Pages/StudentPages/StudentRegister'
import StudentLogin from './Pages/StudentPages/StudentLogin'
import StudentLandingPage from './Pages/StudentPages/StudentLandingPage'
import StudentCourseList from './Pages/StudentPages/StudentCourseList'


//Tutor imports
import TutorRegister from './Pages/TutorPages/TutorRegister'
import TutorLogin from './Pages/TutorPages/TutorLogin'
import TutorHome from './Pages/TutorPages/TutorHome'
import TutorAddCourse from './Pages/TutorPages/TutorAddCourse'
import CourseList from './Pages/TutorPages/CourseList'



//Admin imports
import AdminLogin from './Pages/AdminPages/AdminLogin'
import AdminHome from './Pages/AdminPages/AdminHome'
import StudentList from './Pages/AdminPages/StudentList'
import InstructorList from './Pages/AdminPages/InstructorList'
import CourseCategoryList from './Pages/AdminPages/CourseCategoryList'
import AddCategory from './Components/AdminSIde/CourseCategory/AddCategory'
import CoursesList from './Pages/AdminPages/CoursesList'


//Verify Otp import
import StudentVerifyOtp from './Pages/Otp/StudentVerifyOtp'
import TutorVerifyOtp from './Pages/Otp/TutorVerifyOtp'



// forgot password import
import ForgotPassword from './Pages/ForgotPassword/ForgotPassword'



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
        <Route path="/studentallcourselist" element={<StudentCourseList/>} />

   {/* tutor Routes */}

        <Route path="/tutorregister" element={<TutorRegister />} />
        <Route path="/tutorlogin" element={<TutorLogin />} />
        <Route path="/tutorhome" element={<TutorHome />} />
        <Route path="/addcourse" element={<TutorAddCourse/>} />
        <Route path="/tutorallcourses" element={<CourseList/>} />



  {/* admin Routes */}


        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/studentsList" element={<StudentList />} />
        <Route path="/instructorsList" element={<InstructorList/>} />
        <Route path="/courseCategoryList" element={<CourseCategoryList/>} />
        <Route path="/addCategory" element={<AddCategory onClose={undefined}/>} />
        <Route path="/allCoursesList" element={<CoursesList/>} />

  {/* otp */}


        <Route path="/studentverifyOtp" element={<StudentVerifyOtp/>} />
        <Route path="/tutorverifyOtp" element={<TutorVerifyOtp/>} />


  {/* forgot password      */}

        <Route path="/forgotpassword" element={<ForgotPassword/>} />
       
      </Routes>
    </Router>
    </>
  )
}

export default App
