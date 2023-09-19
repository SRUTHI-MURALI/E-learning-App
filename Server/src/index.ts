import "dotenv/config"
import  "../connection/connection"

import express from "express";
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())
import adminrouter from "../route/admin/adminrouter"
import studentrouter from "../route/student/studentrouter"
import tutorrouter from "../route/tutor/tutorrouter"
import otprouter from "../route/otp/mobileOtpRouter"
import razorpayroute from "../route/Razorpay/payment"

app.use("/admin",adminrouter)
app.use("/student",studentrouter)
app.use("/tutor",tutorrouter)
app.use("/otp",otprouter)
app.use("/Razorpay",razorpayroute)



app.listen(3001)


