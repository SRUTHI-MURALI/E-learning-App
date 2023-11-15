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
exports.getDashboardData = exports.getAllLessons = exports.editCategory = exports.inActivateCategory = exports.getOrderHistory = exports.getEditCategoryList = exports.activateCategory = exports.unBlockTutor = exports.blockTutor = exports.cancelCourse = exports.approveCourse = exports.getCourseList = exports.addCategory = exports.getCategoryList = exports.unBlockStudent = exports.blockStudent = exports.getInstructorList = exports.getStudentsList = exports.login = void 0;
const generateToken_1 = __importDefault(require("../../token/generateToken"));
const admin_1 = __importDefault(require("../../model/admin"));
const student_1 = __importDefault(require("../../model/student"));
const tutor_1 = __importDefault(require("../../model/tutor"));
const courseCategory_1 = __importDefault(require("../../model/courseCategory"));
const courses_1 = __importDefault(require("../../model/courses"));
const orders_1 = __importDefault(require("../../model/orders"));
const emailGenerator_1 = __importDefault(require("../../EmailGenerator/emailGenerator"));
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const admin = yield admin_1.default.findOne({ email });
        if (admin && admin.password == password) {
            const token = (0, generateToken_1.default)(admin._id);
            res.status(201).json({
                _id: admin._id,
                name: admin.name,
                email: admin.email,
                token,
            });
        }
        else {
            res.status(400);
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.login = login;
const getStudentsList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const students = yield student_1.default.find({});
        if (students) {
            res.status(201).json({
                students,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getStudentsList = getStudentsList;
const getDashboardData = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    try {
        const studentCount = yield student_1.default.countDocuments({});
        const orderCount = yield orders_1.default.countDocuments({});
        const tutorCount = yield tutor_1.default.countDocuments({});
        const totalCourses = yield courses_1.default.countDocuments({});
        const orders = yield orders_1.default.find().populate("courseDetails");
        let totalIncome = 0;
        for (let i = 0; i < orders.length; i++) {
            totalIncome = totalIncome + ((_b = (_a = orders[i]) === null || _a === void 0 ? void 0 : _a.courseDetails) === null || _b === void 0 ? void 0 : _b.price);
        }
        const matchStage2 = {
            $match: {
                createdAt: {
                    $gte: new Date(new Date().getFullYear(), 0, 1),
                    $lt: new Date(new Date().getFullYear() + 1, 0, 1), // Start of the next year
                },
            },
        };
        const monthlyIncomeData = yield orders_1.default.aggregate([
            matchStage2,
            {
                $lookup: {
                    from: "courses",
                    localField: "courseDetails",
                    foreignField: "_id",
                    as: "courseDetails",
                },
            },
            {
                $unwind: "$courseDetails",
            },
            {
                $group: {
                    _id: { $month: "$createdAt" },
                    totalIncome: { $sum: "$courseDetails.price" },
                },
            },
            {
                $project: {
                    _id: 1,
                    totalIncome: 1,
                },
            },
        ]);
        const monthlyCoursesData = yield courses_1.default.aggregate([
            matchStage2,
            {
                $group: {
                    _id: {
                        $month: "$createdAt",
                    },
                    count: { $sum: 1 },
                },
            },
            {
                $project: {
                    _id: 1,
                    count: 1,
                },
            },
        ]);
        res.status(201).json({
            studentCount,
            tutorCount,
            orderCount,
            totalIncome,
            totalCourses,
            monthlyIncomeData,
            monthlyCoursesData,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getDashboardData = getDashboardData;
const blockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield student_1.default.findByIdAndUpdate(id, {
            isBlocked: true,
        }, { new: true });
        const students = yield student_1.default.find();
        if (students) {
            res.status(201).json({
                students,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.blockStudent = blockStudent;
const unBlockStudent = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield student_1.default.findByIdAndUpdate(id, {
            isBlocked: false,
        }, { new: true });
        const students = yield student_1.default.find();
        if (students) {
            res.status(201).json({
                students,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.unBlockStudent = unBlockStudent;
const getInstructorList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const instructor = yield tutor_1.default.find();
        if (instructor) {
            res.status(201).json({
                instructor,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getInstructorList = getInstructorList;
const addCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, description } = req.body;
        const caseInsensitiveCategory = new RegExp(category, 'i');
        const check = yield courseCategory_1.default.findOne({ title: caseInsensitiveCategory });
        if (check) {
            return res.status(400).json("category already existing");
        }
        else {
            const newCategory = yield courseCategory_1.default.create({
                title: category,
                description: description,
            });
            if (newCategory) {
                return res.status(201).json({
                    _id: newCategory._id,
                    title: newCategory.title,
                    description: newCategory.description,
                    createdAt: newCategory.createdAt,
                });
            }
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.addCategory = addCategory;
const getCategoryList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield courseCategory_1.default.find({});
        if (categories) {
            res.status(201).json({
                categories,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCategoryList = getCategoryList;
const getCourseList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allCourses = yield courses_1.default.find().populate("category instructor");
        if (allCourses) {
            res.status(201).json({
                allCourses,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getCourseList = getCourseList;
const approveCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    try {
        const { id } = req.params;
        const inst = yield courses_1.default.findById(id).populate("instructor");
        const instructorEmail = (_c = inst === null || inst === void 0 ? void 0 : inst.instructor) === null || _c === void 0 ? void 0 : _c.email;
        const coursename = inst === null || inst === void 0 ? void 0 : inst.title;
        const msg = "this course is approved";
        if (!instructorEmail) {
            // Handle the case when instructorEmail is undefined
            throw new Error("Instructor email not found");
        }
        yield courses_1.default.findByIdAndUpdate(id, {
            isApproved: true,
        }, { new: true });
        yield (0, emailGenerator_1.default)(instructorEmail, coursename, msg);
        const allcourses = yield courses_1.default.find().populate("instructor");
        res.status(201).json({
            allcourses,
        });
    }
    catch (error) {
        res.status(400).json({ message: "error.message" }); // Send the error message in the response
    }
});
exports.approveCourse = approveCourse;
/* cancel courses in admin side */
const cancelCourse = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    try {
        const { id } = req.params;
        const inst = yield courses_1.default.findById(id).populate("instructor");
        const instructorEmail = (_d = inst === null || inst === void 0 ? void 0 : inst.instructor) === null || _d === void 0 ? void 0 : _d.email;
        const coursename = inst === null || inst === void 0 ? void 0 : inst.title;
        const msg = "this course is not approved";
        if (!instructorEmail) {
            // Handle the case when instructorEmail is undefined
            throw new Error("Instructor email not found");
        }
        yield courses_1.default.findByIdAndUpdate(id, {
            isApproved: false,
        }, { new: true });
        yield (0, emailGenerator_1.default)(instructorEmail, coursename, msg);
        const allcourses = yield courses_1.default.find().populate("instructor");
        res.status(201).json({
            allcourses,
        });
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.cancelCourse = cancelCourse;
/* cancel courses in admin side */
/* cancel courses in admin side */
const blockTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield tutor_1.default.findByIdAndUpdate(id, {
            isBlocked: true,
        }, { new: true });
        const tutorlist = yield tutor_1.default.find();
        if (tutorlist) {
            res.status(201).json({
                tutorlist,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.blockTutor = blockTutor;
const unBlockTutor = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield tutor_1.default.findByIdAndUpdate(id, {
            isBlocked: false,
        }, { new: true });
        const tutorlist = yield tutor_1.default.find();
        if (tutorlist) {
            res.status(201).json({
                tutorlist,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.unBlockTutor = unBlockTutor;
const activateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield courseCategory_1.default.findByIdAndUpdate(id, {
            isActive: true,
        }, { new: true });
        const categories = yield courseCategory_1.default.find();
        if (categories) {
            res.status(201).json({
                categories,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.activateCategory = activateCategory;
const inActivateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        yield courseCategory_1.default.findByIdAndUpdate(id, {
            isActive: false,
        }, { new: true });
        const categories = yield courseCategory_1.default.find();
        if (categories) {
            res.status(201).json({
                categories,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.inActivateCategory = inActivateCategory;
const getEditCategoryList = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const editCategory = yield courseCategory_1.default.findById({ _id: id });
        if (editCategory) {
            res.status(201).json({
                editCategory,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getEditCategoryList = getEditCategoryList;
const editCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category, description } = req.body;
        const { id } = req.params;
        console.log(id, category, description, "admin");
        const check = yield courseCategory_1.default.findOne({ title: category });
        if (check && check._id.toString() !== id) {
            res.status(400).json({ message: "Category with the same title already exists." });
        }
        else {
            const editedCategory = yield courseCategory_1.default.findByIdAndUpdate(id, {
                title: category,
                description: description,
            }, { new: true });
            if (editedCategory) {
                res.status(201).json({
                    _id: editedCategory._id,
                    category: editedCategory.title,
                    description: editedCategory.description,
                });
            }
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.editCategory = editCategory;
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
const getOrderHistory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const orders = yield orders_1.default.find()
            .populate({
            path: "courseDetails",
            populate: {
                path: "instructor",
                model: "tutor", // Assuming 'instructor' is the model name
            },
        })
            .populate("studentDetails");
        if (orders) {
            res.status(201).json({
                orders,
            });
        }
    }
    catch (error) {
        res.status(400).json(error);
    }
});
exports.getOrderHistory = getOrderHistory;
