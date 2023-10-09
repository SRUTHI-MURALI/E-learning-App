import express from "express";
import {
  sendOtp,
  signUp,
  login,
  getCategory,
  addCourse,
  addLesson,
  AddQuiz,
  activateLesson,
  tutorProfile,
  tutorEditedProfile,
  getCourseList,
  getEditCourseList,
  editCourseList,
  getAllLessons,
  enrolledStudents,
  disableLesson,
  resetPasswordSentOtp,
  resetPassword,
} from "../../controller/tutor/tutorController";
import { tutorLoogedin } from "../../middlewares/tutorMiddlewares";

const tutorRouter = express.Router();

// tutor logging

tutorRouter.post("/sendotp", sendOtp);
tutorRouter.post("/verifyotp", signUp);
tutorRouter.post("/login", login);

// tutor resetpassword
tutorRouter.post("/resetpasswordsentotp", resetPasswordSentOtp);
tutorRouter.put("/resetpassword", resetPassword);

//tutor category management
tutorRouter.get("/getCourseCategory", tutorLoogedin, getCategory);

//tutor course management
tutorRouter.post("/addcourse", tutorLoogedin, addCourse);
tutorRouter.get("/getallcourses", tutorLoogedin, getCourseList);
tutorRouter.get("/geteditcourse/:id", tutorLoogedin, getEditCourseList);
tutorRouter.put("/editcourselist/:id", tutorLoogedin, editCourseList);

//tutor lessosn management
tutorRouter.post("/addlessons", tutorLoogedin, addLesson);
tutorRouter.get("/getalllessons/:id", tutorLoogedin, getAllLessons);
tutorRouter.put("/activatelesson/:id", tutorLoogedin, activateLesson);
tutorRouter.put("/disablelesson/:id", tutorLoogedin, disableLesson);

//tutor student management
tutorRouter.get("/getenrolledstudentlist/:id", tutorLoogedin, enrolledStudents);

//tutor quiz management
tutorRouter.post("/addquiz", tutorLoogedin, AddQuiz);

//tutor profile managemnet
tutorRouter.get("/gettutorprofile/:id", tutorLoogedin, tutorProfile);
tutorRouter.put("/tutoreditedprofile/:id", tutorLoogedin, tutorEditedProfile);

export default tutorRouter;
