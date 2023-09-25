import { Request,Response } from "express"
import axios from "axios";
import generateToken from "../../token/generateToken";
import Tutor from "../../model/tutor"
import courseCategory from "../../model/courseCategory"
import course from "../../model/courses"
import OrderModel from "../../model/orders"
import courseQuiz from "../../model/courseQuiz";
import student from "../../model/student";
import bcrypt from 'bcrypt'
const BaseUrl: string = process.env.BaseUrl|| '';



const globalData = {
    otp: null as null | number, // Use type null | number for otp
    tutor: null as null | { name: string, email: string, phone: string, password: string }, // Define a type for user
  };

  const sendOtp = async (req: Request, res: Response) => {
   
    try {
        const {name,email,password,phone} = req.body
        const emailfind = await Tutor.findOne({ email });
        const phonefind = await Tutor.findOne({ phone });
        
        if (emailfind || phonefind) {
            
            
            res.status(400).json({ error: 'Instructor already exists' });
        } else {
                
              
                
                await axios.post( `${BaseUrl}/otp/sendmobileotp`, { phone: phone });
                res.status(200).json({ message: 'OTP sent successfully' });
                
                const newTutor = {
                    name,
                    email,
                    password,
                    phone
                }
            globalData.tutor = newTutor;

        }
    } catch (error) {
     
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const signUp = async (req: Request, res: Response) => {
    
    try {
        const { verificationCode } = req.body;
        const phone=globalData.tutor?.phone
                
            await axios.post(`${BaseUrl}/otp/verifymobileotp`, { phone,verificationCode});
            
            const addUser=  await Tutor.create(globalData.tutor)
            const token = generateToken(addUser._id);
            return res.status(200).json({
                _id: addUser?._id,
                name: addUser?.name,
                email: addUser?.email,
                phone:addUser?.phone,
                token,
            })
     
    } catch (error) {
      
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

 const login= async (req:Request,res:Response)=>{
    try {
      const { email,password}= req.body
    const tutor=await Tutor.findOne({email})
   
    if(tutor && (await tutor.matchPasswords(password)) ){
      if(tutor.isBlocked){
        res.status(300).json({message:"Blocked Tutor"})
      }else{
        const token = generateToken(tutor._id)
    
        res.status(201).json({
            _id:tutor._id,
            name:tutor.name,
            email:tutor.email,
            phone:tutor.phone,
            token
        })
      }
       
    }else{
        res.status(300).json({message:"Invalid Credentials"})
        
    } 
    } catch (error) {
      res.status(300).json({message:"logging error"})
    }
 }

 const getCategory= async(req:Request,res:Response)=>{
    const category = await courseCategory.find({ isActive: true }).exec()
    
      if(category){
        res.status(201).json({
            Category:category
            
        })
      }
 }

 const addCourse= async(req:Request,res:Response)=>{
  
    
    const newCourse=await course.create({
        title: req.body.title,
        description: req.body.description,
        category:req.body.category,
       duration:req.body.duration,
       price:req.body.price,
       photo:req.body.photo,
       instructor:req.body.instructor,
        isApproved:req.body.isApproved,
       
    })
    
    
    
    
    if(newCourse){
        res.status(201).json({
            _id:newCourse._id,
            title:newCourse.title,
            description:newCourse.description,
            category:newCourse.category,
            price:newCourse.price,
            duration:newCourse.duration,
            instructor:newCourse.instructor,
            isApproved:newCourse.isApproved,
            createdAt:newCourse.createdAt,
            
        })
    }
}

const disableLesson = async (req: Request, res: Response) => {
  
  
  try {
    const { courseId } = req.body;
    const { id } = req.params;

    const selectedcourse: any = await course.findOne({
      '_id': courseId, // Replace `courseId` with the actual course _id
      'courseLessons._id': id,
    });

    if (selectedcourse) {
      // Construct the update query to set isActive to false for the matching lesson
      await course.findOneAndUpdate(
        {
          '_id': courseId, // Replace `courseId` with the actual course _id
          'courseLessons._id': id,
        },
        {
          $set: {
            'courseLessons.$.isActive': false,
          },
        }
      );

      res.status(200).json({ message: 'Lesson disabled successfully' });
    } else {
      res.status(404).json({ message: 'Course or lesson not found' });
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
      '_id': courseId, // Replace `courseId` with the actual course _id
      'courseLessons._id': id,
    });

    if (selectedcourse) {
      // Construct the update query to set isActive to false for the matching lesson
      await course.findOneAndUpdate(
        {
          '_id': courseId, // Replace `courseId` with the actual course _id
          'courseLessons._id': id,
        },
        {
          $set: {
            'courseLessons.$.isActive': true,
          },
        },
        {new:true}
      );
      const allCourses= await course.findById({_id:courseId})
    
      const allLessons= allCourses?.courseLessons
  
      
 
      if(allLessons){
         res.status(201).json({
            allLessons
            
        })
      }

    
    } else {
      res.status(404).json({ message: 'Course or lesson not found' });
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
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      console.error('Error:', error);
      res.status(500).json({ error: 'Server error' });
    }
  };
  
  
  const getCourseList=async(req:Request,res:Response)=>{
    try {
       const allCourses= await course.find().populate("category instructor")
     
    
       if(allCourses){
          res.status(201).json({
             allCourses
             
         })
       }
    } catch (error) {
       res.status(400).json(error)
    }
 }
 
 const getEditCourseList=async(req:Request,res:Response)=>{
    try {
       const {id}=req.params
       const editCourse= await course.findById({_id:id}).populate("category")
       const allcategories= await courseCategory.find()
       
       if(editCourse){
          res.status(201).json({
             editCourse,
             allcategories
             
         })
       }
    } catch (error) {
       res.status(400).json(error)
    }
 }
 
 const editCourseList= async(req:Request,res:Response)=>{
 
  
    try {
       
       const {title,duration,price,category} = req.body
       const {id}=req.params
   
     
       const editedCourse=await course.findByIdAndUpdate(
         id, {
          title: title,
          duration:duration,
          price:price,
          category:category
        
        },
        { new: true }
       )
 
       
       
       if(editedCourse){
          res.status(201).json({
              _id:editedCourse._id,
              title:editedCourse.title,
              duration:editedCourse.duration,
              price:editedCourse.price,
            
          })
      }
    } catch (error) {
     
       
       
 
       res.status(400).json(error)
    }
 
 }

 const getAllLessons=async(req:Request,res:Response)=>{
  try {
     const {id}= req.params
     const allCourses= await course.findById({_id:id})
    
     const allLessons= allCourses?.courseLessons
 
     

     if(allLessons){
        res.status(201).json({
           allLessons
           
       })
     }
  } catch (error) {
     res.status(400).json(error)
  }
}

  const enrolledStudents=async(req:Request,res:Response)=>{
    try {
      const {id}= req.params;
      
      const orders:any = await OrderModel.find()
    .populate({
      path: 'courseDetails',
      populate: {
        path: 'instructor',
        model: 'tutor', // Match the 'ref' value in course schema
      },
    })
    .populate('studentDetails')
    .exec();

    

    const filteredOrders = orders.filter((order: any) => {
      return order.courseDetails.instructor._id.toString() === id;
    });
    
   
  
        if(orders){
          res.status(200).json({filteredOrders})
        }
        
  
    } catch (error) {
      res.status(400).json(error)
    }
  }

  const AddQuiz = async (req: Request, res: Response) => {
    
    const { questionset, courseId,count } = req.body;
    const selectedCourse= await course.findById({_id:courseId})
    const questionNumber=selectedCourse?.quizQuestions
    const newcount=questionNumber+count
    const existQuiz= await courseQuiz.find({course:courseId})

  if(existQuiz==null){
    try {
      const updateQuizSet= await courseQuiz.findOneAndUpdate(
        {course: courseId }, 
        { $push: { questionset: { $each: questionset } } },
        { new: true } 
      );
  
      if (updateQuizSet) {
        await course.findByIdAndUpdate(courseId,{
          quizQuestions:newcount
        })
        res.status(201).json(updateQuizSet);
      } else {
        res.status(404).json({ error: 'Course not found' });
      }
    } catch (error) {
      res.status(400).json(error)
    }
  }else{
    console.log("else");
    
    try {
      const newQuiz=await courseQuiz.create({
        course:courseId,
        questionset
      
    })
    if(newQuiz){
      await course.findByIdAndUpdate(courseId,{
        quizQuestions:count
      })
      
      res.status(201).json(newQuiz);
    }else{
      res.status(404).json({ error: 'Course not found' });
    }
    } catch (error) {
      res.status(400).json(error)
    }
  }
    
  };

  const tutorProfile=async(req:Request,res:Response)=>{
    try {
       const {id}= req.params
       const tutorDetails= await Tutor.findById({_id:id})
      
       
       
  
       if(tutorDetails){
          res.status(201).json({
            tutorDetails
             
         })
       }
    } catch (error) {
       res.status(400).json(error)
    }
  }

  const tutorEditedProfile= async(req:Request,res:Response)=>{
 
  
    try {
      console.log(req.body,"profile");
      
       
       const {name,phone,email,experience,qualification,password,about,photo} = req.body
       const {id}=req.params
       const salt = await bcrypt.genSalt(10);
       const hashedpassword = await bcrypt.hash(password, salt);
     
       const editedTutor=await Tutor.findByIdAndUpdate(
         id, {
          name,
          phone,
          email,
          experience,
          qualification,
          password:hashedpassword,
          about,
          photo
        
        },
        { new: true }
       )
 
       
       
       if(editedTutor){
          res.status(201).json({
              _id:editedTutor._id,
              name:editedTutor.name,
              phone:editedTutor.phone,
              email:editedTutor.email,
            
          })
      }
    } catch (error) {
     
       
       
 
       res.status(400).json(error)
    }
 
 }

 export{
    sendOtp, signUp,login,getCategory,addCourse,addLesson,AddQuiz,activateLesson,disableLesson,
    getCourseList,getEditCourseList,editCourseList,getAllLessons,enrolledStudents,tutorProfile,tutorEditedProfile,
 }