import { Request, Response } from "express";
// import { generateOTP } from "../../otpGenerator/otpGenerator";

import generateOtp from "../../EmailGenerator/otpGenerator";


const globalData={
  otp: null as null | number
}
const sendMobileOtp = async (req: Request, res: Response) => {
  try {
    const { email } = req.body;

    
    const otp = await generateOtp(email,res)
    globalData.otp=otp;
    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const verifyMobileOtp = async (req: Request, res: Response) => {
  try {
    const {  verificationCode } = req.body;
  


   
    if (verificationCode==globalData.otp) {
    
      
      // OTP verification successful
      return res.status(200).json({ message: "OTP verified successfully" });
    } else {
      // OTP verification failed
      return res.status(400).json({ message: "OTP verification failed" });
    }
  } catch (error) {
    // Handle other errors
    console.log("Error: Something went wrong", error);
    return res.status(400).json({ message: "Something went wrong" });
  }
};


export { sendMobileOtp, verifyMobileOtp };
