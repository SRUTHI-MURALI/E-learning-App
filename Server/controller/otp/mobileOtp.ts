import { Request, Response } from "express";
import { generateOTP } from "../../otpGenerator/otpGenerator";
const accountSid: string = process.env.TWILIO_ACCOUNT_SID || "";
const authToken: string = process.env.TWILIO_AUTH_TOKEN || "";
import { Twilio } from "twilio";
const serviceSid: string = process.env.TWILIO_SERVICE_SID || "";

const twilioClient: Twilio = new Twilio(accountSid, authToken);
const sendMobileOtp = async (req: Request, res: Response) => {
  try {
    const { phone } = req.body;

    
    const otp = await generateOTP(phone);

    res.status(200).json({ message: "OTP sent successfully", otp });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};
const verifyMobileOtp = async (req: Request, res: Response) => {
  try {
    const { phone, verificationCode } = req.body;

    const verification_check = await twilioClient.verify.v2
      .services(serviceSid)
      .verificationChecks.create({
        to: "+91" + phone,
        code: verificationCode,
      });

    if (verification_check.status === "approved") {
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
