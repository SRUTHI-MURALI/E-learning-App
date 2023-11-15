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
exports.verifyMobileOtp = exports.sendMobileOtp = void 0;
const otpGenerator_1 = require("../../otpGenerator/otpGenerator");
const accountSid = process.env.TWILIO_ACCOUNT_SID || "";
const authToken = process.env.TWILIO_AUTH_TOKEN || "";
const twilio_1 = require("twilio");
const serviceSid = process.env.TWILIO_SERVICE_SID || "";
const twilioClient = new twilio_1.Twilio(accountSid, authToken);
const sendMobileOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone } = req.body;
        const otp = yield (0, otpGenerator_1.generateOTP)(phone);
        res.status(200).json({ message: "OTP sent successfully", otp });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendMobileOtp = sendMobileOtp;
const verifyMobileOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { phone, verificationCode } = req.body;
        const verification_check = yield twilioClient.verify.v2
            .services(serviceSid)
            .verificationChecks.create({
            to: "+91" + phone,
            code: verificationCode,
        });
        if (verification_check.status === "approved") {
            // OTP verification successful
            return res.status(200).json({ message: "OTP verified successfully" });
        }
        else {
            // OTP verification failed
            return res.status(400).json({ message: "OTP verification failed" });
        }
    }
    catch (error) {
        // Handle other errors
        console.log("Error: Something went wrong", error);
        return res.status(400).json({ message: "Something went wrong" });
    }
});
exports.verifyMobileOtp = verifyMobileOtp;
