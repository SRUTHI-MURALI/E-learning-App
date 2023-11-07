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
import chats from "../../model/chats";

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
    // Validate and extract data from the request body
    const { verificationCode } = req.body;
    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }

    // Assuming you have a valid 'globalData.student' object
    const phone = globalData.student?.phone;

    // Verify OTP
    const otpResponse = await axios.post(`${BaseUrl}/otp/verifymobileotp`, {
      phone,
      verificationCode,
    });

    if (otpResponse.status !== 200) {
      // Handle OTP verification failure
  
      return res.status(400).json({ message: "OTP verification failed" });
    }

    // Create a new user
    const newUser = await Student.create(globalData.student);
    console.log("User created successfully:");

    // Generate a token for the user
    const token = generateToken(newUser._id);

    // Return user data and token in the response
    return res.status(200).json({
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      phone: newUser.phone,
      status: newUser.isBlocked,
      token,
    });
  } catch (error) {
    console.error("Error in sign-up:", error);
    return res.status(500).json(error);
  }
};

const login = async (req: Request, res: Response) => {

  
  try {
    
    console.log(req.body,'log');
    
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
          status: student.isBlocked,
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
    const allCourses = await Courses.find({ isApproved: true }).populate(
      "category instructor"
    );
    const quizList= await Quiz.find()

    if (allCourses) {
      res.status(201).json({
        allCourses,
        quizList
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
    const hashedPassword = await bcrypt.hash(password, salt);
    

    const student = await Student.findOne({ phone });

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Update the student's password
    student.password = hashedPassword;
    const updatedStudent = await student.save();

    if (updatedStudent) {
      return res.status(200).json({ message: 'Password reset successful' });
    } else {
      return res.status(500).json({ message: 'Password reset failed' });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Password reset error' });
  }
};

const getAllTutors = async (req: Request, res: Response) => {
  try {
    const tutorDetails: any = await Tutor.find({ isBlocked: false });

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
    const { name, phone, email, photo, password, gender, age, country } =
      req.body;
     let hashedpassword;
      
      
    const { id } = req.params;
   
    if(password){
      const salt = await bcrypt.genSalt(10);
   hashedpassword = await bcrypt.hash(password, salt);
    }
    

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

const sendMsg = async (req: Request, res: Response) => {
  try {
    const { from, to, message } = req.body;



    const data = await chats.create({
      message:message,
      users: [from, to],
      sender: from,
    });

    if (data) return res.status(201).json({ msg: "Message added successfully." });
    else return res.status(400).json({ msg: "Failed to add message to the database" });
  } catch (error) {
    console.log(error);
  }
};

const receivemsg = async (req: Request, res: Response) => {
  try {

    
    const { from, to } = req.body;

    const messages = await chats.find({
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
  } catch (error) {
    console.log(error);
  }
};

const getSearchData = async (req: Request, res: Response) => {
  try {
    const { searchvalue } = req.body;
    const caseInsensitiveSearch = new RegExp(searchvalue, 'i');
    
    const courseData = await Courses.find({ title: caseInsensitiveSearch });
    const tutorData = await Tutor.find({ name: caseInsensitiveSearch });
    
    const searchData = [...courseData, ...tutorData]; // Combine the results into an array
    
    if (searchData.length > 0) {
      res.status(200).json({ searchData });
    } else {
      res.status(404).json({ message: 'No search item' });
    }

   
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

const getSortData = async (req: Request, res: Response) => {
  try {
    const { sortValue, sortOrder } = req.body;
    
  
    let courseData: any;
  
    if (sortValue === 'price') {
     
      const query = {
        price: { $gte: 0 },
      };
      
      courseData = await Courses.find(query).where({ isApproved: true }).populate(
        "category instructor"
      ).sort({
        price: sortOrder === 'asc' ? 1 : -1
      });
    } else if (sortValue === 'duration') {
     
      const query = {
        duration: { $gte: 0 },
      };
  
      courseData = await Courses.find(query).sort({
        duration: sortOrder === 'asc' ? 1 : -1
      });
    }
  
  
    if (courseData.length > 0) {
      res.status(200).json({ courseData });
    } else {
      res.status(404).json({ message: 'No search item' });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Internal server error' });
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
  getCourseList,
  sendMsg,
  receivemsg,
  getSearchData,
  getSortData
};
