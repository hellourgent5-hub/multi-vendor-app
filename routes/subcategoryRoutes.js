import express from "express";
import Subcategory from "../models/Subcategory.js";

const router = express.Router();

// Get all subcategories
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate({
      path: "category",
      populate: { path: "module" }
    });
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
