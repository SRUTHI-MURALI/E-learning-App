import express from 'express'

const studentrouter=express.Router()

import {sendOtp,signUp ,login,googleLogin} from "../../controller/student/studentController"

studentrouter.post('/sendotp',sendOtp)
studentrouter.post('/verifyotp',signUp)
studentrouter.post('/login',login)
studentrouter.post('/googlelogin',googleLogin)

export default studentrouter