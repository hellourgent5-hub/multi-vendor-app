// models/Module.js
import mongoose from "mongoose";

const moduleSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  }
}, { timestamps: true });

export default mongoose.model("Module", moduleSchema);
