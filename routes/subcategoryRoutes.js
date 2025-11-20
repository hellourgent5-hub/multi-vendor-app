import express from "express";
import Subcategory from "../models/Subcategory.js";
import Category from "../models/Category.js";

const router = express.Router();

// 1. Get all subcategories (READ)
router.get("/", async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate("category");
    res.json(subcategories);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 2. Create subcategory (CREATE)
router.post("/", async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    
    // Basic validation
    if (!name || !categoryId) {
        return res.status(400).json({ error: "Name and categoryId are required." });
    }

    const category = await Category.findById(categoryId);
    if (!category) return res.status(404).json({ error: "Category not found" });

    const subcategory = new Subcategory({ name, category: category._id });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 3. Update subcategory by ID (UPDATE)
router.put("/:id", async (req, res) => {
  try {
    const { name, categoryId } = req.body;
    const subcategoryId = req.params.id;

    // Optional: Check if the new categoryId exists if provided
    if (categoryId) {
      const category = await Category.findById(categoryId);
      if (!category) return res.status(404).json({ error: "New Category not found" });
    }
    
    // Find the subcategory and update it
    const updatedSubcategory = await Subcategory.findByIdAndUpdate(
      subcategoryId,
      { 
        name, 
        category: categoryId 
      },
      { new: true } // returns the updated document
    );

    if (!updatedSubcategory) {
      return res.status(404).json({ error: "Subcategory not found." });
    }
    
    res.json(updatedSubcategory);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 4. Delete subcategory by ID (DELETE)
router.delete("/:id", async (req, res) => {
  try {
    const subcategoryId = req.params.id;

    const result = await Subcategory.findByIdAndDelete(subcategoryId);

    if (!result) {
      return res.status(404).json({ error: "Subcategory not found." });
    }
    
    // Respond with a 204 No Content status for successful deletion
    res.status(204).send(); 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
