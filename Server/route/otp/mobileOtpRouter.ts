
import express from 'express'

const mobileotprouter=express.Router()

import { sendMobileOtp ,verifyMobileOtp} from '../../controller/otp/mobileOtp'

mobileotprouter.post("/sendmobileotp",sendMobileOtp)
mobileotprouter.post("/verifymobileotp",verifyMobileOtp)

export default mobileotprouter