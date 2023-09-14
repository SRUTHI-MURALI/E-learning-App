import { Request,Response } from "express"
import { generateOTP,verifyOTP } from "../../otpGenerator/otpGenerator";

const sendMobileOtp=async(req:Request,res:Response)=>{
    try {
        const { phone } = req.body;
        
        console.log("generate otp");
        
        
        // Generate and send OTP using the imported function
        const otp = await generateOTP(phone);

    
        res.status(200).json({ message: 'OTP sent successfully', otp });
     
      } catch (error) {
       
        res.status(500).json({ error: 'Internal Server Error' });
      }
}

const verifyMobileOtp=async(req:Request,res:Response)=>{
    const { phone,verificationCode } = req.body;
     
   await verifyOTP(phone,verificationCode)
   res.status(200).json({ message: 'OTP verified successfully' });
   
}

export {
    sendMobileOtp,verifyMobileOtp
 }

