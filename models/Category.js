import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    subcategories: [
      {
        type: String, // each subcategory is a string
      },
    ],
  },
  { timestamps: true }
);

export default mongoose.model("Category", CategorySchema);
