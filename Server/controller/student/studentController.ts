import { Request, Response } from "express";
import generateToken from "../../token/generateToken";
import Student from "../../model/student";
import Courses from "../../model/courses";
import Tutor from "../../model/tutor";
import Quiz from "../../model/courseQuiz";
import axios from "axios";
import jwt from "jsonwebtoken";
import "dotenv/config";
import bcrypt from "bcrypt";

const BaseUrl: string = process.env.BaseUrl || "";

const globalData = {
  otp: null as null | number, // Use type null | number for otp
  student: null as null | {
    name: string;
    email: string;
    phone: string;
    password: string;
  }, // Define a type for user
};

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const emailfind = await Student.findOne({ email });
    const phonefind = await Student.findOne({ phone });
    if (emailfind || phonefind) {
      res.status(400).json({ error: "Student already exists" });
    } else {
      await axios.post(`${BaseUrl}/otp/sendmobileotp`, { phone: phone });
      res.status(200).json({ message: "OTP sent successfully" });
      const newStudent = {
        name,
        email,
        password,
        phone,
      };
      globalData.student = newStudent;
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const resetPasswordSentOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    const phonefind = await Student.findOne({ phone });

    if (phonefind != null) {
      await axios.post(`${BaseUrl}/otp/sendmobileotp`, {
        phone: phonefind.phone,
      });
      res.status(200).json({ message: "OTP sent successfully" });
    } else {
      res.status(400).json({ message: "No Number Exists" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const signUp = async (req: Request, res: Response) => {
  try {
    const { verificationCode } = req.body;
    const phone = globalData.student?.phone;

    await axios.post(`${BaseUrl}/otp/verifymobileotp`, {
      phone,
      verificationCode,
    });

    const addUser = await Student.create(globalData.student);
    const token = generateToken(addUser._id);
    return res.status(200).json({
      _id: addUser?._id,
      name: addUser?.name,
      email: addUser?.email,
      phone: addUser?.phone,
      token,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const student = await Student.findOne({ email });
    if (student && (await student.matchPasswords(password))) {
      if (student.isBlocked) {
        res.status(300).json({ message: "Student is Blocked" });
      } else {
        const token = generateToken(student._id);

        res.status(201).json({
          _id: student._id,
          name: student.name,
          email: student.email,
          phone: student.phone,
          token,
        });
      }
    } else {
      res.status(300).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(300).json({ message: "logging Error" });
  }
};

// Import Request and Response from express package

const googleLogin = async (req: Request, res: Response) => {
  try {
    const { id_token } = req.body;

    // Define a type for your decoded token
    interface JwtDecodedToken {
      name: string | null;
      email: string | null;
      jti: string | null;
      phone: string | null;
      // Add other properties as needed
    }

    // Use type assertion to tell TypeScript that you're certain it's JwtDecodedToken
    const decodedToken = jwt.decode(id_token) as JwtDecodedToken;

    const { name, email, jti, phone } = decodedToken;
    const emailfind = await Student.findOne({ email });
    const phonefind = await Student.findOne({ phone });

    if (emailfind || phonefind) {
      const existingStudent = emailfind || phonefind;

      const token = generateToken(existingStudent?._id);
      return res.status(200).json({
        _id: existingStudent?._id,
        name: existingStudent?.name,
        email: existingStudent?.email,
        phone: existingStudent?.phone,
        token,
      });
    } else {
      const addStudent = await Student.create({
        name,
        email,
        jti,
        phone,
      });
      const token = generateToken(addStudent._id);
      return res.status(200).json({
        _id: addStudent?._id,
        name: addStudent?.name,
        email: addStudent?.email,
        phone: addStudent?.phone,
        token,
      });
    }

    // Continue with your logic
  } catch (error) {
    res.status(400).json(error);
  }
};

const courseDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const courseDetails = await Courses.findById({ _id: id }).populate(
      "category instructor"
    );

    if (courseDetails) {
      res.status(201).json({
        courseDetails,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCourseList = async (req: Request, res: Response) => {
  try {
    const allCourses = await Courses.find().populate("category instructor");

    if (allCourses) {
      res.status(201).json({
        allCourses,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


const resetPassword = async (req: Request, res: Response) => {
  try {
    const { phone, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const studentPassword = await Student.findOneAndUpdate(
      { phone },
      {
        password: hashedpassword,
      },
      { new: true }
    );

    if (studentPassword) {
      res.status(400).json({ studentPassword });
    }
  } catch (error) {
    res.status(400).json("reset error");
  }
};

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const tutorDetails: any = await Tutor.find();

    if (tutorDetails) {
      res.status(201).json({
        tutorDetails,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getTutorDetails = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutorDetails: any = await Tutor.findById({ _id: id });
    const tutorCourses = await Courses.find({ instructor: id });

    if (tutorDetails) {
      res.status(201).json({
        tutorDetails,
        tutorCourses,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getStudentProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const studentDetails: any = await Student.findById({ _id: id });

    if (studentDetails) {
      res.status(201).json({
        studentDetails,
        
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


const getEnrolledCourses = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const studentDetails: any = await Student.findById({ _id: id }).populate({
      path: "enrolledCourses",
      populate: {
        path: "instructor",
        model: "tutor", // Match the 'ref' value in course schema
      },
    });
    const enrolledCourses = studentDetails?.enrolledCourses;

    if (enrolledCourses) {
      res.status(201).json({
        enrolledCourses,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allQuiz = await Quiz.find({ course: id });
    const allQuizSets: any = [];

    allQuiz.map((quiz) => allQuizSets.push(quiz?.questionset));

    if (allQuizSets) {
      res.status(201).json({
        allQuizSets,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const studentEditedProfile = async (req: Request, res: Response) => {
  try {
    console.log(req.body, "kakjamj");

    const {
      name,
      phone,
      email,
     photo,
      password,
      gender,
      age,
      country
    
    } = req.body;
    const { id } = req.params;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);

    const editedStudent = await Student.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        email,
       age,
       country,
        password: hashedpassword,
        gender,
        photo,
      },
      { new: true }
    );

    if (editedStudent) {
      res.status(201).json({
        _id: editedStudent._id,
        name: editedStudent.name,
        phone: editedStudent.phone,
        email: editedStudent.email,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};


export {
  sendOtp,
  signUp,
  login,
  googleLogin,
  courseDetails,
  resetPassword,
  resetPasswordSentOtp,
  getAllTutors,
  getTutorDetails,
  getEnrolledCourses,
  getQuiz,
  getStudentProfile,
  studentEditedProfile,
  getCourseList
};
