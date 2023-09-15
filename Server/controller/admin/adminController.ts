
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
     const check=await categoryModel.findOne({title:category})
      if(check){
         res.status(400).json(
            "category already existing"
         )
      }else{
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
      }
     
      
   } catch (error) {
    
      
      

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
      const allCourses= await courses.find().populate("category instructor")

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
      
   console.log(req.params);
   
   
      
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
    
      
      

      res.status(400).json(error)
   }

}

const approveCourse=async(req:Request,res:Response)=>{
  
   
   try {
      const {id} =req.params
     
      
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

const blockTutor=async(req:Request,res:Response)=>{
   
   try {
      const {id} =req.params
      

      const tutorlist= await tutor.findByIdAndUpdate(
         id,
         {
            isBlocked: true
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            tutorlist
            
        })
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}

const unBlockTutor=async(req:Request,res:Response)=>{
  
   
   try {
      const {id} =req.params
      const tutorlist= await tutor.findByIdAndUpdate(
         id,
         {
           isBlocked: false
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            tutorlist
            
        })
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}
const activateCategory=async(req:Request,res:Response)=>{
  
   
   try {
      const {id} =req.params
      const categories= await categoryModel.findByIdAndUpdate(
         id,
         {
           isActive: true
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            categories
            
        })
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}

const inActivateCategory=async(req:Request,res:Response)=>{
  
   
   try {
      const {id} =req.params
      const categories= await categoryModel.findByIdAndUpdate(
         id,
         {
           isActive: false
         },
         { new: true }
       )
       .then(() => {
         res.status(201).json({
            categories
            
        })
       })
    
      
     
   } catch (error) {
      res.status(400).json(error)
   }
}

const getEditCategoryList=async(req:Request,res:Response)=>{
   try {
      const {id}=req.params
      const editCategory= await categoryModel.findById({_id:id})
      if(editCategory){
         res.status(201).json({
            editCategory
            
        })
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

const editCategory= async(req:Request,res:Response)=>{
   
   try {
      
     
      const {category,description} = req.body
      const {id}=req.params
  const check=await categoryModel.findOne({title:category})
    if(check){
      res.status(400).json("category already existing")
    }else{
      const editedCategory=await categoryModel.findByIdAndUpdate(
         id, {
          title:category,
          description:description
        },
        { new: true }
       )

       if(editedCategory){
         res.status(201).json({
             _id:editedCategory._id,
             category:editedCategory.title,
             description:editedCategory.description,
           
         })
     }
   
    }
      
   } catch (error) {
    
      res.status(400).json(error)
   }

}


 export {
    login,getStudentsList,getInstructorList,blockStudent,
    unBlockStudent,getCategoryList,addCategory,
    getCourseList,getEditCourseList,editCourseList,
    approveCourse,cancelCourse,blockTutor,unBlockTutor,
    activateCategory,getEditCategoryList,
    inActivateCategory,editCategory
 }

