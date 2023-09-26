import { Request,Response } from "express"
import Razorpay from "razorpay";
import crypto from 'crypto'
import 'dotenv/config'
import courses from "../../model/courses";
import orderModel from "../../model/orders"
import Student from '../../model/student'

const key_id= process.env.Razorpay_KEY_ID || '';
const key_secret= process.env.Razorpay_SECRET_KEY ||''



const makePayment=async(req:Request,res:Response)=>{
    try {
        const {id}=req.params
        const course=await courses.findById({_id:id})
        const price =course?.price

        const instance = new Razorpay({
            key_id,
            key_secret,
        });

        
       
    if(price){
        const options = {
            amount: price *100, // Amount should be in paisa (hence, multiplied by 100)
        currency: "INR",
        receipt: crypto.randomBytes(10).toString("hex")
        };
        instance.orders.create(options, (error, order) => {
            if (error) {
                console.error("Error creating order:", error);
                return res.status(500).json({ message: "Internal server error" });
            }
           
            res.status(200).json({ data: order });
        });
        
        

    }
		

		
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error!" });
		console.log(error);
    }
}

const verifyPayment=async(req:Request,res:Response)=>{
try {
    
    const { studentId, courseId, response } = req.body;
   
        
    const sign = response.razorpay_order_id + "|" + response.razorpay_payment_id;
    if ( process.env.Razorpay_KEY_ID) {
        const expectedSign = crypto
          .createHmac('sha256', process.env.Razorpay_SECRET_KEY||'')
          .update(sign.toString())
          .digest('hex');
        
       
        if (response.razorpay_signature === expectedSign) {
            
            await orderModel.create({
               
                studentDetails:studentId,
                courseDetails:courseId
        
               })

            await Student.findByIdAndUpdate(
                studentId,
                { $push: { enrolledCourses: courseId } },
                { new: true }
            )
           
               
               
            return res.status(200).json({ message: "Payment verified successfully" });
        } else {
            return res.status(400).json({ message: "Invalid signature sent!" });
        }
      } else {
        // Handle the case where KEY_SECRET is undefined or empty
        console.error('KEY_SECRET is not defined or empty');
      }
   
} catch (error) {
    res.status(500).json({ message: "Internal Server Error!" });
    console.log(error);
}
}

export {
    makePayment,verifyPayment
}