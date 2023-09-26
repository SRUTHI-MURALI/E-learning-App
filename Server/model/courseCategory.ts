import { Schema, model, Document } from "mongoose";

interface CategoryDocument extends Document {
  title: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

const courseCategorySchema = new Schema<CategoryDocument>({
  title: {
    type: String,
    require: true,
  },
  description: {
    type: String,
    require: true,
  },
  isActive: {
    type: Boolean,
    require: true,
    default: true,
  },
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

export default model<CategoryDocument>("courseCategory", courseCategorySchema);
