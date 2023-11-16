"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mobileotprouter = express_1.default.Router();
const mobileOtp_1 = require("../../controller/otp/mobileOtp");
mobileotprouter.post("/sendmobileotp", mobileOtp_1.sendMobileOtp);
mobileotprouter.post("/verifymobileotp", mobileOtp_1.verifyMobileOtp);
exports.default = mobileotprouter;
