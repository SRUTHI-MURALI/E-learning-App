import mongoose,{ Schema,model, Document} from "mongoose";
import bcrypt from "bcrypt"

interface StudentDocument extends Document {
  name: string;
  email: string;
  phone: number;
  password: string;
  photo: string[];
  courses: mongoose.Schema.Types.ObjectId;
  createdAt: Date;

  matchPasswords(enteredPassword: string): Promise<boolean>
}

const studentSchema= new Schema<StudentDocument>({
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
      phone: {
        type: Number,
        require: true,
      },
      photo: 
      [{
         type: String,
   
         required: true,
       }],
       courses: {
        type: mongoose.Schema.Types.ObjectId,
        ref:"Courses",
        require: true,
      },
      createdAt: {
        type:Date,
        required:true,
        default:Date.now ,
      },
      
})

studentSchema.pre<StudentDocument>('save',async function(next){
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
    next(); // Skip password hashing if no password property
  }
})

studentSchema.methods.matchPasswords = async function(enteredPassword:string){
  return await bcrypt.compare(enteredPassword,this.password)
}





export default model<StudentDocument>("student",studentSchema)