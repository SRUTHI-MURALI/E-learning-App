
import express from 'express'

const adminrouter=express.Router()

import {login} from "../../controller/admin/adminController"


adminrouter.post('/login',login)

export default adminrouter