import express from 'express'

const studentrouter=express.Router()

import {sendOtp,signUp ,login} from "../../controller/student/studentController"

studentrouter.post('/sendotp',sendOtp)
studentrouter.post('/verify',signUp)
studentrouter.post('/login',login)

export default studentrouter