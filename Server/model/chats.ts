import mongoose, { Schema, model, Document } from "mongoose";

interface ChatDocument extends Document {
  message: string;
  users: [mongoose.Schema.Types.ObjectId, mongoose.Schema.Types.ObjectId];
  sender: mongoose.Schema.Types.ObjectId;
  // Add other fields as needed
}

const chatSchema = new Schema<ChatDocument>(
  {
    message: {
      type: String,
      required: true,
    },
    users: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", // Assuming you have a User model
      },
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    // You can add more fields as needed, such as timestamps, read status, etc.
  },
  {
    timestamps: true, // This adds 'createdAt' and 'updatedAt' fields
  }
);

export default model<ChatDocument>("Chat", chatSchema);
