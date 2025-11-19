import mongoose from "mongoose";

const subCategorySchema = new mongoose.Schema({
  category: { type: mongoose.Schema.Types.ObjectId, ref: "Category", required: true },
  name: { type: String, required: true }
}, { timestamps: true });

export default mongoose.model("Subcategory", subCategorySchema);
