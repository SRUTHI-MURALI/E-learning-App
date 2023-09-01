import { Request,Response } from "express"

import generateToken from "../../token/generateToken";
import Tutor from "../../model/tutor"
import courseCategory from "../../model/courseCategory"
import course from "../../model/courses"
import lesson from "../../model/lesson"

const signUp= async (req:Request,res:Response)=>{
    try {
        const {name,email,password,phone} = req.body
        const emailfind = await Tutor.findOne({ email });
        const phonefind = await Tutor.findOne({ phone });
        if (emailfind || phonefind) {
            res.status(400)
            throw new Error('Instructor already existing')
        } else {
           
              const newTutor = await Tutor.create({
                name,
                email,
                password,
                phone
            })
             
            if(newTutor){
                const token =  generateToken(newTutor._id);
              
                 res.status(201).json({
                     _id:newTutor._id,
                     name:newTutor.name,
                     email:newTutor.email,
                     phone:newTutor.phone,
                     token
                 })
             }else{
                 res.status(400)
                 throw new Error('Invalid Tutor Data')
             }
                
                
            }
          }
        
    catch (error) {
      console.log(error);
        
    }
 }

 const login= async (req:Request,res:Response)=>{
    const { email,password}= req.body
    const tutor=await Tutor.findOne({email})
    if(tutor && (await tutor.matchPasswords(password))){
        const token = generateToken(tutor._id)
    
    res.status(201).json({
        _id:tutor._id,
        name:tutor.name,
        email:tutor.email,
        phone:tutor.phone,
        token
    })
    }else{
        res.status(400)
        throw new Error('Invalid tutor or password')
    } 
 }

 const getCategory= async(req:Request,res:Response)=>{
    const category = await courseCategory.find({})
    console.log(category,"kjhkh");
    
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
        price:req.body.price,
        lessonCount:req.body.lessonCount,
        isApproved:req.body.isApproved,
        instructor:req.body.instructor
    })
    
    
    if(newCourse){
        res.status(201).json({
            _id:newCourse._id,
            title:newCourse.title,
            description:newCourse.description,
            category:newCourse.category,
            price:newCourse.price,
            lessonCount:newCourse.lessonCount,
            isApproved:newCourse.isApproved,
            instructor:newCourse.instructor,
            createdAt:newCourse.createdAt,
            
        })
    }
}
 
const addLesson= async(req:Request,res:Response)=>{
    const newLesson=await lesson.create({
        title: req.body.title,
        description: req.body.description,
        course:req.body.course,
        duration:req.body.duration,
        video:req.body.video,
        instructor:req.body.instructor
    })
    if(newLesson){
        res.status(201).json({
            _id:newLesson._id,
            title:newLesson.title,
            description:newLesson.description,
            course:newLesson.course,
            duration:newLesson.duration,
            video:newLesson.video,
            instructor:newLesson.instructor,
            createdAt:newLesson.createdAt,
            
        })
    }
}

 export{
    signUp,login,getCategory,addCourse,addLesson
 }