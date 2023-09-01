import express from 'express'
import { signUp,login,getCategory,addCourse,addLesson } from '../../controller/tutor/tutorController'

const tutorRouter=express.Router()

tutorRouter.post('/register',signUp)
tutorRouter.post('/login',login)
tutorRouter.get('/getCourseCategory',getCategory)
tutorRouter.post('/addCourse',addCourse)
tutorRouter.post('/addLesson',addLesson)

export default tutorRouter