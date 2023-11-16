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
exports.verifyOtp = exports.activateQuiz = exports.removeQuiz = exports.editProfilePhoto = exports.resetPassword = exports.resetPasswordSentOtp = exports.tutorEditedProfile = exports.tutorProfile = exports.enrolledStudents = exports.getAllLessons = exports.editCourseList = exports.getEditCourseList = exports.getCourseList = exports.disableLesson = exports.activateLesson = exports.AddQuiz = exports.addLesson = exports.addCourse = exports.getCategory = exports.login = exports.signUp = exports.sendOtp = void 0;
const axios_1 = __importDefault(require("axios"));
const generateToken_1 = __importDefault(require("../../token/generateToken"));
const tutor_1 = __importDefault(require("../../model/tutor"));
const courseCategory_1 = __importDefault(require("../../model/courseCategory"));
const courses_1 = __importDefault(require("../../model/courses"));
const orders_1 = __importDefault(require("../../model/orders"));
const courseQuiz_1 = __importDefault(require("../../model/courseQuiz"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const BaseUrl = process.env.BaseUrl || "";
const globalData = {
    otp: null,
    tutor: null, // Define a type for user
};
let mailid;
const sendOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, email, password, phone } = req.body;
        const emailfind = yield tutor_1.default.findOne({ email });
        if (emailfind) {
            res.status(400).json({ error: "Instructor already exists" });
        }
        else {
            yield axios_1.default.post(`${BaseUrl}/otp/sendmobileotp`, { email: email });
            res.status(200).json({ message: "OTP sent successfully" });
            const newTutor = {
                name,
                email,
                password,
                phone,
            };
            globalData.tutor = newTutor;
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendOtp = sendOtp;
const verifyOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, verificationCode } = req.body;
        console.log(email, verificationCode, 'hjgkgg');
        if (!verificationCode) {
            return res.status(400).json({ error: "Verification code is required" });
        }
        if (email == mailid) {
            const otpResponse = yield axios_1.default.post(`${BaseUrl}/otp/verifymobileotp`, {
                verificationCode,
            });
            if (otpResponse.status !== 200) {
                // Handle OTP verification failure
                return res.status(400).json({ message: "OTP verification failed" });
            }
            else {
                return res.status(200).json({ message: "OTP verified successfully" });
            }
        }
    }
    catch (error) {
        console.error("Error in resetting password:", error);
        return res.status(500).json(error);
    }
});
exports.verifyOtp = verifyOtp;
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { email, verificationCode } = req.body;
        if (!verificationCode) {
            return res.status(400).json({ error: "Verification code is required" });
        }
        if (email === ((_a = globalData.tutor) === null || _a === void 0 ? void 0 : _a.email)) {
            const otpResponse = yield axios_1.default.post(`${BaseUrl}/otp/verifymobileotp`, {
                verificationCode,
            });
            if (otpResponse.status !== 200) {
                // Handle OTP verification failure
                return res.status(400).json({ message: "OTP verification failed" });
            }
            // create new tutor
            const addUser = yield tutor_1.default.create(globalData.tutor);
            const token = (0, generateToken_1.default)(addUser._id);
            return res.status(200).json({
                _id: addUser === null || addUser === void 0 ? void 0 : addUser._id,
                name: addUser === null || addUser === void 0 ? void 0 : addUser.name,
                email: addUser === null || addUser === void 0 ? void 0 : addUser.email,
                phone: addUser === null || addUser === void 0 ? void 0 : addUser.phone,
                token,
            });
        }
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.signUp = signUp;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const tutor = yield tutor_1.default.findOne({ email });
        if (tutor && (yield tutor.matchPasswords(password))) {
            if (tutor.isBlocked) {
                res.status(300).json({ message: "Blocked Tutor" });
            }
            else {
                const token = (0, generateToken_1.default)(tutor._id);
                res.status(201).json({
                    _id: tutor._id,
                    name: tutor.name,
                    email: tutor.email,
                    phone: tutor.phone,
                    token,
                });
            }
        }
        else {
            res.status(300).json({ message: "Invalid Credentials" });
        }
    }
    catch (error) {
        res.status(300).json({ message: "logging error" });
    }
});
exports.login = login;
const getCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield courseCategory_1.default.find({ isActive: true }).exec();
    if (category) {
        res.status(201).json({
            Category: category,
        });
    }
});
exports.getCategory = getCategory;
const addCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const newCourse = yield courses_1.default.create({
        title: req.body.title,
        description: req.body.description,
        category: req.body.category,
        duration: req.body.duration,
        price: req.body.price,
        photo: req.body.photo,
        instructor: req.body.instructor,
        isApproved: req.body.isApproved,
    });
    if (newCourse) {
        res.status(201).json({
            _id: newCourse._id,
            title: newCourse.title,
            description: newCourse.description,
            category: newCourse.category,
            price: newCourse.price,
            duration: newCourse.duration,
            instructor: newCourse.instructor,
            isApproved: newCourse.isApproved,
            createdAt: newCourse.createdAt,
        });
    }
});
exports.addCourse = addCourse;
const disableLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.body;
        const { id } = req.params;
        const selectedcourse = yield courses_1.default.findOne({
            _id: courseId,
            "courseLessons._id": id,
        });
        if (selectedcourse) {
            // Construct the update query to set isActive to false for the matching lesson
            yield courses_1.default.findOneAndUpdate({
                _id: courseId,
                "courseLessons._id": id,
            }, {
                $set: {
                    "courseLessons.$.isActive": false,
                },
            });
            res.status(200).json({ message: "Lesson disabled successfully" });
        }
        else {
            res.status(404).json({ message: "Course or lesson not found" });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.disableLesson = disableLesson;
const activateLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { courseId } = req.body;
        const { id } = req.params;
        const selectedcourse = yield courses_1.default.findOne({
            _id: courseId,
            "courseLessons._id": id,
        });
        if (selectedcourse) {
            // Construct the update query to set isActive to false for the matching lesson
            yield courses_1.default.findOneAndUpdate({
                _id: courseId,
                "courseLessons._id": id,
            }, {
                $set: {
                    "courseLessons.$.isActive": true,
                },
            }, { new: true });
            const allCourses = yield courses_1.default.findById({ _id: courseId });
            const allLessons = allCourses === null || allCourses === void 0 ? void 0 : allCourses.courseLessons;
            if (allLessons) {
                res.status(201).json({
                    allLessons,
                });
            }
        }
        else {
            res.status(404).json({ message: "Course or lesson not found" });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.activateLesson = activateLesson;
const addLesson = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { lessons, courseId } = req.body;
    try {
        const updatedCourse = yield courses_1.default.findOneAndUpdate({ _id: courseId }, { $push: { courseLessons: lessons } }, { new: true });
        if (updatedCourse) {
            res.status(201).json(updatedCourse);
        }
        else {
            res.status(404).json({ error: "Course not found" });
        }
    }
    catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: "Server error" });
    }
});
exports.addLesson = addLesson;
const getCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCourses = yield courses_1.default.find().populate("category instructor");
        const quizQuestions = yield courseQuiz_1.default.find();
        if (allCourses) {
            res.status(201).json({
                allCourses,
                quizQuestions,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCourseList = getCourseList;
const getEditCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const editCourse = yield courses_1.default.findById({ _id: id }).populate("category");
        const allcategories = yield courseCategory_1.default.find();
        if (editCourse) {
            res.status(201).json({
                editCourse,
                allcategories,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getEditCourseList = getEditCourseList;
const editCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, duration, price, category } = req.body;
        const { id } = req.params;
        const editedCourse = yield courses_1.default.findByIdAndUpdate(id, {
            title: title,
            duration: duration,
            price: price,
            category: category,
        }, { new: true });
        if (editedCourse) {
            res.status(201).json({
                _id: editedCourse._id,
                title: editedCourse.title,
                duration: editedCourse.duration,
                price: editedCourse.price,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.editCourseList = editCourseList;
const getAllLessons = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const allCourses = yield courses_1.default.findById({ _id: id });
        const allLessons = allCourses === null || allCourses === void 0 ? void 0 : allCourses.courseLessons;
        if (allLessons) {
            res.status(201).json({
                allLessons,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getAllLessons = getAllLessons;
const enrolledStudents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const orders = yield orders_1.default.find()
            .populate({
            path: "courseDetails",
            populate: {
                path: "instructor",
                model: "tutor",
            },
        })
            .populate("studentDetails")
            .exec();
        const filteredOrders = orders.filter((order) => {
            return order.courseDetails.instructor._id.toString() === id;
        });
        if (orders) {
            res.status(200).json({ filteredOrders });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.enrolledStudents = enrolledStudents;
const AddQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { questionset, courseId, count } = req.body;
    const existQuiz = yield courseQuiz_1.default.find({ course: courseId });
    if (existQuiz.length === 0) {
        try {
            const newQuiz = yield courseQuiz_1.default.create({
                course: courseId,
                questionset,
            });
            if (newQuiz) {
                yield courses_1.default.findByIdAndUpdate(courseId, {
                    quizQuestions: count,
                });
                res.status(201).json(newQuiz);
            }
            else {
                res.status(404).json({ error: "Course not found" });
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
    else {
        try {
            const numberOfQuestionSets = existQuiz[0].questionset.length;
            const updateQuizSet = yield courseQuiz_1.default.findOneAndUpdate({ course: courseId }, { $push: { questionset: { $each: questionset } } }, { new: true });
            if (updateQuizSet) {
                yield courses_1.default.findByIdAndUpdate(courseId, {
                    quizQuestions: numberOfQuestionSets,
                });
                res.status(201).json(updateQuizSet);
            }
            else {
                res.status(404).json({ error: "Course not found" });
            }
        }
        catch (error) {
            res.status(400).json(error);
        }
    }
});
exports.AddQuiz = AddQuiz;
const tutorProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const tutorDetails = yield tutor_1.default.findById({ _id: id });
        const allCourses = yield courses_1.default.find({ instructor: id });
        let count = 0;
        allCourses.map((course) => {
            count = count + 1;
        });
        if (tutorDetails) {
            res.status(201).json({
                tutorDetails,
                courseCount: count,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.tutorProfile = tutorProfile;
const tutorEditedProfile = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, phone, email, experience, qualification, about, startOnline, onlineEnd } = req.body;
        console.log(req.body.startOnline, 'body');
        const { id } = req.params;
        const editedTutor = yield tutor_1.default.findByIdAndUpdate(id, {
            name,
            phone,
            email,
            experience,
            qualification,
            about,
            startOnline,
            onlineEnd
        }, { new: true });
        if (editedTutor) {
            res.status(201).json({
                _id: editedTutor._id,
                name: editedTutor.name,
                phone: editedTutor.phone,
                email: editedTutor.email,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.tutorEditedProfile = tutorEditedProfile;
const editProfilePhoto = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { photo } = req.body;
        const { id } = req.params;
        const editedTutor = yield tutor_1.default.findByIdAndUpdate(id, {
            photo,
        }, { new: true });
        if (editedTutor) {
            res.status(201).json({
                _id: editedTutor._id,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.editProfilePhoto = editProfilePhoto;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const salt = yield bcrypt_1.default.genSalt(10);
        const hashedpassword = yield bcrypt_1.default.hash(password, salt);
        const tutorPassword = yield tutor_1.default.findOneAndUpdate({ email }, {
            password: hashedpassword,
        }, { new: true });
        if (tutorPassword) {
            return res.status(200).json({ message: 'Password reset successful' });
        }
    }
    catch (error) {
        return res.status(500).json({ message: 'Password reset failed' });
    }
});
exports.resetPassword = resetPassword;
const removeQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quiz = yield courseQuiz_1.default.findOneAndUpdate({ "questionset._id": id }, { $set: { "questionset.$.isActive": false } }, { new: true });
        if (quiz) {
            res.status(201).json({
                _id: quiz._id,
            });
        }
        else {
            res.status(404).json({ error: "Quiz not found" });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.removeQuiz = removeQuiz;
const activateQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const quiz = yield courseQuiz_1.default.findOneAndUpdate({ "questionset._id": id }, { $set: { "questionset.$.isActive": true } }, { new: true });
        if (quiz) {
            res.status(201).json({
                _id: quiz._id,
            });
        }
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.activateQuiz = activateQuiz;
const resetPasswordSentOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const emailfind = yield tutor_1.default.findOne({ email });
        mailid = emailfind === null || emailfind === void 0 ? void 0 : emailfind.email;
        if (emailfind != null) {
            yield axios_1.default.post(`${BaseUrl}/otp/sendmobileotp`, {
                email: emailfind === null || emailfind === void 0 ? void 0 : emailfind.email,
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
