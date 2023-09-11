import mongoose, { Schema,model,Document } from "mongoose";

interface LessonDocument extends Document {
  title: string;
  description: string;
  course: mongoose.Schema.Types.ObjectId,
  video:string,
  duration:string,
  createdAt: Date;
  updatedAt: Date;
}
const lessonSchema= new Schema<LessonDocument>({
    title: {
        type: String,
        require: true,
      },
      description: {
        type: String,
        require: true,
      },
      video: {
        type: String,
        require: true,
      },
      duration: {
        type: String,
        require: true,
      },
      
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"course",
        require: true,
      },
      createdAt: {
        type:Date,
        required: true,
        default:Date.now ,
      },
     
})


export default model<LessonDocument>("lesson",lessonSchema)