
import express from 'express'

const adminrouter=express.Router()

import {login,getStudentsList,getInstructorList, blockStudent, unBlockStudent} from "../../controller/admin/adminController"


adminrouter.post('/login',login)
adminrouter.get('/getstudentlist',getStudentsList)
adminrouter.get('/getinstructorlist',getInstructorList)
adminrouter.put('/blockstudent/:id',blockStudent)
adminrouter.put('/unblockstudent/:id',unBlockStudent)

export default adminrouter