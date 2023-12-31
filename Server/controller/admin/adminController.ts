import { Request, Response } from "express";
import generateToken from "../../token/generateToken";
import Admin from "../../model/admin";
import student from "../../model/student";
import tutor from "../../model/tutor";
import categoryModel from "../../model/courseCategory";
import courses from "../../model/courses";
import OrderModel from "../../model/orders";
import generateEmail from "../../EmailGenerator/emailGenerator";

const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (admin && admin.password == password) {
      const token = generateToken(admin._id);
      res.status(201).json({
        _id: admin._id,
        name: admin.name,
        email: admin.email,
        token,
      });
    } else {
      res.status(400);
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getStudentsList = async (req: Request, res: Response) => {
  try {
    const students = await student.find({});

    if (students) {
      res.status(201).json({
        students,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getDashboardData = async (req: Request, res: Response) => {
  try {
    const studentCount = await student.countDocuments({});
    const orderCount = await OrderModel.countDocuments({});
    const tutorCount = await tutor.countDocuments({});
    const totalCourses = await courses.countDocuments({});

    const orders: any = await OrderModel.find().populate("courseDetails");

    let totalIncome = 0;
    for (let i = 0; i < orders.length; i++) {
      totalIncome = totalIncome + orders[i]?.courseDetails?.price;
    }

    const matchStage2 = {
      $match: {
        createdAt: {
          $gte: new Date(new Date().getFullYear(), 0, 1), // Start of the year
          $lt: new Date(new Date().getFullYear() + 1, 0, 1), // Start of the next year
        },
      },
    };

    const monthlyIncomeData = await OrderModel.aggregate([
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

    const monthlyCoursesData = await courses.aggregate([
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
  } catch (error) {
    res.status(400).json(error);
  }
};

const blockStudent = async (req: Request, res: Response) => {
 
  
  try {
    const { id } = req.params;

    await student.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );
    const students = await student.find();
    if (students) {
      res.status(201).json({
        students,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const unBlockStudent = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await student.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    const students = await student.find();
    if (students) {
      res.status(201).json({
        students,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getInstructorList = async (req: Request, res: Response) => {
  try {
    const instructor = await tutor.find();

    if (instructor) {
      res.status(201).json({
        instructor,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const addCategory = async (req: Request, res: Response) => {
  try {
    const { category, description } = req.body;
    const caseInsensitiveCategory = new RegExp(category, 'i');
    const check = await categoryModel.findOne({ title: caseInsensitiveCategory });
    if (check) {
      return res.status(400).json("category already existing");
    } else {
      const newCategory = await categoryModel.create({
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
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCategoryList = async (req: Request, res: Response) => {
  try {
    const categories = await categoryModel.find({});

    if (categories) {
      res.status(201).json({
        categories,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getCourseList = async (req: Request, res: Response) => {
  try {
    const allCourses = await courses.find().populate("category instructor");

    if (allCourses) {
      res.status(201).json({
        allCourses,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const approveCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const inst: any = await courses.findById(id).populate("instructor");
    const instructorEmail = inst?.instructor?.email;
    const coursename = inst?.title;
    const msg = "this course is approved";

    if (!instructorEmail) {
      // Handle the case when instructorEmail is undefined
      throw new Error("Instructor email not found");
    }

    await courses.findByIdAndUpdate(
      id,
      {
        isApproved: true,
      },
      { new: true }
    );

    await generateEmail(instructorEmail, coursename, msg);
    const allcourses = await courses.find().populate("instructor");
    res.status(201).json({
      allcourses,
    });
  } catch (error) {
    res.status(400).json({ message: "error.message" }); // Send the error message in the response
  }
};
/* cancel courses in admin side */
const cancelCourse = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const inst: any = await courses.findById(id).populate("instructor");
    const instructorEmail = inst?.instructor?.email;
    const coursename = inst?.title;
    const msg = "this course is not approved";
    if (!instructorEmail) {
      // Handle the case when instructorEmail is undefined
      throw new Error("Instructor email not found");
    }
    await courses.findByIdAndUpdate(
      id,
      {
        isApproved: false,
      },
      { new: true }
    );

    await generateEmail(instructorEmail, coursename, msg);
    const allcourses = await courses.find().populate("instructor");
    res.status(201).json({
      allcourses,
    });
  } catch (error) {
    res.status(400).json(error);
  }
};

/* cancel courses in admin side */

/* cancel courses in admin side */

const blockTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await tutor.findByIdAndUpdate(
      id,
      {
        isBlocked: true,
      },
      { new: true }
    );

    const tutorlist = await tutor.find();
    if (tutorlist) {
      res.status(201).json({
        tutorlist,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const unBlockTutor = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await tutor.findByIdAndUpdate(
      id,
      {
        isBlocked: false,
      },
      { new: true }
    );
    const tutorlist = await tutor.find();
    if (tutorlist) {
      res.status(201).json({
        tutorlist,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};
const activateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await categoryModel.findByIdAndUpdate(
      id,
      {
        isActive: true,
      },
      { new: true }
    );
    const categories = await categoryModel.find();
    if (categories) {
      res.status(201).json({
        categories,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const inActivateCategory = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await categoryModel.findByIdAndUpdate(
      id,
      {
        isActive: false,
      },
      { new: true }
    );
    const categories = await categoryModel.find();
    if (categories) {
      res.status(201).json({
        categories,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getEditCategoryList = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const editCategory = await categoryModel.findById({ _id: id });
    if (editCategory) {
      res.status(201).json({
        editCategory,
      });
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const editCategory = async (req: Request, res: Response) => {
  try {
    const { category, description } = req.body;
    const { id } = req.params;
    console.log(id, category, description, "admin");

   

    const check = await categoryModel.findOne({ title: category });
    if (check && check._id.toString() !== id) {
      res.status(400).json({message:"Category with the same title already exists."});
    } else {
      const editedCategory = await categoryModel.findByIdAndUpdate(
        id,
        {
          title: category,
          description: description,
        },
        { new: true }
      );

      if (editedCategory) {
        res.status(201).json({
          _id: editedCategory._id,
          category: editedCategory.title,
          description: editedCategory.description,
        });
      }
    }
  } catch (error) {
    res.status(400).json(error);
  }
};

const getAllLessons = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const allCourses = await courses.findById({ _id: id });

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

const getOrderHistory = async (req: Request, res: Response) => {
  try {
    const orders: any = await OrderModel.find()
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
  } catch (error) {
    res.status(400).json(error);
  }
};

export {
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
  getEditCategoryList,
  getOrderHistory,
  inActivateCategory,
  editCategory,
  getAllLessons,
  getDashboardData,
};
