import express from "express";
import Subcategory from "../models/Subcategory.js";

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

// POST create subcategory
router.post("/", async (req, res) => {
  const { name, category } = req.body;
  try {
    const newSubcategory = new Subcategory({ name, category });
    const saved = await newSubcategory.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
