import { Request,Response } from "express"
import axios from "axios";
import generateToken from "../../token/generateToken";
import Tutor from "../../model/tutor"
import courseCategory from "../../model/courseCategory"
import course from "../../model/courses"
import lesson from "../../model/lesson"

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
                
                console.log("ttttt");
                
                await axios.post('http://localhost:3002/otp/sendmobileotp', { phone: phone });
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
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};


const signUp = async (req: Request, res: Response) => {
    
    try {
        const { verificationCode } = req.body;
        const phone=globalData.tutor?.phone
                
            await axios.post('http://localhost:3002/otp/verifymobileotp', { phone,verificationCode});
            
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
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

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
            duration:newCourse.duration,
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
    sendOtp, signUp,login,getCategory,addCourse,addLesson
 }