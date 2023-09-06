import { Request,Response } from "express"

import generateToken from "../../token/generateToken";
import Student from "../../model/student";




const signUp= async (req:Request,res:Response)=>{
    try {
        const {name,email,password,phone} = req.body
        const emailfind = await Student.findOne({ email });
        const phonefind = await Student.findOne({ phone });
        if (emailfind || phonefind) {
            res.status(400)
            throw new Error('Student already existing')
        } else {
           
              const newStudent = await Student.create({
                name,
                email,
                password,
                phone
            })
             
            if(newStudent){
                const token =  generateToken(newStudent._id);
              
                 res.status(201).json({
                     _id:newStudent._id,
                     name:newStudent.name,
                     email:newStudent.email,
                     phone:newStudent.phone,
                     token
                 })
             }else{
                 res.status(400)
                 throw new Error('Invalid User Data')
             }
                
                
            }
          }
        
    catch (error) {
      console.log(error);
        
    }
 }

 const login= async (req:Request,res:Response)=>{
    try {
        const { email,password}= req.body
        const student=await Student.findOne({email})
        if(student && (await student.matchPasswords(password))){
        const token = generateToken(student._id)
    
        res.status(201).json({
        _id:student._id,
        name:student.name,
        email:student.email,
        phone:student.phone,
        token
    })
    }else{
        res.status(400)
        throw new Error('Invalid student Data')
    }
} catch (error) {
        res.status(400).json(error)
    }
 }
 export {
    signUp,login
 }

