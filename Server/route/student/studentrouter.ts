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
  sendMsg,
  receivemsg,
  getSearchData
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
studentrouter.get("/getenrolledcourses/:id",studentLoggedin, getEnrolledCourses);
studentrouter.get("/getallcourses", getCourseList);
studentrouter.get("/getquiz/:id", getQuiz);

//student profile
studentrouter.get("/getstudentprofile/:id",studentLoggedin, getStudentProfile);
studentrouter.put(
  "/studenteditedprofile/:id",
  studentLoggedin,
  studentEditedProfile
);

//student Chats
studentrouter.post("/sendmsg",studentLoggedin,sendMsg)
studentrouter.post("/receivemsg",studentLoggedin,receivemsg)

//student search
studentrouter.post("/searchitem",getSearchData)


export default studentrouter;
