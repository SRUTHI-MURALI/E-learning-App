import express from "express";

const adminrouter = express.Router();

import {
  login,
  getStudentsList,
  getInstructorList,
  blockStudent,
  unBlockStudent,
  getCategoryList,
  addCategory,
  getCourseList,
  approveCourse,
  cancelCourse,
  blockTutor,
  unBlockTutor,
  activateCategory,
  inActivateCategory,
  editCategory,
  getEditCategoryList,
  getAllLessons,
  getOrderHistory,
  getDashboardData,
  
} from "../../controller/admin/adminController";
import { adminLoggedin } from "../../middlewares/adminMiddlewares";

adminrouter.post("/login", login);

// student management
adminrouter.get("/getstudentlist", adminLoggedin, getStudentsList);
adminrouter.put("/blockstudent/:id", blockStudent);
adminrouter.put("/unblockstudent/:id", unBlockStudent);
adminrouter.get("/getstudentcount", adminLoggedin, getDashboardData);

//Instructor management
adminrouter.get("/getinstructorlist", adminLoggedin, getInstructorList);
adminrouter.put("/blockinstructor/:id", adminLoggedin, blockTutor);
adminrouter.put("/unblockinstructor/:id", adminLoggedin, unBlockTutor);

//Category management
adminrouter.get("/getcategorylist", adminLoggedin, getCategoryList);
adminrouter.post("/addcategory", adminLoggedin, addCategory);
adminrouter.put("/activatecategory/:id", adminLoggedin, activateCategory);
adminrouter.put("/inactivatecategory/:id", adminLoggedin, inActivateCategory);
adminrouter.get("/geteditcategorylist/:id", adminLoggedin, getEditCategoryList);
adminrouter.put("/editcategory/:id", adminLoggedin, editCategory);

//Course management
adminrouter.get("/getallcourses", adminLoggedin, getCourseList);
adminrouter.put("/approvecourse/:id", adminLoggedin, approveCourse);
adminrouter.put("/cancelcourse/:id", adminLoggedin, cancelCourse);

// Lessons Management
adminrouter.get("/getalllessons/:id", adminLoggedin, getAllLessons);

// order Management
adminrouter.get("/getorderlist", adminLoggedin, getOrderHistory);


export default adminrouter;
