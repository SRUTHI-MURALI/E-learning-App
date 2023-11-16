"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const tutorController_1 = require("../../controller/tutor/tutorController");
const tutorMiddlewares_1 = require("../../middlewares/tutorMiddlewares");
const tutorRouter = express_1.default.Router();
// tutor logging
tutorRouter.post("/sendotp", tutorController_1.sendOtp);
tutorRouter.post("/verifyotp", tutorController_1.signUp);
tutorRouter.post("/login", tutorController_1.login);
// tutor resetpassword
tutorRouter.post("/resetpasswordsentotp", tutorController_1.resetPasswordSentOtp);
tutorRouter.post("/verifyforgotpasswordotp", tutorController_1.verifyOtp);
tutorRouter.put("/resetpassword", tutorController_1.resetPassword);
//tutor category management
tutorRouter.get("/getCourseCategory", tutorMiddlewares_1.tutorLoggedin, tutorController_1.getCategory);
//tutor course management
tutorRouter.post("/addcourse", tutorMiddlewares_1.tutorLoggedin, tutorController_1.addCourse);
tutorRouter.get("/getallcourses", tutorMiddlewares_1.tutorLoggedin, tutorController_1.getCourseList);
tutorRouter.get("/geteditcourse/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.getEditCourseList);
tutorRouter.put("/editcourselist/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.editCourseList);
//tutor lesson management
tutorRouter.post("/addlessons", tutorMiddlewares_1.tutorLoggedin, tutorController_1.addLesson);
tutorRouter.get("/getalllessons/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.getAllLessons);
tutorRouter.put("/activatelesson/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.activateLesson);
tutorRouter.put("/disablelesson/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.disableLesson);
//tutor student management
tutorRouter.get("/getenrolledstudentlist/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.enrolledStudents);
//tutor quiz management
tutorRouter.post("/addquiz", tutorMiddlewares_1.tutorLoggedin, tutorController_1.AddQuiz);
tutorRouter.put("/removequiz/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.removeQuiz);
tutorRouter.put("/activatequiz/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.activateQuiz);
//tutor profile managemnet
tutorRouter.get("/gettutorprofile/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.tutorProfile);
tutorRouter.put("/tutoreditedprofile/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.tutorEditedProfile);
tutorRouter.put("/editprofilephoto/:id", tutorMiddlewares_1.tutorLoggedin, tutorController_1.editProfilePhoto);
exports.default = tutorRouter;
