
import express from 'express'

const adminrouter=express.Router()

import {login,getStudentsList,getInstructorList, blockStudent, unBlockStudent,
    getCategoryList, addCategory,getCourseList,getEditCourseList,editCourseList,
    approveCourse,cancelCourse,blockTutor,unBlockTutor,activateCategory,
    inActivateCategory,editCategory,getEditCategoryList} from "../../controller/admin/adminController"


adminrouter.post('/login',login)

// student management
adminrouter.get('/getstudentlist',getStudentsList)
adminrouter.put('/blockstudent/:id',blockStudent)
adminrouter.put('/unblockstudent/:id',unBlockStudent) 


//Instructor management
adminrouter.get('/getinstructorlist',getInstructorList)
adminrouter.put('/blockinstructor/:id',blockTutor)
adminrouter.put('/unblockinstructor/:id',unBlockTutor)



//Category management
adminrouter.get('/getcategorylist',getCategoryList)
adminrouter.post('/addcategory',addCategory)
adminrouter.put('/activatecategory/:id',activateCategory) 
adminrouter.put('/inactivatecategory/:id',inActivateCategory)
adminrouter.get('/geteditcategorylist/:id',getEditCategoryList)
adminrouter.put('/editcategory/:id',editCategory)




//Course management
adminrouter.get('/getallcourses',getCourseList) 
adminrouter.get('/geteditcourse/:id',getEditCourseList)
adminrouter.put('/editcourselist/:id',editCourseList)
adminrouter.put('/approvecourse/:id',approveCourse)
adminrouter.put('/cancelcourse/:id',cancelCourse)

export default adminrouter


