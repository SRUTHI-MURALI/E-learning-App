import express from 'express'
import { signUp,login,addCategory,addCourse,addLesson } from '../../controller/tutor/tutorController'

const tutorRouter=express.Router()

tutorRouter.post('/register',signUp)
tutorRouter.post('/login',login)
tutorRouter.post('/addCourseCategory',addCategory)
tutorRouter.post('/addCourse',addCourse)
tutorRouter.post('/addLesson',addLesson)

export default tutorRouter