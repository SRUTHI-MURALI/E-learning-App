"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const razorpayroute = express_1.default.Router();
const razorpay_1 = require("../../controller/Razorpay/razorpay");
razorpayroute.post("/makepayment/:id", razorpay_1.makePayment);
razorpayroute.post("/verifypayment", razorpay_1.verifyPayment);
exports.default = razorpayroute;
