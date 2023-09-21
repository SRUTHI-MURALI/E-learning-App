import mongoose,  {  Schema,model,Document } from "mongoose";

interface CourseQuizDocument extends Document {
  questionset:string;
  createdAt: Date;
  updatedAt: Date;
  course: mongoose.Schema.Types.ObjectId;
}

const courseQuizSchema= new Schema<CourseQuizDocument>({
      
      questionset: [
        {
          question: {
            type: String,
            required: true,
          
          },
          option1: {
            type: String,
            required: true,
            
          },
          option2: {
            type: String,
            required: true,
            
          },
          option3: {
            type: String,
            required: true,
            
          },
          option4: {
            type: String,
            required: true,
            
          },
          answerOption:{
            type:String,
            required:true
          }

        },
      ],
      course: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "course",
        required: false,
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



export default model<CourseQuizDocument>("courseQuiz",courseQuizSchema)