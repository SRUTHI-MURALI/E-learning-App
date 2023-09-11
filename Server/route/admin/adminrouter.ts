
import express from 'express'

const adminrouter=express.Router()

import {login,getStudentsList,getInstructorList, blockStudent, unBlockStudent,getCategoryList, addCategory,getCourseList,getEditCourseList,editCourseList,approveCourse,cancelCourse} from "../../controller/admin/adminController"


adminrouter.post('/login',login)
adminrouter.get('/getstudentlist',getStudentsList)
adminrouter.get('/getinstructorlist',getInstructorList)
adminrouter.get('/getcategorylist',getCategoryList)
adminrouter.post('/addcategory',addCategory)
adminrouter.put('/blockstudent/:id',blockStudent)
adminrouter.put('/unblockstudent/:id',unBlockStudent) 
adminrouter.get('/getallcourses',getCourseList) 
adminrouter.get('/geteditcourse/:id',getEditCourseList)
adminrouter.put('/editcourselist/:id',editCourseList)
adminrouter.put('/approvecourse/:id',approveCourse)
adminrouter.put('/cancelcourse/:id',cancelCourse)

export default adminrouter