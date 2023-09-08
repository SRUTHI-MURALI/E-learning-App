import { Request,Response } from "express"
import generateToken from "../../token/generateToken";
import Student from "../../model/student";
import axios from 'axios'
import jwt from 'jsonwebtoken';
import 'dotenv/config';

const globalData = {
    otp: null as null | number, // Use type null | number for otp
    student: null as null | { name: string, email: string, phone: string, password: string }, // Define a type for user
  };
  
  const sendOtp = async (req: Request, res: Response) => {
   
    
    try {
        const { name, email, password, phone } = req.body;
        const emailfind = await Student.findOne({ email });
        const phonefind = await Student.findOne({ phone });
        
        if (emailfind || phonefind) {
            
            
            res.status(400).json({ error: 'Student already exists' });
        } else {
                
                
                await axios.post('http://localhost:3002/otp/sendmobileotp', { phone: phone });
                res.status(200).json({ message: 'OTP sent successfully' });
               
            const newStudent = {
                name,
                email,
                password,
                phone
            };
            globalData.student = newStudent;

        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};

const signUp = async (req: Request, res: Response) => {
    
    try {
        const { verificationCode } = req.body;
        const phone=globalData.student?.phone
                
            await axios.post('http://localhost:3002/otp/verifymobileotp', { phone,verificationCode});
            
            const addUser=  await Student.create(globalData.student)
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

// Import Request and Response from express package

const googleLogin = async (req: Request, res: Response) => {
    try {
      console.log("hello");
  
      const { id_token } = req.body;
  
      console.log(id_token, "email");
  
      // Define a type for your decoded token
      interface JwtDecodedToken {
        name: string | null;
        email: string | null;
        jti:string |null
        // Add other properties as needed
      }
  
      // Use type assertion to tell TypeScript that you're certain it's JwtDecodedToken
      const decodedToken = jwt.decode(id_token) as JwtDecodedToken;
  
      const { name, email,jti } = decodedToken;
     
      const addStudent=  await Student.create({
        name,
        email,
        jti
      })
            const token = generateToken(addStudent._id);
            return res.status(200).json({
                _id: addStudent?._id,
                name: addStudent?.name,
                email: addStudent?.email,
                phone:addStudent?.phone,
                token,
            })
  
      // Continue with your logic
  
    } catch (error) {
      res.status(400).json(error);
    }
  };

  
  
  
  
  
  

 export {
    sendOtp,signUp,login,googleLogin
 }

