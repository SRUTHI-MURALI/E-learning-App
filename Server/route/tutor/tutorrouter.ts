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
  editProfilePhoto,
  removeQuiz,
  activateQuiz,
  verifyOtp
} from "../../controller/tutor/tutorController";
import { tutorLoggedin } from "../../middlewares/tutorMiddlewares";

const tutorRouter = express.Router();

// tutor logging

tutorRouter.post("/sendotp", sendOtp);
tutorRouter.post("/verifyotp", signUp);
tutorRouter.post("/login", login);

// tutor resetpassword
tutorRouter.post("/resetpasswordsentotp", resetPasswordSentOtp);
tutorRouter.post("/verifyforgotpasswordotp",verifyOtp)
tutorRouter.put("/resetpassword", resetPassword);

//tutor category management
tutorRouter.get("/getCourseCategory", tutorLoggedin, getCategory);

//tutor course management
tutorRouter.post("/addcourse", tutorLoggedin, addCourse);
tutorRouter.get("/getallcourses", tutorLoggedin, getCourseList);
tutorRouter.get("/geteditcourse/:id", tutorLoggedin, getEditCourseList);
tutorRouter.put("/editcourselist/:id", tutorLoggedin, editCourseList);

//tutor lesson management
tutorRouter.post("/addlessons", tutorLoggedin, addLesson);
tutorRouter.get("/getalllessons/:id", tutorLoggedin, getAllLessons);
tutorRouter.put("/activatelesson/:id", tutorLoggedin, activateLesson);
tutorRouter.put("/disablelesson/:id", tutorLoggedin, disableLesson);

//tutor student management
tutorRouter.get("/getenrolledstudentlist/:id", tutorLoggedin, enrolledStudents);

//tutor quiz management
tutorRouter.post("/addquiz", tutorLoggedin, AddQuiz);
tutorRouter.put("/removequiz/:id",tutorLoggedin,removeQuiz)
tutorRouter.put("/activatequiz/:id",tutorLoggedin,activateQuiz)

//tutor profile managemnet
tutorRouter.get("/gettutorprofile/:id", tutorLoggedin, tutorProfile);
tutorRouter.put("/tutoreditedprofile/:id", tutorLoggedin, tutorEditedProfile);
tutorRouter.put("/editprofilephoto/:id", tutorLoggedin, editProfilePhoto);

export default tutorRouter;
