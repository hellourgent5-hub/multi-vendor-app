import express from "express";
import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";

const router = express.Router();

// GET all subcategories
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST create a subcategory
router.post("/", async (req, res) => {
  const { name, categoryId } = req.body;
  try {
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) return res.status(404).json({ error: "Category not found" });

    const newSubcategory = new Subcategory({ name, category: categoryId });
    const saved = await newSubcategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
