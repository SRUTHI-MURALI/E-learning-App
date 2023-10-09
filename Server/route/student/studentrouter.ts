import express from "express";

const studentrouter = express.Router();

import {
  sendOtp,
  signUp,
  login,
  googleLogin,
  courseDetails,
  resetPassword,
  resetPasswordSentOtp,
  getAllTutors,
  getTutorDetails,
  getEnrolledCourses,
  getQuiz,
  getStudentProfile,
  studentEditedProfile,
  getCourseList,
} from "../../controller/student/studentController";
import { studentLoggedin } from "../../middlewares/studentMiddlewares";

//student logging

studentrouter.post("/sendotp", sendOtp);
studentrouter.post("/verifyotp", signUp);
studentrouter.post("/login", login);
studentrouter.post("/googlelogin", googleLogin);

//student course management
studentrouter.get("/getspecificcoursedetails/:id", courseDetails);

//student password reset
studentrouter.post("/resetpasswordsentotp", resetPasswordSentOtp);
studentrouter.put("/resetpassword", resetPassword);

//student tutor management
studentrouter.get("/getalltutors", getAllTutors);
studentrouter.get("/gettutordetails/:id", getTutorDetails);

//student course management
studentrouter.get("/getenrolledcourses/:id", getEnrolledCourses);
studentrouter.get("/getallcourses", getCourseList);
studentrouter.get("/getquiz/:id", studentLoggedin, getQuiz);

//student profile
studentrouter.get("/getstudentprofile/:id", getStudentProfile);
studentrouter.put(
  "/studenteditedprofile/:id",
  studentLoggedin,
  studentEditedProfile
);

export default studentrouter;
