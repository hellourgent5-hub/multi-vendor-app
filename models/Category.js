import mongoose from "mongoose";

const categorySchema = new mongoose.Schema({
  module: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "Module", 
    required: true 
  },
  name: { 
    type: String, 
    required: true 
  }
}, { timestamps: true });

const Category = mongoose.model("Category", categorySchema);

export default Category;
