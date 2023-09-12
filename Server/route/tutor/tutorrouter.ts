import express from 'express'
import { sendOtp,signUp,login,getCategory,addCourse,addLesson,getCourseList,getEditCourseList,editCourseList } from '../../controller/tutor/tutorController'

const tutorRouter=express.Router()

tutorRouter.post('/sendotp',sendOtp)
tutorRouter.post('/verifyotp',signUp)
tutorRouter.post('/login',login)
tutorRouter.get('/getCourseCategory',getCategory)
tutorRouter.post('/addcourse',addCourse)
tutorRouter.post('/addlessons',addLesson)
tutorRouter.get('/getallcourses',getCourseList) 
tutorRouter.get('/geteditcourse/:id',getEditCourseList)
tutorRouter.put('/editcourselist/:id',editCourseList)

export default tutorRouter