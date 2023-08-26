import mongoose,{  Schema,model,Document } from "mongoose";
import bcrypt from "bcrypt"

interface TutorDocument extends Document {
  name: string;
  email: string;
  phone: number;
  password: string;
  photo: string[];
  subject:string;
  experience:number;
  courses: mongoose.Schema.Types.ObjectId;
  createdAt: Date;
  
  matchPasswords(enteredPassword: string): Promise<boolean>
}

const tutorSchema= new Schema<TutorDocument>({
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
      photo: 
      [{
         type: String,
         required: true,
       }],
       subject: {
        type: String,
        require: true,
      },
      experience: {
        type: Number,
        require: true,
      },
      phone: {
        type: Number,
        require: true,
      },
       courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Courses",
        require: true,
      },
      createdAt: {
        type:Date,
        required: true,
        default:Date.now ,
      },
      
})

tutorSchema.pre<TutorDocument>('save',async function(next){
  if(!this.isModified('password')){
      next()
  }
  if (this.password) {
    try {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
      next();
    } catch (error) {
      console.log(error);
    }
  } else {
    next(); 
  }
})

tutorSchema.methods.matchPasswords = async function(enteredPassword:string){
  return await bcrypt.compare(enteredPassword,this.password)
}


export default model<TutorDocument>("tutor", tutorSchema);
