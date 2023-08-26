import mongoose, { Schema,model,Document } from "mongoose";

interface CourseDocument extends Document {
  title: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId,
  price:number,
  lessonCount:number,
  isApproved:boolean,
  instructor: mongoose.Schema.Types.ObjectId,
  createdAt: Date;
  updatedAt: Date;
}

const courseSchema= new Schema<CourseDocument>({
    title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      category: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"courseCategory",
        require: true,
      },
      price: {
        type: Number,
        require: true,
      },
      lessonCount: {
        type: Number,
        require: true,
      },
      isApproved: {
        type: Boolean,
        require: true,
      },
      instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"tutor",
        require: true,
      },
      createdAt: {
        type:Date,
        required: true,
        default:Date.now ,
      },
      updatedAt: {
        type:Date,
        required: true,
        default:Date.now ,
      },
     
})


export default model<CourseDocument>("course",courseSchema)