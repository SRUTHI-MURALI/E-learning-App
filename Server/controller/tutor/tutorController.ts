import { Request,Response } from "express"
import axios from "axios";
import generateToken from "../../token/generateToken";
import Tutor from "../../model/tutor"
import courseCategory from "../../model/courseCategory"
import course from "../../model/courses"
import categoryModel from "../../model/courseCategory"
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
    const category = await courseCategory.find().exec()
    
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
 
const addLesson = async (req: Request, res: Response) => {
    const { lessons, courseId } = req.body;
  
    try {
      const updatedCourse = await course.findOneAndUpdate(
        { _id: courseId }, // Find the course by its ID
        { $push: { courseLessons: lessons } }, // Add lessons to the courseLessons array
        { new: true } // Return the updated course document
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
       const categories= await categoryModel.find()
       
       if(editCourse){
          res.status(201).json({
             editCourse,
             categories
             
         })
       }
    } catch (error) {
       res.status(400).json(error)
    }
 }
 
 const editCourseList= async(req:Request,res:Response)=>{
  
  
    try {
       
       console.log(req.body);
       
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
              category:editedCourse.category
          })
      }
    } catch (error) {
     
       
       
 
       res.status(400).json(error)
    }
 
 }

 export{
    sendOtp, signUp,login,getCategory,addCourse,addLesson,getCourseList,getEditCourseList,editCourseList
 }