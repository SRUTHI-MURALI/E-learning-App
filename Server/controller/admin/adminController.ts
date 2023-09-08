
import { Request,Response } from "express"
import generateToken from "../../token/generateToken";
import Admin from'../../model/admin'
import student from '../../model/student'
import tutor from '../../model/tutor'
import category from '../../model/courseCategory'

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

const getCategoryList=async(req:Request,res:Response)=>{
   try {
      const categories= await category.find({})
      
      console.log(categories,"hjghghhghghkg");
      
      if(categories){
         res.status(201).json({
            categories
            
        })
      }
   } catch (error) {
      res.status(400).json(error)
   }
}

 export {
    login,getStudentsList,getInstructorList,blockStudent,unBlockStudent,getCategoryList
 }

