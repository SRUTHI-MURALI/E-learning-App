
import './App.css'
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'

//Student imports
import StudentHome from './Pages/StudentPages/StudentHome'
import StudentRegister from './Pages/StudentPages/StudentRegister'
import StudentLogin from './Pages/StudentPages/StudentLogin'
import StudentLandingPage from './Pages/StudentPages/StudentLandingPage'

//Tutor imports
import TutorRegister from './Pages/TutorPages/TutorRegister'
import TutorLogin from './Pages/TutorPages/TutorLogin'
import TutorHome from './Pages/TutorPages/TutorHome'
import TutorCreateCourse from './Pages/TutorPages/TutorCreateCourse'


//Admin imports
import AdminLogin from './Pages/AdminPages/AdminLogin'
import AdminHome from './Pages/AdminPages/AdminHome'
import StudentList from './Pages/AdminPages/StudentList'
import InstructorList from './Pages/AdminPages/InstructorList'




function App() {
  

  return (
    <>
      <Router>
      <Routes>
        <Route path="/" element={<StudentHome />} />

  // student Routes

        <Route path="/studentregister" element={<StudentRegister />} />
        <Route path="/studentlogin" element={<StudentLogin />} />
        <Route path="/studentlandingpage" element={<StudentLandingPage />} />

  // tutor Routes

        <Route path="/tutorregister" element={<TutorRegister />} />
        <Route path="/tutorlogin" element={<TutorLogin />} />
        <Route path="/tutorhome" element={<TutorHome />} />
        <Route path="/tutorcreatecourse" element={<TutorCreateCourse />} />


  //admin Routes


        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/studentsList" element={<StudentList />} />
        <Route path="/instructorsList" element={<InstructorList/>} />
       
      </Routes>
    </Router>
    </>
  )
}

export default App
