"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateOTP = void 0;
const twilio_1 = require("twilio");
require("dotenv/config");
const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const serviceSid = process.env.TWILIO_SERVICE_SID || "";
const twilioClient = new twilio_1.Twilio(accountSid, authToken);
const generateOTP = (phoneNumber) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const verification = yield twilioClient.verify.v2
            .services(serviceSid)
            .verifications.create({
            to: `+91${phoneNumber}`,
            channel: "sms",
        });
        console.log("OTP sent successfully:", verification.sid);
    }
    catch (error) {
        // Handle any errors here
        console.log(error);
    }
});
exports.generateOTP = generateOTP;
// export const verifyOTP = async (
//   phoneNumber: number,
//   verificationCode: string,
// ): Promise<void> => {
//   try {
//     // You can handle the success response or return it if needed.
//   } catch (error) {
//     // Handle any errors here
//     console.log("Error sending OTP:",);
//   }
// };
