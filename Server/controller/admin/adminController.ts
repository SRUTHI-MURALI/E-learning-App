
import { Request,Response } from "express"
import generateToken from "../../token/generateToken";
import Admin from'../../model/admin'
import student from '../../model/student'
import tutor from '../../model/tutor'
import categoryModel from '../../model/courseCategory'
import courses from "../../model/courses";

const login=async(req:Request,res:Response)=>{
    try {
      const {email,password}=req.body
      const admin=await Admin.findOne({email})
      if(admin && admin.password==password){
         const token = generateToken(admin._id)
         res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            token
        })
      }else{
         res.status(400)
         throw new Error('Invalid admin Data')
     }
    } catch (error) {
      res.status(400).json(error)
    }
}

const getStudentsList=async(req:Request,res:Response)=>{
   try {
      const students= await student.find({})
     
      
      if(students){
         res.status(201).json({
            students
            
        })
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

const blockStudent=async(req:Request,res:Response)=>{
   
   try {
      const {id} =req.params
      console.log(id);
      

      const students= await student.findByIdAndUpdate(
         id,
         {
            isBlocked: true
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            students
            
        })
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}

const unBlockStudent=async(req:Request,res:Response)=>{
  
   
   try {
      const {id} =req.params
      const students= await student.findByIdAndUpdate(
         id,
         {
           isBlocked: false
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            students
            
        })
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}


const getInstructorList=async(req:Request,res:Response)=>{
   try {
      const instructor= await tutor.find({})
      
      
      if(instructor){
         res.status(201).json({
            instructor
            
        })
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

const addCategory= async(req:Request,res:Response)=>{
   try {
      
      
      const {category,description} = req.body
      console.log(category,description,"category");
      const newCategory=await categoryModel.create({
         title:category,
         description:description,
      })

      
      
      if(newCategory){
         res.status(201).json({
             _id:newCategory._id,
             title:newCategory.title,
             description:newCategory.description,
             createdAt:newCategory.createdAt,
             
         })
     }
   } catch (error) {
      console.log(error);
      
      

      res.status(400).json(error)
   }

}

const getCategoryList=async(req:Request,res:Response)=>{
   try {
      const categories= await categoryModel.find({})
      

      
      if(categories){
         res.status(201).json({
            categories
            
        })
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

const getCourseList=async(req:Request,res:Response)=>{
   try {
      const allCourses= await courses.find().populate("category")
      
      console.log(allCourses,"all");
      console.log(allCourses);
      
      
      
      
      
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
   
      
      const editCourse= await courses.findById({_id:id})
      
      
      if(editCourse){
         res.status(201).json({
            editCourse
            
        })
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

const editCourseList= async(req:Request,res:Response)=>{
   try {
      
      
      const {title,duration,price} = req.body
      const {id}=req.params
    
      const editedCourse=await courses.findByIdAndUpdate(
        id, {
         title: title,
         duration:duration,
         price:price,
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
      console.log(error);
      
      

      res.status(400).json(error)
   }

}

const approveCourse=async(req:Request,res:Response)=>{
  
   
   try {
      const {id} =req.params
      console.log(id,"approve");
      
      const allcourses= await courses.findByIdAndUpdate(
         id,
         {
           isApproved: true
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            allcourses
            
        })
       
        
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}

const cancelCourse=async(req:Request,res:Response)=>{
  
   
   try {
      const {id} =req.params
      const allcourses= await courses.findByIdAndUpdate(
         id,
         {
           isApproved: false
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            allcourses
            
        })
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}

 export {
    login,getStudentsList,getInstructorList,blockStudent,unBlockStudent,getCategoryList,addCategory,getCourseList,getEditCourseList,editCourseList,
    approveCourse,cancelCourse
 }

