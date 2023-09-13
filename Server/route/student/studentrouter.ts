import express from 'express'

const studentrouter=express.Router()

import {sendOtp,signUp ,login,googleLogin,courseDetails} from "../../controller/student/studentController"

studentrouter.post('/sendotp',sendOtp)
studentrouter.post('/verifyotp',signUp)
studentrouter.post('/login',login)
studentrouter.post('/googlelogin',googleLogin)
studentrouter.get('/getspecificcoursedetails/:id',courseDetails)

export default studentrouter


