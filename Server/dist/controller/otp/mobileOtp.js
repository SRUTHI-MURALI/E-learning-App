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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyMobileOtp = exports.sendMobileOtp = void 0;
// import { generateOTP } from "../../otpGenerator/otpGenerator";
const otpGenerator_1 = __importDefault(require("../../EmailGenerator/otpGenerator"));
const globalData = {
    otp: null
};
const sendMobileOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        const otp = yield (0, otpGenerator_1.default)(email, res);
        globalData.otp = otp;
        res.status(200).json({ message: "OTP sent successfully", otp });
    }
    catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});
exports.sendMobileOtp = sendMobileOtp;
const verifyMobileOtp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { verificationCode } = req.body;
        if (verificationCode == globalData.otp) {
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
