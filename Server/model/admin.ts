import {  Schema,model,Document } from "mongoose";

interface AdminDocument extends Document {
  name: string;
  email: string;
  password: string;
  createdAt: Date;
}

const adminSchema= new Schema<AdminDocument>({
      name: {
        type: String,
        require: true,
      },
      email: {
        type: String,
        require: true,
      },
      password: {
        type: String,
        require: true,
      },
      createdAt: {
        type:Date,
        required: true,
        default:Date.now ,
      },
})


export default model<AdminDocument>("admin",adminSchema)