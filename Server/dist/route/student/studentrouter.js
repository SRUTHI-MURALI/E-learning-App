"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const studentrouter = express_1.default.Router();
const studentController_1 = require("../../controller/student/studentController");
const studentMiddlewares_1 = require("../../middlewares/studentMiddlewares");
//student logging
studentrouter.post("/sendotp", studentController_1.sendOtp);
studentrouter.post("/verifyotp", studentController_1.signUp);
studentrouter.post("/login", studentController_1.login);
studentrouter.post("/googlelogin", studentController_1.googleLogin);
//student course management
studentrouter.get("/getspecificcoursedetails/:id", studentController_1.courseDetails);
//student password reset
studentrouter.post("/resetpasswordsentotp", studentController_1.resetPasswordSentOtp);
studentrouter.post("/verifyforgotpasswordotp", studentController_1.verifyOtp);
studentrouter.put("/resetpassword", studentController_1.resetPassword);
//student tutor management
studentrouter.get("/getalltutors", studentController_1.getAllTutors);
studentrouter.get("/gettutordetails/:id", studentController_1.getTutorDetails);
//student course management
studentrouter.get("/getenrolledcourses/:id", studentMiddlewares_1.studentLoggedin, studentController_1.getEnrolledCourses);
studentrouter.get("/getallcourses", studentController_1.getCourseList);
studentrouter.get("/getquiz/:id", studentController_1.getQuiz);
//student profile
studentrouter.get("/getstudentprofile/:id", studentMiddlewares_1.studentLoggedin, studentController_1.getStudentProfile);
studentrouter.put("/studenteditedprofile/:id", studentMiddlewares_1.studentLoggedin, studentController_1.studentEditedProfile);
//student Chats
studentrouter.post("/sendmsg", studentMiddlewares_1.studentLoggedin, studentController_1.sendMsg);
studentrouter.post("/receivemsg", studentMiddlewares_1.studentLoggedin, studentController_1.receivemsg);
//student search
studentrouter.post("/searchitem", studentController_1.getSearchData);
//student sort
studentrouter.post("/sortitem", studentController_1.getSortData);
exports.default = studentrouter;
