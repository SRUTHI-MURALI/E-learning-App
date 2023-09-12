
import {Twilio} from 'twilio';
import 'dotenv/config';

const accountSid: string = process.env.TWILIO_ACCOUNT_SID || '';
const authToken: string = process.env.TWILIO_AUTH_TOKEN || '';

const serviceSid: string = process.env.TWILIO_SERVICE_SID || '';



const twilioClient: Twilio = new Twilio(accountSid, authToken);

export const generateOTP = async (phoneNumber: number): Promise<void> => {
  try {
console.log(phoneNumber,"ll");
   
     await twilioClient.verify.v2.services(serviceSid).verifications.create({
        
      to: `+91${phoneNumber}`,
      channel: 'sms',
    });

    console.log("hi nnn");
    console.log('OTP sent successfully:');
  } catch (error) {
   
    
    
    // Handle any errors here
   
    console.error('Error sending OTP:');
    throw error;
  }
};

export const verifyOTP = async (phoneNumber: number,verificationCode:string): Promise<void> => {
    try {
        await twilioClient.verify.v2.services(serviceSid)
            .verificationChecks.create({
                to: "+91" + phoneNumber,
                code: verificationCode,
            });
        // You can handle the success response or return it if needed.
        console.log('OTP verified successfully:');
    } catch (error) {
      // Handle any errors here
      console.error('Error sending OTP:', error);
      throw error;
    }
  };
  