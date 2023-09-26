import mongoose, { Schema, model, Document } from "mongoose";

interface OrderDocument extends Document {
  courseDetails: mongoose.Schema.Types.ObjectId;
  studentDetails: mongoose.Schema.Types.ObjectId;

  createdAt: Date;
}
const orderSchema = new Schema<OrderDocument>({
  courseDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "course",
    require: true,
  },

  studentDetails: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "student",
    require: true,
  },

  createdAt: {
    type: Date,
    required: true,
    default: Date.now,
  },
});

export default model<OrderDocument>("order", orderSchema);
