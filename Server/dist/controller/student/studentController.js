"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSortData = exports.getSearchData = exports.receivemsg = exports.sendMsg = exports.getCourseList = exports.studentEditedProfile = exports.getStudentProfile = exports.getQuiz = exports.getEnrolledCourses = exports.getTutorDetails = exports.getAllTutors = exports.resetPasswordSentOtp = exports.resetPassword = exports.courseDetails = exports.googleLogin = exports.login = exports.signUp = exports.sendOtp = void 0;
const generateToken_1 = __importDefault(require("../../token/generateToken"));
const student_1 = __importDefault(require("../../model/student"));
const courses_1 = __importDefault(require("../../model/courses"));
const tutor_1 = __importDefault(require("../../model/tutor"));
const courseQuiz_1 = __importDefault(require("../../model/courseQuiz"));
const axios_1 = __importDefault(require("axios"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
require("dotenv/config");
const bcrypt_1 = __importDefault(require("bcrypt"));
const chats_1 = __importDefault(require("../../model/chats"));
const BaseUrl = process.env.BaseUrl || "";
const globalData = {
    otp: null,
    student: null, // Define a type for user
};
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone } = req.body;
        const emailfind = yield student_1.default.findOne({ email });
        const phonefind = yield student_1.default.findOne({ phone });
        if (emailfind || phonefind) {
            res.status(400).json({ error: "Student already exists" });
        }
        else {
            yield axios_1.default.post(`${BaseUrl}/otp/sendmobileotp`, { phone: phone });
            res.status(200).json({ message: "OTP sent successfully" });
            const newStudent = {
                name,
                email,
                password,
                phone,
            };
            globalData.student = newStudent;
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendOtp = sendOtp;
const resetPasswordSentOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.body;
        const phonefind = yield student_1.default.findOne({ phone });
        if (phonefind != null) {
            yield axios_1.default.post(`${BaseUrl}/otp/sendmobileotp`, {
                phone: phonefind.phone,
            });
            res.status(200).json({ message: "OTP sent successfully" });
        }
        else {
            res.status(400).json({ message: "No Number Exists" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.resetPasswordSentOtp = resetPasswordSentOtp;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        // Validate and extract data from the request body
        const { verificationCode } = req.body;
        if (!verificationCode) {
            return res.status(400).json({ error: "Verification code is required" });
        }
        // Assuming you have a valid 'globalData.student' object
        const phone = (_a = globalData.student) === null || _a === void 0 ? void 0 : _a.phone;
        // Verify OTP
        const otpResponse = yield axios_1.default.post(`${BaseUrl}/otp/verifymobileotp`, {
            phone,
            verificationCode,
        });
        if (otpResponse.status !== 200) {
            // Handle OTP verification failure
            return res.status(400).json({ message: "OTP verification failed" });
        }
        // Create a new user
        const newUser = yield student_1.default.create(globalData.student);
        console.log("User created successfully:");
        // Generate a token for the user
        const token = (0, generateToken_1.default)(newUser._id);
        // Return user data and token in the response
        return res.status(200).json({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            phone: newUser.phone,
            status: newUser.isBlocked,
            token,
        });
    }
    catch (error) {
        console.error("Error in sign-up:", error);
        return res.status(500).json(error);
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body, 'log');
        const { email, password } = req.body;
        const student = yield student_1.default.findOne({ email });
        if (student && (yield student.matchPasswords(password))) {
            if (student.isBlocked) {
                res.status(300).json({ message: "Student is Blocked" });
            }
            else {
                const token = (0, generateToken_1.default)(student._id);
                res.status(201).json({
                    _id: student._id,
                    name: student.name,
                    email: student.email,
                    phone: student.phone,
                    status: student.isBlocked,
                    token,
                });
            }
        }
        else {
            res.status(300).json({ message: "Invalid Credentials" });
        }
    }
    catch (error) {
        res.status(300).json({ message: "logging Error" });
    }
});
exports.login = login;
// Import Request and Response from express package
const googleLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
   
    try {
        const { id_token } = req.body;
        // Use type assertion to tell TypeScript that you're certain it's JwtDecodedToken
        const decodedToken = jsonwebtoken_1.default.decode(id_token);
        const { name, email, jti, phone } = decodedToken;
        const emailfind = yield student_1.default.findOne({ email });
        const phonefind = yield student_1.default.findOne({ phone });
        if (emailfind || phonefind) {
            const existingStudent = emailfind || phonefind;
            const token = (0, generateToken_1.default)(existingStudent === null || existingStudent === void 0 ? void 0 : existingStudent._id);
            return res.status(200).json({
                _id: existingStudent === null || existingStudent === void 0 ? void 0 : existingStudent._id,
                name: existingStudent === null || existingStudent === void 0 ? void 0 : existingStudent.name,
                email: existingStudent === null || existingStudent === void 0 ? void 0 : existingStudent.email,
                phone: existingStudent === null || existingStudent === void 0 ? void 0 : existingStudent.phone,
                token,
            });
        }
        else {
            const addStudent = yield student_1.default.create({
                name,
                email,
                jti,
                phone,
            });
            const token = (0, generateToken_1.default)(addStudent._id);
            return res.status(200).json({
                _id: addStudent === null || addStudent === void 0 ? void 0 : addStudent._id,
                name: addStudent === null || addStudent === void 0 ? void 0 : addStudent.name,
                email: addStudent === null || addStudent === void 0 ? void 0 : addStudent.email,
                phone: addStudent === null || addStudent === void 0 ? void 0 : addStudent.phone,
                token,
            });
        }
        // Continue with your logic
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.googleLogin = googleLogin;
const courseDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const courseDetails = yield courses_1.default.findById({ _id: id }).populate("category instructor");
        if (courseDetails) {
            res.status(201).json({
                courseDetails,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.courseDetails = courseDetails;
const getCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCourses = yield courses_1.default.find({ isApproved: true }).populate("category instructor");
        const quizList = yield courseQuiz_1.default.find();
        if (allCourses) {
            res.status(201).json({
                allCourses,
                quizList
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCourseList = getCourseList;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedPassword = yield bcrypt_1.default.hash(password, salt);
        const student = yield student_1.default.findOne({ phone });
        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }
        // Update the student's password
        student.password = hashedPassword;
        const updatedStudent = yield student.save();
        if (updatedStudent) {
            return res.status(200).json({ message: 'Password reset successful' });
        }
        else {
            return res.status(500).json({ message: 'Password reset failed' });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Password reset error' });
    }
});
exports.resetPassword = resetPassword;
const getAllTutors = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tutorDetails = yield tutor_1.default.find({ isBlocked: false });
        if (tutorDetails) {
            res.status(201).json({
                tutorDetails,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getAllTutors = getAllTutors;
const getTutorDetails = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutorDetails = yield tutor_1.default.findById({ _id: id });
        const tutorCourses = yield courses_1.default.find({ instructor: id });
        if (tutorDetails) {
            res.status(201).json({
                tutorDetails,
                tutorCourses,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getTutorDetails = getTutorDetails;
const getStudentProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const studentDetails = yield student_1.default.findById({ _id: id });
        if (studentDetails) {
            res.status(201).json({
                studentDetails,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getStudentProfile = getStudentProfile;
const getEnrolledCourses = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const studentDetails = yield student_1.default.findById({ _id: id }).populate({
            path: "enrolledCourses",
            populate: {
                path: "instructor",
                model: "tutor", // Match the 'ref' value in course schema
            },
        });
        const enrolledCourses = studentDetails === null || studentDetails === void 0 ? void 0 : studentDetails.enrolledCourses;
        if (enrolledCourses) {
            res.status(201).json({
                enrolledCourses,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getEnrolledCourses = getEnrolledCourses;
const getQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const allQuiz = yield courseQuiz_1.default.find({ course: id });
        const allQuizSets = [];
        allQuiz.map((quiz) => allQuizSets.push(quiz === null || quiz === void 0 ? void 0 : quiz.questionset));
        if (allQuizSets) {
            res.status(201).json({
                allQuizSets,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getQuiz = getQuiz;
const studentEditedProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, photo, password, gender, age, country } = req.body;
        let hashedpassword;
        const { id } = req.params;
        if (password) {
            const salt = yield bcrypt_1.default.genSalt(10);
            hashedpassword = yield bcrypt_1.default.hash(password, salt);
        }
        const editedStudent = yield student_1.default.findByIdAndUpdate(id, {
            name,
            phone,
            email,
            age,
            country,
            password: hashedpassword,
            gender,
            photo,
        }, { new: true });
        if (editedStudent) {
            res.status(201).json({
                _id: editedStudent._id,
                name: editedStudent.name,
                phone: editedStudent.phone,
                email: editedStudent.email,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.studentEditedProfile = studentEditedProfile;
const sendMsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to, message } = req.body;
        const data = yield chats_1.default.create({
            message: message,
            users: [from, to],
            sender: from,
        });
        if (data)
            return res.status(201).json({ msg: "Message added successfully." });
        else
            return res.status(400).json({ msg: "Failed to add message to the database" });
    }
    catch (error) {
        console.log(error);
    }
});
exports.sendMsg = sendMsg;
const receivemsg = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { from, to } = req.body;
        const messages = yield chats_1.default.find({
            $or: [
                { users: { $all: [from, to] } },
                { users: { $all: [to, from] } },
            ],
        }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message,
            };
        });
        res.status(201).json(projectedMessages);
    }
    catch (error) {
        console.log(error);
    }
});
exports.receivemsg = receivemsg;
const getSearchData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchvalue } = req.body;
        const caseInsensitiveSearch = new RegExp(searchvalue, 'i');
        const courseData = yield courses_1.default.find({ title: caseInsensitiveSearch });
        const tutorData = yield tutor_1.default.find({ name: caseInsensitiveSearch });
        const searchData = [...courseData, ...tutorData]; // Combine the results into an array
        if (searchData.length > 0) {
            res.status(200).json({ searchData });
        }
        else {
            res.status(404).json({ message: 'No search item' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getSearchData = getSearchData;
const getSortData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { sortValue, sortOrder } = req.body;
        let courseData;
        if (sortValue === 'price') {
            const query = {
                price: { $gte: 0 },
            };
            courseData = yield courses_1.default.find(query).where({ isApproved: true }).populate("category instructor").sort({
                price: sortOrder === 'asc' ? 1 : -1
            });
        }
        else if (sortValue === 'duration') {
            const query = {
                duration: { $gte: 0 },
            };
            courseData = yield courses_1.default.find(query).where({ isApproved: true }).populate("category instructor").sort({
                duration: sortOrder === 'asc' ? 1 : -1
            });
        }
        if (courseData.length > 0) {
            res.status(200).json({ courseData });
        }
        else {
            res.status(404).json({ message: 'No search item' });
        }
    }
    catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal server error' });
    }
});
exports.getSortData = getSortData;
