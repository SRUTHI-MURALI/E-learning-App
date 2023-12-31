import { Request, Response } from "express";
import axios from "axios";
import generateToken from "../../token/generateToken";
import Tutor from "../../model/tutor";
import courseCategory from "../../model/courseCategory";
import course from "../../model/courses";
import OrderModel from "../../model/orders";
import courseQuiz from "../../model/courseQuiz";
import bcrypt from "bcrypt";
const BaseUrl: string = process.env.BaseUrl || "";

const globalData = {
  otp: null as null | number, // Use type null | number for otp
  tutor: null as null | {
    name: string;
    email: string;
    phone: string;
    password: string;
  }, // Define a type for user
};

let mailid:string;

const sendOtp = async (req: Request, res: Response) => {
  try {
    const { name, email, password, phone } = req.body;
    const emailfind = await Tutor.findOne({ email });
    

    if (emailfind ) {
      res.status(400).json({ error: "Instructor already exists" });
    } else {
      await axios.post(`${BaseUrl}/otp/sendmobileotp`, { email: email });
      res.status(200).json({ message: "OTP sent successfully" });

      const newTutor = {
        name,
        email,
        password,
        phone,
      };
      globalData.tutor = newTutor;
    }
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const verifyOtp= async (req: Request, res: Response)=>{
  try {
    const {email, verificationCode } = req.body;
    console.log(email,verificationCode,'hjgkgg');
    
   
    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }
    if(email == mailid){
      const otpResponse = await axios.post(`${BaseUrl}/otp/verifymobileotp`, {
    
        verificationCode,
      });
      if (otpResponse.status !== 200) {
        // Handle OTP verification failure
    
        return res.status(400).json({ message: "OTP verification failed" });
      }else{
        return res.status(200).json({ message: "OTP verified successfully" });
      }
  
  
    }
  } catch (error) {
    console.error("Error in resetting password:", error);
    return res.status(500).json(error);
  }
}

const signUp = async (req: Request, res: Response) => {
  try {
    const {email, verificationCode } = req.body;
    if (!verificationCode) {
      return res.status(400).json({ error: "Verification code is required" });
    }
    if( email === globalData.tutor?.email){
      const otpResponse=await axios.post(`${BaseUrl}/otp/verifymobileotp`, {
     
        verificationCode,
      });

      if (otpResponse.status !== 200) {
        // Handle OTP verification failure
    
        return res.status(400).json({ message: "OTP verification failed" });
      }

// create new tutor
      const addUser = await Tutor.create(globalData.tutor);
     const token = generateToken(addUser._id);
      return res.status(200).json({
      _id: addUser?._id,
      name: addUser?.name,
      email: addUser?.email,
      phone: addUser?.phone,
      token,
    });
  
    }

    
    
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const tutor = await Tutor.findOne({ email });

    if (tutor && (await tutor.matchPasswords(password))) {
      if (tutor.isBlocked) {
        res.status(300).json({ message: "Blocked Tutor" });
      } else {
        const token = generateToken(tutor._id);

        res.status(201).json({
          _id: tutor._id,
          name: tutor.name,
          email: tutor.email,
          phone: tutor.phone,
          token,
        });
      }
    } else {
      res.status(300).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    res.status(300).json({ message: "logging error" });
  }
};

const getCategory = async (req: Request, res: Response) => {
  const category = await courseCategory.find({ isActive: true }).exec();

  if (category) {
    res.status(201).json({
      Category: category,
    });
  }
};

const addCourse = async (req: Request, res: Response) => {
  const newCourse = await course.create({
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
};

const disableLesson = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const { id } = req.params;

    const selectedcourse: any = await course.findOne({
      _id: courseId, // Replace `courseId` with the actual course _id
      "courseLessons._id": id,
    });

    if (selectedcourse) {
      // Construct the update query to set isActive to false for the matching lesson
      await course.findOneAndUpdate(
        {
          _id: courseId, // Replace `courseId` with the actual course _id
          "courseLessons._id": id,
        },
        {
          $set: {
            "courseLessons.$.isActive": false,
          },
        }
      );

      res.status(200).json({ message: "Lesson disabled successfully" });
    } else {
      res.status(404).json({ message: "Course or lesson not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const activateLesson = async (req: Request, res: Response) => {
  try {
    const { courseId } = req.body;
    const { id } = req.params;

    const selectedcourse: any = await course.findOne({
      _id: courseId, // Replace `courseId` with the actual course _id
      "courseLessons._id": id,
    });

    if (selectedcourse) {
      // Construct the update query to set isActive to false for the matching lesson
      await course.findOneAndUpdate(
        {
          _id: courseId, // Replace `courseId` with the actual course _id
          "courseLessons._id": id,
        },
        {
          $set: {
            "courseLessons.$.isActive": true,
          },
        },
        { new: true }
      );
      const allCourses = await course.findById({ _id: courseId });

      const allLessons = allCourses?.courseLessons;

      if (allLessons) {
        res.status(201).json({
          allLessons,
        });
      }
    } else {
      res.status(404).json({ message: "Course or lesson not found" });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const addLesson = async (req: Request, res: Response) => {
  const { lessons, courseId } = req.body;

  try {
    const updatedCourse = await course.findOneAndUpdate(
      { _id: courseId },
      { $push: { courseLessons: lessons } },
      { new: true }
    );

    if (updatedCourse) {
      res.status(201).json(updatedCourse);
    } else {
      res.status(404).json({ error: "Course not found" });
    }
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "Server error" });
  }
};

const getCourseList = async (req: Request, res: Response) => {
  try {
    const allCourses = await course.find().populate("category instructor");
    const quizQuestions = await courseQuiz.find();

    if (allCourses) {
      res.status(201).json({
        allCourses,
        quizQuestions,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEditCourseList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const editCourse = await course.findById({ _id: id }).populate("category");
    const allcategories = await courseCategory.find();

    if (editCourse) {
      res.status(201).json({
        editCourse,
        allcategories,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const editCourseList = async (req: Request, res: Response) => {
  try {
    const { title, duration, price, category } = req.body;
    const { id } = req.params;

    const editedCourse = await course.findByIdAndUpdate(
      id,
      {
        title: title,
        duration: duration,
        price: price,
        category: category,
      },
      { new: true }
    );

    if (editedCourse) {
      res.status(201).json({
        _id: editedCourse._id,
        title: editedCourse.title,
        duration: editedCourse.duration,
        price: editedCourse.price,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllLessons = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allCourses = await course.findById({ _id: id });

    const allLessons = allCourses?.courseLessons;

    if (allLessons) {
      res.status(201).json({
        allLessons,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const enrolledStudents = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const orders: any = await OrderModel.find()
      .populate({
        path: "courseDetails",
        populate: {
          path: "instructor",
          model: "tutor",
        },
      })
      .populate("studentDetails")
      .exec();

    const filteredOrders = orders.filter((order: any) => {
      return order.courseDetails.instructor._id.toString() === id;
    });

    
    

    if (orders) {
      res.status(200).json({ filteredOrders });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const AddQuiz = async (req: Request, res: Response) => {
  const { questionset, courseId, count } = req.body;

  const existQuiz = await courseQuiz.find({ course: courseId });

  if (existQuiz.length === 0) {
    try {
      const newQuiz = await courseQuiz.create({
        course: courseId,
        questionset,
      });

      if (newQuiz) {
        await course.findByIdAndUpdate(courseId, {
          quizQuestions: count,
        });

        res.status(201).json(newQuiz);
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  } else {
    try {
      const numberOfQuestionSets = existQuiz[0].questionset.length;

      const updateQuizSet = await courseQuiz.findOneAndUpdate(
        { course: courseId },
        { $push: { questionset: { $each: questionset } } },
        { new: true }
      );

      if (updateQuizSet) {
        await course.findByIdAndUpdate(courseId, {
          quizQuestions: numberOfQuestionSets,
        });
        res.status(201).json(updateQuizSet);
      } else {
        res.status(404).json({ error: "Course not found" });
      }
    } catch (error) {
      res.status(400).json(error);
    }
  }
};

const tutorProfile = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const tutorDetails = await Tutor.findById({ _id: id });
    const allCourses = await course.find({ instructor: id });
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
  } catch (error) {
    res.status(400).json(error);
  }
};

const tutorEditedProfile = async (req: Request, res: Response) => {
  try {
    const { name, phone, email, experience, qualification, about,startOnline,onlineEnd } =
      req.body;
      console.log(req.body.startOnline,'body');
      
    const { id } = req.params;
    

    const editedTutor = await Tutor.findByIdAndUpdate(
      id,
      {
        name,
        phone,
        email,
        experience,
        qualification,
        about,
        startOnline,
        onlineEnd
      },
      { new: true }
    );


    if (editedTutor) {
      res.status(201).json({
        _id: editedTutor._id,
        name: editedTutor.name,
        phone: editedTutor.phone,
        email: editedTutor.email,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const editProfilePhoto = async (req: Request, res: Response) => {
  try {
    const { photo } = req.body;
    const { id } = req.params;

    const editedTutor = await Tutor.findByIdAndUpdate(
      id,
      {
        photo,
      },
      { new: true }
    );

    if (editedTutor) {
      res.status(201).json({
        _id: editedTutor._id,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const resetPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const tutorPassword = await Tutor.findOneAndUpdate(
      { email },
      {
        password: hashedpassword,
      },
      { new: true }
    );

    if (tutorPassword) {
      return res.status(200).json({ message: 'Password reset successful' });
    }
  } catch (error) {
    return res.status(500).json({ message: 'Password reset failed' });
  }
};

const removeQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await courseQuiz.findOneAndUpdate(
      { "questionset._id": id },
      { $set: { "questionset.$.isActive": false } },
      { new: true }
    );

    if (quiz) {
      res.status(201).json({
        _id: quiz._id,
      });
    } else {
      res.status(404).json({ error: "Quiz not found" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const activateQuiz = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const quiz = await courseQuiz.findOneAndUpdate(
      { "questionset._id": id },
      { $set: { "questionset.$.isActive": true } },
      { new: true }
    );
    if (quiz) {
      res.status(201).json({
        _id: quiz._id,
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const resetPasswordSentOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    const emailfind:any = await Tutor.findOne({ email });

    mailid= emailfind?.email;

    if (emailfind != null) {
      await axios.post(`${BaseUrl}/otp/sendmobileotp`, {
        email: emailfind?.email,
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

export {
  sendOtp,
  signUp,
  login,
  getCategory,
  addCourse,
  addLesson,
  AddQuiz,
  activateLesson,
  disableLesson,
  getCourseList,
  getEditCourseList,
  editCourseList,
  getAllLessons,
  enrolledStudents,
  tutorProfile,
  tutorEditedProfile,
  resetPasswordSentOtp,
  resetPassword,
  editProfilePhoto,
  removeQuiz,
  activateQuiz,
  verifyOtp
};
