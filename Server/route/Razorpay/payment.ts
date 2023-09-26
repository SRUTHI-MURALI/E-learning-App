import express from "express";

const razorpayroute = express.Router();
import { makePayment, verifyPayment } from "../../controller/Razorpay/razorpay";

razorpayroute.post("/makepayment/:id", makePayment);
razorpayroute.post("/verifypayment", verifyPayment);

export default razorpayroute;
