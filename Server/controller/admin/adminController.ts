
import { Request,Response } from "express"
import generateToken from "../../token/generateToken";
import Admin from'../../model/admin'

const login=async(req:Request,res:Response)=>{
    try {
      const {email,password}=req.body
      const admin=await Admin.findOne({email})
      if(admin && admin.password==password){
         const token = generateToken(admin._id)
         res.status(201).json({
            _id:admin._id,
            name:admin.name,
            email:admin.email,
            token
        })
      }else{
         res.status(400)
         throw new Error('Invalid admin Data')
     }
    } catch (error) {
      res.status(400).json(error)
    }
}

 export {
    login
 }

