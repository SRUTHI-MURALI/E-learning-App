import express from 'express'

const studentrouter=express.Router()

import {signUp ,login} from "../../controller/student/studentController"

studentrouter.post('/register',signUp)
studentrouter.post('/login',login)

export default studentrouter