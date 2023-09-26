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
} from "../../controller/tutor/tutorController";

const tutorRouter = express.Router();

tutorRouter.post("/sendotp", sendOtp);
tutorRouter.post("/verifyotp", signUp);
tutorRouter.post("/login", login);
tutorRouter.get("/getCourseCategory", getCategory);
tutorRouter.post("/addcourse", addCourse);
tutorRouter.post("/addlessons", addLesson);
tutorRouter.get("/getallcourses", getCourseList);
tutorRouter.get("/geteditcourse/:id", getEditCourseList);
tutorRouter.put("/editcourselist/:id", editCourseList);
tutorRouter.get("/getalllessons/:id", getAllLessons);
tutorRouter.get("/getenrolledstudentlist/:id", enrolledStudents);
tutorRouter.post("/addquiz", AddQuiz);
tutorRouter.put("/activatelesson/:id", activateLesson);
tutorRouter.put("/disablelesson/:id", disableLesson);
tutorRouter.put("/disablelesson/:id", disableLesson);
tutorRouter.get("/gettutorprofile/:id", tutorProfile);
tutorRouter.put("/tutoreditedprofile/:id", tutorEditedProfile);

export default tutorRouter;
