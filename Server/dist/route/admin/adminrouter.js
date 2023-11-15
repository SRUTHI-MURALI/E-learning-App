"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const adminrouter = express_1.default.Router();
const adminController_1 = require("../../controller/admin/adminController");
const adminMiddlewares_1 = require("../../middlewares/adminMiddlewares");
adminrouter.post("/login", adminController_1.login);
// student management
adminrouter.get("/getstudentlist", adminMiddlewares_1.adminLoggedin, adminController_1.getStudentsList);
adminrouter.put("/blockstudent/:id", adminController_1.blockStudent);
adminrouter.put("/unblockstudent/:id", adminController_1.unBlockStudent);
adminrouter.get("/getstudentcount", adminMiddlewares_1.adminLoggedin, adminController_1.getDashboardData);
//Instructor management
adminrouter.get("/getinstructorlist", adminMiddlewares_1.adminLoggedin, adminController_1.getInstructorList);
adminrouter.put("/blockinstructor/:id", adminMiddlewares_1.adminLoggedin, adminController_1.blockTutor);
adminrouter.put("/unblockinstructor/:id", adminMiddlewares_1.adminLoggedin, adminController_1.unBlockTutor);
//Category management
adminrouter.get("/getcategorylist", adminMiddlewares_1.adminLoggedin, adminController_1.getCategoryList);
adminrouter.post("/addcategory", adminMiddlewares_1.adminLoggedin, adminController_1.addCategory);
adminrouter.put("/activatecategory/:id", adminMiddlewares_1.adminLoggedin, adminController_1.activateCategory);
adminrouter.put("/inactivatecategory/:id", adminMiddlewares_1.adminLoggedin, adminController_1.inActivateCategory);
adminrouter.get("/geteditcategorylist/:id", adminMiddlewares_1.adminLoggedin, adminController_1.getEditCategoryList);
adminrouter.put("/editcategory/:id", adminMiddlewares_1.adminLoggedin, adminController_1.editCategory);
//Course management
adminrouter.get("/getallcourses", adminMiddlewares_1.adminLoggedin, adminController_1.getCourseList);
adminrouter.put("/approvecourse/:id", adminMiddlewares_1.adminLoggedin, adminController_1.approveCourse);
adminrouter.put("/cancelcourse/:id", adminMiddlewares_1.adminLoggedin, adminController_1.cancelCourse);
// Lessons Management
adminrouter.get("/getalllessons/:id", adminMiddlewares_1.adminLoggedin, adminController_1.getAllLessons);
// order Management
adminrouter.get("/getorderlist", adminMiddlewares_1.adminLoggedin, adminController_1.getOrderHistory);
exports.default = adminrouter;
