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
  getCourseList
} from "../../controller/student/studentController";

studentrouter.post("/sendotp", sendOtp);
studentrouter.post("/verifyotp", signUp);
studentrouter.post("/login", login);
studentrouter.post("/googlelogin", googleLogin);
studentrouter.get("/getspecificcoursedetails/:id", courseDetails);
studentrouter.post("/resetpasswordsentotp", resetPasswordSentOtp);
studentrouter.put("/resetpassword", resetPassword);
studentrouter.get("/getalltutors", getAllTutors);
studentrouter.get("/gettutordetails/:id", getTutorDetails);
studentrouter.get("/getenrolledcourses/:id", getEnrolledCourses);
studentrouter.get("/getstudentprofile/:id", getStudentProfile);
studentrouter.get("/getquiz/:id", getQuiz);
studentrouter.put("/studenteditedprofile/:id",studentEditedProfile)
studentrouter.get("/getallcourses", getCourseList);

export default studentrouter;
