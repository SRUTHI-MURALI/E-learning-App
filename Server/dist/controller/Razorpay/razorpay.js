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
exports.verifyPayment = exports.makePayment = void 0;
const razorpay_1 = __importDefault(require("razorpay"));
const crypto_1 = __importDefault(require("crypto"));
require("dotenv/config");
const courses_1 = __importDefault(require("../../model/courses"));
const orders_1 = __importDefault(require("../../model/orders"));
const student_1 = __importDefault(require("../../model/student"));
const key_id = process.env.Razorpay_KEY_ID || "";
const key_secret = process.env.Razorpay_SECRET_KEY || "";
const makePayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const course = yield courses_1.default.findById({ _id: id });
        const price = course === null || course === void 0 ? void 0 : course.price;
        const instance = new razorpay_1.default({
            key_id,
            key_secret,
        });
        if (price) {
            const options = {
                amount: price * 100,
                currency: "INR",
                receipt: crypto_1.default.randomBytes(10).toString("hex"),
            };
            instance.orders.create(options, (error, order) => {
                if (error) {
                    console.error("Error creating order:", error);
                    return res.status(500).json({ message: "Internal server error" });
                }
                res.status(200).json({ data: order });
            });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});
exports.makePayment = makePayment;
const verifyPayment = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { studentId, courseId, response } = req.body;
        const sign = response.razorpay_order_id + "|" + response.razorpay_payment_id;
        if (process.env.Razorpay_KEY_ID) {
            const expectedSign = crypto_1.default
                .createHmac("sha256", process.env.Razorpay_SECRET_KEY || "")
                .update(sign.toString())
                .digest("hex");
            if (response.razorpay_signature === expectedSign) {
                yield orders_1.default.create({
                    studentDetails: studentId,
                    courseDetails: courseId,
                });
                yield student_1.default.findByIdAndUpdate(studentId, { $push: { enrolledCourses: courseId } }, { new: true });
                return res
                    .status(200)
                    .json({ message: "Payment verified successfully" });
            }
            else {
                return res.status(400).json({ message: "Invalid signature sent!" });
            }
        }
        else {
            // Handle the case where KEY_SECRET is undefined or empty
            console.error("KEY_SECRET is not defined or empty");
        }
    }
    catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
        console.log(error);
    }
});
exports.verifyPayment = verifyPayment;
