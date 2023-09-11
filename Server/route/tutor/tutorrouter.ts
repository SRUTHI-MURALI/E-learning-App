import express from 'express'
import { sendOtp,signUp,login,getCategory,addCourse,addLesson } from '../../controller/tutor/tutorController'

const tutorRouter=express.Router()

tutorRouter.post('/sendotp',sendOtp)
tutorRouter.post('/verifyotp',signUp)
tutorRouter.post('/login',login)
tutorRouter.get('/getCourseCategory',getCategory)
tutorRouter.post('/addcourse',addCourse)
tutorRouter.post('/addlessons',addLesson)

export default tutorRouter