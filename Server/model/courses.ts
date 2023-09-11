import mongoose, { Schema, model, Document } from "mongoose";

interface CourseDocument extends Document {
  title: string;
  description: string;
  category: mongoose.Schema.Types.ObjectId;
  photo: string;
  isApproved: boolean;
  price: number;
  duration: string;
  instructor: mongoose.Schema.Types.ObjectId;
  courseLessons: Lesson[];
  createdAt: Date;
  updatedAt: Date;
}

interface Lesson {
  title: string;
  duration: number;
  description: string;
  video: string;
}

const courseSchema = new Schema<CourseDocument>({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "courseCategory",
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  isApproved: {
    type: Boolean,
    required: true,
    default: false,
  },
  instructor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "tutor",
    required: false,
  },
  courseLessons: [
    {
      title: {
        type: String,
        required: true,
      },
      duration: {
        type: Number,
        required: true,
      },
      description: {
        type: String,
        required: true,
      },
      video: {
        type: String,
        required: true,
      },
    },
  ],
  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model<CourseDocument>("course", courseSchema);
